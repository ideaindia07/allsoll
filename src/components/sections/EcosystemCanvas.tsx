'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeItem {
  label: string;
  desc: string;
  angle: number;
}

const nodeData: NodeItem[] = [
  { label: 'SEARCH', desc: 'Discoverability that drives growth.', angle: (0 / 8) * Math.PI * 2 + Math.PI / 2 },
  { label: 'SOCIAL', desc: 'Engagement that builds loyalty.', angle: (-1 / 8) * Math.PI * 2 + Math.PI / 2 },
  { label: 'TECHNOLOGY', desc: 'Tools that empower scale.', angle: (-2 / 8) * Math.PI * 2 + Math.PI / 2 },
  { label: 'EVENTS', desc: 'Experiences that bring people together.', angle: (-3 / 8) * Math.PI * 2 + Math.PI / 2 },
  { label: 'COMMUNITIES', desc: 'Connections that create lasting belonging.', angle: (-4 / 8) * Math.PI * 2 + Math.PI / 2 },
  { label: 'INFLUENCERS', desc: 'Voices that amplify your impact.', angle: (-5 / 8) * Math.PI * 2 + Math.PI / 2 },
  { label: 'PR', desc: 'Reputation that earns trust.', angle: (-6 / 8) * Math.PI * 2 + Math.PI / 2 },
  { label: 'MEDIA', desc: 'Stories that shape opinions and inspire action.', angle: (-7 / 8) * Math.PI * 2 + Math.PI / 2 },
];

// ---- palette lifted straight from the ALLSOLL style sheet ----
const COLORS = {
  white: '#FFFFFF',
  cream: '#FFF5D6',
  gold: '#FFD54A',
  amber: '#FFC107',
  deepGold: '#FFB300',
  glow: 'rgba(255,212,59,0.15)',
};

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

// Maps a value from [start, end] -> [0, 1], clamped.
function rangeProgress(value: number, start: number, end: number) {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp01((value - start) / (end - start));
}

function ParticleSwarm({ converge }: { converge: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 220;

  const [basePositions, positions, colors] = useMemo(() => {
    const base = new Float32Array(count * 3);
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const goldColors = [
      new THREE.Color(COLORS.gold),
      new THREE.Color(COLORS.deepGold),
      new THREE.Color(COLORS.white),
    ];

    for (let i = 0; i < count; i++) {
      base[i * 3] = (Math.random() - 0.5) * 12;
      base[i * 3 + 1] = (Math.random() - 0.5) * 12;
      base[i * 3 + 2] = (Math.random() - 0.5) * 8;
      pos[i * 3] = base[i * 3];
      pos[i * 3 + 1] = base[i * 3 + 1];
      pos[i * 3 + 2] = base[i * 3 + 2];

      const randomColor = goldColors[Math.floor(Math.random() * goldColors.length)];
      cols[i * 3] = randomColor.r;
      cols[i * 3 + 1] = randomColor.g;
      cols[i * 3 + 2] = randomColor.b;
    }
    return [base, pos, cols];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.015;
    pointsRef.current.rotation.x = time * 0.008;

    // "Particles Gather" stage: pull the swarm inward toward the core as
    // converge goes 0 -> 1, then let it settle into a loose ambient shell.
    const geom = pointsRef.current.geometry;
    const posAttr = geom.getAttribute('position') as THREE.BufferAttribute;
    const pullBack = 1 - converge * 0.55;
    for (let i = 0; i < count; i++) {
      posAttr.setXYZ(
        i,
        basePositions[i * 3] * pullBack,
        basePositions[i * 3 + 1] * pullBack,
        basePositions[i * 3 + 2] * pullBack
      );
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} vertexColors sizeAttenuation transparent opacity={0.35} />
    </points>
  );
}

interface SceneProps {
  progress: number;
  mouseX: number;
  mouseY: number;
  isMobile: boolean;
}

// Builds a meandering, hand-drawn-feeling wire from the core out to a node,
// matching the wavy "circuit trace" connectors in the reference art.
function buildWavyCurve(endX: number, endY: number, seed: number) {
  const start = new THREE.Vector3(0, 0, 0);
  const end = new THREE.Vector3(endX, endY, 0);
  const dir = end.clone().sub(start);
  const length = dir.length();
  const perp = new THREE.Vector3(-dir.y, dir.x, 0).normalize();

  const segments = 5;
  const waves = 2.5;
  const amp = length * 0.09;

  const waypoints: THREE.Vector3[] = [start.clone()];
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const point = start.clone().lerp(end, t);
    const wobble = Math.sin(t * Math.PI * waves + seed) * amp * (1 - t * 0.4);
    point.add(perp.clone().multiplyScalar(wobble));
    waypoints.push(point);
  }
  waypoints.push(end.clone());

  const curve = new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.55);
  return curve;
}

