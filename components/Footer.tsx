
import React from 'react';

/**
 * Footer Component
 * 
 * Renders the footer section of the application. It includes the credits
 * for the application's creator as specified in the user request.
 */
const Footer: React.FC = () => {
  return (
    <footer className="bg-white p-4 mt-8 border-t border-gray-200">
      <div className="container mx-auto text-center text-text-secondary text-sm">
        <p>
          This open-source application was created by{' '}
          <a 
            href="mailto:eversonfilipe124@gmail.com" 
            className="font-semibold text-primary hover:underline"
          >
            Éverson Filipe Campos da Silva Moura
          </a>.
        </p>
        <p>Feel free to contribute or provide feedback.</p>
      </div>
    </footer>
  );
};

export default Footer;
