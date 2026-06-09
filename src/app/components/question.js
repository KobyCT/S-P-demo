"use client";

import { useState } from "react";
import questionsData from "../asset/questions.json";

export default function Question({ startIndex = 0 }) {
  const [idx, setIdx] = useState(startIndex);

  const q = questionsData.questions[idx];
  if (!q) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center text-gray-700">
        No more questions.
      </div>
    );
  }

  const handleAnswer = (ansKey) => {
    // Placeholder: effects are in q.effects (e.g. "A+2"); extend this to track scores.
    // Advance to next question for now.
    setIdx((n) => n + 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white/80 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        {q.question}
      </h2>

      <div className="grid gap-3">
        {["ans1", "ans2", "ans3", "ans4"].map((k) => (
          <button
            key={k}
            onClick={() => handleAnswer(k)}
            className="w-full text-left px-4 py-3 border rounded-md bg-gray-50 hover:bg-gray-100 transition"
          >
            {q.answers[k]}
          </button>
        ))}
      </div>
    </div>
  );
}
