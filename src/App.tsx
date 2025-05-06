import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageProcessor } from './components/ImageProcessor';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-6xl">
          <ImageProcessor />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;