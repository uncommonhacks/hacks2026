import SectionContainer from './SectionContainer';

const sponsors = [
  { name: 'UChicago Career Advancement', file: 'careeradvancement_logo_black_v2.png' },
  // { name: 'Lovable', file: 'lovable-dark-png.png' },
  { name: 'ElevenLabs', file: 'elevenlabs-logo-black.png' },
  { name: 'Snowflake', file: 'Snowflake_Logo_svg.png' },
  { name: 'Sigma Lab', file: 'SIGMA_LAB_LOGO.png' },
  // { name: 'Polymarket', file: 'polymarket-logo-black.png' },
];

export default function SponsorsSection() {
  return (
    <SectionContainer index={2}>
      <img
        src="/assets/branding/sponsors_white.png"
        alt="Sponsors"
        style={{ width: '330px', maxWidth: '28vw', marginTop: '-6vh', filter: 'brightness(0.15) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
      />
      <p className="sponsor-headline">Uncommon Hacks is made possible by our generous sponsors.</p>

      <div className="sponsor-tier">
        <div className="sponsor-logos">
          {sponsors.map((s) => (
            <div key={s.file} className="sponsor-logo">
              <img src={`/assets/sponsors/${s.file}`} alt={s.name} />
            </div>
          ))}
        </div>
      </div>

      <p className="sponsor-cta" style={{ marginTop: '1.5rem', fontSize: '2.55rem', opacity: 0.8 }}>
        Interested in sponsoring? <a href="mailto:uncommonhacks@gmail.com" style={{ color: '#4fc3f7' }}>Get in touch</a>
      </p>
    </SectionContainer>
  );
}
