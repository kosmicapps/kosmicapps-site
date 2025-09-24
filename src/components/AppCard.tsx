'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, ExternalLink, Clock, Zap } from 'lucide-react';
import { App } from '@/data/apps';
import { analytics } from '@/lib/analytics';

interface AppCardProps {
  app: App;
  isNewest?: boolean;
}

export default function AppCard({ app, isNewest = false }: AppCardProps) {
  const handleDownloadClick = () => {
    analytics.clickAppDownload(app.slug);
  };

  const handleDetailsClick = () => {
    analytics.viewAppDetail(app.slug);
  };

  // Determine tag content and styling based on app status
  const getTagInfo = () => {
    // Priority: New > Status
    if (isNewest) {
      return { text: 'New', className: 'bg-gradient-to-r from-pink-500 to-cyan-500 text-white' };
    }
    
    switch (app.availability) {
      case 'pre-beta':
        return { text: 'Pre-Beta', className: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' };
      case 'coming-soon':
        return { text: 'Coming Soon', className: 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white' };
      case 'available':
        return { text: 'Available', className: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' };
      default:
        return null;
    }
  };

  const tagInfo = getTagInfo();

  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md p-5 interactive-card group border border-gray-200 hover:border-indigo/30 hover:shadow-xl relative"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Status Tag */}
      {tagInfo && (
        <motion.div
          className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 ${tagInfo.className}`}
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          {tagInfo.text}
        </motion.div>
      )}
      {/* App Icon */}
      <div className="flex items-center space-x-3 mb-4">
        <motion.div 
          className="w-12 h-12 bg-gradient-to-br from-indigo/10 to-pink/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-md border border-indigo/20"
          whileHover={{ rotate: 5 }}
        >
          <span className="text-indigo font-bold text-lg">
            {app.name.charAt(0)}
          </span>
        </motion.div>
        <div className="flex-1 min-w-0">
          <h3 className="font-poppins font-bold text-base text-deep-space mb-1 truncate">
            {app.name}
          </h3>
          <p className="text-xs text-gray-700 font-medium">{app.model}</p>
        </div>
      </div>

      {/* Hook */}
      <p className="text-gray-800 mb-3 leading-relaxed text-sm line-clamp-2">
        {app.hook}
      </p>

      {/* Category */}
      <div className="mb-4">
        <span className="inline-block bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo px-2.5 py-1 rounded-full text-xs font-semibold border border-indigo/20">
          {app.category}
        </span>
      </div>

      {/* Actions */}
      <div className="flex flex-col space-y-2">
        {app.availability === 'available' && app.appStoreUrl ? (
          <motion.a
            href={app.appStoreUrl}
            onClick={handleDownloadClick}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-indigo/10 to-indigo/20 text-indigo px-3 py-2.5 rounded-lg font-semibold text-center hover:from-indigo/20 hover:to-indigo/30 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg border border-indigo/30 hover:border-indigo/50 text-sm focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </motion.a>
        ) : app.availability === 'coming-soon' ? (
          <button
            disabled
            className="w-full bg-gradient-to-r from-orange-50 to-yellow-50 text-orange-700 px-3 py-2.5 rounded-lg font-semibold text-center cursor-not-allowed flex items-center justify-center space-x-2 border border-orange-200 shadow-md text-sm"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Coming Soon</span>
          </button>
        ) : app.availability === 'pre-beta' ? (
          <motion.a
            href="/pre-beta"
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 py-2.5 rounded-lg font-semibold text-center hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg text-sm focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Join Pre-Beta</span>
          </motion.a>
        ) : (
          <button
            disabled
            className="w-full bg-gray-100 text-gray-600 px-3 py-2.5 rounded-lg font-semibold text-center cursor-not-allowed flex items-center justify-center space-x-2 border border-gray-200 shadow-md text-sm"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>App Store URL coming soon</span>
          </button>
        )}
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href={`/apps/${app.slug}`}
            onClick={handleDetailsClick}
            className="w-full border border-indigo text-indigo px-3 py-2.5 rounded-lg font-semibold text-center hover:bg-indigo/10 hover:text-indigo transition-all duration-300 flex items-center justify-center space-x-2 group shadow-md hover:shadow-lg text-sm focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0"
          >
            <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200" />
            <span>Details</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
