import SectionContainer from './SectionContainer';

type Item = { time: string; event: string; details?: string };

const day1: Item[] = [
  { time: '9:00 AM', event: 'Doors open, check-in, team formation' },
  { time: '10:15 AM', event: 'Opening ceremony' },
  { time: '10:45 AM', event: 'Hacking begins' },
  { time: '12:00 PM', event: 'Lunch' },
  { time: '2:00 PM', event: 'Speaker: Prof. Haifeng Xu (Sigma Labs)', details: 'Details coming soon.' },
  { time: '3:00 PM', event: 'Workshop: Wafer', details: 'Details coming soon.' },
  { time: '3:30 PM', event: 'Speaker: Tensormesh', details: 'Details coming soon.' },
  { time: '4:00 PM', event: 'Workshop: Laminar', details: 'Details coming soon.' },
  { time: '4:30 PM', event: 'Speaker: Sarathri Balakrishnan (Snowflake)', details: 'Details coming soon.' },
  { time: '6:00 PM', event: 'Dinner' },
  { time: '7:30 PM', event: 'Typing contest' },
  { time: '8:30 PM', event: 'Quizbowl' },
  { time: '11:45 PM', event: 'Midnight snack (Insomnia Cookies)' },
];

const day2: Item[] = [
  { time: '7:30 AM', event: 'Morning walk' },
  { time: '8:45 AM', event: 'Breakfast' },
  { time: '9:30 AM', event: 'Soft deadline' },
  { time: '9:45 AM', event: 'Hard deadline' },
  { time: '10:00 AM — 12:00 PM', event: 'Judge deliberations' },
  { time: '12:30 PM', event: 'Winners announced, prizes and photos' },
  { time: '1:00 PM', event: 'Event Ends!' },
];

function wrapDashes(s: string) {
  return s.split(/(—)/).map((part, i) =>
    part === '—' ? <span key={i} className="thin-dash">{part}</span> : part
  );
}

function Column({ heading, subheading, items, scrollHint }: { heading: string; subheading: string; items: Item[]; scrollHint?: boolean }) {
  return (
    <div className="schedule-day">
      {scrollHint && <span className="schedule-scroll-hint">Scroll!</span>}
      <h3 className="schedule-day-heading">{heading}</h3>
      <p className="schedule-day-sub">{subheading}</p>
      <ul className="schedule-list">
        {items.map((it, i) => (
          <li key={i} className="schedule-row">
            <span className="schedule-time">{wrapDashes(it.time)}</span>
            <span className="schedule-event">
              {wrapDashes(it.event)}
              {it.details && (
                <span className="schedule-detail-wrap">
                  <button
                    type="button"
                    className="schedule-detail-btn"
                    aria-label={`Details for ${it.event}`}
                  >
                    Details
                  </button>
                  <span role="tooltip" className="schedule-detail-tip">{it.details}</span>
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ScheduleSection() {
  return (
    <SectionContainer index={1}>
      <img
        className="section-title-img schedule-title-img"
        src="/assets/branding/schedule_white.png"
        alt="Schedule"
      />
      <div className="schedule-scroll">
        <div className="schedule-grid">
          <Column heading="Day 1" subheading="Saturday, May 16" items={day1} scrollHint />
          <Column heading="Day 2" subheading="Sunday, May 17" items={day2} />
        </div>
      </div>
    </SectionContainer>
  );
}
