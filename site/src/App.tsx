import { NavigationProvider } from './context/NavigationContext';
import { useInputNavigation } from './hooks/useInputNavigation';
import { useHashSync } from './hooks/useHashSync';
import OceanViewport from './components/OceanViewport';

function AppInner() {
  useInputNavigation();
  useHashSync();
  return <OceanViewport />;
}

export default function App() {
  return (
    <NavigationProvider>
      <AppInner />
    </NavigationProvider>
  );
}
