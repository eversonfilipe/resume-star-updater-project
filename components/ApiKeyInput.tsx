
import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from './icons';

interface ApiKeyInputProps {
  apiKey: string;
  onSave: (key: string) => void;
}

/**
 * ApiKeyInput Component
 * 
 * Provides a secure input field for the user to enter and save their
 * Google Gemini API key to the browser's local storage for the session.
 */
const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ apiKey, onSave }) => {
  const [currentKey, setCurrentKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [isSaved, setIsSaved] = useState(!!apiKey);

  const handleSave = () => {
    onSave(currentKey);
    setIsSaved(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentKey(e.target.value);
    setIsSaved(false); // Mark as unsaved when user types
  };

  return (
    <div>
        <label htmlFor="api-key-input" className="block text-lg font-semibold mb-2 text-text-primary">
            Your Google Gemini API Key
        </label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-grow">
                <input
                    id="api-key-input"
                    type={showKey ? 'text' : 'password'}
                    value={currentKey}
                    onChange={handleChange}
                    placeholder="Enter your key here..."
                    className="w-full p-3 pr-10 border-2 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200"
                    aria-label="Google Gemini API Key"
                />
                <button 
                    type="button"
                    onClick={() => setShowKey(!showKey)} 
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-primary"
                    aria-label={showKey ? 'Hide API Key' : 'Show API Key'}
                >
                    {showKey ? <EyeOffIcon /> : <EyeIcon />}
                </button>
            </div>
            <button
                onClick={handleSave}
                className="flex items-center justify-center bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!currentKey || (currentKey === apiKey && isSaved)}
            >
                {isSaved ? '✓ Saved' : 'Save Key'}
            </button>
        </div>
        <p className="text-xs text-text-secondary mt-2 font-serif italic">
            Your key is stored securely in your browser's local storage and is only used to communicate with the Google API.
        </p>
    </div>
  );
};

export default ApiKeyInput;
