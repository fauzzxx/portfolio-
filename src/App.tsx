import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { BootSequence } from './components/os/BootSequence';
import { OSShell } from './components/os/OSShell';

export function App() {
  const [isBooted, setIsBooted] = useState<boolean>(false);

  return (
    <div className="w-full h-full relative overflow-hidden bg-os-bg text-os-text">
      <AnimatePresence mode="wait">
        {!isBooted ? (
          <BootSequence key="boot" onComplete={() => setIsBooted(true)} />
        ) : (
          <OSShell key="os-shell" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
