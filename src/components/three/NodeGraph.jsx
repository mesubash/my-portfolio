import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Morphing wireframe sphere with orbiting rings and particles ─── */
const MorphSphere = () => {
  const meshRef = useRef();
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const originalPositions = useRef(null);

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(2.2, 20), []);

  useEffect(() => {
    if (geometry) originalPositions.current = new Float32Array(geometry.attributes.position.array);
  }, [geometry]);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !originalPositions.current) return;
    const t = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position;
    const orig = originalPositions.current;

    // Vertex displacement — organic morphing
    for (let i = 0; i < pos.count; i++) {
      const ox = orig[i * 3], oy = orig[i * 3 + 1], oz = orig[i * 3 + 2];
      const d = 1 + Math.sin(ox * 1.2 + t * 0.5) * 0.15
                  + Math.sin(oy * 1.6 + t * 0.35) * 0.12
                  + Math.cos(oz * 1.4 + t * 0.4) * 0.1
                  + Math.sin((ox + oz) * 0.8 + t * 0.25) * 0.06;
      pos.array[i * 3] = ox * d;
      pos.array[i * 3 + 1] = oy * d;
      pos.array[i * 3 + 2] = oz * d;
    }
    pos.needsUpdate = true;

    // Smooth mouse-following rotation
    meshRef.current.rotation.y += (mouse.current.x * 0.4 + t * 0.08 - meshRef.current.rotation.y) * 0.02;
    meshRef.current.rotation.x += (mouse.current.y * 0.3 - meshRef.current.rotation.x) * 0.02;

    // Animate rings
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.1;
  });

  return (
    <group>
      {/* Main wireframe */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshBasicMaterial color="#4f46e5" wireframe transparent opacity={0.22} />
      </mesh>

      {/* Inner glow — darker, more visible */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial color="#4338ca" transparent opacity={0.04} />
      </mesh>

      {/* Outer atmosphere haze */}
      <mesh>
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial color="#312e81" transparent opacity={0.025} />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2.2, 0.3, 0]}>
        <torusGeometry args={[3, 0.004, 16, 120]} />
        <meshBasicMaterial color="#1e40af" transparent opacity={0.12} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref} rotation={[1.3, 0.8, 0.4]}>
        <torusGeometry args={[2.7, 0.003, 16, 100]} />
        <meshBasicMaterial color="#3730a3" transparent opacity={0.07} />
      </mesh>

      {/* Orbiting particles */}
      <OrbitingParticles />
    </group>
  );
};

/* ─── Floating particles around the sphere ─── */
const OrbitingParticles = () => {
  const ref = useRef();
  const count = 150;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.6 + Math.random() * 2;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = t * 0.03;
    ref.current.rotation.x = Math.sin(t * 0.015) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#6366f1" size={0.015} transparent opacity={0.25} sizeAttenuation />
    </points>
  );
};

/* ─── Canvas wrapper ─── */
const NodeGraph = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) return;
    const t = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <MorphSphere />
      </Canvas>
    </div>
  );
};

export default NodeGraph;
