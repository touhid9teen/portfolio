import { GALAXY_STAR_COLORS } from "./galaxyPalette";

export const GRID_WIDTH = 90;
export const GRID_HEIGHT = 46;
export const ROTATION_SPEED = -0.45;

const ARM_COUNT = 3;
const POINT_COUNT = 1500;
const AMBIENT_COUNT = 250;
const ARM_SWAY = 0.3;

export const GALAXY_POINTS = [];

for (let index = 0; index < POINT_COUNT; index += 1) {
  const baseAngle = (index % ARM_COUNT) / ARM_COUNT * Math.PI * 2;
  const dist = Math.pow(Math.random(), 0.6) * 0.9;
  const angle = baseAngle + dist * 7 + (Math.random() - 0.5) * ARM_SWAY;
  const brightness = Math.min(1, 0.3 + (1 - dist) * 0.5 + Math.random() * 0.2);
  GALAXY_POINTS.push({
    angle,
    brightness,
    colorIndex: Math.floor(Math.random() * GALAXY_STAR_COLORS.length),
    dist,
    twinkleOffset: Math.random() * Math.PI * 2,
    twinkleSpeed: 2 + Math.random() * 4,
  });
}

for (let index = 0; index < AMBIENT_COUNT; index += 1) {
  GALAXY_POINTS.push({
    angle: Math.random() * Math.PI * 2,
    brightness: 0.2 + Math.random() * 0.5,
    colorIndex: Math.floor(Math.random() * GALAXY_STAR_COLORS.length),
    dist: 0.2 + Math.random() * 0.75,
    twinkleOffset: Math.random() * Math.PI * 2,
    twinkleSpeed: 1 + Math.random() * 3,
  });
}
