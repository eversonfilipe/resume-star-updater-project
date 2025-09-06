
import React from 'react';

interface LoadingSpinnerProps {
    message?: string;
    details?: string;
}

/**
 * LoadingSpinner Component
 * 
 * Provides visual feedback during asynchronous operations.
 * The animation consists of three pulsating dots in the primary and secondary colors.
 * @param {string} [message] - The main message to display below the spinner.
 * @param {string} [details] - A smaller, secondary message.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    message = "Optimizing with AI...", 
    details = "This may take a moment." 
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-secondary animate-pulse [animation-delay:0.2s]"></div>
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse [animation-delay:0.4s]"></div>
        </div>
        <p className="mt-4 text-text-secondary font-semibold">{message}</p>
        <p className="mt-1 text-sm text-text-secondary font-serif italic">{details}</p>
    </div>
  );
};

export default LoadingSpinner;
