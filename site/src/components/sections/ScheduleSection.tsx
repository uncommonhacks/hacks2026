import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SectionContainer from './SectionContainer';

interface SpeakerDetails {
  name: string;
  affiliation: React.ReactNode;
  imageSrc: string;
  bio: string;
  talkTitle: string;
  talkDescription: string;
}

type Item = { time: string; event: string; details?: SpeakerDetails | string };

const haifengDetails: SpeakerDetails = {
  name: 'Haifeng Xu',
  affiliation: 'Assistant Professor of Computer Science at UChicago',
  imageSrc: '/assets/speakers/haifeng.png',
  bio:
    'Director of SIGMA Lab, research in multi—agent systems, game theory, and AI.',
  talkTitle: 'Forecasting as a New Frontier of AI Intelligence',
  talkDescription:
    "Thus far, AI's reasoning capabilities, i.e., AI intelligence, has been mostly measured by math (or science more generally) and coding. In this talk, Professor Xu will discuss why forecasting should and will be a new frontier of AI intelligence. He will share evidences across different spaces — from academic research findings, to commercial potentials, and to efforts from frontier labs, various startups in stealth as well as nonprofits.",
};

const sarathriDetails: SpeakerDetails = {
  name: 'Sarathri Balakrishnan',
  affiliation: 'Senior Solutions Architect at Snowflake',
  imageSrc: '/assets/speakers/sarathri_balakrishnan.jpg',
  bio:
    'Senior Solutions Architect at Snowflake, work in enterprise data infrastructure, ML deployment, and production AI systems.',
  talkTitle: 'Leading edge Data and AI stack: Getting to know Snowflake and its AI/ML capabilities',
  talkDescription:
    "For a lot of people, most ML and AI learning live in classrooms and on benchmark leaderboards. In this talk, Sarathri Balakrishnan will move beyond the classroom and walk through how real customers in industry deploy ML and AI solutions using Snowflake. He will also share professional insights and career pathing advice across industry use cases — covering deployment patterns and the practical decisions that turn a model into a shipped product. The talk will end with an interactive session for hackers who are attempting the Snowflake challenge prompts, which will be released before the hackathon begins.",
};

const PLACEHOLDER = 'Details coming soon.';

const LAMINAR_BODY =
  'Building and debugging your first AI Agent with Laminar, an open—source observability platform for long—running agents. Trace in one line, debug from any step, detect patterns at scale.';

const day1: Item[] = [
  { time: '9:00 AM', event: 'Doors open, check-in, team formation' },
  { time: '10:15 AM', event: 'Opening ceremony' },
  { time: '10:45 AM', event: 'Hacking begins' },
  { time: '12:00 PM', event: 'Lunch' },
  { time: '2:00 PM', event: 'Speaker: Prof. Haifeng Xu', details: haifengDetails },
  { time: '3:00 PM', event: 'Workshop: Wafer', details: PLACEHOLDER },
  { time: '3:30 PM', event: 'Speaker: Tensormesh', details: PLACEHOLDER },
  { time: '4:00 PM', event: 'Workshop: Laminar', details: LAMINAR_BODY },
  { time: '4:30 PM', event: 'Speaker: Sarathri Balakrishnan (Snowflake)', details: sarathriDetails },
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
  { time: '10 PM', event: 'Judge deliberations' },
  { time: '12:30 PM', event: 'Winners announced, prizes and photos' },
  { time: '1:00 PM', event: 'Event Ends!' },
];

function wrapDashes(s: string) {
  return s.split(/(—)/).map((part, i) =>
    part === '—' ? <span key={i} className="thin-dash">{part}</span> : part
  );
}

function SpeakerModal({ details, onClose }: { details: SpeakerDetails; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  return createPortal(
    <div className="speaker-modal-backdrop" onClick={onClose}>
      <div
        className="speaker-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="speaker-modal-name"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="speaker-modal-close"
          onClick={onClose}
          aria-label="Close speaker details"
        >
          ×
        </button>
        <h2 id="speaker-modal-name" className="speaker-modal-name">
          {details.name}{' '}
          <span className="speaker-modal-affiliation">({details.affiliation})</span>
        </h2>
        <div className="speaker-modal-body">
          <div className="speaker-modal-left">
            <img
              src={details.imageSrc}
              alt={details.name}
              className="speaker-modal-photo"
              loading="eager"
              decoding="sync"
            />
            <p className="speaker-modal-bio">{wrapDashes(details.bio)}</p>
          </div>
          <div className="speaker-modal-right">
            <h3 className="speaker-modal-talk-title">
              Talk title: {wrapDashes(details.talkTitle)}
            </h3>
            <p className="speaker-modal-description">{wrapDashes(details.talkDescription)}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

function PlaceholderModal({ event, body, onClose }: { event: string; body: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.classList.remove('modal-open');
    };
  }, [onClose]);

  return createPortal(
    <div className="speaker-modal-backdrop" onClick={onClose}>
      <div
        className="speaker-modal speaker-modal--placeholder"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="speaker-modal-close"
          onClick={onClose}
          aria-label="Close details"
        >
          ×
        </button>
        <h2 className="speaker-modal-name">{event}</h2>
        <p className="speaker-modal-description">{wrapDashes(body)}</p>
      </div>
    </div>,
    document.body
  );
}

function Column({
  heading,
  subheading,
  items,
  scrollHint,
  onOpenDetails,
}: {
  heading: string;
  subheading: string;
  items: Item[];
  scrollHint?: boolean;
  onOpenDetails: (it: Item) => void;
}) {
  return (
    <div className="schedule-day">
      <span
        className="schedule-scroll-hint"
        style={{ visibility: scrollHint ? 'visible' : 'hidden' }}
        aria-hidden={!scrollHint}
      >
        Scroll!
      </span>
      <h3 className="schedule-day-heading">
        {heading}: <span className="schedule-day-sub">{subheading}</span>
      </h3>
      <ul className="schedule-list">
        {items.map((it, i) => (
          <li key={i} className="schedule-row">
            <span className="schedule-time">{wrapDashes(it.time)}</span>
            <span className="schedule-event">
              {wrapDashes(it.event)}
              {it.details && (
                <button
                  type="button"
                  className="schedule-detail-btn"
                  onClick={() => onOpenDetails(it)}
                  aria-label={`Details for ${it.event}`}
                >
                  Details
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ScheduleSection() {
  const [active, setActive] = useState<Item | null>(null);

  return (
    <SectionContainer index={1}>
      <img
        className="section-title-img schedule-title-img"
        src="/assets/branding/schedule_white.png"
        alt="Schedule"
      />
      <div className="schedule-scroll">
        <div className="schedule-grid">
          <Column heading="Day 1" subheading="Saturday, May 16" items={day1} scrollHint onOpenDetails={setActive} />
          <Column heading="Day 2" subheading="Sunday, May 17" items={day2} onOpenDetails={setActive} />
        </div>
      </div>
      {active && typeof active.details !== 'string' && active.details && (
        <SpeakerModal details={active.details} onClose={() => setActive(null)} />
      )}
      {active && typeof active.details === 'string' && (
        <PlaceholderModal
          event={active.event}
          body={active.details}
          onClose={() => setActive(null)}
        />
      )}
    </SectionContainer>
  );
}
