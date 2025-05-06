import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageData: string) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const processFile = useCallback((file: File) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        onImageUpload(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  return (
    <div 
      className={`p-8 flex flex-col items-center justify-center transition-all ${
        isDragging 
          ? 'bg-purple-50 border-purple-400' 
          : 'bg-gray-50 border-gray-200'
      }`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Remove Image Background
        </h2>
        <p className="text-center text-gray-600 max-w-md mx-auto">
          Upload an image and our AI will automatically remove the background for you.
        </p>
      </div>

      <div className={`
        w-full max-w-lg p-8 border-2 border-dashed rounded-lg 
        ${isDragging ? 'border-purple-400' : 'border-gray-300'}
        transition-all hover:bg-gray-100
      `}>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-3 bg-purple-100 rounded-full">
            <Upload className="h-8 w-8 text-purple-600" />
          </div>
          <div className="text-center">
            <p className="font-medium text-gray-800">
              Drag and drop your image here
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports JPG, PNG (Max 10MB)
            </p>
          </div>
          <span className="text-sm text-gray-400">OR</span>
          <label className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileSelect}
            />
            Browse Files
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <div className="p-4 bg-white rounded-lg shadow-sm w-64">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <ImageIcon className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-medium">High Quality</h3>
          </div>
          <p className="text-sm text-gray-600">
            Get crisp edges and high resolution output images
          </p>
        </div>

        <div className="p-4 bg-white rounded-lg shadow-sm w-64">
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-green-100 rounded-full">
              <ImageIcon className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-medium">Free to Use</h3>
          </div>
          <p className="text-sm text-gray-600">
            Process images at no cost with our cutting-edge AI
          </p>
        </div>
      </div>
    </div>
  );
};