
import React from 'react';

interface StepProps {
  stepNumber: number;
  label: string;
  isActive: boolean;
}

const Step: React.FC<StepProps> = ({ stepNumber, label, isActive }) => (
  <div className="flex items-center gap-2">
    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isActive ? 'bg-primary text-white' : 'bg-gray-200 text-text-secondary'}`}>
      {stepNumber}
    </div>
    <span className={`font-semibold transition-colors ${isActive ? 'text-primary' : 'text-text-secondary'}`}>
      {label}
    </span>
  </div>
);

interface HeaderProps {
    currentStep: number;
}

/**
 * Header Component
 * 
 * Renders the top section of the application, including the logo, title, and a stepper
 * to indicate the user's progress through the optimization process.
 */
const Header: React.FC<HeaderProps> = ({ currentStep }) => {
  return (
    <header className="bg-white shadow-sm p-4 md:p-6 border-b border-gray-200">
      <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary text-white rounded-lg flex items-center justify-center flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary font-sans">
              CV Optimizado <span className="text-primary">STAR + ATS</span>
            </h1>
            <p className="text-sm md:text-base text-text-secondary font-serif italic">
              A guided, multi-step resume enhancement tool.
            </p>
          </div>
        </div>
        
        {/* Stepper */}
        <div className="flex items-center gap-2 sm:gap-4 self-center sm:self-auto">
          <Step stepNumber={1} label="Input" isActive={currentStep === 1} />
          <div className="w-4 sm:w-8 h-px bg-gray-300"></div>
          <Step stepNumber={2} label="Detail" isActive={currentStep === 2} />
           <div className="w-4 sm:w-8 h-px bg-gray-300"></div>
          <Step stepNumber={3} label="Result" isActive={currentStep === 3} />
        </div>
      </div>
    </header>
  );
};

export default Header;
