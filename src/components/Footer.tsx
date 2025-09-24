import Link from 'next/link';

import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-deep-space to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-pink-600 shadow-lg flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-pink-500"></div>
              </div>
              <span className="font-poppins font-bold text-xl">Kosmic Apps</span>
            </div>
            <p className="text-white leading-relaxed">
              Building AI-powered accessibility tools for neurodivergent users. 
              Focused, intuitive utilities that empower people to thrive.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link 
                href="/apps" 
                className="footer-link block text-white hover:text-indigo focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-none focus:border-none"
              >
                Our Tools
              </Link>
              <Link 
                href="/about" 
                className="footer-link block text-white hover:text-indigo focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-none focus:border-none"
              >
                About Us
              </Link>
              <Link 
                href="/story" 
                className="footer-link block text-white hover:text-indigo focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-none focus:border-none"
              >
                Our Story
              </Link>
              <Link 
                href="/press" 
                className="footer-link block text-white hover:text-indigo focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-none focus:border-none"
              >
                Press
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h3 className="font-poppins font-semibold text-lg">Legal & Support</h3>
            <div className="space-y-2">
              <Link 
                href="/legal#privacy" 
                className="footer-link block text-white hover:text-indigo focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-none focus:border-none"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/legal#terms" 
                className="footer-link block text-white hover:text-indigo focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-none focus:border-none"
              >
                Terms of Service
              </Link>
              <a 
                href="mailto:hello@kosmicapps.com" 
                className="footer-link block text-white hover:text-indigo focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus:shadow-none focus:border-none"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-white">
              <span>© {currentYear} Kosmic Apps. Made with</span>
              <Heart className="w-4 h-4 text-pink-500" />
              <span>for accessibility.</span>
            </div>
            <div className="text-gray-200 text-sm">
              AI-powered indie studio
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
