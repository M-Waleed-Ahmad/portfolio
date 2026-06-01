import { Suspense, lazy, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import CameraRig from "./scene/CameraRig";
import Starfield from "./scene/Starfield";

const HeroSection = lazy(() => import("../sections/HeroSection"));
const AboutSection = lazy(() => import("../sections/AboutSection"));
const SkillsSection = lazy(() => import("../sections/SkillsSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const ExperienceSection = lazy(() => import("../sections/ExperienceSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));

function SceneCanvas({ requestedSection, onArriveSection, isMobile }) {
  const [cameraOverride, setCameraOverride] = useState(null);

  const mobileCanvasProps = useMemo(
    () => ({
      dpr: isMobile ? [1, 1.2] : [1, 1.7],
      gl: { antialias: !isMobile, powerPreference: "high-performance" },
    }),
    [isMobile]
  );

  return (
    <Canvas camera={{ position: [0, 1.2, 12], fov: isMobile ? 68 : 58 }} {...mobileCanvasProps}>
      <color attach="background" args={["#000000"]} />
      <fog attach="fog" args={["#000000", 30, 170]} />
      <ambientLight intensity={0.42} color="#ffffff" />
      <pointLight position={[0, 8, 12]} intensity={0.35} color="#00ffcc" />
      <AdaptiveDpr pixelated />

      <CameraRig
        sectionId={requestedSection}
        override={cameraOverride}
        onArrive={(id) => {
          onArriveSection(id);
          if (id !== "skills") {
            setCameraOverride(null);
          }
        }}
      />

      <Starfield count={isMobile ? 380 : 950} />

      <Suspense fallback={null}>
        <HeroSection />
        <AboutSection active={requestedSection === "about"} />
        <SkillsSection
          isMobile={isMobile}
          active={requestedSection === "skills"}
          onFocusCluster={(cluster) => {
            setCameraOverride(cluster);
          }}
        />
        <ProjectsSection active={requestedSection === "projects"} isMobile={isMobile} />
        <ExperienceSection active={requestedSection === "experience"} isMobile={isMobile} />
        <ContactSection active={requestedSection === "contact"} />
      </Suspense>
    </Canvas>
  );
}

export default SceneCanvas;
