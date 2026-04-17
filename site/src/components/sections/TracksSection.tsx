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
        src="/assets/branding/tracks_black.png"
        alt="Tracks"
        style={{ width: '340px', maxWidth: '28vw', marginTop: '-4vh' }}
      />
    </div>
  );
}
