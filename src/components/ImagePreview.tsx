import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ImagePreviewProps {
  image: string;
  isProcessing: boolean;
  resetProcessor: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ 
  image, 
  isProcessing,
  resetProcessor
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md mb-6">
        <img 
          src={image} 
          alt="Original"
          className="w-full h-auto rounded-lg shadow-md"
        />
        {isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
            <div className="animate-pulse text-white font-bold text-xl">
              Processing...
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        <button
          onClick={resetProcessor}
          disabled={isProcessing}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg 
            transition-colors border
            ${isProcessing 
              ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
            }
          `}
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Another</span>
        </button>
      </div>
    </div>
  );
};