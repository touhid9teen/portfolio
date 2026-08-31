export default function Navbar({ pathname, onNavigate }) {
  const navigateTo = (event, nextPath) => {
    event.preventDefault();
    onNavigate(nextPath);
  };

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `px-3 py-1.5 rounded-full text-[0.8rem] font-semibold tracking-wide transition-all duration-200 ${
      isActive(path)
        ? "bg-[#111] text-white"
        : "text-[#6b7280] hover:text-[#111] hover:bg-[#f3f4f6]"
    }`;

  return (
    <nav className="flex justify-center items-center w-full py-3">
      <div className="flex items-center gap-2 font-mono">
        <a
          href="/"
          className={linkClass("/")}
          onClick={(e) => navigateTo(e, "/")}
        >
          home
        </a>
        <a
          href="/blog"
          className={linkClass("/blog")}
          onClick={(e) => navigateTo(e, "/blog")}
        >
          blog
        </a>
      </div>
    </nav>
  );
}
