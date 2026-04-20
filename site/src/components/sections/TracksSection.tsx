import { useState } from 'react';
import SectionContainer from './SectionContainer';
import './sections.css';

function wrapDashes(s: string) {
  return s.split(/\s*([—–-])\s*/).map((part, i) =>
    part === '—' || part === '–' || part === '-' ? <span key={i} className="thin-dash">{part}</span> : part
  );
}

function wrapPrize(s: string) {
  return s.split(/(\$)/).flatMap((chunk, i) =>
    chunk === '$'
      ? [<span key={`d${i}`} className="prize-dollar">$</span>]
      : wrapDashes(chunk).map((node, j) =>
          typeof node === 'string'
            ? <span key={`t${i}-${j}`}>{node}</span>
            : node
        )
  );
}

type Item = { name: string; desc: string; image: string; prize: string };

const TRACKS: Item[] = [
  { name: 'Best Overall', desc: 'Awarded to the most impressive project across all dimensions — vision, execution, and pure originality.', image: '/assets/tracks/bestoverall.png', prize: '$1,000 + ElevenLabs Pro Tier ($99/mo)' },
  { name: 'Best Use of Real-Time Data', desc: 'For the project that turns live data streams into something useful or beautiful — built to react instantly.', image: '/assets/tracks/realdata.png', prize: '$300' },
  { name: 'Best Inference', desc: 'For the team pushing the limits of how models reason at the edge — speed, efficiency, scale, and novelty.', image: '/assets/tracks/inference.png', prize: '$300' },
  { name: 'Best Game Design', desc: 'For the most polished, playable, and inventive game built over the weekend — fresh, fun, and unforgettable.', image: '/assets/tracks/gamedesign.png', prize: '$300' },
  { name: 'Best Social Impact', desc: 'For projects that tackle real human problems — accessibility, community, education, or anything beyond that.', image: '/assets/tracks/socialimpact.png', prize: '$300' },
  { name: 'Best Agent for Prediction Markets', desc: 'For the most capable autonomous agent operating in prediction markets — reasoning, betting, and adapting.', image: '/assets/tracks/predictionmarket.png', prize: '$300' },
];

const AWARDS: Item[] = [
  { name: 'Most Uncommon', desc: 'For the project that breaks the mold — weird, wild, and unexpected in ways that redefine what is possible.', image: '/assets/tracks/mostuncommon.png', prize: '$500' },
  { name: 'Best Use of ElevenLabs', desc: 'For the most creative use of ElevenLabs voice technology — bringing characters, interfaces, or stories to life.', image: '/assets/tracks/elevenlabs.png', prize: 'ElevenLabs Scale Tier ($330/mo)' },
  { name: 'Best Use of Snowflake', desc: 'For the most clever application of Snowflake data infrastructure — turning raw data into something insightful.', image: '/assets/tracks/snowflake.png', prize: '6-month access to Snowflake + LinkedIn feature' },
];

function TrackPanel({ items, kind, heading }: { items: Item[]; kind: 'track' | 'award'; heading: string }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const total = items.length;
  const current = items[index];

  function goTo(newIndex: number, dir: 'next' | 'prev') {
    setDirection(dir);
    setIndex(newIndex);
  }

  function prev() { goTo((index - 1 + total) % total, 'prev'); }
  function next() { goTo((index + 1) % total, 'next'); }
  function jumpTo(i: number) {
    if (i === index) return;
    goTo(i, i > index ? 'next' : 'prev');
  }

  return (
    <div className={`track-panel track-panel--${kind}`}>
      <h2 className="track-panel-heading">{heading}</h2>
      <div className="track-panel-square">
        <img
          key={index}
          src={current.image}
          alt={current.name}
          className={`track-panel-image track-panel-image--${direction}`}
        />
      </div>
      <h3 className="track-panel-name">{wrapDashes(current.name)}</h3>
      <p className="track-panel-desc">{wrapDashes(current.desc)}</p>
      <p className="track-panel-prize">{wrapPrize(current.prize)}</p>
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
              onClick={() => jumpTo(i)}
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
  return (
    <SectionContainer index={1} className="section-container-centered" bare>
      <div className="tracks-content">
        <img
          className="section-title-img"
          src="/assets/branding/tracks_white.png"
          alt="Tracks"
          style={{ width: '280px', maxWidth: '28vw', marginTop: '-4vh', filter: 'brightness(0.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
        />
        <div className="tracks-scroll">
          <div className="track-panels">
            <TrackPanel items={TRACKS} kind="track" heading="MAIN TRACKS" />
            <TrackPanel items={AWARDS} kind="award" heading="SPONSORED TRACKS" />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
