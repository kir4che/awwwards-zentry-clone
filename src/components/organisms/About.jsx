import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

import AnimatedTitle from "../atoms/AnimatedTitle";
import TypewriterText from "../atoms/TypewriterText";
import Preview3D from "../molecules/Preview3D";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [tilt, setTilt] = useState({
    maxX: 30,
    maxY: 30,
    defaultRotateX: 20,
    defaultRotateY: 20,
  });
  const containerRef = useRef(null);
  const clipRef = useRef(null);
  const maskClipRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current || !clipRef.current || !maskClipRef.current) return;

    // 往下 scroll 時，展開 about-image 至佔滿視窗。
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: clipRef.current,
        start: "75% center",
        end: "180% center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    tl.fromTo(
      maskClipRef.current,
      {
        width: "19.5rem",
        height: "27.5rem",
        rotateX: 20,
        rotateY: 20,
        border: "1.25px solid black",
        borderRadius: "0.75rem",
      },
      {
        width: "100%",
        height: "100vh",
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        border: "none",
        borderRadius: "0",
        duration: 1,
      }
    )
      .fromTo(
        "#stones-img",
        { top: "2rem" },
        { top: "8rem" },
        "<"
      )
      .to("#about-img", { scale: 1 }, "<")
      .to("#about-text", { opacity: 0 }, "<")
      .to(containerRef.current, { backgroundColor: "black", duration: 2 }, "<");

      tl.eventCallback("onUpdate", () => {
        const progress = tl.progress();
        const rate = 1 - progress;
        setTilt({
          maxX: 30 * rate,
          maxY: 30 * rate,
          defaultRotateX: 20 * rate * (rate < 0.5 ? 0.5 : 1),
          defaultRotateY: 20 * rate * (rate < 0.5 ? 0.5 : 1),
        });
      });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`
      relative overflow-hidden py-24 text-center
    `}>
      <TypewriterText text="Welcome to Zentry" />
      <AnimatedTitle text="Disc<b>o</b>ver the world&#39;s<br/>largest shared <b>a</b>dventure" />
      <div id="clip" ref={clipRef} className="relative z-20">
        <img
          id="stones-img"
          src="img/stones.webp"
          alt="Stones"
          className={`
            pointer-events-none absolute z-10 size-full scale-125 object-cover
            xl:scale-100
          `}
        />
        <Preview3D
          ref={maskClipRef}
          maxX={tilt.maxX}
          maxY={tilt.maxY}
          defaultRotateX={tilt.defaultRotateX}
          defaultRotateY={tilt.defaultRotateY}
          containerClass="mask-rect-clip mx-auto my-12 overflow-hidden "
          borderClass="rounded-xl border-[1.25px] border-black shadow"
        >
          <img
            id="about-img"
            src="img/about.webp"
            alt="Background"
            className="size-full scale-200 object-cover"
          />
        </Preview3D>
        <div id="about-text" className="font-roboto">
          <p className={`
            text-lg/6
            sm:text-sm
            lg:text-base/6
          `}>The Metagame begins－your life, now an epic MMORPG</p>
          <p className={`
            mx-auto max-w-96 text-lg/5 text-gray-400
            sm:text-xs
            lg:text-sm
          `}>
            Zentry is the unified play layer driving attention and contribution through cross-world AI gamification.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
