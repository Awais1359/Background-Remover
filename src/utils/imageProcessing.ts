import { removeBackground } from '@imgly/background-removal';

export const processImage = async (
  imageData: string,
  onProgress?: (progress: number) => void
): Promise<string> => {
  try {
    // Convert base64 to blob
    const base64Data = imageData.split(',')[1];
    const binaryData = atob(base64Data);
    const array = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      array[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([array], { type: 'image/png' });
    
    // Process the image using @imgly/background-removal
    const processedBlob = await removeBackground(blob, {
      progress: (progress) => {
        const percentage = Math.round(progress * 100);
        console.log('Processing progress:', percentage, '%');
        onProgress?.(percentage);
      },
      debug: false,
      model: 'medium',
      output: {
        format: 'image/png',
        quality: 0.8,
      },
    });

    // Convert processed blob back to base64
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert processed image to base64'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read processed image'));
      reader.readAsDataURL(processedBlob);
    });
  } catch (error) {
    console.error('Error processing image:', error);
    throw error instanceof Error ? error : new Error('Failed to remove background');
  }
};