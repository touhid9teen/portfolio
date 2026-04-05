export function getNavStageClass(navStage) {
  if (navStage === "enter") return "scene-nav--enter";
  if (navStage === "exit") return "scene-nav--exit";
  if (navStage === "hidden") return "scene-nav--hidden";
  return "";
}

export function getHeroStageClass(heroStage) {
  if (heroStage === "enter") return "scene-panel--hero-enter";
  if (heroStage === "exit") return "scene-panel--hero-exit";
  return "";
}

export function getBlogStageClass(blogStage) {
  if (blogStage === "enter") return "scene-panel--blog-enter";
  if (blogStage === "exit") return "scene-panel--blog-exit";
  return "";
}
