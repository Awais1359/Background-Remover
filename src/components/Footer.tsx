import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-600 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} BackgroundEraser | 
          All rights reserved
        </p>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#"
            className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
          >
            Privacy Policy
          </a>
          <a 
            href="#"
            className="text-gray-600 hover:text-purple-600 transition-colors text-sm"
          >
            Terms of Service
          </a>
          <a 
            href="#"
            className="text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};