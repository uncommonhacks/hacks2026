import { useRef } from 'react';
import { useNavigation } from '../context/navigation';
import { SECTIONS } from '../config/sections';
import './ProgressScrollbar.css';

export default function ProgressScrollbar() {
  const { currentSection, navigateTo } = useNavigation();
  const trackRef = useRef<HTMLDivElement>(null);

  const total = SECTIONS.length;
  const progress = total > 1 ? currentSection / (total - 1) : 0;

  function handleTrackClick(e: React.MouseEvent<HTMLDivElement>) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const ratio = (e.clientY - rect.top) / rect.height;
    const index = Math.round(ratio * (total - 1));
    navigateTo(Math.max(0, Math.min(total - 1, index)));
  }

  return (
    <div className="progress-scrollbar" aria-hidden="true">
      <div
        className="progress-track"
        ref={trackRef}
        onClick={handleTrackClick}
      >
        <div className="progress-fill" style={{ height: `${progress * 100}%` }} />
        <div
          className="progress-thumb"
          style={{ top: `calc(${progress * 100}% - 12px)` }}
        />
      </div>
    </div>
  );
}
