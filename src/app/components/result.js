"use client";

import Image from "next/image";
import { useMemo } from "react";
import personalityData from "../asset/personality.json";

export default function Result({ searchParams }) {
  const getParam = (key) => {
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/90 rounded-lg shadow text-black">
      <h1 className="text-3xl font-bold mb-2">{cakeTitle}</h1>

      <div className="mb-4 text-lg">
        Personality code:{" "}
        <span className="font-mono font-semibold">{personalityCode}</span> ,
        {personalityData[personalityCode].title}
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-80 h-64 relative rounded overflow-hidden">
          <Image
            src={randomCake}
            alt={cakeTitle}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex-1">
          <div className="mt-4 p-4 bg-gray-50 border rounded">
            <h2 className="mb-2">ถึง {name}</h2>

            {personalityData && personalityData[personalityCode] ? (
              <div className="mt-3">
                <p className="mt-2 text-gray-800">
                  {personalityData[personalityCode].message}
                </p>
              </div>
            ) : (
              <p className="mt-3">
                Congratulations — based on your answers, your cake personality
                is <strong>{cakeTitle}</strong>.
              </p>
            )}

            <p className="mt-4 font-medium"></p>

            <p>จาก ผู้หวังดีที่ไม่ประสงค์ออกนาม</p>
          </div>
        </div>
      </div>
    </div>
  );
}
