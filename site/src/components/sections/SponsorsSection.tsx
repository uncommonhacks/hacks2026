import SectionContainer from './SectionContainer';

export default function SponsorsSection() {
  return (
    <SectionContainer index={2}>
      <h2>Sponsors</h2>
      <p>Uncommon Hacks is made possible by our generous sponsors.</p>

      {/* Replace placeholders with actual sponsor logos */}
      <div className="sponsor-tier">
        <h3>Title</h3>
        <div className="sponsor-logos">
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
        </div>
      </div>
      <div className="sponsor-tier">
        <h3>Gold</h3>
        <div className="sponsor-logos">
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
        </div>
      </div>
      <div className="sponsor-tier">
        <h3>Silver</h3>
        <div className="sponsor-logos">
          <div className="sponsor-placeholder">Logo</div>
          <div className="sponsor-placeholder">Logo</div>
        </div>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.95rem', opacity: 0.7 }}>
        Interested in sponsoring? <a href="mailto:team@uncommonhacks.com" style={{ color: '#4fc3f7' }}>Get in touch</a>
      </p>
    </SectionContainer>
  );
}
