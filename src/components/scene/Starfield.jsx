import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Starfield({ count }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 220;
      data[i * 3 + 1] = (Math.random() - 0.5) * 120;
      data[i * 3 + 2] = -Math.random() * 160 + 20;
    }
    return data;
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.01;
    pointsRef.current.position.z = Math.sin(state.clock.elapsedTime * 0.06) * 2.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#f5f5f5" size={0.09} sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default Starfield;
