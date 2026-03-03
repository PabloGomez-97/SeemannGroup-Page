import { motion } from 'framer-motion';

const ParticlesBackground = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 6 + 2,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 5,
    x: Math.random() * 100,
  }));

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 0, 
            y: '100vh',
            x: `${particle.x}vw`
          }}
          animate={{ 
            opacity: [0, 0.6, 0],
            y: '-10vh',
            x: `${particle.x + (Math.random() * 20 - 10)}vw`
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(189, 33, 33, ${Math.random() * 0.3 + 0.2}), transparent)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(189, 33, 33, 0.5)`
          }}
        />
      ))}
    </div>
  );
};

export default ParticlesBackground;

