import { useMemo } from 'react';
import { useNavigation } from '../context/navigation';
import { SECTIONS } from '../config/sections';
import './AmbientEffects.css';

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface Bubble {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export default function AmbientEffects() {
  const { currentSection } = useNavigation();
  const depthFactor = SECTIONS[currentSection]?.depthZone ?? 0;

  // More bubbles in deeper sections
  const bubbles = useMemo<Bubble[]>(() => {
    const count = 15;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: randomBetween(2, 98),
      size: randomBetween(4, 14),
      duration: randomBetween(6, 14),
      delay: randomBetween(0, 10),
      opacity: randomBetween(0.15, 0.5),
    }));
  }, []);

  // Tiny floating particles
  const particles = useMemo<Particle[]>(() => {
    const count = 25;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: randomBetween(0, 100),
      top: randomBetween(0, 100),
      size: randomBetween(1, 3),
      duration: randomBetween(8, 20),
      delay: randomBetween(0, 15),
    }));
  }, []);

  // Light rays stay near the surface and early descent only.
  const showLightRays = depthFactor <= 0.4;
  const lightRayOpacity = Math.max(0, 0.15 - depthFactor * 0.2);

  return (
    <div className="ambient-effects" aria-hidden="true">
      {/* Light rays */}
      {showLightRays && (
        <div className="light-rays" style={{ opacity: lightRayOpacity }}>
          <div className="light-ray ray-1" />
          <div className="light-ray ray-2" />
          <div className="light-ray ray-3" />
        </div>
      )}

      {/* Bubbles — only underwater (sections 1+) */}
      <div className="bubbles-container" style={{
        opacity: currentSection >= 1 ? 1 : 0,
        transition: 'opacity 0.7s ease',
      }}>
        {bubbles.map(b => (
          <div
            key={b.id}
            className="bubble"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              opacity: b.opacity * (0.5 + depthFactor * 0.5),
            }}
          />
        ))}
      </div>

      {/* Particles */}
      <div className="particles-container">
        {particles.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              opacity: 0.2 + depthFactor * 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
