"use client";

import { useState } from "react";
import Link from "next/link";

export default function First() {
  const [cakeInput, setCakeInput] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Know your Cake</h1>

      <p className="text-lg mb-4 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <input
        type="text"
        placeholder="Enter cake name..."
        value={cakeInput}
        onChange={(e) => {
          console.log(e.target.value);
          setCakeInput(e.target.value);
        }}
        // Navigation will occur only when the Start link is clicked
        className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 mb-6 bg-white text-gray-800"
      />

      {/* Debug output */}
      <p className="mb-4 text-gray-700">Current value: {cakeInput}</p>

      <Link
        href={
          cakeInput.trim() ? `/quiz?name=${encodeURIComponent(cakeInput)}` : "#"
        }
        className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
      >
        Start
      </Link>
    </div>
  );
}
