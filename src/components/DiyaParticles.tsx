"use client";

import { useEffect, useRef } from "react";

interface LightParticle {
  x: number;
  y: number;
  r: number; // size
  speedY: number;
  speedX: number;
  life: number;
  maxLife: number;
  color: string;
}

export default function DiyaParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: LightParticle[] = [];
    const maxParticles = 30;

    const createParticle = (atBottom = false): LightParticle => {
      const maxLife = Math.random() * 200 + 100;
      return {
        x: Math.random() * width,
        y: atBottom ? height + Math.random() * 20 : Math.random() * height,
        r: Math.random() * 2.5 + 1.2, // size between 1.2px and 3.7px
        speedY: -(Math.random() * 0.8 + 0.4), // float upwards
        speedX: Math.random() * 0.4 - 0.2, // slight horizontal drift
        life: atBottom ? 0 : Math.random() * maxLife,
        maxLife,
        // Soft glowing golden-orange light colors
        color: `rgba(${200 + Math.floor(Math.random() * 55)}, ${140 + Math.floor(Math.random() * 70)}, ${40 + Math.floor(Math.random() * 20)}, `,
      };
    };

    // Initialize particles across the screen height
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(false));
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Fade in at start and fade out near end of life
        let currentOpacity = 0;
        if (p.life < p.maxLife * 0.2) {
          currentOpacity = (p.life / (p.maxLife * 0.2)) * 0.7; // fade in to 0.7
        } else {
          currentOpacity = (1 - p.life / p.maxLife) * 0.7; // fade out to 0
        }

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + currentOpacity + ")";
        
        // Shadow for glowing effect
        ctx.shadowBlur = 8;
        ctx.shadowColor = "rgba(200, 155, 60, 0.6)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Physics
        p.y += p.speedY;
        p.x += p.speedX;

        // Reset if expired or out of bounds
        if (p.life >= p.maxLife || p.y < -10) {
          particles[i] = createParticle(true);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
    />
  );
}
