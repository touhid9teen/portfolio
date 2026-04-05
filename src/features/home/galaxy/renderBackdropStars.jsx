function getBackdropStyle(star, boxShadowFactor) {
  return {
    left: `${star.left}%`,
    top: `${star.top}%`,
    width: `${star.size}px`,
    height: `${star.size}px`,
    backgroundColor: star.color,
    boxShadow: boxShadowFactor ? `0 0 ${star.size * boxShadowFactor}px ${star.color}` : undefined,
    filter: star.blur ? `blur(${star.blur}px)` : undefined,
    "--galaxy-star-opacity": star.opacity,
    "--galaxy-star-duration": `${star.duration}s`,
    "--galaxy-star-delay": `${star.delay}s`,
    "--galaxy-star-scale": star.scale,
  };
}

export default function renderBackdropStars(stars, { boxShadowFactor, className = "" } = {}) {
  return stars.map((star) => (
    <span
      key={star.id}
      className={`galaxy-backdrop__star ${className}`.trim()}
      style={getBackdropStyle(star, boxShadowFactor)}
    />
  ));
}
