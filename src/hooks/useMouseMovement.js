import { useCallback, useEffect, useRef, useState } from 'react';

export const useMouseMovement = (delay = 100) => {
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const mouseTimeoutRef = useRef(null);

  const handleMouseMove = useCallback(() => {
    setIsMouseMoving(true);
    if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
    
    mouseTimeoutRef.current = setTimeout(() => {
      setIsMouseMoving(false);
    }, delay);
  }, [delay]);

  const handleMouseLeave = useCallback(() => {
    setIsMouseMoving(false);
    if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
  }, []);

  const setHovering = useCallback((hovering) => {
    setIsHovering(hovering);
  }, []);

  useEffect(() => {
    return () => {
      if (mouseTimeoutRef.current) clearTimeout(mouseTimeoutRef.current);
    };
  }, []);

  return {
    isMouseMoving,
    isHovering,
    handleMouseMove,
    handleMouseLeave,
    setHovering
  };
};
