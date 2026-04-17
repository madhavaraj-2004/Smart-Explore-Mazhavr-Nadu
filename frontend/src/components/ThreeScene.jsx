import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { recordPlaceClick } from '../utils/activityTracker';

const PLACE_DETAILS = {
  salemHills: {
    title: 'Salem Hills',
    description: 'Rolling terrain with elevated viewpoints and cool-weather trails.',
  },
  dharmapuriFalls: {
    title: 'Dharmapuri Waterfall Zone',
    description: 'Rocky river channel inspired by Hogenakkal-style cascades.',
  },
  krishnagiriTemple: {
    title: 'Krishnagiri Temple Landmark',
    description: 'Temple-centered heritage point for spiritual and architectural exploration.',
  },
  namakkalRock: {
    title: 'Namakkal Rock Viewpoint',
    description: 'A dramatic rock formation used as a panoramic orientation point.',
  },
};

function TemplePrimitive() {
  return (
    <group>
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.7, 0.9]} />
        <meshStandardMaterial color="#e8c48e" roughness={0.65} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <coneGeometry args={[0.55, 0.95, 4]} />
        <meshStandardMaterial color="#c78d47" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <cylinderGeometry args={[0.85, 0.95, 0.16, 24]} />
        <meshStandardMaterial color="#8a6a42" roughness={0.78} />
      </mesh>
    </group>
  );
}

function TempleModel({ isCompact, placeKey }) {
  const [model, setModel] = useState(null);
  const [modelFailed, setModelFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loader = new GLTFLoader();

    loader.load(
      '/models/temple.glb',
      (gltf) => {
        if (isMounted) {
          setModel(gltf.scene);
        }
      },
      undefined,
      () => {
        if (isMounted) {
          setModelFailed(true);
        }
      },
    );

    return () => {
      isMounted = false;
    };
  }, []);

  const clonedTemple = useMemo(() => {
    if (!model) {
      return null;
    }

    const clone = model.clone();
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = !isCompact;
        child.receiveShadow = true;
      }
      child.userData.placeKey = placeKey;
    });
    return clone;
  }, [isCompact, model, placeKey]);

  if (clonedTemple && !modelFailed) {
    return <primitive object={clonedTemple} scale={isCompact ? 0.22 : 0.28} />;
  }

  return <TemplePrimitive />;
}

function Waterfall() {
  const waterfallRef = useRef(null);

  useFrame((state) => {
    if (!waterfallRef.current) {
      return;
    }
    const wave = Math.sin(state.clock.elapsedTime * 2.2) * 0.06;
    waterfallRef.current.position.z = -1.65 + wave;
    waterfallRef.current.material.opacity = 0.45 + Math.abs(wave) * 1.8;
  });

  return (
    <mesh ref={waterfallRef} position={[-2.8, 1, -1.65]}>
      <planeGeometry args={[1.1, 2.1]} />
      <meshStandardMaterial color="#53d6ff" transparent opacity={0.52} />
    </mesh>
  );
}

