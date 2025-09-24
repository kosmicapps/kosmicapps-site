'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Send, CheckCircle, AlertCircle, Bot, Zap, Target, Users, ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import { analytics } from '@/lib/analytics';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function PressPage() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    outlet: '',
    message: '',
    honeypot: '' // Bot deterrent
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');

    // Check honeypot
    if (formData.honeypot) {
      setFormState('error');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          outlet: formData.outlet,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormState('success');
        analytics.submitPressForm();
        setFormData({ name: '', email: '', outlet: '', message: '', honeypot: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo/5 via-pink/5 to-cyan/5"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo/10 via-transparent to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo/10 to-pink/10 px-6 py-3 rounded-full mb-8 border border-indigo/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Mail className="w-5 h-5 text-indigo" />
              <span className="text-indigo font-medium">Press & Media</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-poppins font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-black">
                Press & Contact
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Let's tell our story.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Kosmic Apps is the indie studio building AI-powered accessibility tools for neurodivergent users. We create 
              focused, intuitive utilities that empower people to thrive in their daily lives.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Fast Facts */}
      <Section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
              Fast Facts
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Key information about our studio and approach
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-3">
                  AI-powered studio
                </h3>
                <p className="text-gray-700 text-sm">
                  One founder with a full AI team
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-3">
                  1+1+1 product rule
                </h3>
                <p className="text-gray-700 text-sm">
                  One problem, one solution, one focus
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-3">
                  Market-driven pricing
                </h3>
                <p className="text-gray-700 text-sm">
                  Pricing that reflects real value
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-3">
                  Indie vibe
                </h3>
                <p className="text-gray-700 text-sm">
                  Authentic, personal approach
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#"
              className="bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo px-10 py-4 rounded-full font-medium hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-3 text-lg border-2 border-indigo/30 hover:border-indigo/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="w-5 h-5" />
              <span>Download Press Kit (zip)</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </div>
      </Section>

      {/* Contact Form */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
              Send us a message
            </h2>
            <p className="text-xl text-gray-800 max-w-2xl mx-auto">
              Get in touch for press inquiries, partnerships, or just to say hello
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
          >
            {formState === 'success' && (
              <motion.div 
                className="bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl mb-8 flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-medium">Thanks for your message! We'll get back to you soon.</span>
              </motion.div>
            )}

            {formState === 'error' && (
              <motion.div 
                className="bg-red-50 border border-red-200 text-red-800 px-6 py-4 rounded-2xl mb-8 flex items-center space-x-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <AlertCircle className="w-6 h-6 text-red-600" />
                <span className="font-medium">Sorry, there was an error sending your message. Please try again.</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo focus:border-transparent transition-all duration-200 text-lg"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo focus:border-transparent transition-all duration-200 text-lg"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="outlet" className="block text-sm font-medium text-gray-700 mb-3">
                  Outlet / Organization
                </label>
                <input
                  type="text"
                  id="outlet"
                  name="outlet"
                  value={formData.outlet}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo focus:border-transparent transition-all duration-200 text-lg"
                  placeholder="Your company or publication"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-3">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo focus:border-transparent transition-all duration-200 text-lg resize-none"
                  placeholder="Tell us about your inquiry..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={formState === 'submitting'}
                className="w-full bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo px-8 py-4 rounded-2xl font-medium hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg flex items-center justify-center space-x-3 border-2 border-indigo/30 hover:border-indigo/50"
                whileHover={{ scale: formState === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: formState === 'submitting' ? 1 : 0.98 }}
              >
                {formState === 'submitting' ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send inquiry</span>
                  </>
                )}
              </motion.button>
            </form>

            <motion.div 
              className="mt-12 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full">
                <Mail className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800">
                  Or email{' '}
                  <a 
                    href="mailto:hello@kosmicapps.com" 
                    className="text-indigo hover:text-pink transition-colors duration-200 font-medium"
                  >
                    hello@kosmicapps.com
                  </a>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
