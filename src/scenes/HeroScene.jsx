
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";

function Core() {
  const core = useRef(null);
  const rings = useRef(null);

  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.18;
      core.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }

    if (rings.current) {
      rings.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group>
        <group ref={core}>
          <mesh>
            <icosahedronGeometry args={[1.25, 2]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#6d28d9"
              emissiveIntensity={1.2}
              metalness={0.8}
              roughness={0.25}
              wireframe
            />
          </mesh>

          <mesh>
            <icosahedronGeometry args={[0.9, 1]} />
            <meshBasicMaterial
              color="#c084fc"
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        </group>

        <group ref={rings}>
          <mesh rotation={[1.1, 0.4, 0]}>
            <torusGeometry args={[1.8, 0.012, 8, 120]} />
            <meshBasicMaterial color="#a855f7" />
          </mesh>

          <mesh rotation={[0.5, 1.2, 0.8]}>
            <torusGeometry args={[2.05, 0.008, 8, 120]} />
            <meshBasicMaterial color="#c084fc" />
          </mesh>
        </group>

        <mesh>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.8} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#a855f7" />
      <pointLight position={[-3, -2, 2]} intensity={1.5} color="#6d28d9" />

      <Core />

      <Sparkles
        count={100}
        scale={6}
        size={2}
        speed={0.3}
        color="#c084fc"
      />
    </Canvas>
  );
}
