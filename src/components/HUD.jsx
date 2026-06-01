import { motion } from "framer-motion";
import { contact, sectionMeta } from "../data/content";

function Marker({ id, activeSection, onNavigate }) {
  const active = activeSection === id;
  return (
    <button
      type="button"
      className={`flex w-full items-center justify-between rounded-sm border px-3 py-2 text-left text-xs transition ${
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-white/20 bg-black/35 text-white/80 hover:border-accent/60 hover:text-accent"
      }`}
      onClick={() => onNavigate(id)}
    >
      <span>{sectionMeta[id].label}</span>
      <span className="text-[10px] opacity-80">{active ? "ACTIVE" : "JUMP"}</span>
    </button>
  );
}

function HUD({ activeSection, sectionOrder, onNavigate }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
    >
      <div className="absolute left-3 top-3 w-[210px] space-y-2 sm:left-6 sm:top-6 sm:w-[240px]">
        <div className="hud-frame panel-glow rounded-md p-3">
          <p className="display-font text-sm font-semibold tracking-[0.18em] text-accent">NETWORK LOG</p>
          <p className="mt-1 text-xs text-white/70">Current destination</p>
          <p className="display-font mt-2 text-lg font-bold tracking-[0.08em] text-white">{sectionMeta[activeSection].label}</p>
        </div>

        <div className="pointer-events-auto hud-frame rounded-md p-2">
          <div className="mb-2 text-[11px] text-white/75">Mission markers</div>
          <div className="space-y-1.5">
            {sectionOrder.map((id) => (
              <Marker key={id} id={id} activeSection={activeSection} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </div>

      <div className="absolute right-3 top-3 w-[170px] space-y-2 sm:right-6 sm:top-6 sm:w-[220px]">
        <div className="pointer-events-auto hud-frame rounded-md p-2">
          <p className="mb-2 text-[11px] text-white/70">Comms</p>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="mb-1 block rounded border border-accent/40 px-2 py-1 text-xs text-accent hover:bg-accent/10"
          >
            GitHub
          </a>
          <a
            href={contact.linkedIn}
            target="_blank"
            rel="noreferrer"
            className="block rounded border border-accent/40 px-2 py-1 text-xs text-accent hover:bg-accent/10"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default HUD;
