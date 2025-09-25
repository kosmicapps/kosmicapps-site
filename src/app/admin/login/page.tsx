'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LoginFormData {
  username: string;
  email: string;
  accessKey: string;
}

interface RateLimitInfo {
  attempts: number;
  isBlocked: boolean;
  timeRemaining: number;
}

export default function AdminLogin() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    email: '',
    accessKey: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSendingKey, setIsSendingKey] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo>({
    attempts: 0,
    isBlocked: false,
    timeRemaining: 0
  });
  const router = useRouter();

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/check-auth');
        if (response.ok) {
          router.push('/admin/dashboard');
        }
      } catch (error) {
        // User not authenticated, stay on login page
      }
    };
    checkAuth();
  }, [router]);

  // Check rate limit status
  useEffect(() => {
    const checkRateLimit = async () => {
      try {
        const response = await fetch('/api/admin/rate-limit-status');
        if (response.ok) {
          const data = await response.json();
          setRateLimitInfo(data);
        }
      } catch (error) {
        console.error('Error checking rate limit:', error);
      }
    };
    checkRateLimit();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendKey = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingKey(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/send-access-key', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: 'Access key sent to your email! Check your inbox.',
          type: 'success'
        });
      } else {
        setMessage({
          text: data.error || 'Failed to send access key',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error sending access key:', error);
      setMessage({
        text: 'Something went wrong. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSendingKey(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          text: 'Login successful! Redirecting...',
          type: 'success'
        });
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1500);
      } else {
        setMessage({
          text: data.error || 'Invalid credentials',
          type: 'error'
        });
        // Update rate limit info
        if (data.rateLimitInfo) {
          setRateLimitInfo(data.rateLimitInfo);
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage({
        text: 'Something went wrong. Please try again.',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Countdown timer for rate limiting
  useEffect(() => {
    if (rateLimitInfo.timeRemaining > 0) {
      const timer = setInterval(() => {
        setRateLimitInfo(prev => ({
          ...prev,
          timeRemaining: Math.max(0, prev.timeRemaining - 1)
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [rateLimitInfo.timeRemaining]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-space via-indigo-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-poppins font-bold text-white mb-2">
              Admin Access
            </h1>
            <p className="text-gray-300">
              Secure login to admin dashboard
            </p>
          </div>

          {/* Rate Limit Warning */}
          {rateLimitInfo.isBlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-400 font-semibold">Access Temporarily Blocked</span>
              </div>
              <p className="text-red-300 text-sm">
                Too many failed attempts. Please wait {Math.ceil(rateLimitInfo.timeRemaining / 60)} minutes before trying again.
              </p>
            </motion.div>
          )}

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 mb-6 ${
                message.type === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30' 
                  : message.type === 'error'
                  ? 'bg-red-500/20 border border-red-500/30'
                  : 'bg-blue-500/20 border border-blue-500/30'
              }`}
            >
              <div className="flex items-center space-x-2">
                {message.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400" />}
                {message.type === 'error' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                {message.type === 'info' && <Mail className="w-5 h-5 text-blue-400" />}
                <span className={`text-sm ${
                  message.type === 'success' ? 'text-green-300' :
                  message.type === 'error' ? 'text-red-300' : 'text-blue-300'
                }`}>
                  {message.text}
                </span>
              </div>
            </motion.div>
          )}

          {/* Login Form */}
          <form className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-white mb-2">
                Username
              </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  disabled={rateLimitInfo.isBlocked}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your username"
                />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={rateLimitInfo.isBlocked}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your@email.com"
              />
            </div>

            {/* Access Key */}
            <div>
              <label htmlFor="accessKey" className="block text-sm font-semibold text-white mb-2">
                Access Key
              </label>
              <input
                type="text"
                id="accessKey"
                name="accessKey"
                value={formData.accessKey}
                onChange={handleInputChange}
                required
                disabled={rateLimitInfo.isBlocked}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter access key from email"
              />
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <motion.button
                type="button"
                onClick={handleSendKey}
                disabled={isSendingKey || rateLimitInfo.isBlocked || !formData.username || !formData.email}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSendingKey ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending Key...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    <span>Send Key</span>
                  </>
                )}
              </motion.button>

              <motion.button
                type="button"
                onClick={handleLogin}
                disabled={isLoading || rateLimitInfo.isBlocked || !formData.username || !formData.email || !formData.accessKey}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging In...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    <span>Login</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-xs">
              Access keys expire in 2 minutes for security
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
