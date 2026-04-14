import SectionContainer from './SectionContainer';

export default function HeroSection() {
  return (
    <SectionContainer index={0}>
      <img
        src="/assets/branding/new_logo_blue.png"
        alt="Uncommon Hacks"
        style={{ width: '1150px', maxWidth: '100vw', display: 'block', marginLeft: '-113px', marginTop: '-210px', marginBottom: '1rem' }}
      />
      <p>
        UChicago&apos;s premier hackathon. Build something uncommon.
      </p>
      <p>
        Uncommon Hacks brings students from all backgrounds together for a weekend
        of building, learning, mentorship, food, and prizes. No experience required.
      </p>
      <p style={{ opacity: 0.7, fontSize: '0.95rem', marginTop: '0.5rem' }}>
        Spring 2026 &middot; University of Chicago
      </p>
      <a href="#apply" className="cta-button">
        Apply Now
      </a>
    </SectionContainer>
  );
}
