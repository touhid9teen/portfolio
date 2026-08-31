import { useState, useEffect } from "react";

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState("writing"); // writing → pause → fading

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("pause"), 1200);
    const t2 = setTimeout(() => setPhase("fading"), 1800);
    const t3 = setTimeout(() => onComplete?.(), 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-600 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Signature text */}
        <h1
          className={`font-recoleta text-4xl sm:text-5xl font-bold text-[#111] tracking-tight transition-all duration-500 ${
            phase === "writing"
              ? "opacity-100 translate-y-0"
              : "opacity-100 translate-y-0"
          }`}
        >
          touhid
        </h1>

        {/* Underline animation */}
        <div className="relative w-full h-[2px] bg-[#e5e7eb] overflow-hidden rounded-full">
          <div
            className={`absolute inset-y-0 left-0 bg-[#111] rounded-full transition-all duration-1000 ease-out ${
              phase === "writing" ? "w-full" : "w-full"
            }`}
            style={{
              width: phase === "writing" ? "0%" : "100%",
              transition: "width 1s ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
}
