// Use Web Crypto API instead of Node.js crypto for Edge Runtime compatibility

// Generate a secure access key
export function generateAccessKey(): string {
  // Generate a 12-character key with only safe characters (no SQL injection triggers)
  // Exclude: ', ;, --, /*, */, |, +, %, _, <, >, (, ), [, ], {, }, $, `, and other dangerous chars
  const safeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let key = '';
  
  // Ensure at least one character from each category
  key += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
  key += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
  key += '0123456789'[Math.floor(Math.random() * 10)]; // Number
  
  // Fill the rest with random safe characters
  for (let i = 3; i < 12; i++) {
    key += safeChars[Math.floor(Math.random() * safeChars.length)];
  }
  
  // Shuffle the key
  return key.split('').sort(() => Math.random() - 0.5).join('');
}

// Generate browser fingerprint for rate limiting
export function generateBrowserFingerprint(userAgent: string, ip: string): string {
  const data = `${userAgent}-${ip}`;
  // Use a simple hash function for Edge Runtime compatibility
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

// Check if key is expired (2 minutes)
export function isKeyExpired(createdAt: string): boolean {
  const now = new Date().getTime();
  const keyTime = new Date(createdAt).getTime();
  const twoMinutes = 2 * 60 * 1000; // 2 minutes in milliseconds
  
  return (now - keyTime) > twoMinutes;
}

// Rate limiting storage (in production, use Redis or database)
interface RateLimitEntry {
  attempts: number;
  lastAttempt: number;
  isBlocked: boolean;
  blockUntil: number;
  fingerprint: string;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Check rate limit
export function checkRateLimit(fingerprint: string): { allowed: boolean; attempts: number; timeRemaining: number } {
  const entry = rateLimitStore.get(fingerprint);
  const now = Date.now();
  
  if (!entry) {
    return { allowed: true, attempts: 0, timeRemaining: 0 };
  }
  
  // Check if block period has expired
  if (entry.isBlocked && now > entry.blockUntil) {
    rateLimitStore.delete(fingerprint);
    return { allowed: true, attempts: 0, timeRemaining: 0 };
  }
  
  // If blocked, return remaining time
  if (entry.isBlocked) {
    return { 
      allowed: false, 
      attempts: entry.attempts, 
      timeRemaining: Math.ceil((entry.blockUntil - now) / 1000) 
    };
  }
  
  // Check if too many attempts
  if (entry.attempts >= 4) {
    entry.isBlocked = true;
    entry.blockUntil = now + (30 * 60 * 1000); // Block for 30 minutes
    rateLimitStore.set(fingerprint, entry);
    return { 
      allowed: false, 
      attempts: entry.attempts, 
      timeRemaining: Math.ceil((entry.blockUntil - now) / 1000) 
    };
  }
  
  return { allowed: true, attempts: entry.attempts, timeRemaining: 0 };
}

// Record failed attempt
export function recordFailedAttempt(fingerprint: string): void {
  const entry = rateLimitStore.get(fingerprint);
  const now = Date.now();
  
  if (entry) {
    entry.attempts += 1;
    entry.lastAttempt = now;
  } else {
    rateLimitStore.set(fingerprint, {
      attempts: 1,
      lastAttempt: now,
      isBlocked: false,
      blockUntil: 0,
      fingerprint
    });
  }
}

// Clear successful login
export function clearRateLimit(fingerprint: string): void {
  rateLimitStore.delete(fingerprint);
}

// Get client IP address
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (realIP) {
    return realIP;
  }
  
  return 'unknown';
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Advanced XSS payload patterns
const XSS_PATTERNS = [
  // Script tags and variants
  /<script[^>]*>.*?<\/script>/gi,
  /<script[^>]*>/gi,
  /<\/script>/gi,
  /javascript:/gi,
  /vbscript:/gi,
  /data:text\/html/gi,
  /data:application\/javascript/gi,
  
  // Event handlers
  /on\w+\s*=/gi,
  /onload\s*=/gi,
  /onerror\s*=/gi,
  /onclick\s*=/gi,
  /onmouseover\s*=/gi,
  /onfocus\s*=/gi,
  /onblur\s*=/gi,
  
  // HTML entities and encoding
  /&#x?[0-9a-fA-F]+;/g,
  /&lt;script/gi,
  /&gt;script/gi,
  
  // Expression and eval
  /expression\s*\(/gi,
  /eval\s*\(/gi,
  /setTimeout\s*\(/gi,
  /setInterval\s*\(/gi,
  
  // Iframe and object tags
  /<iframe[^>]*>/gi,
  /<\/iframe>/gi,
  /<object[^>]*>/gi,
  /<\/object>/gi,
  /<embed[^>]*>/gi,
  
  // CSS injection
  /<style[^>]*>.*?<\/style>/gi,
  /expression\s*\(/gi,
  
  // Advanced payloads
  /<img[^>]*src\s*=\s*["']?javascript:/gi,
  /<a[^>]*href\s*=\s*["']?javascript:/gi,
  /<form[^>]*action\s*=\s*["']?javascript:/gi,
  
  // Unicode and encoding bypasses
  /\u003cscript/gi,
  /\u003c\/script/gi,
  /%3Cscript/gi,
  /%3C\/script/gi,
  
  // SVG and XML
  /<svg[^>]*>/gi,
  /<\/svg>/gi,
  /<xml[^>]*>/gi,
  /<\/xml>/gi,
  
  // Advanced techniques
  /document\.cookie/gi,
  /document\.write/gi,
  /window\.location/gi,
  /document\.location/gi,
  /alert\s*\(/gi,
  /confirm\s*\(/gi,
  /prompt\s*\(/gi,
  
  // Template injection
  /\{\{.*\}\}/g,
  /\{%.*%\}/g,
  /\{#.*#\}/g,
  
  // Command injection
  /;.*$/g,
  /\|.*$/g,
  /`.*`/g,
  /\$\(.*\)/g,
  /\$\{.*\}/g
];

// SQL Injection patterns
const SQL_INJECTION_PATTERNS = [
  // Basic SQL injection
  /('|(\\')|(;)|(\-\-)|(\/\*)|(\*\/)|(\|)|(\+)|(\%)|(\_))/gi,
  /union\s+select/gi,
  /select\s+.*\s+from/gi,
  /insert\s+into/gi,
  /update\s+.*\s+set/gi,
  /delete\s+from/gi,
  /drop\s+table/gi,
  /drop\s+database/gi,
  /create\s+table/gi,
  /alter\s+table/gi,
  /truncate\s+table/gi,
  /exec\s*\(/gi,
  /execute\s*\(/gi,
  /sp_executesql/gi,
  
  // Time-based blind SQL injection
  /waitfor\s+delay/gi,
  /sleep\s*\(/gi,
  /benchmark\s*\(/gi,
  
  // Boolean-based blind SQL injection
  /and\s+1\s*=\s*1/gi,
  /and\s+1\s*=\s*2/gi,
  /or\s+1\s*=\s*1/gi,
  /or\s+1\s*=\s*2/gi,
  
  // Error-based SQL injection
  /extractvalue\s*\(/gi,
  /updatexml\s*\(/gi,
  /floor\s*\(/gi,
  /rand\s*\(/gi,
  /count\s*\(/gi,
  
  // Stacked queries
  /;\s*select/gi,
  /;\s*insert/gi,
  /;\s*update/gi,
  /;\s*delete/gi,
  /;\s*drop/gi,
  
  // Comment-based
  /\/\*.*\*\//g,
  /--.*$/g,
  /#.*$/g,
  
  // Function-based
  /char\s*\(/gi,
  /ascii\s*\(/gi,
  /substring\s*\(/gi,
  /concat\s*\(/gi,
  /length\s*\(/gi,
  /version\s*\(/gi,
  /database\s*\(/gi,
  /user\s*\(/gi,
  /current_user/gi,
  /system_user/gi,
  
  // Advanced techniques
  /information_schema/gi,
  /sys\.databases/gi,
  /sys\.tables/gi,
  /sys\.columns/gi,
  /pg_tables/gi,
  /pg_columns/gi,
  /mysql\.user/gi,
  /mysql\.db/gi,
  
  // NoSQL injection
  /\$where/gi,
  /\$ne/gi,
  /\$gt/gi,
  /\$lt/gi,
  /\$regex/gi,
  /\$exists/gi,
  /\$in/gi,
  /\$nin/gi,
  /\$or/gi,
  /\$and/gi,
  /\$not/gi,
  /\$nor/gi,
  /\$all/gi,
  /\$elemMatch/gi,
  /\$size/gi,
  /\$type/gi,
  /\$mod/gi,
  /\$text/gi,
  /\$search/gi,
  /\$geoWithin/gi,
  /\$geoIntersects/gi,
  /\$near/gi,
  /\$nearSphere/gi,
  /\$center/gi,
  /\$centerSphere/gi,
  /\$box/gi,
  /\$polygon/gi,
  /\$geometry/gi,
  /\$maxDistance/gi,
  /\$minDistance/gi,
  /\$slice/gi,
  /\$meta/gi,
  /\$comment/gi,
  /\$explain/gi,
  /\$hint/gi,
  /\$maxScan/gi,
  /\$maxTimeMS/gi,
  /\$orderby/gi,
  /\$returnKey/gi,
  /\$showDiskLoc/gi,
  /\$natural/gi,
  /\$query/gi,
  /\$readPreference/gi,
  /\$readConcern/gi,
  /\$writeConcern/gi,
  /\$collation/gi,
  /\$sample/gi,
  /\$bucket/gi,
  /\$bucketAuto/gi,
  /\$facet/gi,
  /\$group/gi,
  /\$match/gi,
  /\$project/gi,
  /\$sort/gi,
  /\$limit/gi,
  /\$skip/gi,
  /\$unwind/gi,
  /\$lookup/gi,
  /\$graphLookup/gi,
  /\$out/gi,
  /\$merge/gi,
  /\$replaceRoot/gi,
  /\$replaceWith/gi,
  /\$addFields/gi,
  /\$set/gi,
  /\$unset/gi,
  /\$inc/gi,
  /\$mul/gi,
  /\$rename/gi,
  /\$min/gi,
  /\$max/gi,
  /\$push/gi,
  /\$pull/gi,
  /\$pullAll/gi,
  /\$pop/gi,
  /\$shift/gi,
  /\$unshift/gi,
  /\$each/gi,
  /\$position/gi,
  /\$slice/gi,
  /\$sort/gi,
  /\$bit/gi,
  /\$currentDate/gi,
  /\$timestamp/gi,
  /\$isolated/gi,
  /\$atomic/gi,
  /\$upsert/gi,
  /\$multi/gi,
  /\$arrayFilters/gi,
  /\$hint/gi,
  /\$comment/gi,
  /\$explain/gi,
  /\$maxScan/gi,
  /\$maxTimeMS/gi,
  /\$orderby/gi,
  /\$returnKey/gi,
  /\$showDiskLoc/gi,
  /\$natural/gi,
  /\$query/gi,
  /\$readPreference/gi,
  /\$readConcern/gi,
  /\$writeConcern/gi,
  /\$collation/gi,
  /\$sample/gi,
  /\$bucket/gi,
  /\$bucketAuto/gi,
  /\$facet/gi,
  /\$group/gi,
  /\$match/gi,
  /\$project/gi,
  /\$sort/gi,
  /\$limit/gi,
  /\$skip/gi,
  /\$unwind/gi,
  /\$lookup/gi,
  /\$graphLookup/gi,
  /\$out/gi,
  /\$merge/gi,
  /\$replaceRoot/gi,
  /\$replaceWith/gi,
  /\$addFields/gi,
  /\$set/gi,
  /\$unset/gi,
  /\$inc/gi,
  /\$mul/gi,
  /\$rename/gi,
  /\$min/gi,
  /\$max/gi,
  /\$push/gi,
  /\$pull/gi,
  /\$pullAll/gi,
  /\$pop/gi,
  /\$shift/gi,
  /\$unshift/gi,
  /\$each/gi,
  /\$position/gi,
  /\$slice/gi,
  /\$sort/gi,
  /\$bit/gi,
  /\$currentDate/gi,
  /\$timestamp/gi,
  /\$isolated/gi,
  /\$atomic/gi,
  /\$upsert/gi,
  /\$multi/gi,
  /\$arrayFilters/gi
];

// IP ban storage (in production, use Redis or database)
const bannedIPs = new Set<string>();
const suspiciousIPs = new Map<string, { attempts: number; lastAttempt: number }>();

// Check if IP is banned
export function isIPBanned(ip: string): boolean {
  return bannedIPs.has(ip);
}

// Ban IP address
export function banIP(ip: string, reason: string): void {
  bannedIPs.add(ip);
  console.warn(`IP BANNED: ${ip} - Reason: ${reason}`);
  
  // Log to security system (in production, send to security monitoring)
  logSecurityEvent('IP_BANNED', {
    ip,
    reason,
    timestamp: new Date().toISOString()
  });
}

// Check for suspicious activity
export function checkSuspiciousActivity(ip: string): boolean {
  const suspicious = suspiciousIPs.get(ip);
  if (!suspicious) return false;
  
  const now = Date.now();
  const timeDiff = now - suspicious.lastAttempt;
  
  // If more than 5 attempts in 10 minutes, consider suspicious
  if (suspicious.attempts >= 5 && timeDiff < 10 * 60 * 1000) {
    return true;
  }
  
  return false;
}

// Record suspicious activity
export function recordSuspiciousActivity(ip: string, reason: string): void {
  const now = Date.now();
  const suspicious = suspiciousIPs.get(ip);
  
  if (suspicious) {
    suspicious.attempts += 1;
    suspicious.lastAttempt = now;
  } else {
    suspiciousIPs.set(ip, {
      attempts: 1,
      lastAttempt: now
    });
  }
  
  // Auto-ban if too many suspicious activities
  if (suspicious && suspicious.attempts >= 10) {
    banIP(ip, `Multiple suspicious activities: ${reason}`);
  }
  
  logSecurityEvent('SUSPICIOUS_ACTIVITY', {
    ip,
    reason,
    attempts: suspicious?.attempts || 1,
    timestamp: new Date().toISOString()
  });
}

// Advanced XSS detection
export function detectXSS(input: string): { isXSS: boolean; payload: string; severity: 'low' | 'medium' | 'high' | 'critical' } {
  let maxSeverity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  let detectedPayload = '';
  
  for (const pattern of XSS_PATTERNS) {
    const matches = input.match(pattern);
    if (matches) {
      detectedPayload = matches[0];
      
      // Determine severity
      if (pattern.source.includes('script') || pattern.source.includes('javascript')) {
        maxSeverity = 'critical';
      } else if (pattern.source.includes('on\\w+') || pattern.source.includes('eval')) {
        maxSeverity = 'high';
      } else if (pattern.source.includes('expression') || pattern.source.includes('iframe')) {
        maxSeverity = 'medium';
      } else {
        maxSeverity = 'low';
      }
    }
  }
  
  return {
    isXSS: detectedPayload !== '',
    payload: detectedPayload,
    severity: maxSeverity
  };
}

// Advanced SQL injection detection
export function detectSQLInjection(input: string): { isSQLInjection: boolean; payload: string; severity: 'low' | 'medium' | 'high' | 'critical' } {
  let maxSeverity: 'low' | 'medium' | 'high' | 'critical' = 'low';
  let detectedPayload = '';
  
  for (const pattern of SQL_INJECTION_PATTERNS) {
    const matches = input.match(pattern);
    if (matches) {
      detectedPayload = matches[0];
      
      // Determine severity
      if (pattern.source.includes('union') || pattern.source.includes('drop') || pattern.source.includes('exec')) {
        maxSeverity = 'critical';
      } else if (pattern.source.includes('select') || pattern.source.includes('insert') || pattern.source.includes('update')) {
        maxSeverity = 'high';
      } else if (pattern.source.includes('and') || pattern.source.includes('or') || pattern.source.includes('--')) {
        maxSeverity = 'medium';
      } else {
        maxSeverity = 'low';
      }
    }
  }
  
  return {
    isSQLInjection: detectedPayload !== '',
    payload: detectedPayload,
    severity: maxSeverity
  };
}

// Comprehensive security scan
export function scanForThreats(input: string): { 
  isThreat: boolean; 
  threats: Array<{ type: 'XSS' | 'SQL_INJECTION'; payload: string; severity: string }>;
  shouldBan: boolean;
} {
  const threats: Array<{ type: 'XSS' | 'SQL_INJECTION'; payload: string; severity: string }> = [];
  let shouldBan = false;
  
  // Check for XSS
  const xssResult = detectXSS(input);
  if (xssResult.isXSS) {
    threats.push({
      type: 'XSS',
      payload: xssResult.payload,
      severity: xssResult.severity
    });
    
    if (xssResult.severity === 'critical' || xssResult.severity === 'high') {
      shouldBan = true;
    }
  }
  
  // Check for SQL injection
  const sqlResult = detectSQLInjection(input);
  if (sqlResult.isSQLInjection) {
    threats.push({
      type: 'SQL_INJECTION',
      payload: sqlResult.payload,
      severity: sqlResult.severity
    });
    
    if (sqlResult.severity === 'critical' || sqlResult.severity === 'high') {
      shouldBan = true;
    }
  }
  
  return {
    isThreat: threats.length > 0,
    threats,
    shouldBan
  };
}

// Enhanced sanitization
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  // First, scan for threats
  const threatScan = scanForThreats(input);
  if (threatScan.isThreat) {
    // Log the threat attempt
    logSecurityEvent('THREAT_DETECTED', {
      input: input.substring(0, 100), // Log first 100 chars
      threats: threatScan.threats,
      timestamp: new Date().toISOString()
    });
    
    // Return empty string for malicious input
    return '';
  }
  
  // Basic sanitization for legitimate input
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/['"]/g, '') // Remove quotes
    .replace(/[;|&$`]/g, '') // Remove command injection chars
    .trim();
}

// Sanitize username specifically (less aggressive sanitization)
export function sanitizeUsername(input: string): string {
  if (!input || typeof input !== 'string') return '';
  
  // First, scan for threats
  const threatScan = scanForThreats(input);
  if (threatScan.isThreat) {
    // Log the threat attempt
    logSecurityEvent('THREAT_DETECTED', {
      input: input.substring(0, 100), // Log first 100 chars
      threats: threatScan.threats,
      timestamp: new Date().toISOString()
    });
    
    // Return empty string for malicious input
    return '';
  }
  
  // Light sanitization for usernames (preserve quotes and common characters)
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .replace(/[;|&$`]/g, '') // Remove command injection chars
    .trim();
}

// Security event logging
export function logSecurityEvent(eventType: string, data: Record<string, unknown>): void {
  console.warn(`SECURITY_EVENT: ${eventType}`, {
    timestamp: new Date().toISOString(),
    event: eventType,
    data
  });
  
  // In production, send to security monitoring system
  // Example: sendToSecurityMonitoring(eventType, data);
}
