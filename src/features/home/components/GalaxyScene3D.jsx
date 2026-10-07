import { useEffect, useRef } from "react";
import createGalaxy3D from "../galaxy/createGalaxy3D";
import "./GalaxyScene3D.css";

/**
 * Fixed full-viewport WebGL galaxy layer.
 * phase: "hidden" | "showing" | "exiting"
 * - "showing": mounts the scene (once) and plays the enter fade
 * - "exiting": keeps the scene alive while the exit fade plays
 * - "hidden": unmounts and disposes everything
 */
export default function GalaxyScene3D({ phase }) {
  const hostRef = useRef(null);

  const isMounted = phase === "showing" || phase === "exiting";

  useEffect(() => {
    if (!isMounted) return undefined;
    return createGalaxy3D(hostRef.current);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`galaxy-3d ${phase === "showing" ? "galaxy-3d--enter" : ""} ${
        phase === "exiting" ? "galaxy-3d--exit" : ""
      }`}
    />
  );
}
