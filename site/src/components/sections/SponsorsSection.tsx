import SectionContainer from './SectionContainer';

export default function SponsorsSection() {
  return (
    <SectionContainer index={2}>
      <img
        src="/assets/branding/sponsors_black.png"
        alt="Sponsors"
        style={{ width: '330px', maxWidth: '28vw', marginTop: '-6vh', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
      />
      <p className="sponsor-headline">Uncommon Hacks is made possible by our generous sponsors.</p>

      {/* Replace placeholders with actual sponsor logos */}
      <div className="sponsor-tier">
        <div className="sponsor-logos">
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
        </div>
      </div>
      <div className="sponsor-tier">
        <div className="sponsor-logos">
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
        </div>
      </div>
      <div className="sponsor-tier">
        <div className="sponsor-logos">
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
        </div>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '2.55rem', opacity: 0.8 }}>
        Interested in sponsoring? <a href="mailto:uncommonhacks@gmail.com" style={{ color: '#4fc3f7' }}>Get in touch</a>
      </p>
    </SectionContainer>
  );
}
