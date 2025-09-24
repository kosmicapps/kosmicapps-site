'use client';

import { motion } from 'framer-motion';
import { Rocket, Lightbulb, Target, Heart, Zap, Shield, ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import PrimaryCTA from '@/components/PrimaryCTA';

export default function StoryPage() {
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
              <Rocket className="w-5 h-5 text-indigo" />
              <span className="text-indigo font-medium">Our Journey</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-poppins font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-black">
                The Kosmic Story
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                From struggle to success.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              From SaaS complexity to the mission of building accessible, empowering tools.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* The Problem Section */}
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
                The Breaking Point
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                For a time, I believed SaaS was the ultimate path. Build the next big platform, stack features, 
                engineer systems that could scale. But after investing over 149 hours into Obedify as a SaaS project, 
                I reached a breaking point.
              </p>
              <p className="text-gray-700 leading-relaxed">
                That moment came while wrestling with something as simple as cross-site messages and an invitation 
                system for dynamics. The complexity was overwhelming, the planning felt endless, and I realized: 
                this wasn't the work I wanted to keep doing.
              </p>
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
                149 Hours of Struggle
              </h3>
              <p className="text-gray-700">
                Those hours were a blur of victories and defeats, but they taught me a valuable lesson: 
                the power of agentic, contextual prompts.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* The Discovery Section */}
      <Section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="bg-gradient-to-br from-indigo-50 to-cyan-50 rounded-3xl p-8 border border-indigo-100"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-deep-space mb-4">
                The AI Breakthrough
              </h3>
              <p className="text-gray-700">
                Instead of writing to AI casually, I began building structured frameworks that worked like teammates. 
                That small shift changed everything.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
                The Spark
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                "I wonder if GPT can do this…"
              </p>
              <p className="text-gray-700 leading-relaxed">
                At first, the vision was modest: a handful of agents to guide me through business logic, finances, 
                and structure. But the ideas kept coming. Soon, I had built an entire AI-powered team that now 
                operates Kosmic like a real studio.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* The Realization Section */}
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
                The Realization
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                That was when I discovered what I truly wanted: apps.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Unlike SaaS, apps feel alive. They can be molded and remolded in real time, tested instantly, 
                and refined based on what the user actually sees and experiences. Apps gave me freedom. They gave 
                me fun. They gave me the ability to build something personal in a saturated market, something 
                different from what had come before.
              </p>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-pink-50 to-cyan-50 rounded-3xl p-8 border border-pink-100"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-poppins font-bold text-deep-space mb-4">
                Born from Passion
              </h3>
              <p className="text-gray-700">
                This realization gave birth to Kosmic Apps. A mobile application development studio committed 
                to one principle: put the user first.
              </p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* The Vision Section */}
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
              The Vision
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              Looking forward to what we're building together
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
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
                <h3 className="text-2xl font-poppins font-bold text-deep-space mb-6 text-center">
                  Year 1
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Launch at least 7 apps across diverse categories</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Build a playful and versatile portfolio</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Rocket className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Prove the AI-powered indie model</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Establish user-first development principles</span>
                  </div>
                </div>
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
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-deep-space mb-6 text-center">
                  Year 5
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Heart className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Grow into a full-time studio</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-cyan-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Powered by creativity and discipline</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-indigo-600 to-pink-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Target className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">AI agents that make it lean</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">Continue building personal, different apps</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Closing Section */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo/10 to-pink/10 rounded-3xl mx-auto mb-6 flex items-center justify-center border-2 border-indigo/20">
              <Heart className="w-10 h-10 text-indigo" />
            </div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-deep-space mb-6">
              The Journey Continues
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Looking back, those 149 hours were not wasted. They were a stepping stone — the tuition I paid to earn 
              clarity. They gave me the mindset, the frameworks, and the breakthrough that Kosmic Apps stands on today.
            </p>
            <p className="text-2xl text-gray-800 italic font-medium">
              If there's one feeling I want this story to leave you with, it's simple: inspired.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center bg-gradient-to-r from-indigo to-pink">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-800 mb-6">
            Explore what we're building
          </h2>
          <PrimaryCTA href="/apps" className="bg-white text-indigo hover:bg-gray-100">
            Explore our tools
          </PrimaryCTA>
        </div>
      </Section>
    </div>
  );
}
