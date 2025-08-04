import { useEffect, useRef, useState } from "react";
import { useWindowScroll } from "react-use";

export const useScrollDirection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);
  const { y: scrollY } = useWindowScroll();

  useEffect(() => {
    const onScroll = () => {
      const currY = window.scrollY;
      if (currY < prevScrollY.current) setIsVisible(true);
      else setIsVisible(false);
      prevScrollY.current = currY;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isVisible, scrollY };
};
