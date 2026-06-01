import { useEffect, useMemo, useState } from "react";
import { Text, Float } from "@react-three/drei";
import { heroRoles } from "../data/content";

function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);

  const currentRole = useMemo(() => heroRoles[roleIndex], [roleIndex]);

  useEffect(() => {
    setVisibleLength(0);
    let timeout;
    const typer = setInterval(() => {
      setVisibleLength((v) => {
        const next = v + 1;
        if (next >= currentRole.length) {
          clearInterval(typer);
          timeout = setTimeout(() => {
            setRoleIndex((idx) => (idx + 1) % heroRoles.length);
          }, 1000);
        }
        return next;
      });
    }, 65);

    return () => {
      clearInterval(typer);
      clearTimeout(timeout);
    };
  }, [currentRole]);

  return (
    <group position={[0, 1.2, 0]}>
      <Float floatIntensity={0.3} speed={1.1}>
        <Text
          fontSize={1.45}
          maxWidth={16}
          textAlign="center"
          color="#f7f7f7"
          anchorX="center"
          anchorY="middle"
          outlineColor="#00ffcc"
          outlineWidth={0.018}
        >
          WALEED AHMAD
        </Text>
      </Float>

      <Text
        position={[0, -1.7, 0]}
        fontSize={0.44}
        maxWidth={12}
        textAlign="center"
        color="#00ffcc"
        anchorX="center"
        anchorY="middle"
      >
        {`> ${currentRole.slice(0, visibleLength)}`}
      </Text>
    </group>
  );
}

export default HeroSection;
