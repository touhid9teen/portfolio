import { useEffect, useRef, useState } from "react";
import { BLOG_ENTER_DURATION_MS, BLOG_EXIT_DURATION_MS, GALAXY_BRIDGE_DELAY_MS, HERO_ENTER_DURATION_MS, HERO_EXIT_DURATION_MS, INITIAL_GALAXY_DELAY_MS, NAV_ENTER_DURATION_MS, NAV_EXIT_DURATION_MS, normalizePathname } from "../config/sceneConfig";

// Session flag — true only on the very first page load
const isFirstLoad = !window.sessionStorage.getItem("galaxy_loaded");
if (isFirstLoad) window.sessionStorage.setItem("galaxy_loaded", "1");

export default function useSceneController() {
  const initialPathname = normalizePathname(window.location.pathname);
  const [pathname, setPathname] = useState(initialPathname);
  const [showHomeStage, setShowHomeStage] = useState(true);
  const [showBlogStage, setShowBlogStage] = useState(false);
  const [navStage, setNavStage] = useState("hidden");
  const [heroStage, setHeroStage] = useState("hidden");
  const [blogStage, setBlogStage] = useState("hidden");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timersRef = useRef([]);
  const schedule = (callback, delay) => timersRef.current.push(window.setTimeout(callback, delay));
  const clearSceneTimers = () => (timersRef.current.forEach(window.clearTimeout), (timersRef.current = []));
  const setNavSequence = (stage, duration) => {
    setNavStage(stage);
    schedule(() => setNavStage(stage === "enter" ? "visible" : "hidden"), duration);
  };
  const showHero = () => {
    setShowHomeStage(true);
    setShowBlogStage(false);
    setBlogStage("hidden");
    setHeroStage("enter");
    schedule(() => {
      setHeroStage("visible");
      setIsTransitioning(false);
      // Nav + arrow appear AFTER hero content is fully loaded
      setNavSequence("enter", NAV_ENTER_DURATION_MS);
    }, HERO_ENTER_DURATION_MS);
  };
  const showBlog = () => {
    setShowHomeStage(false);
    setHeroStage("hidden");
    setShowBlogStage(true);
    setNavSequence("enter", NAV_ENTER_DURATION_MS);
    setBlogStage("enter");
    schedule(() => {
      setBlogStage("visible");
      setIsTransitioning(false);
    }, BLOG_ENTER_DURATION_MS);
  };
  const transitionToRoute = (nextPathname, syncHistory = false) => {
    if (nextPathname === pathname && !isTransitioning) return;
    clearSceneTimers();
    setIsTransitioning(true);
    setNavSequence("exit", NAV_EXIT_DURATION_MS);
    const syncUrl = () => syncHistory && window.history.pushState({}, "", nextPathname);

    if (pathname === "/") {
      // home → blog: hero + galaxy exit together, instantly switch to blog (no galaxy-alone pause)
      setHeroStage("exit");
      schedule(() => setHeroStage("hidden"), HERO_EXIT_DURATION_MS);
      schedule(() => {
        syncUrl();
        setPathname(nextPathname);
        window.scrollTo(0, 0);
        showBlog();
      }, HERO_EXIT_DURATION_MS); // no GALAXY_BRIDGE_DELAY_MS — go straight to blog
      return;
    }

    // blog → home: blog exits, then galaxy shows alone briefly, then hero fades in
    setBlogStage("exit");
    schedule(() => {
      setShowBlogStage(false);
      syncUrl();
      setPathname(nextPathname);
      window.scrollTo(0, 0);
      if (nextPathname === "/") {
        setShowHomeStage(true);
        // Show galaxy alone for GALAXY_BRIDGE_DELAY_MS, then fade hero in (like first load)
        schedule(showHero, GALAXY_BRIDGE_DELAY_MS);
        return;
      }
      showBlog();
    }, BLOG_EXIT_DURATION_MS);
  };
  useEffect(() => {
    // Galaxy intro delay only on the very first page load; instant on all subsequent navigations
    const introDelay = isFirstLoad ? INITIAL_GALAXY_DELAY_MS : 0;
    const showIntroScene = initialPathname === "/" ? showHero : () => (setShowHomeStage(false), showBlog());
    schedule(showIntroScene, introDelay);
    return clearSceneTimers;
  }, []);
  useEffect(() => {
    const handlePopState = () => transitionToRoute(normalizePathname(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname, isTransitioning]);
  return { blogStage, heroStage, isTransitioning, navStage, pathname, showBlogStage, showHomeStage, handleNavigate: (nextPath) => transitionToRoute(normalizePathname(nextPath), true) };
}
