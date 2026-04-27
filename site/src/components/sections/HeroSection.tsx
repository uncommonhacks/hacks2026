import SectionContainer from './SectionContainer';
import './sections.css';

export default function HeroSection() {
  return (
    <SectionContainer index={0}>
      <img
        src="/assets/branding/new_logo_blue.png"
        alt="Uncommon Hacks"
        style={{
          width: 'clamp(240px, 60vmin, 1100px)',
          maxWidth: '94vw',
          maxHeight: '32vh',
          objectFit: 'contain',
          display: 'block',
          position: 'relative',
          left: '50%',
          transform: 'translateX(calc(-50% - 14px))',
          marginTop: 'clamp(-90px, -4vmin, -1rem)',
          marginBottom: '0',
        }}
      />
      <a
        href="https://forms.gle/hBwPZKyBmq4nfsh28"
        target="_blank"
        rel="noopener noreferrer"
        className="cta-button hero-cta"
      >
        Apply Now
      </a>
      <div className="hero-about">
        <p>
          UChicago&apos;s flagship hackathon <span className="thin-dash">—</span> 170 builders, 24 hours, the wildest
          ideas turned into real, working projects. Free food. Free swag. Workshops. Mentorship. Prizes.
        </p>
        <p className="hero-date">
          May 16 <span className="thin-dash">—</span> 17, 2026. Don&apos;t just watch <span className="thin-dash">—</span> build something uncommon.
        </p>
        <p className="hero-schedule-soon">Schedule coming soon...</p>
      </div>
    </SectionContainer>
  );
}
