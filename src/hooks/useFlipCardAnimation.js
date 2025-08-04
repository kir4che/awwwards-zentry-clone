import { useRef } from 'react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useFlipCardAnimation = (options = {}) => {
  const {
    start = "top 120%",
    end = "top 10%", 
    duration = 1.25,
    ease = "power3.out"
  } = options;

  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    cardsRef.current.forEach(card => {
      if (!card) return;
      
      gsap.set(card, {
        transformOrigin: "bottom center",
        rotateX: 90,
        opacity: 0
      });
      
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start,
          end,
          toggleActions: "play none none reverse"
        },
        rotateX: 0,
        opacity: 1,
        duration,
        ease
      });
    });
  }, { scope: containerRef });

  const cardRef = card => {
    if (card && !cardsRef.current.includes(card))
      cardsRef.current.push(card);
  };

  return { containerRef, cardRef };
};
