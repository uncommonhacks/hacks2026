import BackgroundLayer from './BackgroundLayer';
import DecorationLayer from './DecorationLayer';
import SceneDecorations from './SceneDecorations';
import AmbientEffects from './AmbientEffects';
import SideNav from './SideNav';
import HeroSection from './sections/HeroSection';
import TracksSection from './sections/TracksSection';
import SponsorsSection from './sections/SponsorsSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import './OceanViewport.css';

export default function OceanViewport() {
  return (
    <div className="ocean-viewport">
      <BackgroundLayer />
      <DecorationLayer layer="midground" />
      <DecorationLayer layer="foreground" />

      <SceneDecorations />

      <AmbientEffects />

      <HeroSection />
      <TracksSection />
      <SponsorsSection />
      <FAQSection />
      <ContactSection />

      <SideNav />
    </div>
  );
}
