"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import personalityData from "../asset/personality.json";

export default function Msg({ CakeName, searchParams }) {
  const getParam = (key) => {
    // Handle server-side model wrapper from Next: { status: 'resolved_model', value: '...JSON...' }
    if (
      searchParams &&
      searchParams.status === "resolved_model" &&
      typeof searchParams.value === "string"
    ) {
      try {
        const parsed = JSON.parse(searchParams.value);
        const pv = parsed[key];
        if (Array.isArray(pv)) return pv[0] || "";
        return pv ?? "";
      } catch (e) {
        // fall through
      }
    }

    if (!searchParams) return "";
    if (typeof searchParams.get === "function")
      return searchParams.get(key) || "";
    const v = searchParams[key];
    if (Array.isArray(v)) return v[0] || "";
    return v ?? "";
  };

  const name = getParam("name") || "Friend";

  const parseNum = (key) => {
    const v = getParam(key);
    const n = v ? parseFloat(v) : 0;
    return Number.isFinite(n) ? n : 0;
  };

  const ABv = parseNum("AB");
  const CMv = parseNum("CM");
  const EIv = parseNum("EI");
  const SLv = parseNum("SL");

  const charFor = (val, negChar, posChar) => (val < 0.5 ? negChar : posChar);

  const ABc = charFor(ABv, "A", "B");
  const CMc = charFor(CMv, "C", "M");
  const EIc = charFor(EIv, "E", "I");
  const SLc = charFor(SLv, "S", "L");

  const personalityCode = `${CMc}${ABc}${SLc}${EIc}`;

  // Add all cake images here
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    console.log("Msg searchParams:", searchParams, "resolved name:", name);
  }, [searchParams, name]);

  const handleSend = () => {
    if (!message.trim()) return;
    setShowToast(true);
    setMessage("");
  };

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);
  // Add all cake images here
  const cakeImages = [
    "/cakes/Abyss_Absorber.png",
    "/cakes/Astroid_Destoryer.png",
    "/cakes/Bob.png",
    "/cakes/World_Eater.png",
  ];

  // Pick one random image when component loads
  const randomCake = useMemo(() => {
    return cakeImages[Math.floor(Math.random() * cakeImages.length)];
  }, []);

  const cakeTitle = randomCake
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const displayedCakeTitle = CakeName || cakeTitle;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/90 rounded-lg shadow text-black">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          มีอะไรจะบอกกับ คนที่เป็นเค้กรสเดียวกัน บ้างไหม?
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="พิมพ์ข้อความของคุณที่นี่..."
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSend}
          className="px-20 py-3 bg-[#8f757c] text-white font-semibold rounded-full hover:bg-[#b1979e] transition"
        >
          ส่งข้อความ
        </button>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          ส่งข้อความเรียบร้อย
        </div>
      )}
    </div>
  );
}
