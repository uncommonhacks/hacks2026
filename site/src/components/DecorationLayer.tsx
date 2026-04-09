import { useEffect, useRef } from 'react';
import { registerLayer, useNavigation } from '../context/navigation';
import Decoration from './Decoration';
import { DECORATIONS, type DecorationConfig } from '../config/decorations';

interface Props {
  layer: 'midground' | 'foreground';
}

export default function DecorationLayer({ layer }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { imageHeight, currentSection } = useNavigation();

  useEffect(() => {
    registerLayer(layer, ref.current);
    return () => registerLayer(layer, null);
  }, [layer]);

  const items = DECORATIONS.filter((d: DecorationConfig) => d.layer === layer);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: imageHeight || '100%',
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      {items.map((dec) => (
        <Decoration key={dec.id} config={dec} currentSection={currentSection} />
      ))}
    </div>
  );
}
