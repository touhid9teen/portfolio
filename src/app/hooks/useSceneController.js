import { useEffect, useRef, useState } from "react";
import { BLOG_ENTER_DURATION_MS, BLOG_EXIT_DURATION_MS, GALAXY_BRIDGE_DELAY_MS, HERO_ENTER_DURATION_MS, HERO_EXIT_DURATION_MS, INITIAL_GALAXY_DELAY_MS, NAV_ENTER_DURATION_MS, NAV_EXIT_DURATION_MS, normalizePathname } from "../config/sceneConfig";

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
    setNavSequence("enter", NAV_ENTER_DURATION_MS);
    setHeroStage("enter");
    schedule(() => {
      setHeroStage("visible");
      setIsTransitioning(false);
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
      setHeroStage("exit");
      schedule(() => setHeroStage("hidden"), HERO_EXIT_DURATION_MS);
      schedule(() => {
        syncUrl();
        setPathname(nextPathname);
        window.scrollTo(0, 0);
        nextPathname === "/blog" ? showBlog() : showHero();
      }, HERO_EXIT_DURATION_MS + GALAXY_BRIDGE_DELAY_MS);
      return;
    }
    setBlogStage("exit");
    schedule(() => {
      setShowBlogStage(false);
      syncUrl();
      setPathname(nextPathname);
      window.scrollTo(0, 0);
      if (nextPathname === "/") {
        setShowHomeStage(true);
        schedule(showHero, GALAXY_BRIDGE_DELAY_MS);
        return;
      }
      showBlog();
    }, BLOG_EXIT_DURATION_MS);
  };
  useEffect(() => {
    const showIntroScene = initialPathname === "/" ? showHero : () => (setShowHomeStage(false), showBlog());
    schedule(showIntroScene, INITIAL_GALAXY_DELAY_MS);
    return clearSceneTimers;
  }, []);
  useEffect(() => {
    const handlePopState = () => transitionToRoute(normalizePathname(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [pathname, isTransitioning]);
  return { blogStage, heroStage, isTransitioning, navStage, pathname, showBlogStage, showHomeStage, handleNavigate: (nextPath) => transitionToRoute(normalizePathname(nextPath), true) };
}
