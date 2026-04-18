import { useNavigation } from '../../context/navigation';
import SectionContainer from './SectionContainer';
import './sections.css';

export default function HeroSection() {
  const { currentSection } = useNavigation();
  const isActive = currentSection === 0;

  return (
    <>
      <SectionContainer index={0}>
        <img
          src="/assets/branding/new_logo_blue.png"
          alt="Uncommon Hacks"
          style={{ width: '950px', maxWidth: '100vw', display: 'block', marginLeft: '-13px', marginTop: '-400px', marginBottom: '0' }}
        />
      </SectionContainer>
      <div className={`hero-about ${isActive ? 'hero-about-active' : 'hero-about-inactive'}`}>
        <p>
          UChicago&apos;s flagship hackathon <span className="thin-dash">—</span> where 170 builders come together for 24 hours to
          turn the wildest ideas into real, working projects. Free food. Free swag. Workshops. Mentorship. Prizes. One weekend at the
          University of Chicago that could change how you think about what you can make.
        </p>
        <p className="hero-date">
          May 16 <span className="thin-dash">—</span> 17, 2026. Don&apos;t just watch <span className="thin-dash">—</span> build something uncommon.
        </p>
      </div>
    </>
  );
}
