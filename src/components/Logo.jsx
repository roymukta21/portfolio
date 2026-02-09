import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 'md', showText = true, className = '' }) => {
  const sizeClasses = {
    sm: 'size-8',
    md: 'size-10',
    lg: 'size-12',
    xl: 'size-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Unique MR Logo */}
      <motion.div 
        whileHover={{ rotate: 360, scale: 1.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`relative ${sizeClasses[size]} rounded-xl bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 flex items-center justify-center shadow-lg overflow-hidden mr-logo`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-orange-600/20"></div>
        
        {/* MR Letters */}
        <div className="relative z-10 flex ">
          <motion.span 
            className={`text-white font-black tracking-tighter mr-letters ${textSizes[size]}`}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            MR
          </motion.span>
        </div>
        
        {/* Floating Particles */}
        <div className="logo-particle"></div>
        <div className="logo-particle"></div>
        <div className="logo-particle"></div>
        
        {/* Decorative Elements */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full"
        ></motion.div>
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-white/30 rounded-full"
        ></motion.div>
      </motion.div>
      
      {/* Text */}
      {showText && (
        <motion.div className="flex flex-col">
          <motion.h2 
            whileHover={{ scale: 1.05 }}
            className={`font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent leading-none ${
              size === 'sm' ? 'text-base' : 
              size === 'md' ? 'text-xl' : 
              size === 'lg' ? 'text-2xl' : 'text-3xl'
            }`}
          >
            Mukta Roy
          </motion.h2>
          <motion.span 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className={`text-yellow-500 font-medium tracking-wide ${
              size === 'sm' ? 'text-xs' : 
              size === 'md' ? 'text-xs' : 
              size === 'lg' ? 'text-sm' : 'text-base'
            }`}
          >
            MERN Stack Developer
          </motion.span>
        </motion.div>
      )}
    </div>
  );
};

export default Logo;