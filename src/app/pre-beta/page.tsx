'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Users, Zap, CheckCircle } from 'lucide-react';
import { apps } from '@/data/apps';
import { useFormTracking } from '@/lib/form-tracking';

export default function PreBetaPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    socialMedia: '',
    appSelection: '',
    comments: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Initialize form tracking
  const { trackFieldFocus, trackFieldBlur, trackFormSubmit } = useFormTracking();

  // Get pre-beta apps
  const preBetaApps = apps.filter(app => app.availability === 'pre-beta');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFieldFocus = (fieldName: string) => {
    trackFieldFocus(fieldName, formData);
  };

  const handleFieldBlur = (fieldName: string) => {
    trackFieldBlur(fieldName, formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission attempt
    trackFormSubmit(formData);

    try {
      const response = await fetch('/api/pre-beta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        
        // Confirm signup in database after successful email send
        try {
          await fetch('/api/pre-beta/confirm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
        } catch (confirmError) {
          console.error('Error confirming signup:', confirmError);
          // Don't block the user flow if confirmation fails
        }
        
        // Redirect to thank you page after 2 seconds
        setTimeout(() => {
          window.location.href = '/pre-beta/thank-you';
        }, 2000);
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-deep-space via-indigo-900 to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h1 className="text-4xl font-poppins font-bold text-white mb-4">
            You're In! 🚀
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            Redirecting you to your confirmation...
          </p>
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-deep-space via-indigo-900 to-purple-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
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

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">Exclusive Pre-Beta Access</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-poppins font-bold mb-6">
              <span className="text-white">Get Early</span>
              <br />
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Access
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Be among the first to experience our revolutionary AI-powered tools. 
              Shape the future of accessibility technology.
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Early Access</h3>
                <p className="text-gray-400">Test features before public release</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Direct Feedback</h3>
                <p className="text-gray-400">Influence product development</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Exclusive Updates</h3>
                <p className="text-gray-400">Get insider news and updates</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="relative z-10 container mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-poppins font-bold text-white mb-4">
                Join the Pre-Beta
              </h2>
              <p className="text-gray-300">
                Help us build the future of accessible technology
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('name')}
                  onBlur={() => handleFieldBlur('name')}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('email')}
                  onBlur={() => handleFieldBlur('email')}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="your@email.com"
                />
              </div>

              {/* Social Media */}
              <div>
                <label htmlFor="socialMedia" className="block text-sm font-semibold text-white mb-2">
                  Social Media (Optional)
                </label>
                <input
                  type="text"
                  id="socialMedia"
                  name="socialMedia"
                  value={formData.socialMedia}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('socialMedia')}
                  onBlur={() => handleFieldBlur('socialMedia')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                  placeholder="@username or profile link"
                />
              </div>

              {/* App Selection */}
              <div>
                <label htmlFor="appSelection" className="block text-sm font-semibold text-white mb-2">
                  Which app interests you most? *
                </label>
                <select
                  id="appSelection"
                  name="appSelection"
                  value={formData.appSelection}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('appSelection')}
                  onBlur={() => handleFieldBlur('appSelection')}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="" className="bg-gray-800">Select an app</option>
                  {preBetaApps.map((app) => (
                    <option key={app.slug} value={app.slug} className="bg-gray-800">
                      {app.name} - {app.hook}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comments */}
              <div>
                <label htmlFor="comments" className="block text-sm font-semibold text-white mb-2">
                  Additional Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  onFocus={() => handleFieldFocus('comments')}
                  onBlur={() => handleFieldBlur('comments')}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us about your accessibility needs, what you're most excited about, or any questions you have..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-bold py-4 px-8 rounded-xl hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Joining Pre-Beta...</span>
                  </>
                ) : (
                  <>
                    <span>Join Pre-Beta</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              By joining, you agree to receive updates about the pre-beta program.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
