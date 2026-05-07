import SectionContainer from './SectionContainer';

type Item = { time: string; event: string };

const day1: Item[] = [
  { time: '9:00 AM', event: 'Doors open, check-in, team formation' },
  { time: '10:15 AM', event: 'Opening ceremony' },
  { time: '10:45 AM', event: 'Hacking begins' },
  { time: '12:00 PM', event: 'Lunch' },
  { time: '2:00 PM', event: 'Speaker: Prof. Haifeng Xu (Sigma Labs)' },
  { time: '3:00 PM', event: 'Workshop: Wafer' },
  { time: '3:30 PM', event: 'Speaker: Tensormesh' },
  { time: '4:00 PM', event: 'Workshop: Laminar' },
  { time: '4:30 PM', event: 'Speaker: Sarathri Balakrishnan (Snowflake)' },
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
  { time: '10:00 AM – 12:00 PM', event: 'Judge deliberations' },
  { time: '12:30 PM', event: 'Winners announced, prizes & photos' },
  { time: '1:00 PM', event: 'Event ends' },
];

function Column({ heading, subheading, items }: { heading: string; subheading: string; items: Item[] }) {
  return (
    <div className="schedule-day">
      <h3 className="schedule-day-heading">{heading}</h3>
      <p className="schedule-day-sub">{subheading}</p>
      <ul className="schedule-list">
        {items.map((it, i) => (
          <li key={i} className="schedule-row">
            <span className="schedule-time">{it.time}</span>
            <span className="schedule-event">{it.event}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ScheduleSection() {
  return (
    <SectionContainer index={5}>
      <img
        className="section-title-img"
        src="/assets/branding/schedule_white.png"
        alt="Schedule"
        style={{ width: '330px', maxWidth: '28vw', marginTop: '-6vh', filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
      />
      <div className="schedule-scroll">
        <div className="schedule-grid">
          <Column heading="Day 1" subheading="Saturday, May 16" items={day1} />
          <Column heading="Day 2" subheading="Sunday, May 17" items={day2} />
        </div>
      </div>
    </SectionContainer>
  );
}
