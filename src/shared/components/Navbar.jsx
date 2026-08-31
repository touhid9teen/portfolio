export default function Navbar({ pathname, onNavigate }) {
  const navigateTo = (event, nextPath) => {
    event.preventDefault();
    onNavigate(nextPath);
  };

  const isActive = (path) => pathname === path;

  const linkClass = (path) =>
    `px-3 py-1.5 rounded-full text-[0.8rem] font-semibold tracking-wide ${
      isActive(path)
        ? "bg-[#111] text-white"
        : "text-[#6b7280]"
    }`;

  return (
    <nav className="flex justify-end items-center w-full py-3">
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
          <svg
            className="inline-block ml-1 -mt-0.5"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