function EcosystemScene({ progress, mouseX, mouseY, isMobile }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);
  const ring3Ref = useRef<THREE.Group>(null);
  const outerOrbitRef = useRef<THREE.Group>(null);

  // Normalize scroll progress range for Section 4 [0.45, 0.82]
  const normalizedProg = useMemo(() => {
    if (progress < 0.45) return 0;
    if (progress >= 0.82) {
      return Math.max(0, 1 - (progress - 0.82) / 0.15);
    }
    return (progress - 0.45) / 0.37;
  }, [progress]);

  // ---- 7-stage choreography, matching the ALLSOLL animation-flow sheet ----
  // 01 Particles Gather -> 02 Core Forms -> 03 Rings Activate ->
  // 04 Connections Grow -> 05 Energy Pulses -> 06 Nodes Reveal -> 07 Idle Breathing
  const particleConverge = rangeProgress(normalizedProg, 0, 0.14);
  const circleProgress = rangeProgress(normalizedProg, 0.08, 0.3); // core forms
  const ringsProgress = rangeProgress(normalizedProg, 0.22, 0.44); // rings activate
  const lineProgress = rangeProgress(normalizedProg, 0.4, 0.7); // connections grow
  const pulsesActive = lineProgress >= 1 && normalizedProg < 0.98; // energy pulses
  const nodeAlpha = rangeProgress(normalizedProg, 0.74, 0.96); // nodes reveal
  const isIdle = normalizedProg >= 0.98; // idle breathing loop

  // Generate 3 concentric circles for core rings (matching blueprint)
  const [circlePoints1, circlePoints2, circlePoints3] = useMemo(() => {
    const generatePoints = (radius: number) => {
      const pts = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
      }
      return pts;
    };
    return [generatePoints(0.6), generatePoints(0.85), generatePoints(1.15)];
  }, []);

  const orbitRadius = 2.3;

  // Big faint circle threading through all 8 nodes (visible in the reference art)
  const outerOrbitPoints = useMemo(() => {
    const pts = [];
    const segs = 96;
    for (let i = 0; i <= segs; i++) {
      const theta = (i / segs) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * orbitRadius, Math.sin(theta) * orbitRadius, 0));
    }
    return pts;
  }, []);

  // Wavy connector wires + their decorative waypoint dots
  const curves = useMemo(() => {
    return nodeData.map((node, idx) => {
      const endX = Math.cos(node.angle) * orbitRadius;
      const endY = Math.sin(node.angle) * orbitRadius;
      const curve = buildWavyCurve(endX, endY, idx * 1.7);
      return {
        curve,
        endX,
        endY,
        points: curve.getPoints(60),
        dotTs: [0.22, 0.48, 0.74], // static dots sprinkled along the wire
      };
    });
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      const targetRotX = mouseY * 0.12;
      const targetRotY = mouseX * 0.12;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
    }

    if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.18;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.12;
    if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.06;
    if (outerOrbitRef.current) outerOrbitRef.current.rotation.z = time * 0.02;

    // Idle Breathing: everything gets a slow shared pulse once fully revealed.
    const breathe = isIdle ? 1 + Math.sin(time * 1.1) * 0.025 : 1;
    if (coreRef.current) {
      const scale = (1 + Math.sin(time * 2) * 0.03) * breathe;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (groupRef.current) {
      const s = breathe;
      groupRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. CENTRAL GLOWING CORE ("Core Forms") */}
      {circleProgress > 0 && (
        <group>
          <mesh ref={coreRef}>
            <sphereGeometry args={[0.26, 32, 32]} />
            <meshBasicMaterial color={COLORS.white} transparent opacity={0.9 * circleProgress} />
          </mesh>

          <mesh>
            <sphereGeometry args={[0.36, 32, 32]} />
            <meshBasicMaterial color={COLORS.deepGold} transparent opacity={0.4 * circleProgress} />
          </mesh>

          <Html center distanceFactor={6} className="pointer-events-none select-none">
            <div
              className="text-white font-display text-[9px] font-bold tracking-[0.3em] text-center select-none bg-black/50 px-2 py-0.5 rounded-full border border-white/5 backdrop-blur-sm"
              style={{ opacity: circleProgress }}
            >
              ALL<span style={{ color: COLORS.gold }}>SOLL</span>
            </div>
          </Html>

          {/* 2. CONCENTRIC RINGS ("Rings Activate") */}
          {ringsProgress > 0 && (
            <>
              <group ref={ring1Ref}>
                <Line points={circlePoints1} color={COLORS.gold} lineWidth={1.2} transparent opacity={0.4 * ringsProgress} />
              </group>
              <group ref={ring2Ref}>
                <Line
                  points={circlePoints2}
                  color={COLORS.amber}
                  lineWidth={0.9}
                  transparent
                  opacity={0.3 * ringsProgress}
                  dashed
                  dashSize={0.06}
                  gapSize={0.04}
                />
              </group>
              <group ref={ring3Ref}>
                <Line
                  points={circlePoints3}
                  color={COLORS.deepGold}
                  lineWidth={1.2}
                  transparent
                  opacity={0.2 * ringsProgress}
                  dashed
                  dashSize={0.12}
                  gapSize={0.08}
                />
              </group>
            </>
          )}
        </group>
      )}

      {/* Outer orbit ring threading through all 8 nodes */}
      {lineProgress > 0 && (
        <group ref={outerOrbitRef}>
          <Line points={outerOrbitPoints} color={COLORS.gold} lineWidth={0.6} transparent opacity={0.18 * lineProgress} />
        </group>
      )}

      {/* 3. WAVY CONNECTIONS ("Connections Grow") + ENERGY PULSES */}
      {curves.map((curveObj, idx) => {
        const { curve, points, endX, endY, dotTs } = curveObj;
        const revealedPoints = points.slice(0, Math.floor(points.length * lineProgress) + 1);

        return (
          <group key={idx}>
            {lineProgress > 0 && revealedPoints.length > 1 && (
              <group>
                <Line points={revealedPoints} color={COLORS.gold} lineWidth={1.2} transparent opacity={0.35 * lineProgress} />
                <Line points={revealedPoints} color={COLORS.deepGold} lineWidth={3} transparent opacity={0.12 * lineProgress} />

                {/* small static dots sprinkled along the wire, like the reference art */}
                {dotTs.map((t, dotIdx) =>
                  lineProgress > t ? (
                    <mesh key={dotIdx} position={curve.getPointAt(t)}>
                      <sphereGeometry args={[0.02, 8, 8]} />
                      <meshBasicMaterial color={COLORS.gold} transparent opacity={0.8} />
                    </mesh>
                  ) : null
                )}

                <TravelingPulse curve={curve} active={pulsesActive} delay={idx * 0.125} />
              </group>
            )}

            {/* 4. NODES REVEAL */}
            {nodeAlpha > 0 && (
              <group position={[endX, endY, 0]}>
                <mesh>
                  <sphereGeometry args={[0.035, 16, 16]} />
                  <meshBasicMaterial color={COLORS.white} transparent opacity={nodeAlpha} />
                </mesh>
                <mesh>
                  <sphereGeometry args={[0.065, 16, 16]} />
                  <meshBasicMaterial color={COLORS.deepGold} transparent opacity={nodeAlpha * 0.75} />
                </mesh>

                {/* concentric "echo" rings around each node, mirroring the core */}
                <NodeRings alpha={nodeAlpha} />

                <Html center distanceFactor={6} className="pointer-events-none select-none">
                  {(() => {
                    const isTop = Math.abs(nodeData[idx].angle - Math.PI / 2) < 0.1;
                    const isBottom =
                      Math.abs(nodeData[idx].angle - -Math.PI / 2) < 0.1 ||
                      Math.abs(nodeData[idx].angle - (3 * Math.PI) / 2) < 0.1;
                    const isLeft = endX < -0.1 && !isTop && !isBottom;
                    const isRight = endX > 0.1 && !isTop && !isBottom;

                    let alignClass = 'text-left';
                    let translateOffset = isMobile ? 'translate(68px, -10px)' : 'translate(110px, -15px)';

                    if (isTop) {
                      alignClass = 'text-center';
                      translateOffset = isMobile ? 'translate(0px, -32px)' : 'translate(0px, -60px)';
                    } else if (isBottom) {
                      alignClass = 'text-center';
                      translateOffset = isMobile ? 'translate(0px, 28px)' : 'translate(0px, 55px)';
                    } else if (isLeft) {
                      alignClass = 'text-right';
                      translateOffset = isMobile ? 'translate(-68px, -10px)' : 'translate(-115px, -15px)';
                    } else if (isRight) {
                      alignClass = 'text-left';
                      translateOffset = isMobile ? 'translate(68px, -10px)' : 'translate(115px, -15px)';
                    }

                    return (
                      <div
                        className={`flex flex-col gap-0.5 select-none ${alignClass}`}
                        style={{
                          opacity: nodeAlpha,
                          transform: translateOffset,
                          width: isMobile ? '100px' : '170px'
                        }}
                      >
                        <span className="text-white font-display text-[9px] sm:text-[12px] font-medium tracking-wide uppercase px-1 py-1 sm:py-2 select-none text-center bg-bg-primary/70 backdrop-blur-sm border border-white/5 rounded-md whitespace-nowrap">
                          {nodeData[idx].label}
                        </span>
                        {!isMobile && (
                          <span className="text-white/55 font-body text-[13px] font-light leading-snug">
                            {nodeData[idx].desc}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </Html>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
}

// Two faint concentric rings around a node, echoing the central core's rings.
function NodeRings({ alpha }: { alpha: number }) {
  const points1 = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 32; i++) {
      const t = (i / 32) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * 0.09, Math.sin(t) * 0.09, 0));
    }
    return pts;
  }, []);
  const points2 = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 32; i++) {
      const t = (i / 32) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * 0.13, Math.sin(t) * 0.13, 0));
    }
    return pts;
  }, []);

  return (
    <>
      <Line points={points1} color={COLORS.gold} lineWidth={1} transparent opacity={alpha * 0.55} />
      <Line points={points2} color={COLORS.amber} lineWidth={0.8} transparent opacity={alpha * 0.3} />
    </>
  );
}

// Subcomponent to handle looping pulse offset
function TravelingPulse({ curve, active, delay }: { curve: THREE.CatmullRomCurve3; active: boolean; delay: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !active) return;
    const time = state.clock.getElapsedTime();
    const t = ((time * 0.42) + delay) % 1.0;
    const position = curve.getPointAt(t);
    meshRef.current.position.copy(position);
  });

  if (!active) return null;

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color={COLORS.amber} />
    </mesh>
  );
}

