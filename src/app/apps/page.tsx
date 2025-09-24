'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Sparkles, Grid, List, Filter, Zap, Heart, Brain, ChevronDown } from 'lucide-react';
import Section from '@/components/Section';
import AppCard from '@/components/AppCard';
import { apps } from '@/data/apps';
import { analytics } from '@/lib/analytics';

export default function AppsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filteredApps, setFilteredApps] = useState(apps);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  useEffect(() => {
    analytics.viewAppsIndex();
  }, []);

  // Define filter type
  type FilterType = {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    type: 'all' | 'category' | 'feature';
    keyword?: string;
  };

  // Generate all filters dynamically based on actual app data
  const generateFilters = (): FilterType[] => {
    const filters: FilterType[] = [];
    
    // Always include "All" filter
    filters.push({ id: 'All', label: 'All Tools', icon: Smartphone, type: 'all' });
    
    // Get unique categories from actual data
    const uniqueCategories = Array.from(new Set(apps.map(app => app.category)));
    uniqueCategories.forEach(category => {
      filters.push({ 
        id: category, 
        label: category, 
        icon: category === 'Organization' ? Brain : Heart, 
        type: 'category' 
      });
    });
    
    // Check for specific feature patterns and add filters
    const featureKeywords = [
      { keyword: 'ai', label: 'AI-Powered', icon: Zap },
      { keyword: 'agent', label: 'AI-Powered', icon: Zap },
      { keyword: 'smart', label: 'AI-Powered', icon: Zap },
      { keyword: 'accessibility', label: 'Accessibility', icon: Heart },
      { keyword: 'voice', label: 'Accessibility', icon: Heart },
      { keyword: 'haptic', label: 'Accessibility', icon: Heart },
      { keyword: 'neurodivergent', label: 'Neurodivergent', icon: Brain },
      { keyword: 'adhd', label: 'Neurodivergent', icon: Brain },
      { keyword: 'executive function', label: 'Neurodivergent', icon: Brain },
      { keyword: 'anxiety', label: 'Neurodivergent', icon: Brain }
    ];
    
    featureKeywords.forEach(({ keyword, label, icon }) => {
      const hasFeature = apps.some(app => 
        app.features.some(feature => 
          feature.toLowerCase().includes(keyword)
        )
      );
      
      if (hasFeature && !filters.some(f => f.label === label)) {
        filters.push({ 
          id: label.toLowerCase().replace(' ', '-'), 
          label, 
          icon, 
          type: 'feature',
          keyword 
        });
      }
    });
    
    return filters;
  };

  const allFilters = useMemo(() => generateFilters(), []);

  useEffect(() => {
    let filtered = apps;
    
    // Apply filter based on the selected filter type
    if (activeFilter !== 'All') {
      const selectedFilter = allFilters.find(f => f.id === activeFilter);
      if (selectedFilter) {
        filtered = filtered.filter(app => {
          switch (selectedFilter.type) {
            case 'category':
              return app.category === selectedFilter.label;
            case 'feature':
              return selectedFilter.keyword ? app.features.some(feature => 
                feature.toLowerCase().includes(selectedFilter.keyword as string)
              ) : false;
            default:
              return true;
          }
        });
      }
    }
    
    setFilteredApps(filtered);
  }, [activeFilter, allFilters]);

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
              <Sparkles className="w-5 h-5 text-indigo" />
              <span className="text-indigo font-medium">Accessibility Tools</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-poppins font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-black">
                Tools that make
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-700 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
                life easier.
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Simple, focused utilities built with neurodivergent users in mind. Each tool solves one problem really well.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      {/* Filter and Controls Section */}
      <Section className="bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-poppins font-bold text-deep-space mb-2">
                  Browse Our Collection
                </h2>
                <p className="text-gray-800">
                  {filteredApps.length} tool{filteredApps.length !== 1 ? 's' : ''} {activeFilter === 'All' ? 'available' : `in ${allFilters.find(f => f.id === activeFilter)?.label.toLowerCase() || 'selected filter'}`}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-white rounded-2xl p-2 shadow-soft">
                  <motion.button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      viewMode === 'grid' 
                        ? 'bg-indigo/10 text-indigo shadow-md border-2 border-indigo' 
                        : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Grid className={`w-5 h-5 ${viewMode === 'grid' ? 'text-indigo' : 'text-gray-800'}`} />
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      viewMode === 'list' 
                        ? 'bg-indigo/10 text-indigo shadow-md border-2 border-indigo' 
                        : 'text-gray-800 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <List className={`w-5 h-5 ${viewMode === 'list' ? 'text-indigo' : 'text-gray-800'}`} />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Smart Filters */}
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-6">
                <h3 className="text-lg font-poppins font-semibold text-gray-700 mb-2 flex items-center justify-center space-x-2">
                  <Filter className="w-5 h-5 text-indigo" />
                  <span>Smart Filters</span>
                </h3>
                <p className="text-sm text-gray-700">Filter by category, pricing, features, and more</p>
              </div>
              
              {/* Primary Filters - Always Visible */}
              <div className="flex flex-wrap gap-3 justify-center mb-6">
                {allFilters.slice(0, 6).map((filter, index) => {
                  const IconComponent = filter.icon;
                  const isActive = activeFilter === filter.id;
                  const getButtonStyle = () => {
                    if (isActive) {
                      switch (filter.type) {
                        case 'category': return 'bg-indigo/10 text-indigo shadow-md border-indigo font-semibold';
                        case 'feature': return 'bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo shadow-md border-indigo font-semibold';
                        default: return 'bg-indigo/10 text-indigo shadow-md border-indigo font-semibold';
                      }
                    } else {
                      return 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 hover:border-indigo/50 shadow-sm hover:text-gray-900';
                    }
                  };
                  
                  return (
                    <motion.button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`
                        px-4 py-2 rounded-full font-medium transition-all duration-200
                        flex items-center space-x-2 text-sm border
                        focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2
                        ${getButtonStyle()}
                      `}
                      style={{
                        textShadow: 'none'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{filter.label}</span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Advanced Filters Toggle */}
              {allFilters.length > 6 && (
                <div className="text-center">
                  <motion.button
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo rounded-full font-medium hover:from-indigo/20 hover:to-pink/20 transition-all duration-200 border border-indigo/20"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                  </motion.button>
                </div>
              )}

              {/* Advanced Filters Dropdown */}
              {showAdvancedFilters && allFilters.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-6 bg-white rounded-2xl shadow-lg border border-gray-200"
                >
                  <div className="flex flex-wrap gap-3">
                    {allFilters.slice(6).map((filter, index) => {
                      const IconComponent = filter.icon;
                      const isActive = activeFilter === filter.id;
                      const getButtonStyle = () => {
                        if (isActive) {
                          switch (filter.type) {
                            case 'category': return 'bg-indigo/10 text-indigo shadow-md border-indigo font-semibold';
                            case 'feature': return 'bg-gradient-to-r from-indigo/10 to-pink/10 text-indigo shadow-md border-indigo font-semibold';
                            default: return 'bg-indigo/10 text-indigo shadow-md border-indigo font-semibold';
                          }
                        } else {
                          return 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-300 hover:border-indigo/50 shadow-sm hover:text-gray-900';
                        }
                      };
                      
                      return (
                        <motion.button
                          key={filter.id}
                          onClick={() => setActiveFilter(filter.id)}
                          className={`
                            px-4 py-2 rounded-full font-medium transition-all duration-200
                            flex items-center space-x-2 text-sm border
                            focus:outline-none focus:ring-2 focus:ring-indigo focus:ring-offset-2
                            ${getButtonStyle()}
                          `}
                          style={{
                            textShadow: 'none'
                          }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconComponent className="w-4 h-4" />
                          <span>{filter.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Apps Grid/List */}
          {filteredApps.length > 0 ? (
            <motion.div 
              className={`${
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' 
                  : 'space-y-6'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredApps.map((app, index) => (
                <motion.div
                  key={app.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AppCard app={app} isNewest={index === 0} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="w-32 h-32 bg-gradient-to-br from-indigo/10 to-pink/10 rounded-3xl mx-auto mb-8 flex items-center justify-center"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Smartphone className="w-16 h-16 text-indigo" />
              </motion.div>
              <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-4">
                No tools in this category yet
              </h3>
              <p className="text-gray-700 text-lg max-w-md mx-auto">
                We're working hard to bring you new accessibility tools. Check back soon for updates in this category.
              </p>
            </motion.div>
          )}
        </div>
      </Section>
    </div>
  );
}
