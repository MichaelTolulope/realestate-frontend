// src/components/DarkModeButton.jsx
import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const DarkModeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.div
      className={`p-4 rounded-full flex justify-center items-center cursor-pointer ${
        theme === 'dark' ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-800'
      }`}
      onClick={toggleTheme}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="sun"
            initial={{ rotate: 180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaSun className="text-xl" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FaMoon className="text-xl" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DarkModeButton;
