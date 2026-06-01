import { useEffect, useMemo, useRef, useState } from "react";
import { Html, RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { aboutStats } from "../data/content";

function Counter({ value, suffix, active }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1200;
    const begin = performance.now();

    let raf;
    const tick = (time) => {
      const progress = Math.min((time - begin) / duration, 1);
      start = Math.floor(value * progress);
      setDisplay(start);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function AboutSection({ active }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef?.current) return;
    groupRef.current.position.y = 1 + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
  });

  const statItems = useMemo(() => aboutStats, []);

  return (
    <group ref={groupRef} position={[12, 1, -10]}>
      <RoundedBox args={[8.5, 5.1, 0.25]} radius={0.12} smoothness={3}>
        <meshStandardMaterial color="#070707" emissive="#00ffcc" emissiveIntensity={0.08} metalness={0.2} roughness={0.45} />
      </RoundedBox>

      <Text
        position={[-3.3, 1.9, 0.2]}
        color="#00ffcc"
        fontSize={0.42}
        anchorX="left"
        anchorY="middle"
      >
        ABOUT
      </Text>

      <Html transform position={[0, 0.2, 0.22]} distanceFactor={8.2} center>
        <div className="w-[450px] max-w-[84vw] rounded border border-accent/45 bg-black/72 p-4 text-white">
          <p className="text-sm leading-relaxed text-white/82">
            Full-stack developer and automation engineer from Lahore, Pakistan. I build practical products,
            optimize delivery pipelines, and focus on software that ships cleanly and performs under pressure.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
            {statItems.map((item) => (
              <div key={item.label} className="rounded border border-accent/35 bg-black/40 p-2">
                <div className="display-font text-lg font-bold text-accent">
                  <Counter value={item.value} suffix={item.suffix} active={active} />
                </div>
                <div className="text-[11px] text-white/70">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Html>
    </group>
  );
}

export default AboutSection;
