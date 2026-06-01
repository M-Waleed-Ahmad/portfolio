import { useMemo, useState } from "react";
import { Html, Line, Text } from "@react-three/drei";
import * as THREE from "three";
import { experience } from "../data/content";

function ExperienceSection({ active, isMobile }) {
  const [selected, setSelected] = useState(0);

  const points = useMemo(
    () => [
      new THREE.Vector3(14, 1.2, -74),
      new THREE.Vector3(10, 1.1, -82),
      new THREE.Vector3(5.5, 1.05, -90),
    ],
    []
  );

  const curvePoints = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points);
    return curve.getPoints(60).map((p) => [p.x, p.y, p.z]);
  }, [points]);

  return (
    <group>
      <Text position={[10.5, 4, -76]} fontSize={0.48} color="#00ffcc" anchorX="center">
        EXPERIENCE PATH
      </Text>

      <Line points={curvePoints} color="#00ffcc" lineWidth={isMobile ? 1 : 1.5} transparent opacity={0.5} />

      {points.map((point, idx) => {
        const node = [point.x, point.y, point.z];
        const item = experience[idx];
        return (
          <group key={item.company} position={node}>
            <mesh
              onClick={() => setSelected(idx)}
              onPointerOver={(e) => {
                e.stopPropagation();
              }}
            >
              <sphereGeometry args={[0.34, 18, 18]} />
              <meshStandardMaterial
                color="#101010"
                emissive="#00ffcc"
                emissiveIntensity={selected === idx ? 1 : 0.35}
              />
            </mesh>
            <Text position={[0, 0.75, 0]} fontSize={0.2} color="#f7f7f7" anchorX="center">
              {item.company}
            </Text>
          </group>
        );
      })}

      {active && (
        <Html center position={[8, 2.2, -84]} distanceFactor={8}>
          <div className="w-[600px] max-w-[92vw] rounded border border-accent/45 bg-black/86 p-4 text-sm text-white">
            <h3 className="display-font text-2xl font-bold text-accent">{experience[selected].company}</h3>
            <p className="mt-1 text-white/90">
              {experience[selected].role} | {experience[selected].dates}
            </p>
            <ul className="mt-3 space-y-2 text-xs text-white/82">
              {experience[selected].bullets.map((bullet) => (
                <li key={bullet}>- {bullet}</li>
              ))}
            </ul>
          </div>
        </Html>
      )}
    </group>
  );
}

export default ExperienceSection;
