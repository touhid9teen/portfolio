import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import AsciiGalaxy from "./components/AsciiGalaxy";
import HeroCard from "./components/HeroCard";
import BlogPosts from "./components/BlogPosts";

function normalizePathname(pathname) {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";

  if (normalizedPathname === "/blog") {
    return "/blog";
  }

  return "/";
}

function App() {
  const [pathname, setPathname] = useState(() =>
    normalizePathname(window.location.pathname)
  );

  useEffect(() => {
    const handlePopState = () => {
      setPathname(normalizePathname(window.location.pathname));
      window.scrollTo(0, 0);
    };

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (nextPath) => {
    const normalizedPathname = normalizePathname(nextPath);

    if (normalizedPathname === pathname) {
      return;
    }

    window.history.pushState({}, "", normalizedPathname);
    setPathname(normalizedPathname);
    window.scrollTo(0, 0);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Navbar pathname={pathname} onNavigate={handleNavigate} />

      {pathname === "/blog" ? (
        <BlogPosts />
      ) : (
        <main>
          <AsciiGalaxy>
            <HeroCard />
          </AsciiGalaxy>
        </main>
      )}
    </div>
  );
}

export default App;
