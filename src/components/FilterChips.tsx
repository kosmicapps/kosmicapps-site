'use client';

import { motion } from 'framer-motion';
import { analytics } from '@/lib/analytics';

interface FilterChipsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterChips({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: FilterChipsProps) {
  const handleCategoryClick = (category: string) => {
    analytics.filterCategory(category);
    onCategoryChange(category);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {categories.map((category, index) => (
        <motion.button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className={`
            px-6 py-3 rounded-full font-medium transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
            ${
              activeCategory === category
                ? 'bg-white text-indigo shadow-lg'
                : 'bg-white/20 text-gray-800 hover:bg-gray-200 border border-white/30'
            }
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category}
        </motion.button>
      ))}
    </div>
  );
}
