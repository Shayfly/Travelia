import React from 'react';

// Demo component showcasing Hebrew text and a placeholder language switch button
export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">
        ברוכים הבאים ל-Travelia
      </h1>
      <p className="mb-4 text-center">
        זוהי אפליקציית דמו המבוססת על React, Vite ו-Tailwind.
      </p>
      <button
        type="button"
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
      >
        החלף שפה
      </button>
    </div>
  );
}
