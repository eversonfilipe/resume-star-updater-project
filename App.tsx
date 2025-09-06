
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ResumeInput from './components/ResumeInput';
import OptimizedResume from './components/OptimizedResume';
import PrimaryButton from './components/PrimaryButton';
import Footer from './components/Footer';
import Alert from './components/Alert';
import StarForm from './components/StarForm';
import ApiKeyInput from './components/ApiKeyInput';
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
  // State for the user-provided Google Gemini API Key
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('gemini-api-key') || '');


  /**
   * Resets the entire application state to its initial values, but preserves the API key.
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
   * Saves the user's API key to state and local storage.
   */
  const handleSaveApiKey = useCallback((key: string) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    localStorage.setItem('gemini-api-key', trimmedKey);
  }, []);

  /**
   * Step 1: Extracts professional experiences from the raw resume.
   */
  const handleExtractExperiences = useCallback(async () => {
    setError(null);
    if (!apiKey) {
        setError("Please set your Google Gemini API key before proceeding.");
        return;
    }
    if (isLoading.extracting || !rawResume.trim()) {
      if(!rawResume.trim()) setError("Please paste your resume before proceeding.");
      return;
    }
    setIsLoading(prev => ({ ...prev, extracting: true }));

    try {
      const extracted = await extractExperiencesFromResume(rawResume, apiKey);
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
  }, [rawResume, isLoading.extracting, apiKey]);

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
    setError(null);
    if (!apiKey) {
      setError("API key is missing. Cannot generate resume.");
      setCurrentStep(2); // Go back to the form
      return;
    }
    if (isLoading.generating) return;
    setIsLoading(prev => ({ ...prev, generating: true }));
    setCurrentStep(3); // Move to final view to show loading state there

    try {
      const result = await generateFinalResume(rawResume, experiences, apiKey);
      setOptimizedResume(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during generation.');
       // If generation fails, send user back to the form to try again
      setCurrentStep(2);
    } finally {
      setIsLoading(prev => ({ ...prev, generating: false }));
    }
  }, [rawResume, experiences, isLoading.generating, apiKey]);
  
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
              <PrimaryButton onClick={handleExtractExperiences} isLoading={isLoading.extracting} disabled={!apiKey || !rawResume.trim()}>
                Extract Experiences & Proceed
              </PrimaryButton>
              {error && <Alert type="error" message={error} />}
              {!apiKey && <Alert type="warning" message="Please set your API key above to enable functionality." />}
            </div>
            <OptimizedResume content="" isLoading={false} onStartOver={handleReset} />
          </div>
        );
      case 2:
        return (
          <>
            {error && <div className="max-w-4xl mx-auto mb-4"><Alert type="error" message={error} /></div>}
            <StarForm 
              experiences={experiences} 
              onUpdate={handleUpdateExperience}
              onSubmit={handleGenerateFinalResume}
              onBack={() => { setError(null); setCurrentStep(1); }}
              isLoading={isLoading.generating}
            />
          </>
        );
      case 3:
         return (
             <div className="max-w-4xl mx-auto w-full">
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
        <div className="max-w-4xl mx-auto w-full mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <ApiKeyInput apiKey={apiKey} onSave={handleSaveApiKey} />
        </div>
        {renderCurrentStep()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
