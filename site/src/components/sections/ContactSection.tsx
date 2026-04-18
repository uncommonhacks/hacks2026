import SectionContainer from './SectionContainer';

export default function ContactSection() {
  return (
    <SectionContainer index={4}>
      <img
        src="/assets/branding/contact_white.png"
        alt="Contact"
        style={{ width: '300px', maxWidth: '28vw', marginTop: '-4vh', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
      />
      <div className="contact-section">
        <p>
          Have questions? Want to get involved? Reach out!
        </p>
        {/* Replace with actual links */}
        <div className="contact-links">
          <a href="mailto:team@uncommonhacks.com">Email</a>
          <a href="https://instagram.com/uncommonhacks" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://twitter.com/uncommonhacks" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://discord.gg/uncommonhacks" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
        <a href="#apply" className="cta-button" style={{ marginTop: '2rem' }}>
          Apply Now
        </a>
      </div>
    </SectionContainer>
  );
}
