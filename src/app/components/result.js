"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import cake1 from "../asset/cake.jpg";

export default function Result() {
  const params = useSearchParams();
  const name = params?.get("name") || "Friend";
  const type = (params?.get("type") || "default").toLowerCase();

  const cakes = {
    cozy: {
      img: cake1,
      title: "Cozy Vanilla",
      desc: "Warm, soft, and comforting — just like a hug in cake form.",
    },
    bold: {
      img: cake1,
      title: "Bold Chocolate",
      desc: "Rich, decisive, and full of character — for those who go after what they want.",
    },
    floral: {
      img: cake1,
      title: "Floral Delight",
      desc: "Light, fragrant, and elegant — a delicate choice for refined tastes.",
    },
    default: {
      img: cake1,
      title: "Surprise Cake",
      desc: "Unique and fun — you keep people guessing (in a good way).",
    },
  };

  const cake = cakes[type] || cakes.default;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/90 rounded-lg shadow text-black">
      <h1 className="text-3xl font-bold mb-4">{cake.title}</h1>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-80 h-64 relative rounded overflow-hidden">
          <Image
            src={cake.img}
            alt={cake.title}
            width={320}
            height={256}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1">
          <p className="text-gray-800 mb-4">{cake.desc}</p>

          <div className="mt-4 p-4 bg-gray-50 border rounded">
            <h2 className="font-semibold mb-2">A letter to {name}</h2>

            <p>Dear {name},</p>

            <p className="mt-3">
              Congratulations — based on your answers, your cake personality is
              <strong> {cake.title}</strong>. This means you bring warmth and
              character to the people around you. Keep being curious and
              generous — and treat yourself to a slice today.
            </p>

            <p className="mt-4 font-medium">With sweet regards,</p>
            <p>The Quiz Team</p>
          </div>
        </div>
      </div>
    </div>
  );
}
