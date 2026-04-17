import BackgroundLayer from './BackgroundLayer';
import DecorationLayer from './DecorationLayer';
import SceneDecorations from './SceneDecorations';
import AmbientEffects from './AmbientEffects';
import SideNav from './SideNav';
import ProgressScrollbar from './ProgressScrollbar';
import HeroSection from './sections/HeroSection';
import TracksSection from './sections/TracksSection';
import SponsorsSection from './sections/SponsorsSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import './OceanViewport.css';

export default function OceanViewport() {
  return (
    <div className="ocean-viewport">
      {/* Parallax layers — background artwork + traveling decorations */}
      <BackgroundLayer />
      <DecorationLayer layer="midground" />
      <DecorationLayer layer="foreground" />

      {/* Scene decorations — viewport-fixed, section-aware (rocks, corals, creatures) */}
      <SceneDecorations />

      {/* Atmospheric overlay */}
      <AmbientEffects />

      {/* Content sections — only active one is visible */}
      <HeroSection />
      <TracksSection />
      <SponsorsSection />
      <FAQSection />
      <ContactSection />

      {/* Navigation */}
      <SideNav />
      <ProgressScrollbar />
    </div>
  );
}
