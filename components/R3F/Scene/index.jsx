"use client";

import { Canvas } from "@react-three/fiber";
import Ipad from "@/components/R3F/Models/Ipad";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";

export default function Scene() {
  return (
    <Canvas>
      <PerspectiveCamera
        makeDefault
        fov={20}
        position={[0, 0, 5]}
        near={0.1}
        far={100}
      />
      {/* <OrbitControls /> */}
      <directionalLight intensity={0.5} position={[0, 0, 5]} />
      {/* <Environment preset="studio" resolution={8} /> */}
      <Ipad />
    </Canvas>
  );
}
