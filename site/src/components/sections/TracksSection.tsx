import { useNavigation } from '../../context/navigation';
import './sections.css';

export default function TracksSection() {
  const { currentSection } = useNavigation();
  const isActive = currentSection === 1;

  return (
    <div
      className={`section-container ${isActive ? 'section-active' : 'section-inactive'}`}
      aria-hidden={!isActive}
    >
      <img
        src="/assets/branding/tracks_white.png"
        alt="Tracks"
        style={{ width: '280px', maxWidth: '28vw', marginTop: '-4vh', filter: 'brightness(0.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5))' }}
      />
    </div>
  );
}
