import { type DecorationConfig } from '../config/decorations';
import { SECTIONS } from '../config/sections';

interface Props {
  config: DecorationConfig;
  currentSection: number;
}

export default function Decoration({ config, currentSection }: Props) {
  const depthZone = SECTIONS[currentSection]?.depthZone ?? 0;
  const isVisible =
    currentSection >= (config.visibleFromSection ?? 0) &&
    currentSection <= (config.visibleThroughSection ?? Number.POSITIVE_INFINITY);

  // Silhouette: darken assets as depth increases past their threshold
  const darkenAmount = config.darkenAfter !== undefined
    ? Math.max(0, Math.min(1, (depthZone - config.darkenAfter) / 0.3))
    : 0;
  const brightness = 1 - darkenAmount * 0.85;

  return (
    <img
      src={config.src}
      alt=""
      className={config.animation ?? ''}
      style={{
        position: 'absolute',
        top: `${config.top}%`,
        left: `${config.left}%`,
        width: `${config.width}%`,
        height: 'auto',
        filter: `brightness(${brightness})`,
        transition: 'filter 0.8s ease, opacity 0.6s ease',
        transform: config.flipX ? 'scaleX(-1)' : undefined,
        opacity: isVisible ? (config.opacity ?? 1) : 0,
      }}
    />
  );
}
