"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  life: number;
  maxLife: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;

    // Sci-fi themed colors
    const colors = ["#00f0ff", "#b026ff", "#ffffff"];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.maxLife = Math.random() * 20 + 20;
    this.life = this.maxLife;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
    if (this.size > 0.2) this.size -= 0.05;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life / this.maxLife;
    ctx.fill();
    ctx.globalAlpha = 1;

    // Glowing effect
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    let isMouseMoving = false;
    let mouse = { x: 0, y: 0 };
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const createParticles = (e: MouseEvent | TouchEvent) => {
      let clientX, clientY;
      if (e.type.includes("mouse")) {
        const mouseEvent = e as MouseEvent;
        clientX = mouseEvent.clientX;
        clientY = mouseEvent.clientY;
      } else {
        const touchEvent = e as TouchEvent;
        clientX = touchEvent.touches[0].clientX;
        clientY = touchEvent.touches[0].clientY;
      }

      mouse.x = clientX;
      mouse.y = clientY;
      isMouseMoving = true;

      for (let i = 0; i < 3; i++) {
        particlesArray.push(new Particle(mouse.x, mouse.y));
      }
    };

    const handleMouseStop = () => {
      isMouseMoving = false;
    };

    globalThis.addEventListener("mousemove", createParticles);
    globalThis.addEventListener("touchmove", createParticles);

    let timer: NodeJS.Timeout;
    const scrollOrStop = () => {
      clearTimeout(timer);
      timer = setTimeout(handleMouseStop, 100);
    };

    globalThis.addEventListener("mousemove", scrollOrStop);
    globalThis.addEventListener("touchmove", scrollOrStop);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw(ctx);

        if (particlesArray[i].life <= 0) {
          particlesArray.splice(i, 1);
          i--;
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      globalThis.removeEventListener("mousemove", createParticles);
      globalThis.removeEventListener("touchmove", createParticles);
      globalThis.removeEventListener("mousemove", scrollOrStop);
      globalThis.removeEventListener("touchmove", scrollOrStop);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-100"
    />
  );
}
