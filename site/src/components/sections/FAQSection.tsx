import SectionContainer from './SectionContainer';

export default function FAQSection() {
  // Replace with actual FAQ content
  const faqs = [
    { q: 'When and where is it?', a: 'May 16–17th at Polsky Exchange North (1452 E 53rd St, Chicago, IL 60615).' },
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
      <div>
        {faqs.map((faq, i) => (
          <details key={i} className="faq-item">
            <summary>{faq.q}</summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </div>
    </SectionContainer>
  );
}
