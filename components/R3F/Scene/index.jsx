"use client";

import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Ipad from "@/components/R3F/Models/Ipad";
import Lighting from "@/components/R3F/Lighting";
import PostProcessing from "@/components/R3F/PostProcessing";
import { Leva, folder, useControls } from "leva";

export default function Scene() {
  const settings = useControls({
    "Post Processing": folder({
      postProcessing: false,
      Bloom: folder(
        {
          bloomLuminanceThreshold: 0.7,
          bloomLuminanceSmoothing: 0.4,
        },
        { collapsed: true },
      ),
      DepthOfField: folder(
        {
          dofFocusDistance: 0,
          dofFocalLength: 0.02,
          dofBokehScale: 2,
          dofBokehBias: 0,
        },
        { collapsed: true },
      ),
    }),
    Lighting: folder({
      "Ambient Light": folder(
        {
          ambientIntensity: 1,
        },
        { collapsed: true },
      ),
      "Directional Light": folder(
        {
          directionalColor: "#ffffff",
          directionalIntensity: 0.5,
          directionalPosition: {
            x: 0,
            y: 0,
            z: 5,
          },
        },
        { collapsed: true },
      ),
      "Point Light": folder(
        {
          pointIntensity: 1.5,
          pointPosition: {
            x: 0,
            y: 2,
            z: 2,
          },
        },
        { collapsed: true },
      ),
      Environment: folder(
        {
          environmentIntensity: 1,
        },
        { collapsed: true },
      ),
    }),
  });

  return (
    <>
      <Leva collapsed oneLineLabels />
      <Canvas linear flat>
        <PerspectiveCamera
          makeDefault
          fov={20}
          position={[0, 0, 5]}
          near={0.1}
          far={100}
        />
        <Lighting settings={settings} />
        <PostProcessing settings={settings} />
        <Ipad />
        <OrbitControls />
        {/* <Environment
          environmentIntensity={settings.environmentIntensity}
          preset={"studio"}
        /> */}
      </Canvas>
    </>
  );
}