interface CanvasProps {
  scrollProgress: number;
  mouseX: number;
  mouseY: number;
  isMobile: boolean;
}

export default function EcosystemCanvas({ scrollProgress, mouseX, mouseY, isMobile }: CanvasProps) {
  const normalizedProg = useMemo(() => {
    if (scrollProgress < 0.45) return 0;
    if (scrollProgress >= 0.82) return Math.max(0, 1 - (scrollProgress - 0.82) / 0.15);
    return (scrollProgress - 0.45) / 0.37;
  }, [scrollProgress]);
  const particleConverge = rangeProgress(normalizedProg, 0, 0.14);

  // Position camera further back on mobile to fit the wide node orbit
  const cameraZ = isMobile ? 7.8 : 4.3;

  return (
    <Canvas camera={{ position: [0, 0, cameraZ], fov: 60 }} gl={{ antialias: true }} className="w-full h-full">
      <ambientLight intensity={0.65} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <ParticleSwarm converge={particleConverge} />
      <EcosystemScene progress={scrollProgress} mouseX={mouseX} mouseY={mouseY} isMobile={isMobile} />
    </Canvas>
  );
}


// 'use client';

// import { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Line, Html } from '@react-three/drei';
// import * as THREE from 'three';

// interface NodeItem {
//   label: string;
//   desc: string;
//   angle: number;
// }

