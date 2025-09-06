import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [currentStep, setCurrentStep] = useState<AppStep>(1);
  const [rawResume, setRawResume] = useState<string>('');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [optimizedResume, setOptimizedResume] = useState<string>('');
  const [isLoading, setIsLoading] = useState({ extracting: false, generating: false });
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('gemini-api-key') || '');

  const handleReset = useCallback(() => {
    setCurrentStep(1);
    setRawResume('');
    setExperiences([]);
    setOptimizedResume('');
    setError(null);
    setIsLoading({ extracting: false, generating: false });
  }, []);
  
  const handleSaveApiKey = useCallback((key: string) => {
    const trimmedKey = key.trim();
    setApiKey(trimmedKey);
    localStorage.setItem('gemini-api-key', trimmedKey);
  }, []);

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

  const handleUpdateExperience = useCallback((id: number, field: keyof Experience, value: string) => {
    setExperiences(prev => 
      prev.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    );
  }, []);

  const handleGenerateFinalResume = useCallback(async () => {
    setError(null);
    if (!apiKey) {
      setError("API key is missing. Cannot generate resume.");
      setCurrentStep(2);
      return;
    }
    if (isLoading.generating) return;
    setIsLoading(prev => ({ ...prev, generating: true }));
    setCurrentStep(3);

    try {
      const result = await generateFinalResume(rawResume, experiences, apiKey);
      setOptimizedResume(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred during generation.');
      setCurrentStep(2);
    } finally {
      setIsLoading(prev => ({ ...prev, generating: false }));
    }
  }, [rawResume, experiences, isLoading.generating, apiKey]);

  // Animation variants for step transitions
  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="flex flex-col gap-4">
                <ResumeInput value={rawResume} onChange={setRawResume} />
                <PrimaryButton onClick={handleExtractExperiences} isLoading={isLoading.extracting} disabled={!apiKey || !rawResume.trim()}>
                  Extract Experiences & Proceed
                </PrimaryButton>
                <AnimatePresence>
                  {error && <Alert type="error" message={error} />}
                  {!apiKey && <Alert type="warning" message="Please set your API key above to enable functionality." />}
                </AnimatePresence>
              </div>
              <OptimizedResume content="" isLoading={false} onStartOver={handleReset} />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5 }}>
            <AnimatePresence>
                {error && <div className="max-w-4xl mx-auto mb-4"><Alert type="error" message={error} /></div>}
            </AnimatePresence>
            <StarForm 
              experiences={experiences} 
              onUpdate={handleUpdateExperience}
              onSubmit={handleGenerateFinalResume}
              onBack={() => { setError(null); setCurrentStep(1); }}
              isLoading={isLoading.generating}
            />
          </motion.div>
        );
      case 3:
         return (
             <motion.div key="step3" className="max-w-4xl mx-auto w-full" variants={stepVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.5 }}>
                <OptimizedResume 
                    content={optimizedResume} 
                    isLoading={isLoading.generating}
                    onStartOver={handleReset} 
                />
             </motion.div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex flex-col min-h-screen text-text-primary">
      <Header currentStep={currentStep} />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto w-full mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm"
        >
            <ApiKeyInput apiKey={apiKey} onSave={handleSaveApiKey} />
        </motion.div>
        <AnimatePresence mode="wait">
          {renderCurrentStep()}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default App;