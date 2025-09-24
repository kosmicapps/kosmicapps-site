'use client';

import Link from 'next/link';
import { useState } from 'react';
import { analytics } from '@/lib/analytics';

export default function SiteNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleCtaClick = () => {
    analytics.clickCtaHome();
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="w-8 h-8 rounded-full bg-indigo-600 shadow-lg border-2 border-indigo-400 flex items-center justify-center relative">
              <div className="w-6 h-6 rounded-full bg-pink-500"></div>
              <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full"></div>
              <div className="absolute bottom-2 right-1 w-0.5 h-0.5 bg-white rounded-full"></div>
            </div>
            <span className="font-poppins font-semibold text-xl text-deep-space">Kosmic</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/apps" 
              className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            >
              Apps
            </Link>
            <Link 
              href="/story" 
              className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            >
              Story
            </Link>
            <Link 
              href="/about" 
              className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            >
              About
            </Link>
            <Link 
              href="/press" 
              className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            >
              Press/Contact
            </Link>
            <Link 
              href="/apps" 
              onClick={handleCtaClick}
              className="gradient-cta text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            >
              Explore tools
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo focus:outline-none focus:ring-2 focus:ring-indigo"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/apps" 
                className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 px-4 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Apps
              </Link>
              <Link 
                href="/story" 
                className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 px-4 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Story
              </Link>
              <Link 
                href="/about" 
                className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 px-4 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/press" 
                className="nav-link text-gray-700 hover:text-indigo transition-colors duration-200 px-4 py-2 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
                onClick={() => setIsMenuOpen(false)}
              >
                Press/Contact
              </Link>
              <Link 
                href="/apps" 
                onClick={() => {
                  handleCtaClick();
                  setIsMenuOpen(false);
                }}
                className="gradient-cta text-white px-6 py-3 rounded-full font-medium text-center mx-4 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
              >
                Explore tools
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
