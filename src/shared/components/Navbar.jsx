function getNavLinkClass(isActive) {
  return `text-[0.96rem] font-bold tracking-[0.08em] transition-colors duration-300 max-sm:text-[0.88rem] ${
    isActive ? "text-[#d8c8ff]" : "text-[#dbeafe] hover:text-[#93c5fd]"
  }`;
}

export default function Navbar({ pathname, onNavigate }) {
  const navigateTo = (event, nextPath) => {
    event.preventDefault();
    onNavigate(nextPath);
  };

  if (pathname === "/blog") {
    return (
      <nav className="flex justify-between items-center w-full mb-16 pt-3 max-sm:mb-10 max-sm:pt-2">
        <a
          href="/"
          className="flex items-center gap-2 font-mono text-[0.96rem] font-bold tracking-[0.08em] transition-colors duration-300 text-[#dbeafe] hover:text-[#93c5fd] max-sm:text-[0.88rem]"
          onClick={(event) => navigateTo(event, "/")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          back
        </a>
      </nav>
    );
  }

  return (
    <nav className="flex justify-end items-center w-full mb-16 pt-3 max-sm:mb-10 max-sm:pt-2 relative z-50">
      <div className="flex items-center gap-1.5 font-mono max-sm:gap-1.5">
        <a
          href="/blog"
          className={getNavLinkClass(false)}
          onClick={(event) => navigateTo(event, "/blog")}
        >
          {/* more.. */}
        </a>
      </div>
    </nav>
  );
}