// const nodeData: NodeItem[] = [
//   { label: 'SEARCH', desc: 'Discoverability that drives growth.', angle: (0 / 8) * Math.PI * 2 + Math.PI / 2 },
//   { label: 'SOCIAL', desc: 'Engagement that builds loyalty.', angle: (-1 / 8) * Math.PI * 2 + Math.PI / 2 },
//   { label: 'TECHNOLOGY', desc: 'Tools that empower scale.', angle: (-2 / 8) * Math.PI * 2 + Math.PI / 2 },
//   { label: 'EVENTS', desc: 'Experiences that bring people together.', angle: (-3 / 8) * Math.PI * 2 + Math.PI / 2 },
//   { label: 'COMMUNITIES', desc: 'Connections that create lasting belonging.', angle: (-4 / 8) * Math.PI * 2 + Math.PI / 2 },
//   { label: 'INFLUENCERS', desc: 'Voices that amplify your impact.', angle: (-5 / 8) * Math.PI * 2 + Math.PI / 2 },
//   { label: 'PR', desc: 'Reputation that earns trust.', angle: (-6 / 8) * Math.PI * 2 + Math.PI / 2 },
//   { label: 'MEDIA', desc: 'Stories that shape opinions and inspire action.', angle: (-7 / 8) * Math.PI * 2 + Math.PI / 2 },
// ];

