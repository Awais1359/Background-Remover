import React, { useState, useCallback } from 'react';
import { ImageUploader } from './ImageUploader';
import { ImagePreview } from './ImagePreview';
import { ImageComparer } from './ImageComparer';
import { processImage } from '../utils/imageProcessing';

export const ImageProcessor: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (imageData: string) => {
    setOriginalImage(imageData);
    setProcessedImage(null);
    setError(null);
    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      const result = await processImage(imageData, (progress) => {
        setProcessingProgress(progress);
      });
      setProcessedImage(result);
      setProcessingProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const resetProcessor = useCallback(() => {
    setOriginalImage(null);
    setProcessedImage(null);
    setError(null);
    setProcessingProgress(0);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all">
      {!originalImage ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {processedImage ? 'Background Removed!' : 'Processing Your Image...'}
            </h2>
            <p className="text-gray-600">
              {processedImage 
                ? 'Perfect! Your image is ready.' 
                : 'Please wait while our AI does its magic...'}
            </p>
          </div>

          {isProcessing ? (
            <div className="mb-8">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-500 h-2.5 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${processingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2 text-right">
                {processingProgress}% complete
              </p>
            </div>
          ) : error ? (
            <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          ) : null}

          {originalImage && (
            processedImage ? (
              <ImageComparer
                originalImage={originalImage}
                processedImage={processedImage}
                resetProcessor={resetProcessor}
              />
            ) : (
              <ImagePreview
                image={originalImage}
                isProcessing={isProcessing}
                resetProcessor={resetProcessor}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};