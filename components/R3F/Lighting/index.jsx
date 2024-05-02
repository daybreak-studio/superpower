import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper } from "three";

export default function Lighting({ settings }) {
  const directionalLightHelper = useRef(null);
  const directionalLightHelper2 = useRef(null);
  const pointLightHelper = useRef(null);

  useHelper(directionalLightHelper, DirectionalLightHelper, 1, "red");
  useHelper(directionalLightHelper2, DirectionalLightHelper, 1, "red");

  return (
    <>
      <ambientLight
        color={settings.ambientColor}
        intensity={settings.ambientIntensity}
      />
      <directionalLight
        ref={directionalLightHelper}
        color={settings.directionalColor}
        intensity={settings.directionalIntensity}
        position={[-1, -1, 0]}
      />
      <directionalLight
        ref={directionalLightHelper2}
        color={settings.directionalColor}
        intensity={settings.directionalIntensity}
        position={[1, 1, 0]}
      />
    </>
  );
}
