import SectionContainer from './SectionContainer';

export default function SponsorsSection() {
  return (
    <SectionContainer index={2}>
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
