import { useEffect, useRef, useState } from "react";
import "./AsciiGalaxy.css";

const w = " .·:+*#@";
const d = 90;
const f = 46;
const k = 1500;
const u = 3;
const A = 0.3;
const S = -0.45;
const GALAXY_STAR_COLORS = [
  "#2563eb",
  "#4f46e5",
  "#7c3aed",
  "#8b5cf6",
  "#3b82f6",
  "#6366f1",
  "#c4b5fd",
  "#93c5fd",
];

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function createBackdropStars(
  count,
  {
    idPrefix = "star",
    leftRange = [-2, 102],
    topRange = [-4, 104],
    sizeRange = [0.8, 2.4],
    opacityRange = [0.4, 0.95],
    durationRange = [2.6, 7.2],
    delayRange = [-8, 0],
    blurRange = [0, 0],
    scaleRange = [1.18, 1.9],
  } = {}
) {
  return Array.from({ length: count }, (_, index) => ({
    id: `${idPrefix}-${index}`,
    left: randomInRange(...leftRange),
    top: randomInRange(...topRange),
    size: randomInRange(...sizeRange),
    opacity: randomInRange(...opacityRange),
    duration: randomInRange(...durationRange),
    delay: randomInRange(...delayRange),
    blur: randomInRange(...blurRange),
    scale: randomInRange(...scaleRange),
    color:
      GALAXY_STAR_COLORS[
        Math.floor(Math.random() * GALAXY_STAR_COLORS.length)
      ],
  }));
}

const I = [];
for (let s = 0; s < k; s++) {
  const Math_PI_2 = Math.PI * 2;
  const M = (s % u) / u * Math_PI_2;
  const h = Math.pow(Math.random(), 0.6) * 0.9;
  const x = h * 7;
  const g = M + x + (Math.random() - 0.5) * A;
  const m = 0.3 + (1 - h) * 0.5 + Math.random() * 0.2;
  I.push({
    angle: g,
    dist: h,
    brightness: Math.min(1, m),
    twinkleSpeed: 2 + Math.random() * 4,
    twinkleOffset: Math.random() * Math_PI_2,
    colorIndex: Math.floor(Math.random() * GALAXY_STAR_COLORS.length),
  });
}
const T = 250;
for (let s = 0; s < T; s++) {
  const Math_PI_2 = Math.PI * 2;
  const o = Math.random() * Math_PI_2;
  const M = 0.2 + Math.random() * 0.75;
  const h = 0.2 + Math.random() * 0.5;
  I.push({
    angle: o,
    dist: M,
    brightness: h,
    twinkleSpeed: 1 + Math.random() * 3,
    twinkleOffset: Math.random() * Math_PI_2,
    colorIndex: Math.floor(Math.random() * GALAXY_STAR_COLORS.length),
  });
}

const BACKDROP_MICRO_STARS = createBackdropStars(280, {
  idPrefix: "micro-star",
  sizeRange: [0.35, 1.05],
  opacityRange: [0.18, 0.68],
  durationRange: [2.2, 5.4],
  scaleRange: [1.08, 1.45],
});

const BACKDROP_STARS = createBackdropStars(180, {
  idPrefix: "star",
  sizeRange: [0.9, 2.5],
  opacityRange: [0.38, 0.92],
  durationRange: [2.8, 7.5],
  scaleRange: [1.18, 1.95],
});

const BACKDROP_BRIGHT_STARS = createBackdropStars(56, {
  idPrefix: "bright-star",
  sizeRange: [2.3, 4.8],
  opacityRange: [0.5, 0.96],
  durationRange: [4.6, 9.6],
  scaleRange: [1.25, 2.25],
});

const BACKDROP_GLOWS = createBackdropStars(28, {
  idPrefix: "glow-star",
  sizeRange: [5.5, 11.5],
  opacityRange: [0.14, 0.34],
  durationRange: [5.6, 11.8],
  blurRange: [10, 18],
  scaleRange: [1.55, 2.8],
});

