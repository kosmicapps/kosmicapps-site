'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Bot, TrendingUp, Sparkles, ArrowRight, Users, Shield, Heart, Star, CheckCircle, Clock, Target, Brain, Smartphone, Sparkle, Award, Globe } from 'lucide-react';
import Section from '@/components/Section';
import PrimaryCTA from '@/components/PrimaryCTA';
import AppCard from '@/components/AppCard';
import { apps } from '@/data/apps';
import { analytics } from '@/lib/analytics';

export default function Home() {
  useEffect(() => {
    analytics.viewHome();
  }, []);

  const featuredApps = apps.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section className="text-center gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full mb-8 border border-white/30"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Zap className="w-5 h-5 text-white" />
              <span className="text-white font-medium">AI-Powered Studio</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-poppins font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-white drop-shadow-lg">
                AI-powered accessibility tools.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/95 mb-8 leading-relaxed max-w-4xl mx-auto drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              One founder. A full AI-driven studio. We build lean, focused iOS utilities that empower neurodivergent users to thrive.
            </motion.p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <PrimaryCTA href="/apps" className="bg-white text-indigo hover:bg-gray-100">
                Explore our tools
                <ArrowRight className="ml-2 w-5 h-5" />
              </PrimaryCTA>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 floating">
          <Sparkles className="w-8 h-8 text-white/60" />
        </div>
        <div className="absolute top-40 right-20 floating" style={{ animationDelay: '2s' }}>
          <Sparkles className="w-6 h-6 text-white/50" />
        </div>
        <div className="absolute bottom-20 left-1/4 floating" style={{ animationDelay: '4s' }}>
          <Sparkles className="w-4 h-4 text-white/60" />
        </div>
      </Section>

      {/* Problem Statement Section */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
                The Problem We Solve
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Traditional productivity tools weren't built for neurodivergent minds. They're overwhelming, 
                rigid, and often make daily tasks harder instead of easier.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                We believe technology should work with your brain, not against it. That's why we're building 
                AI-powered tools designed specifically for neurodivergent users.
              </p>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-deep-space">Neurodivergent-First</h4>
                  <p className="text-gray-600 text-sm">Built by and for our community</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-deep-space mb-4">
                The Challenge
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Overwhelming interfaces</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Rigid, one-size-fits-all design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">Lack of personalization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-gray-700">No understanding of neurodivergent needs</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Our Solution Section */}
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
              Our Solution
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              AI-powered tools that adapt to your unique needs and work the way your brain works
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-4 text-center">
                  AI-Powered Intelligence
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Smart algorithms that learn your patterns and adapt to provide personalized support exactly when you need it.
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
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-4 text-center">
                  Accessibility-First Design
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Every interface is designed with neurodivergent users in mind. Clean, intuitive, and customizable to your needs.
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
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-4 text-center">
                  Community-Driven
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Built with and for the neurodivergent community. Every feature is tested with real users who understand the challenges.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-gradient-to-br from-indigo/5 to-pink/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
              Making a Difference
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Our impact in numbers and the community we're building
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-poppins font-bold text-indigo mb-2">4+</div>
              <div className="text-lg text-deep-space mb-2">Tools Built</div>
              <div className="text-gray-600">Focused solutions for specific needs</div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-poppins font-bold text-pink mb-2">100%</div>
              <div className="text-lg text-deep-space mb-2">Accessibility-First</div>
              <div className="text-gray-600">Designed for neurodivergent users</div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-poppins font-bold text-cyan mb-2">AI</div>
              <div className="text-lg text-deep-space mb-2">Powered</div>
              <div className="text-gray-600">Intelligent, adaptive experiences</div>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-poppins font-bold text-indigo mb-2">24/7</div>
              <div className="text-lg text-deep-space mb-2">AI Support</div>
              <div className="text-gray-600">Always learning and adapting</div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Featured Apps Section */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
              Featured Tools
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Discover our AI-powered accessibility tools designed for neurodivergent users
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredApps.map((app, index) => (
              <motion.div
                key={app.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AppCard app={app} isNewest={index === 0} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Community Section */}
      <Section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
                Join Our Community
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                We're building more than just apps—we're building a community of neurodivergent users, 
                advocates, and allies who believe in the power of accessible technology.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Every feature tested with real users</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Star className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Continuous improvement based on feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Community-driven development</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-indigo/5 to-pink/5 rounded-3xl p-8 border border-indigo/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-deep-space mb-4">
                Built with Love
              </h3>
              <p className="text-gray-700 mb-4">
                Every tool we build is designed with empathy, understanding, and a deep commitment 
                to making technology work for everyone.
              </p>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Globe className="w-4 h-4" />
                <span>Accessibility-first design</span>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h2 
            className="text-4xl md:text-5xl font-poppins font-bold text-white mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to transform your productivity?
          </motion.h2>
          <motion.p 
            className="text-xl text-white/95 mb-8 leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join the community of neurodivergent users who have discovered tools that actually work with their brains.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <PrimaryCTA href="/apps" className="bg-white text-indigo hover:bg-gray-100">
              Explore our tools
              <ArrowRight className="ml-2 w-5 h-5" />
            </PrimaryCTA>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}