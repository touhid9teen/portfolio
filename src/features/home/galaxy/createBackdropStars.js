import { GALAXY_STAR_COLORS } from "./galaxyPalette";

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

export default function createBackdropStars(count, options = {}) {
  const {
    idPrefix = "star",
    leftRange = [-2, 102],
    topRange = [-4, 104],
    sizeRange = [0.8, 2.4],
    opacityRange = [0.4, 0.95],
    durationRange = [2.6, 7.2],
    delayRange = [-8, 0],
    blurRange = [0, 0],
    scaleRange = [1.18, 1.9],
  } = options;
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
    color: GALAXY_STAR_COLORS[Math.floor(Math.random() * GALAXY_STAR_COLORS.length)],
  }));
}
