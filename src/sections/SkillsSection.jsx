import { useMemo, useState } from "react";
import { Html, Line, Text } from "@react-three/drei";
import { skills } from "../data/content";

const CLUSTERS = [
  { id: "frontend", label: "Frontend", center: [-14, 1.6, -35], color: "#00ffcc" },
  { id: "backend", label: "Backend", center: [-7.8, 2.4, -37.8], color: "#00ffcc" },
  { id: "automation", label: "Automation", center: [-10.5, 0.5, -41], color: "#00ffcc" },
];

function SkillNode({ name, position, isMobile }) {
  const [hovered, setHovered] = useState(false);
  return (
    <group position={position}>
      <mesh onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
        <sphereGeometry args={[isMobile ? 0.22 : 0.17, 16, 16]} />
        <meshStandardMaterial color="#f7f7f7" emissive="#00ffcc" emissiveIntensity={hovered ? 1.2 : 0.25} />
      </mesh>
      {hovered && (
        <Html center distanceFactor={8}>
          <div className="rounded border border-accent/40 bg-black/80 px-2 py-1 text-[11px] text-accent">{name}</div>
        </Html>
      )}
    </group>
  );
}

function SkillsSection({ isMobile, onFocusCluster, active }) {
  const [focused, setFocused] = useState(null);

  const nodes = useMemo(() => {
    return CLUSTERS.map((cluster) => {
      const items = skills[cluster.id];
      return items.map((skill, idx) => {
        const angle = (Math.PI * 2 * idx) / items.length;
        const radius = isMobile ? 1.3 : 1.8;
        const x = cluster.center[0] + Math.cos(angle) * radius;
        const y = cluster.center[1] + Math.sin(angle) * (radius * 0.6);
        const z = cluster.center[2] + Math.sin(angle * 1.25) * 0.8;
        return { cluster: cluster.id, skill, position: [x, y, z] };
      });
    }).flat();
  }, [isMobile]);

  return (
    <group>
      <Text position={[-10.7, 4.6, -35]} fontSize={0.52} color="#00ffcc" anchorX="center">
        SKILLS NETWORK
      </Text>

      {CLUSTERS.map((cluster) => {
        const clusterNodes = nodes.filter((n) => n.cluster === cluster.id);
        return (
          <group key={cluster.id}>
            {!isMobile &&
              clusterNodes.map((node) => (
                <Line
                  key={`${cluster.id}-${node.skill}`}
                  points={[cluster.center, node.position]}
                  color="#00ffcc"
                  lineWidth={0.8}
                  transparent
                  opacity={active ? 0.45 : 0.2}
                />
              ))}

            <mesh
              position={cluster.center}
              onClick={() => {
                const next = focused === cluster.id ? null : cluster.id;
                setFocused(next);
                if (next) {
                  onFocusCluster({
                    camera: [cluster.center[0], cluster.center[1] + 1.4, cluster.center[2] + 3.4],
                    target: cluster.center,
                  });
                }
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
              }}
            >
              <sphereGeometry args={[0.35, 18, 18]} />
              <meshStandardMaterial
                color="#101010"
                emissive={cluster.color}
                emissiveIntensity={focused === cluster.id ? 1.1 : 0.45}
              />
            </mesh>

            <Text position={[cluster.center[0], cluster.center[1] + 0.9, cluster.center[2]]} fontSize={0.28} color="#f7f7f7">
              {cluster.label}
            </Text>
          </group>
        );
      })}

      {nodes.map((node) => (
        <SkillNode key={`${node.cluster}-${node.skill}`} name={node.skill} position={node.position} isMobile={isMobile} />
      ))}
    </group>
  );
}

export default SkillsSection;
