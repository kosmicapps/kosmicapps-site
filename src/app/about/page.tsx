'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Zap, Rocket, Heart, Shield } from 'lucide-react';
import Section from '@/components/Section';
import PrimaryCTA from '@/components/PrimaryCTA';

export default function AboutPage() {
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
              <Heart className="w-5 h-5 text-indigo" />
              <span className="text-indigo font-medium">Accessibility-First Mission</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-poppins font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-black">
                Indie studio.
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Accessibility-first mission.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              One founder, a full AI team, and a commitment to empowering neurodivergent users through technology.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Mission Section */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-800 max-w-4xl mx-auto leading-relaxed">
              We believe technology should work with your brain, not against it. Our mission is to create 
              AI-powered tools that empower neurodivergent users to thrive in their daily lives.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-poppins font-bold text-deep-space mb-4">
                Accessibility-First Design
              </h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Every tool we build starts with accessibility. We work directly with neurodivergent users 
                to understand their challenges and design solutions that truly work for their unique needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Clean, intuitive interfaces</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Heart className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Customizable to individual needs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-700">Tested with real users</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-indigo/5 to-pink/5 rounded-3xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo to-cyan rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-poppins font-bold text-deep-space mb-4">
                Focused Impact
              </h4>
              <p className="text-gray-700">
                We don&apos;t build everything for everyone. We build specific tools for specific needs, 
                ensuring each solution is genuinely helpful and well-crafted.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Approach Section */}
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
              Our Approach
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Four core principles that guide everything we build
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
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-4 text-center">
                  Focused
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  One problem, one solution. No feature bloat, just tools that work.
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
                  Empathetic
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Built with neurodivergent users at the center of every decision.
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
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-4 text-center">
                  Intelligent
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  AI-powered features that adapt to individual needs and preferences.
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
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-poppins font-bold text-deep-space mb-4 text-center">
                  Private
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  Your data stays yours. Privacy and security are non-negotiable.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Story Section */}
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
                Our Story
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Kosmic Apps was born from a simple realization: the best technology should work 
                with your brain, not against it. As a neurodivergent founder, I experienced 
                firsthand the gap between what exists and what we actually need.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                With AI as our co-pilot, we&apos;re building the future of accessible technology—one 
                focused tool at a time. Every app we ship is designed to solve real problems 
                for real people.
              </p>
            <Link
              href="/story"
              className="inline-flex items-center text-indigo hover:text-pink transition-colors duration-200 font-medium focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            >
              Read our full story →
            </Link>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-indigo/5 to-pink/5 rounded-3xl p-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink to-cyan rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-poppins font-bold text-deep-space mb-4">
                The Vision
              </h4>
              <p className="text-gray-700 mb-4">
                We&apos;re proving that a single founder with the right AI tools can create 
                meaningful impact in accessibility technology.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Target className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">Year 1: Core tools launched</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                    <Rocket className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-gray-600">Year 5: Industry standard</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center bg-gradient-to-r from-indigo to-pink">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-800 mb-6">
            Explore our tools
          </h2>
          <PrimaryCTA href="/apps" className="bg-white text-indigo hover:bg-gray-100">
            Explore our tools
          </PrimaryCTA>
        </div>
      </Section>
    </div>
  );
}
