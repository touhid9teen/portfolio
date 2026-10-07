import { useEffect, useRef } from "react";

const LERP_FACTOR = 0.12;
const SETTLE_EPSILON = 0.01;

/**
 * 3D cursor tilt for the hero card.
 * Writes --tilt-x / --tilt-y / --glare-x / --glare-y CSS variables on the
 * returned ref element from a rAF lerp loop (no React re-renders).
 * Disabled for touch devices and reduced-motion users.
 */
export default function useHeroTilt3D({ maxTiltXDeg = 7, maxTiltYDeg = 10 } = {}) {
  const tiltRef = useRef(null);

  useEffect(() => {
    const element = tiltRef.current;
    if (!element) return undefined;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarsePointer || reducedMotion) return undefined;

    let frameId = 0;
    let running = true;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let glareTarget = 0;
    let glareCurrent = 0;
    let glareOpacity = 0;

    const handlePointerMove = (event) => {
      const rect = element.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      target.x = nx * maxTiltYDeg;
      target.y = -ny * maxTiltXDeg;
      glareTarget = nx * 100;
      glareOpacity = 1;
    };

    const handlePointerLeave = () => {
      target.x = 0;
      target.y = 0;
      glareOpacity = 0;
    };

    const tick = () => {
      if (!running) return;
      current.x += (target.x - current.x) * LERP_FACTOR;
      current.y += (target.y - current.y) * LERP_FACTOR;
      glareCurrent += (glareTarget - glareCurrent) * LERP_FACTOR;
      element.style.setProperty("--tilt-x", `${current.x.toFixed(3)}deg`);
      element.style.setProperty("--tilt-y", `${current.y.toFixed(3)}deg`);
      element.style.setProperty("--glare-x", `${glareCurrent.toFixed(2)}%`);
      element.style.setProperty("--glare-opacity", glareOpacity.toFixed(2));
      if (
        Math.abs(target.x - current.x) < SETTLE_EPSILON &&
        Math.abs(target.y - current.y) < SETTLE_EPSILON &&
        Math.abs(glareTarget - glareCurrent) < SETTLE_EPSILON &&
        glareOpacity === 0
      ) {
        running = false;
        return; // settle — no rAF churn while idle
    }
      frameId = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!running) {
        running = true;
        frameId = requestAnimationFrame(tick);
      }
    };

    const onMove = (event) => {
      handlePointerMove(event);
      wake();
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", handlePointerLeave);
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
      element.style.removeProperty("--glare-x");
      element.style.removeProperty("--glare-opacity");
    };
  }, [maxTiltXDeg, maxTiltYDeg]);

  return tiltRef;
}
