import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import ModelAnimated from './ModelAnimated.jsx';

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 't') {
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="canvas-wrapper">
      <Canvas shadows dpr={[1, 1.5]}>
        <color attach="background" args={["#0e111c"]} />
        <PerspectiveCamera makeDefault position={[2.5, 1.8, 4.2]} fov={42} />
        <Suspense fallback={null}>
          <ModelAnimated isOpen={isOpen} />
          <Environment preset="city" />
          <ContactShadows
            opacity={0.35}
            scale={10}
            blur={2.8}
            far={6}
            resolution={2048}
            color="#0f111b"
            frames={1}
          />
        </Suspense>
        <ambientLight intensity={0.3} />
        <directionalLight
          intensity={1.1}
          position={[5, 5, 5]}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          intensity={0.7}
          angle={0.6}
          penumbra={0.6}
          position={[-4, 4, -2]}
          castShadow
          color="#9cb7ff"
        />
        <OrbitControls
          enableDamping
          dampingFactor={0.1}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 5}
          minDistance={2}
          maxDistance={6}
        />
      </Canvas>
      <div className="instructions">Presiona la tecla “T” para abrir/cerrar la laptop</div>
    </div>
  );
};

export default App;
