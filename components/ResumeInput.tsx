
import React from 'react';

// Define the props interface for the component
interface ResumeInputProps {
  value: string;
  onChange: (value: string) => void;
}

/**
 * ResumeInput Component
 * 
 * Renders a large textarea for the user to paste their raw resume content.
 * It's styled according to the design system for a clean and focused user experience.
 * @param {string} value - The current text content of the textarea.
 * @param {function} onChange - Callback function to update the parent component's state.
 */
const ResumeInput: React.FC<ResumeInputProps> = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <label htmlFor="raw-resume" className="block text-lg font-semibold mb-2 text-text-primary">
        Your Raw Resume
      </label>
      <textarea
        id="raw-resume"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your raw resume text here... The more detail, the better the optimization."
        className="w-full h-96 p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-y bg-white text-text-primary placeholder-text-secondary"
      />
    </div>
  );
};

export default ResumeInput;
