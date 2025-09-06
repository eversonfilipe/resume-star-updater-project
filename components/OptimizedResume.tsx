import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyIcon, CheckIcon } from './icons';
import LoadingSpinner from './LoadingSpinner';

// Define the props interface for the component
interface OptimizedResumeProps {
  content: string;
  isLoading: boolean;
  onStartOver: () => void;
}

/**
 * OptimizedResume Component
 * 
 * Displays the final optimized resume. Also used as a container for loading/placeholder states.
 * Includes a "Copy" button and a "Start Over" button to reset the application flow.
 */
const OptimizedResume: React.FC<OptimizedResumeProps> = ({ content, isLoading, onStartOver }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Reset copied state when content changes
  useEffect(() => {
    if (content) {
      setIsCopied(false);
    }
  }, [content]);

  // Handles the copy-to-clipboard functionality
  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  // Renders the content based on the current state (loading, idle, or has content)
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner message="Generating final resume..." details="Integrating your STAR details."/>;
    }
    if (!content) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-text-primary">Your optimized resume will appear here</h3>
            <p className="font-serif">Follow the steps to generate your ATS-friendly resume.</p>
        </div>
      );
    }
    return (
        // Using a div with pre-wrap to better render formatted text from the AI
        <div className="w-full h-full p-4 bg-transparent text-text-primary whitespace-pre-wrap font-serif">
            {content}
        </div>
    );
  };

  return (
    <div className="w-full relative">
        <div className="flex justify-between items-center mb-2">
            <label className="block text-lg font-semibold text-text-primary">
                Optimized Resume <span className="font-serif text-secondary italic">(STAR + ATS)</span>
            </label>
            {content && !isLoading && (
                 <button onClick={onStartOver} className="text-sm text-primary hover:underline font-semibold">
                    Start Over
                </button>
            )}
        </div>
      
      <div className="w-full min-h-[24rem] h-auto border-2 border-secondary rounded-lg shadow-sm bg-white overflow-y-auto relative">
        {content && !isLoading && (
          <button 
            onClick={handleCopy}
            className="absolute top-2 right-2 p-2 rounded-md bg-gray-100 hover:bg-gray-200 text-text-secondary hover:text-primary transition-all duration-200"
            aria-label="Copy to clipboard"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isCopied ? 'check' : 'copy'}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                {isCopied ? <CheckIcon /> : <CopyIcon />}
              </motion.span>
            </AnimatePresence>
          </button>
        )}
        <div className="p-4">
            {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default OptimizedResume;