import { useNavigation } from '../context/navigation';
import { SECTIONS } from '../config/sections';
import './SideNav.css';

export default function SideNav() {
  const { currentSection, navigateTo } = useNavigation();

  return (
    <nav className="side-nav" aria-label="Section navigation">
      <ul className="side-nav-list">
        {SECTIONS.map((section, i) => (
          <li key={section.id}>
            <button
              className={`side-nav-item ${currentSection === i ? 'side-nav-active' : ''}`}
              onClick={() => navigateTo(i)}
              aria-label={`Navigate to ${section.label}`}
              aria-current={currentSection === i ? 'true' : undefined}
              title={section.label}
            >
              {/* Bubble marker — swap this SVG for custom illustrated assets later */}
              <svg className="side-nav-bubble" viewBox="0 0 24 24" width="24" height="24">
                <circle
                  cx="12" cy="12"
                  r={currentSection === i ? 10 : 6}
                  fill={currentSection === i ? 'rgba(79, 195, 247, 0.8)' : 'rgba(255, 255, 255, 0.25)'}
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="side-nav-label">{section.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
