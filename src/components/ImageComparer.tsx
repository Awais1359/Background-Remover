import React, { useState } from 'react';
import { DownloadCloud, RotateCcw } from 'lucide-react';

interface ImageComparerProps {
  originalImage: string;
  processedImage: string;
  resetProcessor: () => void;
}

export const ImageComparer: React.FC<ImageComparerProps> = ({
  originalImage,
  processedImage,
  resetProcessor
}) => {
  const [activeTab, setActiveTab] = useState<'original' | 'processed'>('processed');

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'background-removed.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6 border border-gray-200 rounded-lg p-1 flex">
        <button
          onClick={() => setActiveTab('original')}
          className={`flex-1 py-2 text-center rounded-md transition-colors ${
            activeTab === 'original' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Original
        </button>
        <button
          onClick={() => setActiveTab('processed')}
          className={`flex-1 py-2 text-center rounded-md transition-colors ${
            activeTab === 'processed' 
              ? 'bg-purple-600 text-white' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Background Removed
        </button>
      </div>

      <div className="w-full flex justify-center mb-6 min-h-[300px]">
        <div className={`w-full flex justify-center relative ${activeTab === 'original' ? 'block' : 'hidden'}`}>
          <img 
            src={originalImage} 
            alt="Original" 
            className="max-h-[400px] w-auto rounded-lg shadow-md max-w-full"
          />
        </div>
        <div className={`w-full flex justify-center relative ${activeTab === 'processed' ? 'block' : 'hidden'}`}>
          <div className="bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA7SURBVHjaYvj//z8DJYCJgUIw8AawUMPQxo0bKXIBIyMjdQxgZGRMLQOGlwHURGODgdQkOjQMAABAgAEzGxPzL5+L7QAAAABJRU5ErkJggg==')] rounded-lg">
            <img 
              src={processedImage} 
              alt="Background Removed" 
              className="max-h-[400px] w-auto rounded-lg max-w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4">
        <button
          onClick={handleDownload}
          className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg shadow hover:from-purple-700 hover:to-pink-600 transition-all"
        >
          <DownloadCloud className="h-5 w-5" />
          <span>Download</span>
        </button>
        
        <button
          onClick={resetProcessor}
          className="flex items-center justify-center space-x-2 px-6 py-3 border border-gray-200 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RotateCcw className="h-5 w-5" />
          <span>Try Another Image</span>
        </button>
      </div>
    </div>
  );
};