function RaycastClickHandler({ onSelectPlace }) {
  const { camera, gl, scene } = useThree();
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());

  useEffect(() => {
    const domElement = gl.domElement;

    const handlePointerDown = (event) => {
      const bounds = domElement.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const intersects = raycasterRef.current.intersectObjects(scene.children, true);

      const found = intersects.find((item) => {
        let current = item.object;
        while (current) {
          if (current.userData?.placeKey) {
            return true;
          }
          current = current.parent;
        }
        return false;
      });

      if (!found) {
        return;
      }

      let current = found.object;
      while (current && !current.userData?.placeKey) {
        current = current.parent;
      }

      const key = current?.userData?.placeKey;
      if (key && PLACE_DETAILS[key]) {
        recordPlaceClick(PLACE_DETAILS[key].title);
        onSelectPlace(PLACE_DETAILS[key]);
      }
    };

    domElement.addEventListener('pointerdown', handlePointerDown);
    return () => {
      domElement.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [camera, gl, onSelectPlace, scene]);

  return null;
}

function ExplorerWorld({ isCompact, onSelectPlace }) {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight
        position={[5, 9, 4]}
        intensity={1.55}
        color="#ffd166"
        castShadow={!isCompact}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight intensity={0.6} color="#dff6ff" groundColor="#5b4424" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.7, 0]}>
        <planeGeometry args={[22, 22, isCompact ? 24 : 36, isCompact ? 24 : 36]} />
        <meshStandardMaterial color="#7eb25f" roughness={0.95} metalness={0.02} />
      </mesh>

      <mesh position={[-4, 1, -2]} castShadow receiveShadow userData={{ placeKey: 'salemHills' }}>
        <coneGeometry args={[2.25, 3.2, isCompact ? 8 : 12]} />
        <meshStandardMaterial color="#5f8f47" roughness={0.88} />
      </mesh>
      <mesh position={[-1.5, 0.8, -3.4]} castShadow receiveShadow userData={{ placeKey: 'salemHills' }}>
        <coneGeometry args={[1.8, 2.6, isCompact ? 8 : 12]} />
        <meshStandardMaterial color="#719a55" roughness={0.84} />
      </mesh>
      <mesh position={[3.5, 1.15, -2.2]} castShadow receiveShadow userData={{ placeKey: 'namakkalRock' }}>
        <dodecahedronGeometry args={[1.25, 0]} />
        <meshStandardMaterial color="#9a7a59" roughness={0.82} />
      </mesh>

      <group userData={{ placeKey: 'dharmapuriFalls' }}>
        <mesh position={[-2.8, 0.18, -1.92]} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.35, 1.3]} />
          <meshStandardMaterial color="#7a6651" roughness={0.9} />
        </mesh>
        <Waterfall />
      </group>

      <group position={[2.2, -0.25, 0.7]} userData={{ placeKey: 'krishnagiriTemple' }}>
        <TempleModel isCompact={isCompact} placeKey="krishnagiriTemple" />
      </group>

      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={isCompact ? 5.8 : 4.8}
        maxDistance={isCompact ? 10.5 : 12}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0.45, 0]}
      />

      <RaycastClickHandler onSelectPlace={onSelectPlace} />
    </>
  );
}

const ThreeScene = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isCompact, setIsCompact] = useState(false);
  const webglCanvasRef = useRef(null);

  useEffect(() => {
    const isSmallViewport = window.matchMedia('(max-width: 860px)').matches;
    const lowMemoryDevice = Number(navigator.deviceMemory || 8) <= 4;
    const saveDataEnabled = Boolean(navigator.connection?.saveData);
    setIsCompact(isSmallViewport || lowMemoryDevice || saveDataEnabled);
  }, []);

  useEffect(() => {
    const canvas = webglCanvasRef.current;
    if (!canvas) {
      return undefined;
    }

    const handleWebglContextLost = (event) => {
      event.preventDefault();
    };

    canvas.addEventListener('webglcontextlost', handleWebglContextLost, false);
    return () => {
      canvas.removeEventListener('webglcontextlost', handleWebglContextLost, false);
    };
  }, []);

  return (
    <div className="immersive-three-shell">
      <div className="immersive-three-label">Explore Mazhavarnadu in 3D</div>

      <Canvas
        className="immersive-three-canvas"
        dpr={isCompact ? [1, 1.15] : [1, 1.7]}
        shadows={!isCompact}
        camera={{ position: [5.8, 4.6, 7.8], fov: isCompact ? 56 : 48 }}
        gl={{ antialias: !isCompact, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          webglCanvasRef.current = gl.domElement;
        }}
      >
        <color attach="background" args={['#0b1320']} />
        <fog attach="fog" args={['#0b1320', 9, 23]} />
        <ExplorerWorld isCompact={isCompact} onSelectPlace={setSelectedPlace} />
      </Canvas>

      {selectedPlace ? (
        <div className="immersive-three-popup" role="dialog" aria-live="polite">
          <h3>{selectedPlace.title}</h3>
          <p>{selectedPlace.description}</p>
          <button type="button" onClick={() => setSelectedPlace(null)}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ThreeScene;