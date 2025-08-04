import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ text, containerClass = '', fontSizeClass = 'text-7xl sm:text-[5.25rem] md:text-7xl lg:text-[7.25vw]' }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const root = containerRef.current;
    if (!root) return;

    const words = root.querySelectorAll(".word");

    // 初始先將位置設在左側，且 Y 軸往左轉 45 度。
    gsap.set(root, {
      x: -200,
      y: 50,
      rotationY: -45,
      transformPerspective: 800,
      transformOrigin: "center",
    });
    gsap.set(words, { opacity: 0 });

    // 當 scroll 到視窗 85% 時開始動畫
    gsap.timeline({
      scrollTrigger: {
        trigger: root,
        start: "top 85%",
        toggleActions: "restart none none reset",
      }
    })
      // 標題整體從左向右進場
      .to(root, {
          x: 0, y: 0,
          rotationY: 0,
          duration: 1,
          ease: "power2.out",
        }, 0)
      .to(words, {
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power2.out",
        }, 0);
  }, { scope: containerRef });

  return (
    <div id="animated-text" ref={containerRef} className={clsx(`
      font-zentry leading-[.85] uppercase
    `, containerClass, fontSizeClass)}>
      {text.split("<br/>").map((line, lineIdx) => (
        <p key={lineIdx}>
          {line.split(" ").map((word, wordIdx, arr) => (
            <React.Fragment key={wordIdx}>
              <span
                className="word opacity-0"
                dangerouslySetInnerHTML={{ __html: word }}
              />
              {wordIdx !== arr.length - 1 && (
                <span style={{ display: "inline-block", width: "0.5rem" }}>&nbsp;</span>
              )}
            </React.Fragment>
          ))}
        </p>
      ))}
    </div>
  );
};

export default AnimatedTitle;
