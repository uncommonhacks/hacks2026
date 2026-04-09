import { useEffect, useRef } from 'react';
import { registerLayer, useNavigation } from '../context/navigation';

export default function BackgroundLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { setImageHeight } = useNavigation();

  useEffect(() => {
    registerLayer('background', ref.current);
    return () => registerLayer('background', null);
  }, []);

  function handleLoad() {
    if (imgRef.current) {
      setImageHeight(imgRef.current.offsetHeight);
    }
  }

  // Recalculate on resize
  useEffect(() => {
    function onResize() {
      if (imgRef.current) {
        setImageHeight(imgRef.current.offsetHeight);
      }
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [setImageHeight]);

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transformOrigin: 'center top',
        willChange: 'transform',
      }}
    >
      <img
        ref={imgRef}
        src="/assets/main_screen.jpg"
        alt=""
        onLoad={handleLoad}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
}
