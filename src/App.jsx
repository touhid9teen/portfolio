import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import AsciiGalaxy, { GalaxyBackdrop } from "./components/AsciiGalaxy";
import HeroCard from "./components/HeroCard";
import BlogPosts from "./components/BlogPosts";

const INITIAL_GALAXY_DELAY_MS = 2200;
const GALAXY_BRIDGE_DELAY_MS = 1400;
const NAV_ENTER_DURATION_MS = 980;
const NAV_EXIT_DURATION_MS = 560;
const HERO_ENTER_DURATION_MS = 1280;
const HERO_EXIT_DURATION_MS = 1320;
const BLOG_ENTER_DURATION_MS = 980;
const BLOG_EXIT_DURATION_MS = 620;

function normalizePathname(pathname) {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPathname === "/blog") {
    return "/blog";
  }

  return "/";
}

function App() {
  const initialPathname = normalizePathname(window.location.pathname);
  const [pathname, setPathname] = useState(initialPathname);
  const [showHomeStage, setShowHomeStage] = useState(true);
  const [showBlogStage, setShowBlogStage] = useState(false);
  const [navStage, setNavStage] = useState("hidden");
  const [heroStage, setHeroStage] = useState("hidden");
  const [blogStage, setBlogStage] = useState("hidden");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timersRef = useRef([]);

  const clearSceneTimers = () => {
    timersRef.current.forEach((timerId) => window.clearTimeout(timerId));
    timersRef.current = [];
  };

  const setNavVisibleSequence = () => {
    setNavStage("enter");
    timersRef.current.push(
      window.setTimeout(() => {
        setNavStage("visible");
      }, NAV_ENTER_DURATION_MS)
    );
  };

  const setNavHiddenSequence = () => {
    setNavStage("exit");
    timersRef.current.push(
      window.setTimeout(() => {
        setNavStage("hidden");
      }, NAV_EXIT_DURATION_MS)
    );
  };

  const setHeroVisibleSequence = () => {
    setShowHomeStage(true);
    setShowBlogStage(false);
    setBlogStage("hidden");
    setNavVisibleSequence();
    setHeroStage("enter");
    timersRef.current.push(
      window.setTimeout(() => {
        setHeroStage("visible");
        setIsTransitioning(false);
      }, HERO_ENTER_DURATION_MS)
    );
  };

  const setBlogVisibleSequence = () => {
    setShowHomeStage(false);
    setHeroStage("hidden");
    setShowBlogStage(true);
    setNavVisibleSequence();
    setBlogStage("enter");
    timersRef.current.push(
      window.setTimeout(() => {
        setBlogStage("visible");
        setIsTransitioning(false);
      }, BLOG_ENTER_DURATION_MS)
    );
  };

  const transitionToRoute = (nextPathname, syncHistory = false) => {
    if (nextPathname === pathname && !isTransitioning) {
      return;
    }

    clearSceneTimers();
    setIsTransitioning(true);
    setNavHiddenSequence();

    const pushHistory = () => {
      if (syncHistory) {
        window.history.pushState({}, "", nextPathname);
      }
    };

    if (pathname === "/") {
      setHeroStage("exit");
      timersRef.current.push(
        window.setTimeout(() => {
          setHeroStage("hidden");
        }, HERO_EXIT_DURATION_MS)
      );
      timersRef.current.push(
        window.setTimeout(() => {
          pushHistory();
          setPathname(nextPathname);
          window.scrollTo(0, 0);

          if (nextPathname === "/blog") {
            setShowHomeStage(false);
            setBlogVisibleSequence();
          } else {
            setHeroVisibleSequence();
          }
        }, HERO_EXIT_DURATION_MS + GALAXY_BRIDGE_DELAY_MS)
      );

      return;
    }

    if (pathname === "/blog") {
      setBlogStage("exit");
      timersRef.current.push(
        window.setTimeout(() => {
          setShowBlogStage(false);
          pushHistory();
          setPathname(nextPathname);
          window.scrollTo(0, 0);

          if (nextPathname === "/") {
            setShowHomeStage(true);
            timersRef.current.push(
              window.setTimeout(() => {
                setHeroVisibleSequence();
              }, GALAXY_BRIDGE_DELAY_MS)
            );
          } else {
            setBlogVisibleSequence();
          }
        }, BLOG_EXIT_DURATION_MS)
      );
    }
  };

  useEffect(() => {
    if (initialPathname === "/") {
      timersRef.current.push(
        window.setTimeout(() => {
          setHeroVisibleSequence();
        }, INITIAL_GALAXY_DELAY_MS)
      );
      return () => clearSceneTimers();
    }

    timersRef.current.push(
      window.setTimeout(() => {
        setShowHomeStage(false);
        setBlogVisibleSequence();
      }, INITIAL_GALAXY_DELAY_MS)
    );

    return () => clearSceneTimers();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextPathname = normalizePathname(window.location.pathname);

      if (nextPathname === pathname && !isTransitioning) {
        return;
      }

      transitionToRoute(nextPathname, false);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [pathname, isTransitioning]);

  const handleNavigate = (nextPath) => {
    const normalizedPathname = normalizePathname(nextPath);
    transitionToRoute(normalizedPathname, true);
  };

  return (
    <div className="relative isolate min-h-screen">
      <GalaxyBackdrop />

      <div
        className={`relative z-10 mx-auto max-w-3xl px-6 py-12 max-sm:px-4 max-sm:py-6 ${
          isTransitioning ? "pointer-events-none" : ""
        }`}
      >
        <div
          className={`scene-nav ${
            navStage === "enter"
              ? "scene-nav--enter"
              : navStage === "exit"
                ? "scene-nav--exit"
                : navStage === "hidden"
                  ? "scene-nav--hidden"
                  : ""
          }`}
        >
          <Navbar pathname={pathname} onNavigate={handleNavigate} />
        </div>

        {showHomeStage ? (
          <main className="scene-stage scene-stage--home">
            <AsciiGalaxy>
              {heroStage !== "hidden" ? (
                <div
                  className={`scene-panel ${
                    heroStage === "enter"
                      ? "scene-panel--hero-enter"
                      : heroStage === "exit"
                        ? "scene-panel--hero-exit"
                        : ""
                  }`}
                >
                  <HeroCard />
                </div>
              ) : null}
            </AsciiGalaxy>
          </main>
        ) : null}

        {showBlogStage ? (
          <section className="scene-stage scene-stage--blog">
            <div
              className={`scene-panel ${
                blogStage === "enter"
                  ? "scene-panel--blog-enter"
                  : blogStage === "exit"
                    ? "scene-panel--blog-exit"
                    : ""
              }`}
            >
              <BlogPosts />
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}

export default App;
