import SectionContainer from './SectionContainer';

export default function ContactSection() {
  return (
    <SectionContainer index={4}>
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
    </SectionContainer>
  );
}
