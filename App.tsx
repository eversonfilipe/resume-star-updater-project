
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ResumeInput from './components/ResumeInput';
import OptimizedResume from './components/OptimizedResume';
import PrimaryButton from './components/PrimaryButton';
import Footer from './components/Footer';
import Alert from './components/Alert';
import StarForm from './components/StarForm';
import { extractExperiencesFromResume, generateFinalResume, Experience } from './services/geminiService';

type AppStep = 1 | 2 | 3;

/**
 * App Component
 * 
 * This is the root component of the application. It orchestrates a multi-step UI flow
 * for resume optimization, manages all application state, and handles API interactions.
 */
const App: React.FC = () => {
  // State for the current step in the process (1: Input, 2: Detail, 3: Result)
  const [currentStep, setCurrentStep] = useState<AppStep>(1);
  // State for the user's raw resume input
  const [rawResume, setRawResume] = useState<string>('');
  // State for experiences extracted by the AI and detailed by the user
  const [experiences, setExperiences] = useState<Experience[]>([]);
  // State for the final AI-optimized resume output
  const [optimizedResume, setOptimizedResume] = useState<string>('');
  // State to track loading status for different API calls
  const [isLoading, setIsLoading] = useState({ extracting: false, generating: false });
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Resets the entire application state to its initial values.
   */
  const handleReset = useCallback(() => {
    setCurrentStep(1);
    setRawResume('');
    setExperiences([]);
    setOptimizedResume('');
    setError(null);
    setIsLoading({ extracting: false, generating: false });
  }, []);
  
  /**
   * Step 1: Extracts professional experiences from the raw resume.
   */
  const handleExtractExperiences = useCallback(async () => {
    if (isLoading.extracting || !rawResume.trim()) {
      if(!rawResume.trim()) setError("Please paste your resume before proceeding.");
      return;
    }
    setIsLoading(prev => ({ ...prev, extracting: true }));
    setError(null);

    try {
      const extracted = await extractExperiencesFromResume(rawResume);
      if (extracted.length === 0) {
        setError("Could not find any professional experiences to optimize. Please ensure your resume has a clear 'Experience' section.");
        setIsLoading(prev => ({ ...prev, extracting: false }));
        return;
      }
      // Map extracted data to the full Experience structure with unique IDs
      setExperiences(extracted.map((exp, index) => ({
        ...exp,
        id: index,
        situation: '', task: '', action: '', result: '',
      })));
      setCurrentStep(2);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during extraction.');
    } finally {
      setIsLoading(prev => ({ ...prev, extracting: false }));
    }
  }, [rawResume, isLoading.extracting]);

  /**
   * Callback for the StarForm to update the state.
   */
  const handleUpdateExperience = useCallback((id: number, field: keyof Experience, value: string) => {
    setExperiences(prev => 
      prev.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    );
  }, []);

  /**
   * Step 2: Generates the final resume using the detailed STAR information.
   */
  const handleGenerateFinalResume = useCallback(async () => {
    if (isLoading.generating) return;
    setIsLoading(prev => ({ ...prev, generating: true }));
    setError(null);
    setCurrentStep(3); // Move to final view to show loading state there

    try {
      const result = await generateFinalResume(rawResume, experiences);
      setOptimizedResume(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during generation.');
    } finally {
      setIsLoading(prev => ({ ...prev, generating: false }));
    }
  }, [rawResume, experiences, isLoading.generating]);
  
  /**
   * Renders the main content based on the current step.
   */
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="flex flex-col gap-4">
              <ResumeInput value={rawResume} onChange={setRawResume} />
              <PrimaryButton onClick={handleExtractExperiences} isLoading={isLoading.extracting}>
                Extract Experiences & Proceed
              </PrimaryButton>
              {error && <Alert type="error" message={error} />}
            </div>
            <OptimizedResume content="" isLoading={false} onStartOver={handleReset} />
          </div>
        );
      case 2:
        return (
          <StarForm 
            experiences={experiences} 
            onUpdate={handleUpdateExperience}
            onSubmit={handleGenerateFinalResume}
            onBack={() => setCurrentStep(1)}
            isLoading={isLoading.generating}
          />
        );
      case 3:
         return (
             <div className="max-w-4xl mx-auto w-full">
                {error && !isLoading.generating && (
                     <div className="mb-4">
                        <Alert type="error" message={error} />
                         <button onClick={() => setCurrentStep(2)} className="mt-2 text-sm text-primary hover:underline font-semibold">
                            &larr; Go back and try again
                        </button>
                     </div>
                 )}
                <OptimizedResume 
                    content={optimizedResume} 
                    isLoading={isLoading.generating}
                    onStartOver={handleReset} 
                />
             </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col min-h-screen text-text-primary">
      <Header currentStep={currentStep} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        {renderCurrentStep()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
