"use client";

import { useState, useEffect } from "react";
import questionsData from "../asset/questions.json";
import { useRouter } from "next/navigation";

export default function Question({ startIndex = 0, searchParams }) {
  const [idx, setIdx] = useState(startIndex);
  const [CM, setCM] = useState(0);
  const [AB, setAB] = useState(0);
  const [SL, setSL] = useState(0);
  const [EI, setEI] = useState(0);

  const q = questionsData.questions[idx];
  const router = useRouter();

  const getParam = (key) => {
    if (!searchParams) {
      if (
        typeof window !== "undefined" &&
        window.location &&
        window.location.search
      ) {
        const sp = new URLSearchParams(window.location.search);
        return sp.get(key) || "";
      }
      return "";
    }
    if (typeof searchParams.get === "function")
      return searchParams.get(key) || "";
    const v = searchParams[key];
    if (Array.isArray(v)) return v[0] || "";
    return v ?? "";
  };

  const name = getParam("name") || "";
  const [stage, setStage] = useState("enter");
  const ANIM_MS = 500;

  // Do not auto-redirect on completion; show final view with a results button instead

  const debugPanel = (
    <div className="max-w-2xl mx-auto p-2 mb-4 bg-yellow-50 rounded-md text-sm text-gray-800">
      <div className="flex justify-between gap-4">
        <div>CM: {CM}</div>
        <div>AB: {AB}</div>
        <div>SL: {SL}</div>
        <div>EI: {EI}</div>
      </div>
    </div>
  );

  if (!q) {
    const handleShowResults = () => {
      const params = new URLSearchParams({
        CM: String(CM),
        AB: String(AB),
        SL: String(SL),
        EI: String(EI),
        name: name,
      });

      if (name) {
        params.set("name", name);
      }

      router.push(`/result?${params.toString()}`);
    };

    return (
      <div>
        <div className="max-w-2xl mx-auto p-6 bg-white/80 rounded-lg shadow">
          <h2 className="text-2xl mb-4 text-gray-800">
            จู่ๆ ก็มีแสงสว่างรอบตัวคุณ หลังจากนั้นเจ้าเค้กก็เดินเข้ามาหาคุณ
            พร้อมพูดว่า “ในที่สุด คุณก็มีรสชาติเป็นของตัวเองแล้ว
            ลองไปส่งกระจกดูสิ” คุณจึงเดินไปส่องกระจก คุณพบว่าคุณเป็นเค้กรส…!
          </h2>

          <div>
            <button
              onClick={handleShowResults}
              className="w-full px-10 py-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition text-black text-center"
            >
              รส......!
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswer = (ansKey) => {
    if (stage === "exit") return; // prevent double clicks during animation

    // Read effect for the selected answer (e.g. "AB+2" or "none")
    const effKey = `${ansKey}eff`;
    const eff = q.effects && q.effects[effKey];

    if (eff && typeof eff === "string" && eff.toLowerCase() !== "none") {
      const axis = eff.slice(0, 2);
      const delta = parseInt(eff.slice(2), 10) || 0;

      switch (axis) {
        case "CM":
          setCM((v) => v + delta);
          break;
        case "AB":
          setAB((v) => v + delta);
          break;
        case "SL":
          setSL((v) => v + delta);
          break;
        case "EI":
          setEI((v) => v + delta);
          break;
        default:
          break;
      }
    }

    // Play exit animation, then advance and play enter animation
    setStage("exit");
    setTimeout(() => {
      setIdx((n) => n + 1);
      setStage("enter");
    }, ANIM_MS);
  };

  return (
    <div>
      <div
        className={`max-w-2xl mx-auto p-6 bg-white/80 rounded-lg shadow transition-all duration-300 ${
          stage === "enter"
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-4"
        }`}
      >
        <h2 className="text-2xl mb-4 text-gray-800">{q.question}</h2>

        <div className="grid gap-3">
          {["ans1", "ans2", "ans3", "ans4"].map((k) => (
            <button
              key={k}
              onClick={() => handleAnswer(k)}
              disabled={stage === "exit"}
              className={`w-full text-left px-4 py-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition text-black ${
                stage === "exit" ? "pointer-events-none opacity-60" : ""
              }`}
            >
              {q.answers[k]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
