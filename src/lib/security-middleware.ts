import { NextRequest, NextResponse } from 'next/server';
import { 
  getClientIP, 
  isIPBanned, 
  banIP, 
  scanForThreats, 
  recordSuspiciousActivity,
  logSecurityEvent 
} from './admin-security';

// Security middleware for all form endpoints
export function securityMiddleware(request: NextRequest) {
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if IP is banned
  if (isIPBanned(clientIP)) {
    logSecurityEvent('BANNED_IP_ACCESS_ATTEMPT', {
      ip: clientIP,
      userAgent,
      timestamp: new Date().toISOString()
    });
    
    return NextResponse.json(
      { error: 'Access denied' },
      { status: 403 }
    );
  }
  
  return null; // No security issues, continue processing
}

// Enhanced security validation for form data
export function validateFormSecurity(request: NextRequest, formData: Record<string, string>): { 
  isValid: boolean; 
  response?: NextResponse; 
  sanitizedData?: Record<string, string>;
} {
  const clientIP = getClientIP(request);
  const userAgent = request.headers.get('user-agent') || '';
  
  // Check if IP is banned
  if (isIPBanned(clientIP)) {
    return {
      isValid: false,
      response: NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    };
  }
  
  // Scan all form fields for threats
  const sanitizedData: Record<string, string> = {};
  let hasThreats = false;
  let shouldBan = false;
  const allThreats: Array<{ type: string; payload: string; severity: string }> = [];
  
  for (const [key, value] of Object.entries(formData)) {
    if (typeof value === 'string') {
      const threatScan = scanForThreats(value);
      
      if (threatScan.isThreat) {
        hasThreats = true;
        allThreats.push(...threatScan.threats);
        
        if (threatScan.shouldBan) {
          shouldBan = true;
        }
        
        // Log the threat attempt
        logSecurityEvent('FORM_THREAT_DETECTED', {
          ip: clientIP,
          userAgent,
          field: key,
          value: value.substring(0, 100), // Log first 100 chars
          threats: threatScan.threats,
          timestamp: new Date().toISOString()
        });
        
        // Record suspicious activity
        recordSuspiciousActivity(clientIP, `Threat detected in field ${key}: ${threatScan.threats.map(t => t.type).join(', ')}`);
      }
      
      // Sanitize the input
      sanitizedData[key] = sanitizeInput(value);
    } else {
      sanitizedData[key] = value;
    }
  }
  
  // If threats detected, take action
  if (hasThreats) {
    if (shouldBan) {
      banIP(clientIP, `High-severity threats detected: ${allThreats.map(t => t.type).join(', ')}`);
      
      return {
        isValid: false,
        response: NextResponse.json(
          { error: 'Security violation detected. Access denied.' },
          { status: 403 }
        )
      };
    } else {
      // Medium/low severity threats - block but don't ban
      return {
        isValid: false,
        response: NextResponse.json(
          { error: 'Invalid input detected. Please check your input and try again.' },
          { status: 400 }
        )
      };
    }
  }
  
  return {
    isValid: true,
    sanitizedData
  };
}

// Sanitize input function (imported from admin-security)
function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  // Basic sanitization for legitimate input
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/['"]/g, '') // Remove quotes
    .replace(/[;|&$`]/g, '') // Remove command injection chars
    .trim();
}

// Rate limiting for form submissions
const formSubmissionLimits = new Map<string, { count: number; resetTime: number }>();

export function checkFormRateLimit(clientIP: string, maxSubmissions: number = 10, windowMinutes: number = 5): boolean {
  const now = Date.now();
  const windowMs = windowMinutes * 60 * 1000;
  
  const limit = formSubmissionLimits.get(clientIP);
  
  if (!limit || now > limit.resetTime) {
    // Reset the limit
    formSubmissionLimits.set(clientIP, {
      count: 1,
      resetTime: now + windowMs
    });
    return true;
  }
  
  if (limit.count >= maxSubmissions) {
    // Rate limit exceeded
    recordSuspiciousActivity(clientIP, `Form submission rate limit exceeded: ${limit.count} submissions in ${windowMinutes} minutes`);
    return false;
  }
  
  // Increment count
  limit.count++;
  return true;
}

// CSRF protection
export function validateCSRF(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  // Check if request is from same origin
  if (origin && host) {
    const originHost = new URL(origin).hostname;
    const requestHost = host.split(':')[0]; // Remove port if present
    
    if (originHost !== requestHost) {
      logSecurityEvent('CSRF_ATTEMPT', {
        origin,
        referer,
        host,
        timestamp: new Date().toISOString()
      });
      return false;
    }
  }
  
  return true;
}

// Content Security Policy headers
export function addSecurityHeaders(response: NextResponse): NextResponse {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  return response;
}
