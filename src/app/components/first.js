"use client";

import { useState } from "react";
import Link from "next/link";

export default function First() {
  const [cakeInput, setCakeInput] = useState("");

  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Know your Cake</h1>

      <p className="text-lg mb-4 text-gray-600">
        มาลองค้นหาเค้กของตัวเองกันเถอะ! by team S&P Save Me Please
      </p>

      <input
        type="text"
        placeholder="ใส่ชื่อของคุณ"
        value={cakeInput}
        onChange={(e) => {
          console.log(e.target.value);
          setCakeInput(e.target.value);
        }}
        // Navigation will occur only when the Start link is clicked
        className="w-full max-w-md px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 mb-6 bg-white text-gray-800"
      />

      {/* Debug output */}

      <Link
        href={
          cakeInput.trim() ? `/quiz?name=${encodeURIComponent(cakeInput)}` : "#"
        }
        className="px-20 py-3 bg-[#8f757c] text-white font-semibold rounded-full hover:bg-[#b1979e] transition"
      >
        เริ่มกันเลย!
      </Link>
    </div>
  );
}
