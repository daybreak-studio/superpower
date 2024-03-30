import { useState, useEffect, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

const tiltLimit = 0.4;
const lerpFactor = 0.02;
const screenImageUrls = [
  "/models/textures/home-min.jpg",
  "/models/textures/services-min.jpg",
  "/models/textures/action-plan-min.jpg",
  "/models/textures/data-min.jpg",
  "/models/textures/doctors-min.jpg",
];

// Handle texture import: Flip the textures first before fetching them once (more performant).
function useScreenTextures(imagePaths) {
  const textures = useTexture(imagePaths);
  textures.forEach((texture) => {
    texture.flipY = false;
    texture.needsUpdate = true;
  });
  return textures;
}

export default function Ipad(props) {
  const { nodes, materials } = useGLTF("/models/ipad.glb");
  const { viewport, mouse } = useThree();
  const ipadRef = useRef();
  const textures = useScreenTextures(screenImageUrls);
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Function to change the texture index, cycling through the textures
  const cycleTextures = () => {
    setCurrentTextureIndex(
      (currentIndex) => (currentIndex + 1) % textures.length,
    );
  };

  // Helper function to update the rotation via linear interpolation
  const updateRotation = (x, y) => {
    ipadRef.current.rotation.x += (x - ipadRef.current.rotation.x) * lerpFactor;
    ipadRef.current.rotation.y += (y - ipadRef.current.rotation.y) * lerpFactor;
  };

  // Event handlers for mouse enter and leave
  const handlePointerOver = (event) => {
    setIsHovered(true);
    // Prevents the canvas from detecting this event as a canvas-wide event
    event.stopPropagation();
  };

  const handlePointerOut = () => {
    setIsHovered(false);
  };

  // Handle assigning textures to the screen. This effect runs whenever the current texture index changes
  useEffect(() => {
    const screenMaterial = materials["Screen_11-Inch"];
    if (screenMaterial) {
      screenMaterial.map = textures[currentTextureIndex];
      screenMaterial.needsUpdate = true;
    }
  }, [currentTextureIndex, textures, materials]);

  useFrame(() => {
    // We are tracking mouse.y for X because moving the mouse along the Y axis should tilt the iPad through the X axis. Vice versa.
    const targetTiltX = isHovered ? tiltLimit * mouse.y : 0;
    const targetTiltY = isHovered ? -tiltLimit * mouse.x : 0;
    // Interpolate the current rotation towards the target rotation
    updateRotation(targetTiltX, targetTiltY);
  });

  return (
    <group ref={ipadRef} {...props} dispose={null}>
      <group
        rotation={[0, Math.PI, 0]}
        scale={viewport.width / 6}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.iPad_1.geometry}
          material={materials["Screen_11-Inch"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.iPad_2.geometry}
          material={materials["Glass_11-Inch"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.iPad_3.geometry}
          material={materials["Body_11-inch"]}
        />
      </group>

      {/* An example button to cycle textures - this can be replaced with your own UI */}
      <mesh onClick={cycleTextures} position={[0, -0.6, 0]}>
        <boxGeometry attach="geometry" args={[0.1, 0.1, 0.1]} />
        <meshStandardMaterial attach="material" color="red" />
      </mesh>
    </group>
  );
}

useGLTF.preload("/ipad.glb");
