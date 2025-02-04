"use client";

import RedFlagDetector from '@/components/RedFlagDetector';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-red-100 dark:from-red-950 dark:to-pink-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-red-600 dark:text-red-400">
          🚩 Red Flag Detector 🚩
        </h1>
        <p className="text-center mb-12 text-gray-600 dark:text-gray-300">
          Share your relationship scenarios and let our AI detect those sneaky red flags!
        </p>
        <RedFlagDetector />
      </div>
    </div>
  );
}