import profilePic from "../assets/profile-small.png";
import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function HeroCard() {
  const badgeTextStyle = {
    color: "#c4b5fd",
    textShadow: `
      0 0 10px rgba(139, 92, 246, 0.35),
      0 0 22px rgba(99, 102, 241, 0.18)
    `,
  };

  const nameTextStyle = {
    color: "#f8fbff",
    textShadow: `
      0 0 12px rgba(147, 197, 253, 0.16),
      0 0 28px rgba(99, 102, 241, 0.22)
    `,
  };

  const subheadingTextStyle = {
    color: "#dbeafe",
    textShadow: `
      0 0 12px rgba(96, 165, 250, 0.14)
    `,
  };

  const accentLinkStyle = {
    color: "#67e8f9",
    textShadow: `
      0 0 12px rgba(103, 232, 249, 0.45)
    `,
  };

  const metaTextStyle = {
    color: "#a5b4fc",
    textShadow: `
      0 0 10px rgba(99, 102, 241, 0.22)
    `,
  };

  return (
    <header className="w-full flex items-center justify-center relative z-10 px-4">
      <div className="relative isolate flex flex-col items-center text-center gap-4 px-6 py-8 font-recoleta sm:px-10">
        <div className="absolute inset-x-2 inset-y-4 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.75),_rgba(15,23,42,0.28)_45%,_transparent_78%)] blur-2xl" />
        <div className="absolute inset-x-4 inset-y-6 -z-10 rounded-[36px] bg-white/[0.03] shadow-[0_24px_80px_rgba(2,6,23,0.65),0_0_40px_rgba(79,70,229,0.18)] backdrop-blur-[2px]" />

        {/* Profile Image with Neon Ring */}
        <div
          className="rounded-full p-[3px] shadow-[0_0_20px_4px_rgba(99,102,241,0.5)]"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4)",
          }}
        >
          <div className="h-18 w-18 rounded-full overflow-hidden border-2 border-black bg-black sm:h-22 sm:w-22">
            <img
              src={profilePic}
              alt="touhidul islam"
              className="h-full w-full scale-110 object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h4 className="mb-2">
            <span
              className="text-sm tracking-widest uppercase font-mono px-3 py-1 rounded bg-indigo-500/10"
              style={badgeTextStyle}
            >
              hi, i'm
            </span>
          </h4>

          {/* Name */}
          <h1
            className="text-4xl sm:text-5xl font-black tracking-tight leading-none mb-3"
            style={nameTextStyle}
          >
            Touhidul Islam
          </h1>

          {/* Role */}
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight mb-4"
            style={subheadingTextStyle}
          >
            software engineer at{" "}
            <a
              href="https://www.upaybd.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={accentLinkStyle}
              className="underline"
            >
              upay
            </a>
          </h2>

          {/* Location */}
          <p
            className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] mb-8"
            style={metaTextStyle}
          >
            <MapPin size={16} className="text-cyan-300" />
            <span>dhaka, bangladesh</span>
          </p>

          {/* Social Icons Section */}
          <ul
            className="flex justify-center items-center gap-5"
            aria-label="Social media"
          >
            <li>
              <a
                href="https://github.com/touhid9teen"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 
                           transition-all duration-300 flex items-center justify-center hover:scale-110 group"
                style={{
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.15)",
                }}
              >
                <FaGithub
                  size={24}
                  className="text-indigo-300 group-hover:text-white transition-colors"
                />
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/touhid19/"
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 
                           transition-all duration-300 flex items-center justify-center hover:scale-110 group"
                style={{
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.15)",
                }}
              >
                <FaLinkedinIn
                  size={24}
                  className="text-indigo-300 group-hover:text-white transition-colors"
                />
              </a>
            </li>

            <li>
              <a
                href="mailto:touhid.ru66@gmail.com"
                className="p-4 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 
                           transition-all duration-200 flex items-center justify-center hover:scale-110 group"
                style={{
                  boxShadow: "0 0 15px rgba(99, 102, 241, 0.15)",
                }}
              >
                <Mail
                  size={24}
                  className="text-indigo-300 group-hover:text-white transition-colors"
                />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
