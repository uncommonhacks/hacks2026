import { useState } from 'react';
import { useNavigation } from '../../context/navigation';
import './sections.css';

function wrapDashes(s: string) {
  return s.split(/\s*([—–-])\s*/).map((part, i) =>
    part === '—' || part === '–' || part === '-' ? <span key={i} className="thin-dash">{part}</span> : part
  );
}

type Item = { name: string; desc: string };

const TRACKS: Item[] = [
  { name: 'Best Overall', desc: 'Awarded to the most impressive project across all dimensions — vision, execution, and pure originality.' },
  { name: 'Best Use of Real-Time Data', desc: 'For the project that turns live data streams into something useful or beautiful — built to react instantly.' },
  { name: 'Best Inference', desc: 'For the team pushing the limits of how models reason at the edge — speed, efficiency, scale, and novelty.' },
  { name: 'Best Game Design', desc: 'For the most polished, playable, and inventive game built over the weekend — fresh, fun, and unforgettable.' },
  { name: 'Best Social Impact', desc: 'For projects that tackle real human problems — accessibility, community, education, or anything beyond that.' },
  { name: 'Best Agent for Prediction Markets', desc: 'For the most capable autonomous agent operating in prediction markets — reasoning, betting, and adapting.' },
];

const AWARDS: Item[] = [
  { name: 'Most Uncommon', desc: 'For the project that breaks the mold — weird, wild, and unexpected in ways that redefine what is possible.' },
  { name: 'Best Use of ElevenLabs', desc: 'For the most creative use of ElevenLabs voice technology — bringing characters, interfaces, or stories to life.' },
  { name: 'Best Use of Snowflake', desc: 'For the most clever application of Snowflake data infrastructure — turning raw data into something insightful.' },
];

function TrackPanel({ items, kind, heading }: { items: Item[]; kind: 'track' | 'award'; heading: string }) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const current = items[index];

  function prev() { setIndex((i) => (i - 1 + total) % total); }
  function next() { setIndex((i) => (i + 1) % total); }

  const numLabel = kind === 'track' ? String(index + 1).padStart(2, '0') : `A${index + 1}`;

  return (
    <div className={`track-panel track-panel--${kind}`}>
      <h2 className="track-panel-heading">{heading}</h2>
      <div className="track-panel-square">
        <span className="track-panel-num">{numLabel}</span>
      </div>
      <h3 className="track-panel-name">{wrapDashes(current.name)}</h3>
      <p className="track-panel-desc">{wrapDashes(current.desc)}</p>
      <div className="track-panel-pager">
        <button
          className="track-pager-arrow"
          onClick={prev}
          aria-label="Previous"
        >‹</button>
        <div className="track-pager-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`track-pager-dot ${i === index ? 'track-pager-dot-active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Go to ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="track-pager-arrow"
          onClick={next}
          aria-label="Next"
        >›</button>
      </div>
    </div>
  );
}

export default function TracksSection() {
  const { currentSection } = useNavigation();
  const isActive = currentSection === 1;

  return (
    <div
      className={`section-container section-container-centered ${isActive ? 'section-active' : 'section-inactive'}`}
      aria-hidden={!isActive}
    >
      <div className="tracks-content">
        <img
          src="/assets/branding/tracks_white.png"
          alt="Tracks"
          style={{ width: '280px', maxWidth: '28vw', marginTop: '-4vh', filter: 'brightness(0.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
        />
        <div className="track-panels">
          <TrackPanel items={TRACKS} kind="track" heading="MAIN TRACKS" />
          <TrackPanel items={AWARDS} kind="award" heading="SPONSORED TRACKS" />
        </div>
      </div>
    </div>
  );
}
