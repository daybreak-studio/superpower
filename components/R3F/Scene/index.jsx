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
    <Canvas linear flat>
      <PerspectiveCamera
        makeDefault
        fov={20}
        position={[0, 0, 5]}
        near={0.1}
        far={100}
      />
      {/* <OrbitControls /> */}
      <ambientLight intensity={10} />
      <directionalLight intensity={0.3} position={[0, 0, 5]} />

      {/* <ambientLight intensity={10} /> */}
      {/* <directionalLight intensity={0.3} position={[0, 0, 5]} /> */}

      {/* <pointLight intensity={15} sosition={[0, 0, 5]} /> */}
      {/* <Environment preset="studio" resolution={8} /> */}
      <Ipad />
    </Canvas>
  );
}
