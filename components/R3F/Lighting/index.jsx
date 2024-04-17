import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { PointLightHelper } from "three";

export default function Lighting({ settings }) {
  const directionalLightHelper = useRef(null);
  const pointLightHelper = useRef(null);

  useHelper(pointLightHelper, PointLightHelper, "cyan");

  return (
    <>
      <ambientLight intensity={settings.ambientIntensity} />
      <directionalLight
        ref={directionalLightHelper}
        color={settings.directionalColor}
        intensity={settings.directionalIntensity}
        position={[
          settings.directionalPosition.x,
          settings.directionalPosition.y,
          settings.directionalPosition.z,
        ]}
      />
      <pointLight
        ref={pointLightHelper}
        intensity={settings.pointIntensity}
        position={[
          settings.pointPosition.x,
          settings.pointPosition.y,
          settings.pointPosition.z,
        ]}
      />
    </>
  );
}
