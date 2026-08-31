import { useState, useEffect } from "react";

export default function Loader({ onComplete }) {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [phase, setPhase] = useState("writing");

  const text = "welcome";

  useEffect(() => {
    if (visibleLetters < text.length) {
      const timer = setTimeout(() => {
        setVisibleLetters((prev) => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      const t1 = setTimeout(() => setPhase("pause"), 600);
      const t2 = setTimeout(() => setPhase("fading"), 1200);
      const t3 = setTimeout(() => onComplete?.(), 1800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [visibleLetters, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-600 ${
        phase === "fading" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        {/* Letter by letter text */}
        <h1 className="font-recoleta text-4xl sm:text-5xl font-bold text-[#111] tracking-tight">
          {text.split("").map((char, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-300 ${
                i < visibleLetters
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Cursor blink */}
        <div
          className={`w-[2px] h-5 bg-[#111] rounded-full transition-opacity duration-300 ${
            visibleLetters >= text.length ? "opacity-0" : "animate-pulse"
          }`}
        />
      </div>
    </div>
  );
}