// function ParticleSwarm() {
//   const pointsRef = useRef<THREE.Points>(null);
//   const count = 220; // Increased background particle richness

//   const [positions, colors] = useMemo(() => {
//     const pos = new Float32Array(count * 3);
//     const cols = new Float32Array(count * 3);
//     const goldColors = [
//       new THREE.Color('#FFD54A'),
//       new THREE.Color('#FFB300'),
//       new THREE.Color('#FFFFFF'),
//     ];

//     for (let i = 0; i < count; i++) {
//       pos[i * 3] = (Math.random() - 0.5) * 12;
//       pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
//       pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

//       const randomColor = goldColors[Math.floor(Math.random() * goldColors.length)];
//       cols[i * 3] = randomColor.r;
//       cols[i * 3 + 1] = randomColor.g;
//       cols[i * 3 + 2] = randomColor.b;
//     }
//     return [pos, cols];
//   }, []);

//   useFrame((state) => {
//     if (pointsRef.current) {
//       pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
//       pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;
//     }
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           args={[positions, 3]}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           args={[colors, 3]}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={0.03}
//         vertexColors
//         sizeAttenuation
//         transparent
//         opacity={0.35}
//       />
//     </points>
//   );
// }

// interface SceneProps {
//   progress: number;
//   mouseX: number;
//   mouseY: number;
// }

// function EcosystemScene({ progress, mouseX, mouseY }: SceneProps) {
//   const groupRef = useRef<THREE.Group>(null);
//   const coreRef = useRef<THREE.Mesh>(null);
//   const ring1Ref = useRef<THREE.Group>(null);
//   const ring2Ref = useRef<THREE.Group>(null);
//   const ring3Ref = useRef<THREE.Group>(null);

//   // Normalize scroll progress range for Section 4 [0.45, 0.82]
//   const normalizedProg = useMemo(() => {
//     if (progress < 0.45) return 0;
//     if (progress >= 0.82) {
//       return Math.max(0, 1 - (progress - 0.82) / 0.15);
//     }
//     return (progress - 0.45) / 0.37;
//   }, [progress]);

//   const circleProgress = Math.min(1, normalizedProg / 0.3);
//   const lineProgress = normalizedProg > 0.2 ? Math.min(1, (normalizedProg - 0.2) / 0.5) : 0;
//   const nodeAlpha = normalizedProg > 0.65 ? Math.min(1, (normalizedProg - 0.65) / 0.35) : 0;

//   // Generate 3 concentric circles for core rings (matching blueprint)
//   const [circlePoints1, circlePoints2, circlePoints3] = useMemo(() => {
//     const generatePoints = (radius: number) => {
//       const pts = [];
//       const segs = 64;
//       for (let i = 0; i <= segs; i++) {
//         const theta = (i / segs) * Math.PI * 2;
//         pts.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
//       }
//       return pts;
//     };
//     return [generatePoints(0.6), generatePoints(0.85), generatePoints(1.15)];
//   }, []);

//   // Generate beautiful curved connection lines to nodes
//   const curves = useMemo(() => {
//     const orbitRadius = 2.3;
//     return nodeData.map((node) => {
//       const endX = Math.cos(node.angle) * orbitRadius;
//       const endY = Math.sin(node.angle) * orbitRadius;
      
//       const midPoint = new THREE.Vector3(endX * 0.5, endY * 0.5, 0);
      
//       // Rotate midpoint slightly to create a beautiful organic bezier curve (S-curve feel)
//       const rotationAngle = 0.22; // ~12 degrees
//       const cos = Math.cos(rotationAngle);
//       const sin = Math.sin(rotationAngle);
//       const rx = midPoint.x * cos - midPoint.y * sin;
//       const ry = midPoint.x * sin + midPoint.y * cos;
//       const controlPoint = new THREE.Vector3(rx, ry, 0);

