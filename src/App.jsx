import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";
import { useRef, useState } from "react";
import {
  MeshWobbleMaterial,
  OrbitControls,
  useHelper,
} from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from "leva";
const Cube = ({ pos, side, color }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
    meshRef.current.rotation.y += delta * 2;
    // meshRef.current.rotation.z += delta;
    meshRef.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
    // console.log(state.clock.elapsedTime);
    // console.log(delta, state);
  });

  return (
    <mesh ref={meshRef} position={pos}>
      <boxGeometry args={side} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// create a sphereGemoetry and use it to create a sphere

const Sphere = ({ pos, side, color }) => {
  const meshRef = useRef();

  const [ishovered, setIsHovered] = useState(false);
  const [isclicked, setIsClicked] = useState(false);

  useFrame((state, delta) => {
    // meshRef.current.rotation.x += delta;
    const speed = ishovered ? 2 : 0.2;
    meshRef.current.rotation.y += delta * speed;
    // meshRef.current.position.z = Math.sin(state.clock.elapsedTime) * 2;
  });

  return (
    <mesh
      ref={meshRef}
      position={pos}
      onClick={() => setIsClicked(!isclicked)}
      scale={isclicked ? 1.5 : 1}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))}
      onPointerLeave={() => setIsHovered(false)}
    >
      <sphereGeometry args={side} />
      <meshStandardMaterial color={ishovered ? "yellow" : color} wireframe />
    </mesh>
  );
};

const Torus = ({ pos, side, color }) => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta;
  });

  return (
    <mesh ref={meshRef} position={pos}>
      <torusGeometry args={side} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

//create a torusKnotGeometry and use it to create a torus

const TorusKnot = ({ pos, side }) => {
  const meshRef = useRef();

  const { color, radius } = useControls({
    color: "lightblue",
    radius: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.01,
    },
  });

  useFrame((state, delta) => {
    // meshRef.current.rotation.x += delta;
    // meshRef.current.rotation.y += delta;
  });

  return (
    <mesh ref={meshRef} position={pos}>
      <torusKnotGeometry args={side} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={1} color={color} speed={10} />
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef();

  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");
  return (
    <>
      <directionalLight
        ref={directionalLightRef}
        position={[0, 1, 2]}
        intensity={lightIntensity}
        color={lightColor || "white"}
      />
      <ambientLight intensity={0.4} />

      {/* <group position={[0, 0, 0]}>
        <Cube pos={[2, 0, 0]} side={[1, 1, 1]} color="red" />

        <Cube pos={[-2, 0, 0]} side={[1, 1, 1]} color="yellow" />

        <Cube pos={[0, 2, 0]} side={[1, 1, 1]} color="blue" />

        <Cube pos={[0, -2, 0]} side={[1, 1, 1]} color="hotpink" />
      </group> */}
      {/* <Cube pos={[3, 0, 0]} side={[1, 1, 1]} color="red" /> */}

      {/* <Sphere pos={[0, 0, 0]} side={[1, 30, 30]} color="red" /> */}
      {/* <Torus pos={[0, 2, 0]} side={[1, 0.4, 12, 48, Math.PI * 2]} color="red" /> */}
      <TorusKnot pos={[0, 0, 0]} side={[1, 0.4, 64, 8, 2, 3]} color="red" />
      <OrbitControls enableZoom={false} />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default App;
