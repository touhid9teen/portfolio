function getNavLinkClass(isActive) {
  return `transition-colors ${
    isActive ? "text-[#c4b5fd]" : "text-fg hover:text-[#93c5fd]"
  }`;
}

export default function Navbar({ pathname, onNavigate }) {
  const navigateTo = (event, nextPath) => {
    event.preventDefault();
    onNavigate(nextPath);
  };

  return (
    <nav className="flex items-center justify-between mb-16 text-sm max-sm:mb-10 max-sm:flex-col max-sm:gap-3 max-sm:text-xs">
      <a
        href="/"
        className="font-mono transition-colors hover:text-[#93c5fd]"
        onClick={(event) => navigateTo(event, "/")}
        style={{
          color: "#c4b5fd",
          textShadow: `
            0 0 10px rgba(139, 92, 246, 0.35),
            0 0 20px rgba(79, 70, 229, 0.2)
          `,
        }}
      >
        touhid
      </a>

      <div className="flex items-center gap-1 text-fg-muted font-mono max-sm:gap-1.5">
        <a
          href="/"
          className={getNavLinkClass(pathname === "/")}
          onClick={(event) => navigateTo(event, "/")}
        >
          home
        </a>
        <span className="text-[#7c3aed]/70">·</span>
        <a
          href="/blog"
          className={getNavLinkClass(pathname === "/blog")}
          onClick={(event) => navigateTo(event, "/blog")}
        >
          blog
        </a>
      </div>
    </nav>
  );
}
