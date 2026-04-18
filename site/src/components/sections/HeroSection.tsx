import SectionContainer from './SectionContainer';
import './sections.css';

export default function HeroSection() {
  return (
    <SectionContainer index={0}>
      <img
        src="/assets/branding/new_logo_blue.png"
        alt="Uncommon Hacks"
        style={{ width: '950px', maxWidth: '100vw', display: 'block', position: 'relative', left: '50%', transform: 'translateX(-50%)', marginTop: 'max(-4vw, -100px)', marginBottom: '0' }}
      />
      <div className="hero-about">
        <p>
          UChicago&apos;s flagship hackathon <span className="thin-dash">—</span> where 170 builders come together for 24 hours to
          turn the wildest ideas into real, working projects. Free food. Free swag. Workshops. Mentorship. Prizes. One weekend at the
          University of Chicago that could change how you think about what you can make.
        </p>
        <p className="hero-date">
          May 16 <span className="thin-dash">—</span> 17, 2026. Don&apos;t just watch <span className="thin-dash">—</span> build something uncommon.
        </p>
      </div>
    </SectionContainer>
  );
}
