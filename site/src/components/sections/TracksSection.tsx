import { useNavigation } from '../../context/navigation';
import './sections.css';

export default function TracksSection() {
  const { currentSection } = useNavigation();
  const isActive = currentSection === 1;

  return (
    <div
      className={`section-container ${isActive ? 'section-active' : 'section-inactive'}`}
      style={{ justifyContent: 'flex-end', alignItems: 'flex-start', paddingRight: '8%' }}
      aria-hidden={!isActive}
    >
      <img
        src="/assets/branding/tracks_black.png"
        alt="Tracks"
        style={{ width: '500px', maxWidth: '40vw' }}
      />
    </div>
  );
}
