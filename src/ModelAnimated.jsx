import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useAnimations, useGLTF } from '@react-three/drei';
import { LoopOnce } from 'three';
import { useSpring, animated } from '@react-spring/web';

const ModelAnimated = ({ isOpen }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/model.glb');
  const { actions, names } = useAnimations(animations, group);
  const actionName = useMemo(() => names[0], [names]);
  const action = actionName ? actions[actionName] : null;

  useEffect(() => {
    if (!action) return;
    action.reset();
    action.clampWhenFinished = true;
    action.setLoop(LoopOnce, 1);
    action.paused = true;
  }, [action]);

  useEffect(() => {
    if (!action) return;
    const duration = action.getClip().duration;
    action.paused = false;
    action.enabled = true;
    if (isOpen) {
      action.timeScale = 1;
      action.reset();
    } else {
      action.timeScale = -1;
      action.time = duration;
    }
    action.play();

    return () => {
      action.stop();
    };
  }, [action, isOpen]);

  useFrame(() => {
    if (!action) return;
    if (!isOpen && action.time <= 0) {
      action.stop();
      action.time = 0;
    }
  });

  const labelSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    y: isOpen ? 0 : 18,
    config: { tension: 140, friction: 18 },
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
      <Html position={[0, 1.6, 0]} center distanceFactor={8} transform occlude>
        <animated.div
          style={{
            opacity: labelSpring.opacity,
            transform: labelSpring.y.to((value) => `translate3d(0, ${value}px, 0)`),
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            style={{
              background: 'rgba(17, 20, 30, 0.75)',
              padding: '12px 24px',
              borderRadius: '999px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f4f6ff',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              fontSize: '0.8rem',
              backdropFilter: 'blur(6px)',
              whiteSpace: 'nowrap',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
            }}
          >
            Laptop lista para usar
          </div>
        </animated.div>
      </Html>
    </group>
  );
};

useGLTF.preload('/model.glb');

export default ModelAnimated;
