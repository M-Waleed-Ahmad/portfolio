import { Html, RoundedBox, Text } from "@react-three/drei";
import { contact } from "../data/content";

function ContactSection({ active }) {
  return (
    <group position={[0, 1.2, -114]}>
      <RoundedBox args={[9, 5.4, 0.2]} radius={0.12} smoothness={4}>
        <meshStandardMaterial color="#070707" emissive="#00ffcc" emissiveIntensity={active ? 0.2 : 0.07} />
      </RoundedBox>

      <Text position={[-3.6, 2, 0.13]} fontSize={0.4} color="#00ffcc" anchorX="left">
        CONTACT TERMINAL
      </Text>

      <Html transform center position={[0, 0.2, 0.18]} distanceFactor={8}>
        <div className="w-[560px] max-w-[90vw] rounded border border-accent/45 bg-black/92 p-4 text-[13px] text-white">
          <p className="text-accent">mission_debrief.init()</p>
          <p className="mt-2">Email: {contact.email}</p>
          <p className="mt-1">LinkedIn: {contact.linkedIn.replace("https://", "")}</p>
          <p className="mt-1">GitHub: {contact.github.replace("https://", "")}</p>
          <p className="mt-1">Phone: {contact.phone}</p>
          <p className="mt-3 text-accent">
            awaiting_next_mission<span className="cursor-blink">_</span>
          </p>
        </div>
      </Html>
    </group>
  );
}

export default ContactSection;
