"use client";

import { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";

export default function R3FCanvas() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Canvas>
  );
}
