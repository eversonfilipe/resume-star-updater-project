import React from 'react';
import { motion } from 'framer-motion';
import { Experience } from '../services/geminiService';
import PrimaryButton from './PrimaryButton';

interface StarInputGroupProps {
  label: 'Situation' | 'Task' | 'Action' | 'Result';
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const StarInputGroup: React.FC<StarInputGroupProps> = ({ label, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-bold text-text-primary mb-1 font-sans">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full p-2 border-2 border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200 resize-y bg-white text-text-primary placeholder-text-secondary"
      rows={3}
    />
  </div>
);


interface StarFormProps {
  experiences: Experience[];
  onUpdate: (id: number, field: keyof Experience, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
}

/**
 * StarForm Component
 * 
 * Renders a form with input fields for Situation, Task, Action, and Result
 * for each professional experience extracted from the user's resume.
 */
const StarForm: React.FC<StarFormProps> = ({ experiences, onUpdate, onSubmit, onBack, isLoading }) => {
    // Check if all STAR fields are filled for all experiences
    const isFormComplete = experiences.every(
        exp => exp.situation.trim() && exp.task.trim() && exp.action.trim() && exp.result.trim()
    );
    
    // Animation variants for the container and items
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };


    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
                 <h2 className="text-xl sm:text-2xl font-bold text-text-primary">Detail Your Experiences</h2>
                 <button onClick={onBack} className="text-sm text-primary hover:underline font-semibold flex-shrink-0">
                    &larr; Go Back
                </button>
            </div>
           
            <p className="text-text-secondary mb-6 font-serif">
                Provide details for each role using the STAR method. This data will be used to build impactful, professional descriptions.
            </p>

            <motion.div 
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {experiences.map((exp) => (
                    <motion.div 
                        key={exp.id} 
                        className="p-4 border border-gray-200 rounded-lg bg-light-bg/50"
                        variants={itemVariants}
                    >
                        <h3 className="text-lg font-semibold text-primary">{exp.jobTitle}</h3>
                        <p className="text-md text-text-secondary mb-4 font-serif italic">{exp.company}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <StarInputGroup
                                label="Situation"
                                value={exp.situation}
                                onChange={(val) => onUpdate(exp.id, 'situation', val)}
                                placeholder="Describe the context or challenge."
                            />
                             <StarInputGroup
                                label="Task"
                                value={exp.task}
                                onChange={(val) => onUpdate(exp.id, 'task', val)}
                                placeholder="What was your goal or responsibility?"
                            />
                             <StarInputGroup
                                label="Action"
                                value={exp.action}
                                onChange={(val) => onUpdate(exp.id, 'action', val)}
                                placeholder="What specific actions did you take?"
                            />
                             <StarInputGroup
                                label="Result"
                                value={exp.result}
                                onChange={(val) => onUpdate(exp.id, 'result', val)}
                                placeholder="What were the quantifiable outcomes?"
                            />
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            
            <div className="mt-8">
                 <PrimaryButton onClick={onSubmit} isLoading={isLoading} disabled={!isFormComplete}>
                    Generate Final Resume
                </PrimaryButton>
                {!isFormComplete && (
                    <p className="text-center text-sm text-warning mt-2 font-semibold">
                        Please fill out all STAR fields for each experience to proceed.
                    </p>
                )}
            </div>
        </div>
    )
}

export default StarForm;