import React from 'react';
import { Zap, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, message = "ポケモンを よみこみちゅう..." }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center z-50">
      <div className="relative">
        {/* Pokeball animation */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-red-500 to-red-600 relative border-4 border-white shadow-2xl animate-bounce">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800 transform -translate-y-0.5"></div>
          <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-white rounded-full border-4 border-gray-800 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-gray-800 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gray-200 to-white rounded-b-full"></div>
        </div>
        
        {/* Sparkle effects */}
        <Sparkles className="absolute -top-4 -right-4 text-yellow-300 w-8 h-8 animate-pulse" />
        <Zap className="absolute -bottom-4 -left-4 text-yellow-300 w-8 h-8 animate-pulse" />
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-2xl font-bold text-white drop-shadow-lg animate-pulse">{message}</p>
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;