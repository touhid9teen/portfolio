import createBackdropStars from "./createBackdropStars";

export const BACKDROP_MICRO_STARS = createBackdropStars(280, {
  idPrefix: "micro-star",
  sizeRange: [0.35, 1.05],
  opacityRange: [0.18, 0.68],
  durationRange: [2.2, 5.4],
  scaleRange: [1.08, 1.45],
});

export const BACKDROP_STARS = createBackdropStars(180, {
  idPrefix: "star",
  sizeRange: [0.9, 2.5],
  opacityRange: [0.38, 0.92],
  durationRange: [2.8, 7.5],
  scaleRange: [1.18, 1.95],
});

export const BACKDROP_BRIGHT_STARS = createBackdropStars(56, {
  idPrefix: "bright-star",
  sizeRange: [2.3, 4.8],
  opacityRange: [0.5, 0.96],
  durationRange: [4.6, 9.6],
  scaleRange: [1.25, 2.25],
});

export const BACKDROP_GLOWS = createBackdropStars(28, {
  idPrefix: "glow-star",
  sizeRange: [5.5, 11.5],
  opacityRange: [0.14, 0.34],
  durationRange: [5.6, 11.8],
  blurRange: [10, 18],
  scaleRange: [1.55, 2.8],
});
