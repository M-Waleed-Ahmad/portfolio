import { useMemo, useState } from "react";
import { Html, RoundedBox, Text } from "@react-three/drei";
import { projects } from "../data/content";

function ProjectCard({ project, position, angle, onOpen, isMobile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position} rotation={[0, angle, 0]}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
        onClick={() => onOpen(project)}
        rotation={[hovered ? -0.08 : 0, hovered ? 0.1 : 0, 0]}
      >
        <RoundedBox args={[isMobile ? 4.6 : 5.4, 3.1, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color="#0a0a0a" emissive="#00ffcc" emissiveIntensity={hovered ? 0.55 : 0.18} />
        </RoundedBox>
      </mesh>

      <Text position={[-1.95, 0.95, 0.14]} maxWidth={3.9} anchorX="left" fontSize={0.28} color="#00ffcc">
        {project.name}
      </Text>
      <Text position={[-1.95, 0.2, 0.14]} maxWidth={4} anchorX="left" fontSize={0.15} color="#f6f6f6">
        {project.description}
      </Text>
      <Text position={[-1.95, -0.9, 0.14]} maxWidth={4} anchorX="left" fontSize={0.12} color="#bffef0">
        {project.tags.join(" | ")}
      </Text>
    </group>
  );
}

function ProjectsSection({ active, isMobile }) {
  const [selected, setSelected] = useState(null);

  const layout = useMemo(() => {
    return projects.map((project, index) => {
      const spread = (index - (projects.length - 1) / 2) * 4.5;
      return {
        project,
        position: [spread, 1.2 + Math.abs(index - 2) * 0.2, -60 - Math.abs(spread) * 0.22],
        angle: -spread * 0.045,
      };
    });
  }, []);

  return (
    <group>
      <Text position={[0, 4.3, -58]} fontSize={0.52} color="#00ffcc" anchorX="center">
        PROJECT ARCHIVE
      </Text>

      {layout.map((item) => (
        <ProjectCard
          key={item.project.name}
          project={item.project}
          position={item.position}
          angle={item.angle}
          onOpen={setSelected}
          isMobile={isMobile}
        />
      ))}

      {selected && active && (
        <Html center position={[0, 1.7, -55]} distanceFactor={7.5}>
          <div className="w-[560px] max-w-[90vw] rounded border border-accent/45 bg-black/90 p-4 text-sm text-white panel-glow">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="display-font text-2xl font-bold tracking-wide text-accent">{selected.name}</h3>
              <button
                type="button"
                className="rounded border border-accent/45 px-2 py-1 text-xs text-accent"
                onClick={() => setSelected(null)}
              >
                CLOSE
              </button>
            </div>
            <p className="text-white/85">{selected.description}</p>
            <p className="mt-2 text-xs text-accent/90">{selected.tags.join(" • ")}</p>
            {selected.github ? (
              <a
                href={selected.github}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block rounded border border-accent/45 px-3 py-1 text-xs text-accent hover:bg-accent/10"
              >
                View GitHub
              </a>
            ) : (
              <p className="mt-3 text-xs text-white/65">Repository is private for this engagement.</p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

export default ProjectsSection;
