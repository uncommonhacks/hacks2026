import SectionContainer from './SectionContainer';

export default function TracksSection() {
  return (
    <SectionContainer index={1}>
      <h2>Tracks</h2>
      {/* Replace with actual track names and descriptions */}
      <div style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Social Good</h3>
          <p style={{ fontSize: '0.95rem' }}>Build tools that make a real difference in your community.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Creative Tech</h3>
          <p style={{ fontSize: '0.95rem' }}>Art, music, games — use technology as your canvas.</p>
        </div>
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>Wild Card</h3>
          <p style={{ fontSize: '0.95rem' }}>Anything goes. Surprise us.</p>
        </div>
      </div>
    </SectionContainer>
  );
}
