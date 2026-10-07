import { Mail, MapPin } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import profilePic from "../../../assets/profile-removebg-preview.png";
import { heroContent, heroSocialLinks } from "../data/heroContent";
import useHeroTilt3D from "../../../shared/hooks/useHeroTilt3D";
import "./HeroCard.css";

const socialIcons = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: Mail,
};

export default function HeroCard() {
  const tiltRef = useHeroTilt3D();

  return (
    <header className="hero-shell">
      <div ref={tiltRef} className="hero-panel">
        <div className="hero-avatar-card hero-block">
          <div className="hero-avatar-frame">
            <img
              className="hero-avatar-image"
              src={profilePic}
              alt={heroContent.imageAlt || heroContent.name}
              width="460"
              height="460"
              loading="eager"
              decoding="sync"
              fetchPriority="high"
            />
          </div>
        </div>

        <div className="hero-copy">
          <h2 className="hero-greeting hero-block">
            {heroContent.greeting}
          </h2>

          <h1 className="hero-headline hero-block">
            {heroContent.headline}
          </h1>

          <p className="hero-subtitle hero-block">
            <span className="hero-subtitle-line">
              A Frontend Engineer passionate about turning ideas into clean, intuitive web
              experiences.
            </span>{" "}
            <span className="hero-subtitle-line">
              Currently building thoughtful digital products at{" "}
              <a
                className="hero-company"
                href={heroContent.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Upay
              </a>
              .
            </span>
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
