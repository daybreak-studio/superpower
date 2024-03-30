"use client";
import { Canvas } from "@react-three/fiber";
import Ipad from "@/components/R3F/Models/Ipad";
import { Environment, PerspectiveCamera } from "@react-three/drei";

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
      <directionalLight intensity={3} position={[0, 5, 5]} />
      <Environment preset="city" />
      <Ipad />
    </Canvas>
  );
}
