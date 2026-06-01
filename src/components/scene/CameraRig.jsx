import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { sectionMeta } from "../../data/content";

function CameraRig({ sectionId, override, onArrive }) {
  const { camera } = useThree();
  const lookAtRef = useRef(sectionMeta.hero.target);
  const arrivedRef = useRef("");

  const target = useMemo(() => {
    if (override) {
      return override;
    }
    return sectionMeta[sectionId] ?? sectionMeta.hero;
  }, [sectionId, override]);

  useEffect(() => {
    arrivedRef.current = "";
  }, [sectionId, override]);

  useFrame((_, delta) => {
    const smooth = 1 - Math.exp(-delta * 1.8);

    const desiredPosition = new THREE.Vector3(...target.camera);
    const desiredLook = new THREE.Vector3(...target.target);

    camera.position.lerp(desiredPosition, smooth);
    lookAtRef.current = [
      THREE.MathUtils.lerp(lookAtRef.current[0], desiredLook.x, smooth),
      THREE.MathUtils.lerp(lookAtRef.current[1], desiredLook.y, smooth),
      THREE.MathUtils.lerp(lookAtRef.current[2], desiredLook.z, smooth),
    ];

    const lookVector = new THREE.Vector3(...lookAtRef.current);
    const lookMatrix = new THREE.Matrix4();
    lookMatrix.lookAt(camera.position, lookVector, camera.up);
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(lookMatrix);
    camera.quaternion.slerp(targetQuat, smooth);

    const dist = camera.position.distanceTo(desiredPosition);
    if (dist < 0.22 && arrivedRef.current !== sectionId) {
      arrivedRef.current = sectionId;
      onArrive(sectionId);
    }
  });

  return null;
}

export default CameraRig;
