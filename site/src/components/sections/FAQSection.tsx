import SectionContainer from './SectionContainer';

export default function FAQSection() {
  // Replace with actual FAQ content
  const faqs = [
    { q: 'Who can participate?', a: 'Any university student — undergraduate or graduate. No prior hackathon experience needed.' },
    { q: 'How much does it cost?', a: 'Nothing! Uncommon Hacks is completely free. We provide food, swag, and workspace.' },
    { q: 'Do I need a team?', a: 'You can come solo or with a team of up to 4. We also have team formation activities.' },
    { q: 'What should I bring?', a: 'Your laptop, charger, and anything else you need to be comfortable for a weekend of hacking.' },
    { q: 'When and where is it?', a: 'Spring 2026 at the University of Chicago. Exact dates and venue coming soon.' },
  ];

  return (
    <SectionContainer index={3}>
      <h2>FAQ</h2>
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
