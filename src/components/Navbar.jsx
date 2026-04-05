function getNavLinkClass(isActive) {
  return `text-[0.96rem] font-bold tracking-[0.08em] transition-colors duration-300 max-sm:text-[0.88rem] ${
    isActive
      ? "text-[#d8c8ff]"
      : "text-[#dbeafe] hover:text-[#93c5fd]"
  }`;
}

export default function Navbar({ pathname, onNavigate }) {
  const navigateTo = (event, nextPath) => {
    event.preventDefault();
    onNavigate(nextPath);
  };

  return (
    <nav className="flex items-center justify-between mb-16 pt-3 max-sm:mb-10 max-sm:flex-col max-sm:gap-3 max-sm:pt-2">
      <a
        href="/"
        className="font-mono text-[1.05rem] font-bold tracking-[0.03em] transition-colors hover:text-[#93c5fd] max-sm:text-[0.96rem]"
        onClick={(event) => navigateTo(event, "/")}
        style={{ color: "#c4b5fd" }}
      >
        touhid
      </a>

      <div className="flex items-center gap-1.5 font-mono max-sm:gap-1.5">
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
