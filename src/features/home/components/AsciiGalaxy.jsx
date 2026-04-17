import { useEffect, useRef, useState } from "react";
import getGalaxyLayout from "../galaxy/getGalaxyLayout";
import renderAsciiGalaxy from "../galaxy/renderAsciiGalaxy";

export default function AsciiGalaxy({ children, onNavigate, navStage, navStageClass }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(() =>
    getGalaxyLayout(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => setLayout(getGalaxyLayout(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const renderLoop = (time) => {
      if (containerRef.current)
        containerRef.current.innerHTML = renderAsciiGalaxy(time / 1000);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className="relative flex justify-center items-center mb-6 h-[607px] w-full"
      style={
        layout.isMobile
          ? { height: `${layout.height}px`, overflow: "hidden" }
          : { height: `${layout.height}px` }
      }
    >
      <pre
        ref={containerRef}
        className="absolute w-max h-[607px] font-mono text-xs leading-[1.1] select-none z-0"
        style={
          layout.isMobile
            ? {
                fontFamily: '"Monaspace Neon", monospace',
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) scale(${layout.scale})`,
                transformOrigin: "center",
              }
            : { fontFamily: '"Monaspace Neon", monospace' }
        }
      />

      {/* Arrow + More button — shown only after content loads, synced with nav bar */}
      {navStage !== "hidden" && (
        <div className={`absolute inset-0 z-40 pointer-events-none scene-nav ${navStageClass}`}>
          <a 
            href="/portfolio/blog"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) {
                onNavigate("/blog"); // router exclusively expects exactly "/blog"
              } else {
                window.location.href = "/portfolio/blog";
              }
            }}
            className="absolute top-4 right-2 w-20 h-20 sm:top-[-20px] sm:right-0 sm:w-32 sm:h-32 md:top-[-40px] md:w-40 md:h-40 lg:top-[-60px] lg:right-[-20px] lg:w-44 lg:h-44 pointer-events-auto drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all duration-300 block group cursor-pointer"
          >
            <span style={{ fontFamily: 'var(--font-recoleta)' }} className="absolute -top-3 sm:-top-6 lg:-top-8 -right-2 sm:-right-8 lg:-right-10 flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full transition-all duration-300 text-[11px] sm:text-lg lg:text-xl text-[#93c5fd] group-hover:text-white group-hover:scale-[1.05] group-active:scale-95 z-40">
              more...
            </span>

            {/* Responsive Elegant Starry Spiral Arrow */}
            <svg
              viewBox="0 0 150 150"
              className="w-full h-full opacity-90 overflow-visible transition-transform duration-300 group-hover:scale-[1.02]"
            >
          <defs>
            <linearGradient
              id="starGradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#c084fc" /> {/* Light purple */}
              <stop offset="50%" stopColor="#a855f7" /> {/* Deep purple */}
              <stop offset="100%" stopColor="#93c5fd" /> {/* Star blue */}
            </linearGradient>
          </defs>

          {/* the elegant spiral path matching star/purple gradient */}
          <path
            d="M 30 130 C 80 150, 140 120, 110 70 C 80 20, 30 50, 60 100 C 90 150, 160 90, 142 28"
            fill="none"
            stroke="url(#starGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="1 6"
          />

          {/* Main sparkling star at the end */}
          <g transform="translate(133, 13) scale(0.6)">
            <path
              d="M 15 0 Q 15 15 30 15 Q 15 15 15 30 Q 15 15 0 15 Q 15 15 15 0 Z"
              fill="#93c5fd"
            />
          </g>

          {/* Small decorative stars along the path */}
          <g transform="translate(105, 75) scale(0.2) rotate(20)">
            <path
              d="M 15 0 Q 15 15 30 15 Q 15 15 15 30 Q 15 15 0 15 Q 15 15 15 0 Z"
              fill="#c084fc"
              opacity="0.9"
            />
          </g>
          <g transform="translate(55, 95) scale(0.3) rotate(45)">
            <path
              d="M 15 0 Q 15 15 30 15 Q 15 15 15 30 Q 15 15 0 15 Q 15 15 15 0 Z"
              fill="#e9d5ff"
              opacity="0.7"
            />
          </g>
          <g transform="translate(45, 125) scale(0.15) rotate(10)">
            <path
              d="M 15 0 Q 15 15 30 15 Q 15 15 15 30 Q 15 15 0 15 Q 15 15 15 0 Z"
              fill="#93c5fd"
              opacity="0.8"
            />
          </g>
        </svg>
      </a>
        </div>
      )}

      {children && (
        <div
          className={`relative z-10 w-full flex justify-center${layout.isMobile ? " px-2" : ""}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
