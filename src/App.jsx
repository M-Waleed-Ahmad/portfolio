import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HUD from "./components/HUD";
import SceneCanvas from "./components/SceneCanvas";
import { sectionOrder } from "./data/content";

const getIsMobile = () => window.matchMedia("(max-width: 767px)").matches;

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [requestedSection, setRequestedSection] = useState("hero");
  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const handler = () => setIsMobile(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <main className="relative h-full w-full bg-black text-white">
      <SceneCanvas
        isMobile={isMobile}
        requestedSection={requestedSection}
        onArriveSection={setActiveSection}
      />

      <HUD
        activeSection={activeSection}
        sectionOrder={sectionOrder}
        onNavigate={(section) => setRequestedSection(section)}
      />

      <AnimatePresence>
        {isMobile && (
          <motion.div
            className="pointer-events-none fixed bottom-4 left-4 right-4 z-30 rounded-md border border-accent/30 bg-black/70 px-3 py-2 text-[11px] text-white/85"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            Mobile flight mode enabled: node count and effects are optimized.
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default App;
