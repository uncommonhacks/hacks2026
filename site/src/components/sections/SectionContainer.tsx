import { type ReactNode } from 'react';
import { useNavigation } from '../../context/navigation';
import './sections.css';

interface Props {
  index: number;
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({ index, children, className = '' }: Props) {
  const { currentSection } = useNavigation();
  const isActive = currentSection === index;

  return (
    <div
      className={`section-container ${isActive ? 'section-active' : 'section-inactive'} ${className}`}
      aria-hidden={!isActive}
    >
      <div className="section-inner">
        {children}
      </div>
    </div>
  );
}
