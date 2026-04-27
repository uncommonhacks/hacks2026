import SectionContainer from './SectionContainer';

type Sponsor = { name: string; file: string };

const tier1: Sponsor[] = [
  { name: 'Tensormesh', file: 'Tensormesh_Logo.png' },
  { name: 'Sigma Lab', file: 'SIGMA_LAB_LOGO.png' },
  { name: 'Wafer', file: 'wafer_logo.png' },
];

const tier2: Sponsor[] = [
  { name: 'McMaster-Carr', file: 'McMaster-Carr_logo.svg.png' },
  { name: 'Laminar', file: 'laminar-logo.svg' },
  { name: 'Snowflake', file: 'Snowflake_Logo_svg.png' },
];

const tier3RowA: Sponsor[] = [
  { name: 'UChicago Career Advancement', file: 'CareerAdvancementLogo.png' },
  { name: 'ElevenLabs', file: 'elevenlabs-logo-white.png' },
  { name: 'Polymarket', file: 'polymarket-logo-white.png' },
];

const tier3RowB: Sponsor[] = [
  { name: 'Vibeflow', file: 'vibeflow_logo.png' },
  { name: 'Tower Research Capital', file: 'Tower_Research_Capital_Logo.png' },
];

export default function SponsorsSection() {
  return (
    <SectionContainer index={2}>
      <img
        className="section-title-img"
        src="/assets/branding/sponsors_white.png"
        alt="Sponsors"
        style={{ width: '330px', maxWidth: '28vw', marginTop: '-6vh', filter: 'brightness(0.15) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
      />
      <p className="sponsor-headline">Uncommon Hacks is made possible by our generous sponsors.</p>

      <div className="sponsor-tier">
        {[
          { tier: 'lg', items: tier1 },
          { tier: 'md', items: tier2 },
          { tier: 'sm', items: tier3RowA },
          { tier: 'sm', items: tier3RowB },
        ].map((row, rowIdx) => (
          <div key={rowIdx} className={`sponsor-logos sponsor-logos--${row.tier}`}>
            {row.items.map((s) => (
              <div key={s.file} className={`sponsor-logo sponsor-logo--${row.tier}`}>
                <img src={`/assets/sponsors/${s.file}`} alt={s.name} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <p className="sponsor-cta" style={{ marginTop: '1.5rem', fontSize: 'clamp(1.6rem, 2.8vw, 3rem)', opacity: 0.8 }}>
        Interested in sponsoring? <a href="mailto:uncommonhacks@gmail.com" style={{ color: '#4fc3f7' }}>Get in touch</a>
      </p>
    </SectionContainer>
  );
}
