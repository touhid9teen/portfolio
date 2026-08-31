export default function Navbar({ pathname, onNavigate }) {
  const navigateTo = (event, nextPath) => {
    event.preventDefault();
    onNavigate(nextPath);
  };

  if (pathname === "/blog") {
    return (
      <nav className="flex justify-end items-center w-full py-3">
        <div className="flex items-center gap-2 font-mono">
          <a
            href="/"
            className="px-3 py-1.5 rounded-full text-[0.8rem] font-semibold tracking-wide text-[#374151]"
            onClick={(e) => navigateTo(e, "/")}
          >
            <svg
              className="inline-block mr-1 -mt-0.5"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            back
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex justify-end items-center w-full py-3">
      <div className="flex items-center gap-2 font-mono">
        <a
          href="/blog"
          className="px-3 py-1.5 rounded-full text-[0.8rem] font-semibold tracking-wide text-[#374151]"
          onClick={(e) => navigateTo(e, "/blog")}
        >
          notes
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
