import { useCallback, useEffect, useRef, useState } from 'react';

const Text3DHover = ({ children, containerClass = "" }) => {
  const [transform, setTransform] = useState('');
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  // 線性補間函式
  const lerp = (start, end, factor) => start + (end - start) * factor;
  const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  // 計算 3D 矩陣
  const updateTransform = useCallback((normalizedX) => {
    const from = [0.9, 0.15, 0, -0.0015,  -0.05, 0.7, 0, -0.001,  0, 0, 1, 0,  -100, -50, 0, 1];
    const to =   [0.9, -0.15, 0, 0.0015,   0.05, 0.7, 0, -0.001,  0, 0, 1, 0,   100, -50, 0, 1];
    const factor = easeInOut((normalizedX - 0.2) / 0.6);
    const matrix = from.map((v, i) => lerp(v, to[i], factor));
    setTransform(`matrix3d(${matrix.join(', ')})`);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const normalizedX = Math.max(0, Math.min(1, x / rect.width));
        updateTransform(normalizedX);
      });
    };

    const handleMouseLeave = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setTransform('');
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTransform]);

  return (
    <div ref={containerRef} className={containerClass}>
      <div style={{
        transform,
        transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}>
        {children}
      </div>
    </div>
  );
};

export default Text3DHover;
