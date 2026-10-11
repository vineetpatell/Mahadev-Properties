import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import type * as THREE from "three";

const GOLD = "#C5A880";
const GOLD_DIM = "#6e5b3f";

function Rings() {
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const t = state.clock.elapsedTime;
    g.current.rotation.z = t * 0.06;
    g.current.rotation.x = Math.sin(t * 0.12) * 0.18;
  });
  return (
    <group ref={g} position={[2.4, 0.4, -2.2]} rotation={[Math.PI / 2.4, 0, 0]}>
      {[2.6, 2.05, 1.5].map((r, i) => (
        <mesh key={r} rotation={[0, 0, (i * Math.PI) / 3]}>
          <torusGeometry args={[r, i === 1 ? 0.012 : 0.02, 12, 128]} />
          <meshStandardMaterial
            color={i === 1 ? GOLD : GOLD_DIM}
            transparent
            opacity={i === 1 ? 0.85 : 0.45}
            roughness={0.35}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

function Core() {
  const m = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!m.current) return;
    const t = state.clock.elapsedTime;
    m.current.rotation.y = t * 0.18;
    m.current.position.y = 0.4 + Math.sin(t * 0.5) * 0.12;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={m} position={[2.4, 0.4, -2.2]}>
        <icosahedronGeometry args={[0.85, 1]} />
        <MeshDistortMaterial color={GOLD} roughness={0.25} metalness={0.65} distort={0.28} speed={1.6} transparent opacity={0.9} />
      </mesh>
    </Float>
  );
}

function Dust({ count = 220 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useRef<Float32Array | null>(null);
  if (!positions.current) {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = 4 + (Math.random() - 0.5) * 7;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4.5;
      arr[i * 3 + 2] = -1 - Math.random() * 4;
    }
    positions.current = arr;
  }
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current, 3]} />
      </bufferGeometry>
      <pointsMaterial color={GOLD} size={0.02} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export function HeroSceneCanvas() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        const canvas = gl.domElement;
        const onLost = (e: Event) => e.preventDefault();
        canvas.addEventListener("webglcontextlost", onLost, { passive: false });
      }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 4]} intensity={1.4} color="#fff4e0" />
      <pointLight position={[-3, -2, 2]} intensity={12} color={GOLD} />
      <Rings />
      <Core />
      <Dust />
    </Canvas>
  );
}
