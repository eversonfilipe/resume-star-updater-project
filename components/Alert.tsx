
import React from 'react';

// Define the types of alerts available
type AlertType = 'error' | 'warning' | 'success';

// Define the props interface for the component
interface AlertProps {
  type: AlertType;
  message: string;
}

/**
 * Alert Component
 * 
 * A reusable UI component for displaying contextual messages (e.g., errors).
 * The styling changes based on the `type` prop to provide clear visual cues.
 * @param {AlertType} type - The type of alert ('error', 'warning', 'success').
 * @param {string} message - The message to be displayed inside the alert.
 */
const Alert: React.FC<AlertProps> = ({ type, message }) => {
  // Determine styles based on the alert type
  const baseClasses = 'p-4 rounded-lg flex items-center gap-3';
  const typeClasses = {
    error: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning-dark',
    success: 'bg-success/10 text-success-dark',
  };

  const Icon: React.FC<{className: string}> = ({className}) => {
      switch (type) {
          case 'error':
              return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
          case 'warning':
              return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
          case 'success':
              return <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
          default:
            return null;
      }
  }

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`} role="alert">
      <Icon className="h-6 w-6 flex-shrink-0" />
      <span className="font-semibold">{message}</span>
    </div>
  );
};

export default Alert;
