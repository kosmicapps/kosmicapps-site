'use client';

import { useEffect, use, useState } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Clock, Zap, Wrench, Sparkles, CheckCircle, Star, Info, HelpCircle, Shield } from 'lucide-react';
import Section from '@/components/Section';
import AppJsonLd from '@/components/AppJsonLd';
import { getAppBySlug } from '@/data/apps';
import { analytics } from '@/lib/analytics';

interface AppDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function AppDetailPage({ params }: AppDetailPageProps) {
  const { slug } = use(params);
  const app = getAppBySlug(slug);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (app) {
      analytics.viewAppDetail(app.slug);
    }
  }, [app]);

  if (!app) {
    notFound();
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Info },
    { id: 'features', label: 'Features', icon: CheckCircle },
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen">
      <AppJsonLd app={app} />
      
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
            {/* App Icon with enhanced styling */}
            <motion.div 
              className="w-24 h-24 bg-gradient-to-br from-indigo via-pink to-cyan rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-gray-800 font-bold text-3xl">
                {app.name.charAt(0)}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {app.name}
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {app.hook}
            </motion.p>

            <motion.div 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="inline-block bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo px-6 py-3 rounded-full text-lg font-medium border border-indigo/20">
                {app.model}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {app.availability === 'available' && app.appStoreUrl ? (
                <motion.a
                  href={app.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo px-10 py-4 rounded-full font-medium hover:shadow-xl transition-all duration-300 inline-flex items-center justify-center space-x-3 text-lg border-2 border-indigo/30 hover:border-indigo/50 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-5 h-5" />
                  <span>Download Now</span>
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              ) : app.availability === 'coming-soon' ? (
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600 px-10 py-4 rounded-full font-medium inline-flex items-center justify-center space-x-3 text-lg border border-orange-200">
                  <Clock className="w-5 h-5" />
                  <span>Coming Soon</span>
                </div>
              ) : app.availability === 'pre-beta' ? (
                <div className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-600 px-10 py-4 rounded-full font-medium inline-flex items-center justify-center space-x-3 text-lg border border-purple-200">
                  <Zap className="w-5 h-5" />
                  <span>Pre-Beta</span>
                </div>
              ) : (
                <div className="bg-gray-200 text-gray-800 px-10 py-4 rounded-full font-medium inline-flex items-center justify-center space-x-3 text-lg">
                  <Clock className="w-5 h-5" />
                  <span>App Store URL coming soon</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </Section>

      {/* Tab Navigation */}
      <Section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200
                    ${activeTab === tab.id 
                      ? 'bg-gradient-to-r from-indigo to-pink text-gray-800 shadow-lg font-bold' 
                      : 'text-gray-600 hover:text-indigo hover:bg-indigo/5'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </Section>

      {/* Tab Content */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-16">
                {/* Why you'll love it Section */}
                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                  >
                    <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
                      Why you'll love it
                    </h2>
                    <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                      Three pillars that make this tool essential for your daily routine
                    </p>
                  </motion.div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <motion.div 
                      className="text-center group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-indigo to-cyan rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Zap className="w-8 h-8 text-gray-800" />
                      </motion.div>
                      <h3 className="text-2xl font-poppins font-semibold text-deep-space mb-4">
                        Core
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {app.features131.core}
                      </p>
                    </motion.div>

                    <motion.div 
                      className="text-center group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-pink to-cyan rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Wrench className="w-8 h-8 text-gray-800" />
                      </motion.div>
                      <h3 className="text-2xl font-poppins font-semibold text-deep-space mb-4">
                        Support
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {app.features131.support}
                      </p>
                    </motion.div>

                    <motion.div 
                      className="text-center group"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-20 h-20 bg-gradient-to-br from-cyan to-indigo rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Sparkles className="w-8 h-8 text-gray-800" />
                      </motion.div>
                      <h3 className="text-2xl font-poppins font-semibold text-deep-space mb-4">
                        Delight
                      </h3>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {app.features131.delight}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* App Info Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    className="bg-gradient-to-br from-indigo/5 to-pink/5 rounded-3xl p-8 border border-indigo/20"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Shield className="w-6 h-6 text-indigo" />
                      <h3 className="text-xl font-poppins font-bold text-deep-space">Accessibility</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Built with neurodivergent users in mind. Every feature is designed to work with your brain, not against it.
                    </p>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-pink/5 to-cyan/5 rounded-3xl p-8 border border-pink/20"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <Star className="w-6 h-6 text-pink" />
                      <h3 className="text-xl font-poppins font-bold text-deep-space">Category</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      {app.category} • {app.model}
                    </p>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
                    Features
                  </h2>
                  <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                    Everything you need to succeed, built with accessibility in mind
                  </p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {app.features.map((feature, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 group border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div 
                        className="w-8 h-8 bg-gradient-to-br from-indigo to-pink rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <CheckCircle className="w-5 h-5 text-gray-800" />
                      </motion.div>
                      <p className="text-gray-700 text-lg leading-relaxed">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && app.faq && app.faq.length > 0 && (
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-poppins font-bold text-deep-space mb-6">
                    FAQ
                  </h2>
                  <p className="text-xl text-gray-800 max-w-2xl mx-auto">
                    Common questions about {app.name}
                  </p>
                </motion.div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  {app.faq.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-lg transition-all duration-300 group border border-gray-100"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-xl font-poppins font-semibold text-deep-space mb-4 group-hover:text-indigo transition-colors duration-300">
                        {item.question}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* No FAQ Content */}
            {activeTab === 'faq' && (!app.faq || app.faq.length === 0) && (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                  <HelpCircle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-deep-space mb-4">
                  No FAQ Available
                </h3>
                <p className="text-gray-600 text-lg">
                  We're working on adding frequently asked questions for {app.name}.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo via-pink to-cyan"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-800 mb-6 drop-shadow-lg">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-800/95 mb-10 max-w-2xl mx-auto drop-shadow-md">
              Join thousands of users who have already discovered the power of {app.name}
            </p>
            
            {app.availability === 'available' && app.appStoreUrl ? (
              <motion.a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-indigo px-10 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center space-x-3 text-lg shadow-xl focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                <span>Get it now</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            ) : app.availability === 'coming-soon' ? (
              <div className="bg-white/20 backdrop-blur-sm text-gray-800 px-10 py-4 rounded-full font-medium inline-flex items-center justify-center space-x-3 text-lg border border-white/30 shadow-lg">
                <Clock className="w-5 h-5" />
                <span>Coming Soon</span>
              </div>
            ) : app.availability === 'pre-beta' ? (
              <div className="bg-white/20 backdrop-blur-sm text-gray-800 px-10 py-4 rounded-full font-medium inline-flex items-center justify-center space-x-3 text-lg border border-white/30 shadow-lg">
                <Zap className="w-5 h-5" />
                <span>Pre-Beta</span>
              </div>
            ) : (
              <div className="bg-white/20 backdrop-blur-sm text-gray-800 px-10 py-4 rounded-full font-medium inline-flex items-center justify-center space-x-3 text-lg border border-white/30 shadow-lg">
                <Clock className="w-5 h-5" />
                <span>App Store URL coming soon</span>
              </div>
            )}
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
