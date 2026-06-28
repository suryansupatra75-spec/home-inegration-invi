"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  r: number; // radius / size
  d: number; // density / speed factor
  opacity: number;
  color: string;
  angle: number;
  spin: number;
}

export default function FlowerPetals() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track window resize
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Traditional Griha Pravesh colors: Marigold (Gold/Orange) and Red Rose petals
    const petalColors = [
      "#C89B3C", // Gold Marigold
      "#E5A93C", // Light Yellow-Gold Genda
      "#E2583E", // Orange Genda
      "#7A1F1F", // Deep Maroon Rose
      "#A82E2E", // Red Rose
      "#D84B4B", // Light Red Rose
    ];

    const maxPetals = 45;
    const petals: Petal[] = [];

    // Initialize petals
    for (let i = 0; i < maxPetals; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 8 + 6, // size between 6px and 14px
        d: Math.random() * 1.5 + 0.5, // speed factor
        opacity: Math.random() * 0.6 + 0.4,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        angle: Math.random() * 360,
        spin: Math.random() * 2 - 1,
      });
    }

    // Draw a single petal
    const drawPetal = (p: Petal) => {
      if (!ctx) return;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      ctx.beginPath();
      
      // Draw organic petal shape (curved leaf/ellipse shape)
      ctx.ellipse(0, 0, p.r, p.r / 1.6, 0, 0, 2 * Math.PI);
      
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
      ctx.restore();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        // Render
        drawPetal(p);

        // Update physics: fall down with horizontal drift (sine wave)
        p.y += (Math.cos(p.angle) + 1.5 + p.r / 10) * p.d * 0.7;
        p.x += Math.sin(p.angle) * 0.8;
        p.angle += p.spin * 0.5;

        // Reset petal if it falls off screen or goes too far right/left
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.angle = Math.random() * 360;
        }
        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 20;
        }
      });

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
      className="pointer-events-none fixed inset-0 z-40 w-full h-full"
      style={{ mixBlendMode: "multiply" }} // Soft blend over images/text
    />
  );
}
