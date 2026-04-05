import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import profilePic from "../assets/profile.webp";
import { heroContent, heroSocialLinks } from "../data/heroContent";
import "./HeroCard.css";

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: Mail,
};

export default function HeroCard() {
  return (
    <header className="hero-shell">
      <div className="hero-panel">
        <div className="hero-avatar-card hero-block">
          <div className="hero-avatar-ring">
            <div className="hero-avatar-frame">
              <img
                className="hero-avatar-image"
                src={profilePic}
                alt={heroContent.imageAlt}
                width="460"
                height="460"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>

        <div className="hero-copy">
          <p className="hero-badge hero-block">{heroContent.greeting}</p>
          <h1 className="hero-name hero-block">{heroContent.name}</h1>
          <h2 className="hero-role hero-block">
            {heroContent.rolePrefix}{" "}
            <a
              className="hero-company"
              href={heroContent.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {heroContent.companyName}
            </a>
          </h2>
          <p className="hero-meta hero-block">
            <MapPin className="hero-meta-icon" size={16} />
            <span>{heroContent.location}</span>
          </p>

          <ul className="hero-social-list" aria-label="Social media">
            {heroSocialLinks.map((link) => {
              const Icon = socialIcons[link.id];

              return (
                <li key={link.id}>
                  <a
                    className="hero-social-link"
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                  >
                    <Icon className="hero-social-icon" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
