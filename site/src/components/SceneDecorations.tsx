import { useNavigation } from '../context/navigation';
import { SECTION_SCENES, type SceneDecorationConfig } from '../config/sceneDecorations';
import './SceneDecorations.css';

function SceneDecoration({ config }: { config: SceneDecorationConfig }) {
  const depthClass =
    config.depth === 'far' ? 'scene-dec-far' :
    config.depth === 'near' ? 'scene-dec-near' :
    'scene-dec-mid';
  const decorationClass = config.isRock ? 'scene-decoration-rock' : 'scene-decoration-asset';

  const filters: string[] = [];
  if (config.brightness !== undefined) {
    filters.push(`brightness(${config.brightness})`);
  }
  if (config.blueTint !== undefined && config.blueTint > 0) {
    const t = Math.min(Math.max(config.blueTint, 0), 1);
    filters.push(`sepia(${t}) saturate(${1 + t * 5}) hue-rotate(${190 + t * 10}deg)`);
  }

  return (
    <img
      src={config.src}
      alt=""
      className={`scene-decoration ${decorationClass} ${depthClass} ${config.animation ?? ''}`}
      style={{
        bottom: `${config.bottom}vh`,
        left: `${config.left}vw`,
        width: `${config.width}vw`,
        transform: config.flipX ? 'scaleX(-1)' : undefined,
        opacity: config.opacity ?? 1,
        filter: filters.length > 0 ? filters.join(' ') : undefined,
      }}
    />
  );
}

export default function SceneDecorations() {
  const { currentSection } = useNavigation();

  return (
    <div className="scene-decorations-container" aria-hidden="true">
      {SECTION_SCENES.map((scene) => {
        const isActive = scene.sectionIndex === currentSection;
        return (
          <div
            key={scene.sectionIndex}
            className={`scene-group ${isActive ? 'scene-group-active' : 'scene-group-inactive'}`}
          >
            {scene.decorations.map((dec) => (
              <SceneDecoration key={dec.id} config={dec} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