//       const curve = new THREE.QuadraticBezierCurve3(
//         new THREE.Vector3(0, 0, 0),
//         controlPoint,
//         new THREE.Vector3(endX, endY, 0)
//       );

//       return {
//         curve,
//         endX,
//         endY,
//         points: curve.getPoints(40),
//       };
//     });
//   }, []);

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();

//     if (groupRef.current) {
//       // Gentle floating orientation based on mouse drag coordinates
//       const targetRotX = mouseY * 0.12;
//       const targetRotY = mouseX * 0.12;
//       groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;
//       groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
//     }

//     // Spin core rings at different rates
//     if (ring1Ref.current) ring1Ref.current.rotation.z = time * 0.18;
//     if (ring2Ref.current) ring2Ref.current.rotation.z = -time * 0.12;
//     if (ring3Ref.current) ring3Ref.current.rotation.z = time * 0.06;

//     // Pulse core scale slightly
//     if (coreRef.current) {
//       const scale = 1 + Math.sin(time * 2) * 0.03;
//       coreRef.current.scale.set(scale, scale, scale);
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       {/* 1. CENTRAL GLOWING CORE */}
//       {circleProgress > 0 && (
//         <group>
//           {/* Inner Core Mesh */}
//           <mesh ref={coreRef}>
//             <sphereGeometry args={[0.26, 32, 32]} />
//             <meshBasicMaterial color="#ffffff" transparent opacity={0.9 * circleProgress} />
//           </mesh>

//           {/* Core Outer Aura Glow */}
//           <mesh>
//             <sphereGeometry args={[0.36, 32, 32]} />
//             <meshBasicMaterial
//               color="#FFB300"
//               transparent
//               opacity={0.4 * circleProgress}
//             />
//           </mesh>

//           {/* Central Label */}
//           <Html center distanceFactor={6} className="pointer-events-none select-none">
//             <div
//               className="text-white font-display text-[9px] font-bold tracking-[0.3em] text-center select-none bg-black/50 px-2 py-0.5 rounded-full border border-white/5 backdrop-blur-sm"
//               style={{ opacity: circleProgress }}
//             >
//               ALLSOLL
//             </div>
//           </Html>

//           {/* 2. CONCENTRIC ROTATING RINGS */}
//           <group ref={ring1Ref}>
//             <Line
//               points={circlePoints1}
//               color="#FFD54A"
//               lineWidth={1.2}
//               transparent
//               opacity={0.4 * circleProgress}
//             />
//           </group>
//           <group ref={ring2Ref}>
//             <Line
//               points={circlePoints2}
//               color="#FFC107"
//               lineWidth={0.9}
//               transparent
//               opacity={0.3 * circleProgress}
//               dashed
//               dashSize={0.06}
//               gapSize={0.04}
//             />
//           </group>
//           <group ref={ring3Ref}>
//             <Line
//               points={circlePoints3}
//               color="#FFB300"
//               lineWidth={1.2}
//               transparent
//               opacity={0.2 * circleProgress}
//               dashed
//               dashSize={0.12}
//               gapSize={0.08}
//             />
//           </group>
//         </group>
//       )}

//       {/* 3. CURVED CONNECTIONS & TRAVELING PULSES */}
//       {curves.map((curveObj, idx) => {
//         const { curve, points, endX, endY } = curveObj;

//         // Path connections reveal progress
//         const revealedPoints = points.slice(0, Math.floor(points.length * lineProgress) + 1);

//         return (
//           <group key={idx}>
//             {lineProgress > 0 && revealedPoints.length > 1 && (
//               <group>
//                 {/* Curved Connector Wire (Main) */}
//                 <Line
//                   points={revealedPoints}
//                   color="#FFD54A"
//                   lineWidth={1.2}
//                   transparent
//                   opacity={0.35 * lineProgress}
//                 />

//                 {/* Soft Glowing Outline Line for Curved Connector */}
//                 <Line
//                   points={revealedPoints}
//                   color="#FFB300"
//                   lineWidth={3}
//                   transparent
//                   opacity={0.12 * lineProgress}
//                 />

//                 {/* Energy Pulse (Spheres traveling along curve) */}
//                 <TravelingPulse curve={curve} active={lineProgress === 1} delay={idx * 0.125} />
//               </group>
//             )}

