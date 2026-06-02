'use client';

import { useEffect, useRef } from 'react';

interface ParticlesProps {
  count?: number;
}

export default function Particles({ count = 30 }: ParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particleTypes = ['large', 'medium', 'small', 'horizontal'];

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
      particle.className = `particle ${type}`;

      if (type === 'horizontal') {
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 25}s`;
        particle.style.width = `${50 + Math.random() * 150}px`;
      } else {
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 12}s`;
        particle.style.animationDuration = `${10 + Math.random() * 15}s`;
      }

      container.appendChild(particle);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [count]);

  return <div ref={containerRef} className="particles-container" />;
}