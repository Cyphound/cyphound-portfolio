"use client";

import { useEffect, useRef } from "react";

type Dot = {
  bx: number; by: number; // base position
  x: number;  y: number;  // current position
  vx: number; vy: number; // velocity
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

export default function InteractiveDotsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0, h = 0;
    let dots: Dot[] = [];
    let raf = 0;

    // mouse con delay (target vs smooth)
    const mouse = {
      tx: -9999,
      ty: -9999,
      x: -9999,
      y: -9999,
      active: false,
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // densidad de puntos
      const spacing = 28; // cambia a 24 si querís más denso
      const jitter = 1.6;

      dots = [];
      for (let y = 0; y <= h + spacing; y += spacing) {
        for (let x = 0; x <= w + spacing; x += spacing) {
          const jx = (Math.random() - 0.5) * jitter;
          const jy = (Math.random() - 0.5) * jitter;
          const bx = x + jx;
          const by = y + jy;

          dots.push({ bx, by, x: bx, y: by, vx: 0, vy: 0 });
        }
      }
    };

    const onMove = (clientX: number, clientY: number) => {
      mouse.tx = clientX;
      mouse.ty = clientY;
      mouse.active = true;
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };
    const onLeave = () => (mouse.active = false);

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      // delay natural del cursor
      const smooth = 0.12; // más bajo = más delay (0.05-0.12)
      mouse.x += (mouse.tx - mouse.x) * smooth;
      mouse.y += (mouse.ty - mouse.y) * smooth;

      // física
      const influence = 170; // radio de influencia
      const maxOffset = 16;  // cuánto se “amontonan”
      const pull = 0.18;     // fuerza hacia el mouse
      const spring = 0.020;  // retorno a base
      const damp = 0.84;     // fricción

      for (const p of dots) {
        let ax = 0;
        let ay = 0;

        // solo anima si el mouse está activo (si no, se quedan quietos y vuelven)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < influence) {
            const inner = 26; // zona muerta: evita el puntito pegado al mouse
          
            // dirección segura (evita singularidad cuando dist ~ 0)
            const safeDist = Math.max(dist, inner);
            const nx = dx / (safeDist + 0.0001);
            const ny = dy / (safeDist + 0.0001);
          
            // fuerza de amontonamiento SOLO fuera del inner
            const t = clamp((dist - inner) / (influence - inner), 0, 1);
            const k = (1 - t) * (1 - t); // caída suave
          
            const targetX = p.bx + nx * (maxOffset * k);
            const targetY = p.by + ny * (maxOffset * k);
          
            ax += (targetX - p.x) * pull;
            ay += (targetY - p.y) * pull;
          
            // opcional: mini empuje si entra demasiado al centro (reduce “pegote”)
            
          }
          
        }

        // siempre vuelve a la base con spring
        ax += (p.bx - p.x) * spring;
        ay += (p.by - p.y) * spring;

        p.vx = (p.vx + ax) * damp;
        p.vy = (p.vy + ay) * damp;

        p.vx = clamp(p.vx, -2.2, 2.2);
        p.vy = clamp(p.vy, -2.2, 2.2);


        p.x += p.vx;
        p.y += p.vy;

        // render (base + brillo cerca del mouse)
        let glow = 0;
        if (mouse.active) {
          const d = Math.hypot(mouse.x - p.x, mouse.y - p.y);
          glow = d < influence ? (1 - d / influence) : 0;
        }

        const r = 1.15 + glow * 0.9;
        const a = 0.12 + glow * 0.22;

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();

        // tinte suave (verde/cyan) muy cerca
        if (glow > 0.06) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r + 2.0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,255,170,${0.05 * glow})`;
          ctx.fill();
        }
      }

      // halo suave alrededor del mouse (opcional pero queda rico)
      if (mouse.active) {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 240);
        g.addColorStop(0, "rgba(0,255,170,0.10)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      raf = requestAnimationFrame(step);
    };

    resize();
    step();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.95 }}
    />
  );
}
