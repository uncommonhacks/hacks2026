import { useNavigation } from '../context/navigation';
import { SECTION_SCENES, type SceneDecorationConfig } from '../config/sceneDecorations';
import './SceneDecorations.css';

function SceneDecoration({ config }: { config: SceneDecorationConfig }) {
  const depthClass =
    config.depth === 'far' ? 'scene-dec-far' :
    config.depth === 'near' ? 'scene-dec-near' :
    'scene-dec-mid';
  const decorationClass = config.isRock ? 'scene-decoration-rock' : 'scene-decoration-asset';

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
