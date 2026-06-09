'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function First() {
  const [cakeInput, setCakeInput] = useState('');
  const router = useRouter();

  const handleStart = () => {
    if (cakeInput.trim()) {
      router.push(`/result?cake=${encodeURIComponent(cakeInput)}`);
    }
  };

  return (
    <div >
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Know your Cake</h1>
      
      <input
        type="text"
        placeholder="Enter cake name..."
        value={cakeInput}
        onChange={(e) => setCakeInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleStart()}
        className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 mb-6"
      />
      
      <button
        onClick={handleStart}
        className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
      >
        Start
      </button>
    </div>
  );
}