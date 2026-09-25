import "./App.css";
import { useState, useCallback } from "react";
import cornerImage from "../assets/pngegg4.png";
import Loader from "../shared/components/Loader";
import SplashCursor from "../shared/components/SplashCursor";
import BlogPosts from "../features/blog/components/BlogPosts";
import HeroCard from "../features/home/components/HeroCard";
import Navbar from "../shared/components/Navbar";
import useSceneController from "./hooks/useSceneController";
import { getBlogStageClass, getHeroStageClass, getNavStageClass } from "./utils/sceneClasses";

function App() {
  const scene = useSceneController();
  const [loading, setLoading] = useState(true);
  const handleLoadComplete = useCallback(() => setLoading(false), []);

  if (loading) {
    return <Loader onComplete={handleLoadComplete} />;
  }

  return (
    <div
      className={`relative isolate flex flex-col ${
        scene.pathname === "/blog"
          ? "min-h-screen"
          : "h-dvh overflow-hidden" /* home always fits exactly one screen — no scroll */
      }`}
    >
      {/* Decorative corner accents — home only, one per corner, rotated
          clockwise: 90° → 180° → 270° → 360°. Mounted under the exact same
          condition and with the same panel class as the hero, so the corners
          always enter and exit together with the content — never before it. */}
      {scene.pathname === "/" && scene.showHomeStage && scene.heroStage !== "hidden" && (
        <div className={`corner-decor-layer scene-panel ${getHeroStageClass(scene.heroStage)}`}>
          <img className="corner-decor corner-decor--tl" src={cornerImage} alt="" aria-hidden="true" decoding="async" draggable="false" />
          <img className="corner-decor corner-decor--tr" src={cornerImage} alt="" aria-hidden="true" decoding="async" draggable="false" />
          <img className="corner-decor corner-decor--br" src={cornerImage} alt="" aria-hidden="true" decoding="async" draggable="false" />
          <img className="corner-decor corner-decor--bl" src={cornerImage} alt="" aria-hidden="true" decoding="async" draggable="false" />
        </div>
      )}
      <div
        className={`flex-1 min-h-0 flex flex-col transition-all duration-500 ${
          scene.pathname === "/blog"
            ? "justify-start items-start pt-24"
            : "justify-center items-center" /* centered: fills the screen without scroll */
        }`}
      >
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#A855F7"
      />
      <div className="fixed top-0 left-[60%] -translate-x-1/2 z-50 p-4">
        <div className={`scene-nav ${getNavStageClass(scene.navStage)}`}>
          <Navbar pathname={scene.pathname} onNavigate={scene.handleNavigate} />
        </div>
      </div>
      <div
        className={`relative z-10 mx-auto max-w-3xl px-6 py-4 max-sm:px-4 max-sm:py-2 ${
          scene.isTransitioning ? "pointer-events-none" : ""
        }`}
      >
        {scene.showHomeStage ? (
          <main className="scene-stage scene-stage--home">
            {scene.heroStage !== "hidden" ? (
              <div className={`scene-panel ${getHeroStageClass(scene.heroStage)}`}>
                <HeroCard />
              </div>
            ) : null}
          </main>
        ) : null}
        {scene.showBlogStage ? (
          <section className="scene-stage scene-stage--blog">
            <div className={`scene-panel ${getBlogStageClass(scene.blogStage)}`}>
              <BlogPosts />
            </div>
          </section>
        ) : null}
      </div>
      </div>
      <footer className={`relative z-10 text-center py-3 sm:py-4 mt-auto transition-all duration-500 ${scene.isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        <p className="text-[0.7rem] font-mono text-[#9ca3af] tracking-wide">
          © {new Date().getFullYear()}. all rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