function P(s) {
  const o = [];
  for (let t = 0; t < f; t++) {
    o[t] = [];
    for (let n = 0; n < d; n++) {
      o[t][n] = { brightness: 0, colorIndex: 0 };
    }
  }
  const M = s * S;
  for (const t of I) {
    const n = t.angle + M;
    const r = Math.cos(n) * t.dist;
    const l = Math.sin(n) * t.dist;
    const c = Math.floor((r + 1) * 0.5 * (d - 1));
    const e = Math.floor((l + 1) * 0.5 * (f - 1));
    if (c >= 0 && c < d && e >= 0 && e < f) {
      const a = 0.4 + 0.6 * Math.abs(Math.sin(s * t.twinkleSpeed + t.twinkleOffset));
      const i = t.brightness * a;
      if (i > o[e][c].brightness) {
        o[e][c].brightness = i;
        o[e][c].colorIndex = t.colorIndex;
      }
    }
  }
  const h = Math.floor(d / 2);
  const x = Math.floor(f / 2);
  const g = 8;
  for (let t = -8; t <= 8; t++) {
    for (let n = -12; n <= 12; n++) {
      const r = Math.sqrt((n * 0.5) ** 2 + t ** 2);
      if (r < g) {
        const l = n * 0.3 + t * 0.5;
        const c = 0.85 + 0.15 * Math.sin(s * 3 + l);
        const e = (1 - r / g) * c;
        const a = x + t;
        const i = h + n;
        if (a >= 0 && a < f && i >= 0 && i < d && e > o[a][i].brightness) {
          o[a][i].brightness = e;
          o[a][i].colorIndex = -1;
        }
      }
    }
  }
  const m = [];
  for (let t = 0; t < f; t++) {
    let n = "";
    for (let r = 0; r < d; r++) {
      const l = o[t][r];
      const c = Math.floor(l.brightness * (w.length - 1));
      const e = w[c];
      if (e === " ") {
        n += " ";
      } else {
        const a =
          l.colorIndex === -1 ? "#e0e7ff" : GALAXY_STAR_COLORS[l.colorIndex];
        n += `<span style="color:${a}">${e}</span>`;
      }
    }
    m.push(n);
  }
  return m.join("\n");
}

function getMobileLayout(width) {
  if (width < 360) {
    return { isMobile: true, scale: 0.48, height: 300 };
  }

  if (width < 420) {
    return { isMobile: true, scale: 0.58, height: 350 };
  }

  if (width < 640) {
    return { isMobile: true, scale: 0.72, height: 430 };
  }

  return { isMobile: false, scale: 1, height: 607 };
}

export function GalaxyBackdrop() {
  return (
    <div className="galaxy-backdrop" aria-hidden="true">
      <div className="galaxy-backdrop__wash" />

      {BACKDROP_GLOWS.map((star) => (
        <span
          key={star.id}
          className="galaxy-backdrop__star galaxy-backdrop__star--glow"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            filter: `blur(${star.blur}px)`,
            "--galaxy-star-opacity": star.opacity,
            "--galaxy-star-duration": `${star.duration}s`,
            "--galaxy-star-delay": `${star.delay}s`,
            "--galaxy-star-scale": star.scale,
          }}
        />
      ))}

      {BACKDROP_MICRO_STARS.map((star) => (
        <span
          key={star.id}
          className="galaxy-backdrop__star galaxy-backdrop__star--micro"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 3.5}px ${star.color}`,
            "--galaxy-star-opacity": star.opacity,
            "--galaxy-star-duration": `${star.duration}s`,
            "--galaxy-star-delay": `${star.delay}s`,
            "--galaxy-star-scale": star.scale,
          }}
        />
      ))}

      {BACKDROP_STARS.map((star) => (
        <span
          key={star.id}
          className="galaxy-backdrop__star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 5}px ${star.color}`,
            "--galaxy-star-opacity": star.opacity,
            "--galaxy-star-duration": `${star.duration}s`,
            "--galaxy-star-delay": `${star.delay}s`,
            "--galaxy-star-scale": star.scale,
          }}
        />
      ))}

      {BACKDROP_BRIGHT_STARS.map((star) => (
        <span
          key={star.id}
          className="galaxy-backdrop__star galaxy-backdrop__star--bright"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 ${star.size * 7}px ${star.color}`,
            "--galaxy-star-opacity": star.opacity,
            "--galaxy-star-duration": `${star.duration}s`,
            "--galaxy-star-delay": `${star.delay}s`,
            "--galaxy-star-scale": star.scale,
          }}
        />
      ))}
    </div>
  );
}

export default function AsciiGalaxy({ children }) {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(() => getMobileLayout(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setLayout(getMobileLayout(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const renderLoop = (time) => {
      if (containerRef.current) {
        containerRef.current.innerHTML = P(time / 1000);
      }
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
      ></pre>
      {children && (
        <div
          className={`relative z-10 w-full flex justify-center${
            layout.isMobile ? " px-2" : ""
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
