import "./AsciiGalaxy.css";
import {
  BACKDROP_BRIGHT_STARS,
  BACKDROP_GLOWS,
  BACKDROP_MICRO_STARS,
  BACKDROP_STARS,
} from "../galaxy/backdropStarData";
import renderBackdropStars from "../galaxy/renderBackdropStars.jsx";

export default function GalaxyBackdrop() {
  return (
    <div className="galaxy-backdrop" aria-hidden="true">
      <div className="galaxy-backdrop__wash" />
      {renderBackdropStars(BACKDROP_GLOWS, { className: "galaxy-backdrop__star--glow" })}
      {renderBackdropStars(BACKDROP_MICRO_STARS, {
        boxShadowFactor: 3.5,
        className: "galaxy-backdrop__star--micro",
      })}
      {renderBackdropStars(BACKDROP_STARS, { boxShadowFactor: 5 })}
      {renderBackdropStars(BACKDROP_BRIGHT_STARS, {
        boxShadowFactor: 7,
        className: "galaxy-backdrop__star--bright",
      })}
    </div>
  );
}
