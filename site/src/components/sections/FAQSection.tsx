import SectionContainer from './SectionContainer';

function wrapDashes(s: string) {
  return s.split(/(—|–)/).map((part, i) =>
    part === '—' || part === '–' ? <span key={i} className="thin-dash">{part}</span> : part
  );
}

export default function FAQSection() {
  // Replace with actual FAQ content
  const faqs = [
    { q: 'When and where is it?', a: 'May 16 – 17th @ UChicago. Location will be sent out to accepted applicants!' },
    { q: 'Who can participate?', a: 'Any university student — undergraduate or graduate. No prior hackathon experience needed.' },
    { q: 'How much does it cost?', a: 'Nothing! Uncommon Hacks is completely free. We provide food, swag, and workspace.' },
    { q: 'Do I need a team?', a: 'You can come solo or with a team of up to four. We also have team formation activities.' },
    { q: 'What should I bring?', a: 'Your laptop, charger, and anything else you need to be comfortable for a weekend of hacking.' },
  ];

  return (
    <SectionContainer index={3}>
      <img
        src="/assets/branding/faq_white.png"
        alt="FAQ"
        style={{ width: '180px', maxWidth: '28vw', marginTop: '-6vh', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
      />
      <div className="faq-scroll">
        {faqs.map((faq, i) => (
          <details key={i} className="faq-item">
            <summary>{wrapDashes(faq.q)}</summary>
            <p>{wrapDashes(faq.a)}</p>
          </details>
        ))}
      </div>
    </SectionContainer>
  );
}
