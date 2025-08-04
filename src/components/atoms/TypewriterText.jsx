import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const TypewriterText = ({ text, textClass = 'mb-7' }) => {
  const textRef = useRef(null);

  useGSAP(() => {

    if (!textRef.current) return;

    gsap.killTweensOf(textRef.current);

    gsap.fromTo(
      textRef.current,
      { text: "" },
      {
        text: text,
        duration: 1,
        ease: "power1.in",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 85%",
          toggleActions: "restart none none reset",
        },
      }
    );
  }, { scope: textRef });

  return (
    <p ref={textRef} className={clsx(`
      font-general text-sm uppercase
      md:text-xxs
    `, textClass)} />
  );
};

export default TypewriterText;
