import "./App.css";
import SplashCursor from "../shared/components/SplashCursor";
import BlogPosts from "../features/blog/components/BlogPosts";
import HeroCard from "../features/home/components/HeroCard";
import Navbar from "../shared/components/Navbar";
import useSceneController from "./hooks/useSceneController";
import { getBlogStageClass, getHeroStageClass, getNavStageClass } from "./utils/sceneClasses";

function App() {
  const scene = useSceneController();

  return (
    <div className="relative isolate min-h-screen flex flex-col justify-center">
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
      <div
        className={`relative z-10 mx-auto max-w-3xl px-6 py-4 max-sm:px-4 max-sm:py-2 ${
          scene.isTransitioning ? "pointer-events-none" : ""
        }`}
      >
        <div className={`scene-nav ${getNavStageClass(scene.navStage)}`}>
          <Navbar pathname={scene.pathname} onNavigate={scene.handleNavigate} />
        </div>
        {scene.showHomeStage ? (
          <main className="scene-stage scene-stage--home">
            {scene.heroStage !== "hidden" ? (
              <div className={`scene-panel ${getHeroStageClass(scene.heroStage)}`}>
                <HeroCard onNavigate={scene.handleNavigate} />
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
  );
}

export default App;
