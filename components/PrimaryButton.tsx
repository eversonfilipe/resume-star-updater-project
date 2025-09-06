import React from 'react';
import { motion } from 'framer-motion';

// Define the props interface for the component
interface PrimaryButtonProps {
  onClick: () => void;
  isLoading: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}

/**
 * PrimaryButton Component
 * 
 * A reusable primary call-to-action button. It is disabled during the loading state
 * and can be optionally disabled via props.
 * @param {function} onClick - The function to execute when the button is clicked.
 * @param {boolean} isLoading - A boolean to indicate if a process is running.
 * @param {React.ReactNode} children - The content (text/icon) of the button.
 * @param {boolean} [disabled=false] - Optional boolean to disable the button.
 */
const PrimaryButton: React.FC<PrimaryButtonProps> = ({ onClick, isLoading, children, disabled = false }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="w-full flex items-center justify-center bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default PrimaryButton;