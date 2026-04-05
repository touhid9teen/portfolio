import { useEffect, useRef, useState } from "react";
import getGalaxyLayout from "../galaxy/getGalaxyLayout";
import renderAsciiGalaxy from "../galaxy/renderAsciiGalaxy";

export default function AsciiGalaxy({ children }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(() => getGalaxyLayout(window.innerWidth));

  useEffect(() => {
    const handleResize = () => setLayout(getGalaxyLayout(window.innerWidth));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const renderLoop = (time) => {
      if (containerRef.current) containerRef.current.innerHTML = renderAsciiGalaxy(time / 1000);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    animationFrameId = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div
      className="relative flex justify-center items-center mb-6 h-[607px] w-full"
      style={layout.isMobile ? { height: `${layout.height}px`, overflow: "hidden" } : { height: `${layout.height}px` }}
    >
      <pre
        ref={containerRef}
        className="absolute w-max h-[607px] font-mono text-xs leading-[1.1] select-none z-0"
        style={layout.isMobile ? {
          fontFamily: '"Monaspace Neon", monospace',
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${layout.scale})`,
          transformOrigin: "center",
        } : { fontFamily: '"Monaspace Neon", monospace' }}
      />
      {children && (
        <div className={`relative z-10 w-full flex justify-center${layout.isMobile ? " px-2" : ""}`}>
          {children}
        </div>
      )}
    </div>
  );
}
