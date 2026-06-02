import React, { useEffect, useRef } from 'react';

const HalideLanding: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = (window.innerWidth / 2 - e.pageX) / 25;
      const y = (window.innerHeight / 2 - e.pageY) / 25;
      canvas.style.transform = `rotateX(${55 + y / 2}deg) rotateZ(${-25 + x / 2}deg)`;
      layersRef.current.forEach((layer, index) => {
        if (!layer) return;
        const moveX = x * (index + 1) * 0.2;
        const moveY = y * (index + 1) * 0.2;
        layer.style.transform = `translateZ(${(index + 1) * 15}px) translate(${moveX}px, ${moveY}px)`;
      });
    };

    canvas.style.opacity = '0';
    canvas.style.transform = 'rotateX(90deg) rotateZ(0deg) scale(0.8)';

    const timeout = setTimeout(() => {
      canvas.style.transition = 'all 2.5s cubic-bezier(0.16, 1, 0.3, 1)';
      canvas.style.opacity = '1';
      canvas.style.transform = 'rotateX(55deg) rotateZ(-25deg) scale(1)';
    }, 300);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');

        .halide-section {
          position: relative;
          background-color: #0a0a0a;
          color: #e0e0e0;
          font-family: 'Syncopate', sans-serif;
          overflow: hidden;
          height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .halide-grain {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none;
          z-index: 100;
          opacity: 0.15;
        }

        .halide-viewport {
          perspective: 2000px;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .halide-canvas-3d {
          position: relative;
          width: 800px;
          height: 500px;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .halide-canvas-3d { width: 100vw; height: 60vw; }
        }

        .halide-layer {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(224, 224, 224, 0.1);
          background-size: cover;
          background-position: center;
          transition: transform 0.5s ease;
        }

        .halide-layer-1 {
          background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200');
          filter: grayscale(1) contrast(1.2) brightness(0.5);
        }
        .halide-layer-2 {
          background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200');
          filter: grayscale(1) contrast(1.1) brightness(0.7);
          opacity: 0.6;
          mix-blend-mode: screen;
        }
        .halide-layer-3 {
          background-image: url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=1200');
          filter: grayscale(1) contrast(1.3) brightness(0.8);
          opacity: 0.4;
          mix-blend-mode: overlay;
        }

        .halide-contours {
          position: absolute;
          width: 200%; height: 200%;
          top: -50%; left: -50%;
          background-image: repeating-radial-gradient(circle at 50% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.05) 41px, transparent 42px);
          transform: translateZ(120px);
          pointer-events: none;
        }

        .halide-ui {
          position: absolute;
          inset: 0;
          padding: 3rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr auto;
          z-index: 10;
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .halide-ui { padding: 1.5rem; }
        }

        .halide-hero-title {
          grid-column: 1 / -1;
          align-self: center;
          font-size: clamp(2.5rem, 10vw, 9rem);
          line-height: 0.85;
          letter-spacing: -0.04em;
          mix-blend-mode: difference;
          color: #e0e0e0;
        }

        .halide-cta {
          pointer-events: auto;
          background: #e0e0e0;
          color: #0a0a0a;
          padding: 1rem 2rem;
          text-decoration: none;
          font-weight: 700;
          font-family: 'Syncopate', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          clip-path: polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%);
          transition: background 0.3s, transform 0.3s;
        }
        .halide-cta:hover { background: #ff3c00; color: #fff; transform: translateY(-5px); }

        .halide-scroll-hint {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          width: 1px;
          height: 60px;
          background: linear-gradient(to bottom, #e0e0e0, transparent);
          animation: halide-flow 2s infinite ease-in-out;
        }

        @keyframes halide-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50%       { transform: scaleY(1); transform-origin: top; }
          51%       { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>

      <section className="halide-section">
        {/* SVG grain filter */}
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id="halide-grain-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </svg>
        <div className="halide-grain" style={{ filter: 'url(#halide-grain-filter)' }} />

        {/* UI overlay */}
        <div className="halide-ui">
          <div style={{ fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.08em' }}>SNAGPOST</div>
          <div style={{ textAlign: 'right', fontFamily: 'monospace', color: '#ff3c00', fontSize: '0.65rem', lineHeight: 1.6 }}>
            <div>PLATFORM: FACEBOOK</div>
            <div>DATA DEPTH: POST-LEVEL</div>
          </div>

          <h1 className="halide-hero-title">SNAG<br />POST</h1>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ fontFamily: 'monospace', fontSize: '0.7rem', lineHeight: 1.8, color: 'rgba(224,224,224,0.6)' }}>
              <p>[ CAPTURE 2025 ]</p>
              <p>POST-LEVEL INTEL FROM ANY FACEBOOK PROFILE</p>
            </div>
            <a href="#install" className="halide-cta">EXPLORE DATA</a>
          </div>
        </div>

        {/* 3D canvas */}
        <div className="halide-viewport">
          <div className="halide-canvas-3d" ref={canvasRef}>
            <div className="halide-layer halide-layer-1" ref={(el) => { layersRef.current[0] = el; }} />
            <div className="halide-layer halide-layer-2" ref={(el) => { layersRef.current[1] = el; }} />
            <div className="halide-layer halide-layer-3" ref={(el) => { layersRef.current[2] = el; }} />
            <div className="halide-contours" />
          </div>
        </div>

        <div className="halide-scroll-hint" />
      </section>
    </>
  );
};

export default HalideLanding;
