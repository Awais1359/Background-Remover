import React from 'react';
import { Eraser } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Eraser className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            BackgroundEraser
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                About
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};