//             {/* 4. ORBITAL NODES & FLOATING LABELS */}
//             {nodeAlpha > 0 && (
//               <group position={[endX, endY, 0]}>
//                 {/* Glowing Node Dot (Inner white core) */}
//                 <mesh>
//                   <sphereGeometry args={[0.035, 16, 16]} />
//                   <meshBasicMaterial color="#ffffff" transparent opacity={nodeAlpha} />
//                 </mesh>

//                 {/* Glowing Node Halo (Gold aura) */}
//                 <mesh>
//                   <sphereGeometry args={[0.065, 16, 16]} />
//                   <meshBasicMaterial color="#FFB300" transparent opacity={nodeAlpha * 0.75} />
//                 </mesh>

//                 {/* Outer Ring around node dot */}
//                 <mesh>
//                   <ringGeometry args={[0.085, 0.095, 32]} />
//                   <meshBasicMaterial color="#FFD54A" transparent opacity={nodeAlpha * 0.5} />
//                 </mesh>

//                 {/* Floating Node Label & Description Tagline (Clean typography, no boxes) */}
//                 <Html center distanceFactor={6} className="pointer-events-none select-none">
//                   {(() => {
//                     // Compute absolute coordinate alignments for pure text placement
//                     const isTop = Math.abs(nodeData[idx].angle - Math.PI / 2) < 0.1;
//                     const isBottom = Math.abs(nodeData[idx].angle - (-Math.PI / 2)) < 0.1 || Math.abs(nodeData[idx].angle - (3 * Math.PI / 2)) < 0.1;
//                     const isLeft = endX < -0.1 && !isTop && !isBottom;
//                     const isRight = endX > 0.1 && !isTop && !isBottom;

//                     let alignClass = "text-left";
//                     let translateOffset = "translate(110px, -15px)";

//                     if (isTop) {
//                       alignClass = "text-center";
//                       translateOffset = "translate(0px, -55px)";
//                     } else if (isBottom) {
//                       alignClass = "text-center";
//                       translateOffset = "translate(0px, 50px)";
//                     } else if (isLeft) {
//                       alignClass = "text-right";
//                       translateOffset = "translate(-110px, -15px)";
//                     } else if (isRight) {
//                       alignClass = "text-left";
//                       translateOffset = "translate(110px, -15px)";
//                     }

//                     return (
//                       <div
//                         className={`flex flex-col gap-0.5 select-none w-[170px] ${alignClass}`}
//                         style={{
//                           opacity: nodeAlpha,
//                           transform: translateOffset,
//                         }}
//                       >
//                         <span className="text-white font-display text-[10.5px] font-bold tracking-[0.25em] uppercase">
//                           {nodeData[idx].label}
//                         </span>
//                         <span className="text-[#FFD54A]/80 font-body text-[8.5px] font-light leading-snug">
//                           {nodeData[idx].desc}
//                         </span>
//                       </div>
//                     );
//                   })()}
//                 </Html>
//               </group>
//             )}
//           </group>
//         );
//       })}
//     </group>
//   );
// }

// // Subcomponent to handle looping pulse offset
// function TravelingPulse({ curve, active, delay }: { curve: THREE.QuadraticBezierCurve3; active: boolean; delay: number }) {
//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame((state) => {
//     if (!meshRef.current || !active) return;
//     const time = state.clock.getElapsedTime();
//     // Continuous travel speed loops from 0 to 1
//     const t = ((time * 0.42) + delay) % 1.0;
//     const position = curve.getPointAt(t);
//     meshRef.current.position.copy(position);
//   });

//   if (!active) return null;

//   return (
//     <mesh ref={meshRef}>
//       <sphereGeometry args={[0.03, 8, 8]} />
//       <meshBasicMaterial color="#FFC107" />
//     </mesh>
//   );
// }

// interface CanvasProps {
//   scrollProgress: number;
//   mouseX: number;
//   mouseY: number;
// }

// export default function EcosystemCanvas({ scrollProgress, mouseX, mouseY }: CanvasProps) {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 4.3], fov: 60 }}
//       gl={{ antialias: true }}
//       className="w-full h-full"
//     >
//       <ambientLight intensity={0.65} />
//       <pointLight position={[10, 10, 10]} intensity={1.5} />
//       <ParticleSwarm />
//       <EcosystemScene progress={scrollProgress} mouseX={mouseX} mouseY={mouseY} />
//     </Canvas>
//   );
// }
