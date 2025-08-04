import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";

import AnimatedTitle from "../atoms/AnimatedTitle";
import Button from "../atoms/Button";
import TypewriterText from "../atoms/TypewriterText";

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const containerRef = useRef(null);

  return (
    <section
      id="mission"
      ref={containerRef}
      className={`
        px-5 py-24 text-center
        md:px-8
      `}
    >
      <TypewriterText text="Who We Are" triggerRef={containerRef} />
      <AnimatedTitle
        text={`we're b<b>u</b>ilding<br/>a new - realit<b>y</b><br/><br/>that rew<b>a</b>rds<br/>play<b>e</b>rs - and<br/>e<b>m</b>powers<br/>hu<b>m</b>ans & AI<br/>to - thri<b>v</b>e`}
        fontSizeClass="text-7xl sm:text-[5rem] lg:text-[8vw]"
      />
      <p className="mx-auto my-4 max-w-88 font-roboto text-xs">
        Zentry envisions a future where players, emerging tech, and a new economy unite at the convergence of gaming and AI.
      </p>
      <Button
        id="discover-btn"
        variant="secondary"
        text="Discover Who We Are"
        containerClass="px-5 py-1.5"
        textClass="text-xs"
      />
    </section>
  );
};

export default Mission;
