export default function getGalaxyLayout(width) {
  if (width < 360) return { isMobile: true, scale: 0.48, height: 300 };
  if (width < 420) return { isMobile: true, scale: 0.58, height: 350 };
  if (width < 640) return { isMobile: true, scale: 0.72, height: 430 };
  return { isMobile: false, scale: 1, height: 607 };
}
