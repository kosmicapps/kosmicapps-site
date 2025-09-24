'use client';

import { motion } from 'framer-motion';
import { Shield, FileText, Lock, Eye, Users, Mail, AlertCircle, CheckCircle, Clock, Globe } from 'lucide-react';
import Section from '@/components/Section';

export default function LegalPage() {
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
              <Shield className="w-5 h-5 text-indigo" />
              <span className="text-indigo font-medium">Legal & Privacy</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl font-poppins font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-black">
                Legal Information
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                Transparency & Trust
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Your privacy and trust are fundamental to everything we do. Here's how we protect your data and what you can expect from us.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Privacy Policy Section */}
      <Section className="bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 id="privacy" className="text-4xl md:text-5xl font-poppins font-bold text-deep-space">
                  Privacy Policy
                </h2>
                <p className="text-xl text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <motion.div
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">What We Collect</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>App usage data to improve functionality</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>Crash reports to fix bugs and issues</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>Anonymous analytics for app performance</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">What We Don't Do</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>We never sell your personal data</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>We don't track you across other websites</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>We don't share data with third parties</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div className="space-y-8">
                <motion.div
                  className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Eye className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">Your Rights</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span>Access your data anytime</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span>Request data deletion</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span>Opt out of analytics</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span>Export your data</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-8 border border-orange-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="w-6 h-6 text-orange-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">Contact Us</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Have questions about your privacy? We're here to help.
                  </p>
                  <a 
                    href="mailto:privacy@kosmicapps.com" 
                    className="inline-flex items-center text-indigo hover:text-pink transition-colors duration-200 font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    privacy@kosmicapps.com
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Terms of Service Section */}
      <Section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 id="terms" className="text-4xl md:text-5xl font-poppins font-bold text-deep-space">
                  Terms of Service
                </h2>
                <p className="text-xl text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <motion.div
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-3xl p-8 border border-indigo-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Users className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">Acceptable Use</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <span>Use our apps for their intended purpose</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <span>Respect other users and our community</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <span>Don't attempt to reverse engineer our apps</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <span>Follow all applicable laws and regulations</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl p-8 border border-red-100"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-red-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">Prohibited Activities</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>Harassment or abuse of other users</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>Sharing illegal or harmful content</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                      <span>Attempting to hack or compromise our systems</span>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div className="space-y-8">
                <motion.div
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Clock className="w-6 h-6 text-green-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">Service Availability</h3>
                  </div>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>We strive for 99.9% uptime</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>Scheduled maintenance with advance notice</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <span>Regular updates and improvements</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8 border border-cyan-100"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-6 h-6 text-cyan-600" />
                    <h3 className="text-xl font-poppins font-bold text-deep-space">Updates & Changes</h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    We may update these terms to reflect changes in our services or legal requirements.
                  </p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                      <span>We'll notify you of significant changes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2"></div>
                      <span>Continued use constitutes acceptance</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Contact Section */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-indigo/10 to-pink/10 rounded-3xl mx-auto mb-6 flex items-center justify-center border-2 border-indigo/20">
              <Mail className="w-10 h-10 text-indigo" />
            </div>
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-deep-space mb-6">
              Questions About Our Policies?
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              We're committed to transparency and are happy to answer any questions you have about our privacy practices or terms of service.
            </p>
            <a 
              href="mailto:legal@kosmicapps.com" 
              className="inline-flex items-center bg-gradient-to-r from-indigo to-pink text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-200"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Legal Team
            </a>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
