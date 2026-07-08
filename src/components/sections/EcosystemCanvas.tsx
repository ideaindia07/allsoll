'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeItem {
  label: string;
  angle: number;
}

const nodeData: NodeItem[] = [
  { label: 'Media', angle: (0 / 8) * Math.PI * 2 },
  { label: 'Search', angle: (1 / 8) * Math.PI * 2 },
  { label: 'Social', angle: (2 / 8) * Math.PI * 2 },
  { label: 'PR', angle: (3 / 8) * Math.PI * 2 },
  { label: 'Influencers', angle: (4 / 8) * Math.PI * 2 },
  { label: 'Communities', angle: (5 / 8) * Math.PI * 2 },
  { label: 'Technology', angle: (6 / 8) * Math.PI * 2 },
  { label: 'Events', angle: (7 / 8) * Math.PI * 2 },
];

function ParticleSwarm() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 120;

  // Memoize random particle positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0004;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.025} sizeAttenuation transparent opacity={0.3} />
    </points>
  );
}

interface SceneProps {
  progress: number;
  mouseX: number;
  mouseY: number;
}

function EcosystemScene({ progress, mouseX, mouseY }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Calculate interpolation ranges from scroll progress
  // Scroll matches Section 4: progress from 0.45 to 0.85
  // We normalize this scroll progress into [0, 1] range:
  const normalizedProg = useMemo(() => {
    if (progress < 0.45) return 0;
    if (progress >= 0.82) {
      // Collapse back when scrolling out
      return Math.max(0, 1 - (progress - 0.82) / 0.15);
    }
    return (progress - 0.45) / 0.37;
  }, [progress]);

  // Stage interpolation calculations
  const circleProgress = Math.min(1, normalizedProg / 0.35);
  const lineProgress = normalizedProg > 0.25 ? Math.min(1, (normalizedProg - 0.25) / 0.5) : 0;
  const nodeAlpha = normalizedProg > 0.65 ? Math.min(1, (normalizedProg - 0.65) / 0.35) : 0;

  const startTimeRef = useRef(typeof window !== 'undefined' ? performance.now() : 0);

  useFrame(() => {
    const time = (performance.now() - startTimeRef.current) * 0.001;

    if (groupRef.current) {
      // Slow orbital rotate
      groupRef.current.rotation.z = time * 0.05;

      // Soft tilt based on cursor coordinates with damp spring calculations
      const targetRotationX = mouseY * 0.15;
      const targetRotationY = mouseX * 0.15;
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Central Core Node (ALLSOLL) */}
      {circleProgress > 0 && (
        <group>
          {/* Glowing Aura Mesh */}
          <mesh>
            <sphereGeometry args={[0.3, 32, 32]} />
            <meshBasicMaterial
              color="#FFD43B"
              transparent
              opacity={0.15 * circleProgress}
              wireframe
            />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8 * circleProgress} />
          </mesh>
          {/* Label text bills */}
          <Html center distanceFactor={6} className="pointer-events-none select-none">
            <div
              className="text-white font-display text-[10px] font-bold tracking-[0.25em] text-center select-none"
              style={{ opacity: circleProgress }}
            >
              ALLSOLL
            </div>
          </Html>
        </group>
      )}

      {/* 2. Connected Nodes Network */}
      {nodeData.map((node, index) => {
        const orbitRadius = 2.1;
        const x = Math.cos(node.angle) * orbitRadius;
        const y = Math.sin(node.angle) * orbitRadius;
        const z = 0;

        // Path positions
        const startPos: [number, number, number] = [0, 0, 0];
        const endPos: [number, number, number] = [x, y, z];

        // Connecting paths
        const currentEndPos: [number, number, number] = [
          x * lineProgress,
          y * lineProgress,
          z * lineProgress,
        ];

        return (
          <group key={index}>
            {/* Draw network line wires */}
            {lineProgress > 0 && (
              <group>
                <Line
                  points={[startPos, currentEndPos]}
                  color="#ffffff"
                  lineWidth={1}
                  transparent
                  opacity={0.1 * lineProgress}
                />
                {/* Micro yellow pulse node traveling outward */}
                {lineProgress < 1 && (
                  <mesh position={currentEndPos}>
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshBasicMaterial color="#FFD43B" transparent opacity={0.9 * lineProgress} />
                  </mesh>
                )}
              </group>
            )}

            {/* Draw outer nodes & bills */}
            {nodeAlpha > 0 && (
              <group position={endPos}>
                <mesh>
                  <sphereGeometry args={[0.04, 16, 16]} />
                  <meshBasicMaterial color="#FFD43B" transparent opacity={nodeAlpha} />
                </mesh>
                <Html center distanceFactor={6} className="pointer-events-none select-none">
                  <div
                    className="text-white font-display text-[9px] font-medium tracking-wide uppercase px-2 py-1 select-none text-center bg-bg-primary/60 backdrop-blur-sm border border-white/5 rounded-md whitespace-nowrap"
                    style={{
                      opacity: nodeAlpha,
                      transform: `translate(${x > 0 ? '55px' : '-55px'}, 0px)`,
                    }}
                  >
                    {node.label}
                  </div>
                </Html>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}

interface CanvasProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
}

export default function EcosystemCanvas({ scrollProgress, mouseX, mouseY }: CanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 60 }}
      gl={{ antialias: true }}
      className="w-full h-full"
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ParticleSwarm />
      <EcosystemScene progress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
