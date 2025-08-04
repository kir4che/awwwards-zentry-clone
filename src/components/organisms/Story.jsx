import { useRef } from "react";

import AnimatedTitle from "../atoms/AnimatedTitle";
import Button from "../atoms/Button";
import Preview3D from "../molecules/Preview3D";

const Story = () => {
  const frameRef = useRef(null);

  return (
    <section id="story" className={`
      relative flex size-full flex-col items-center pt-24 pb-45 text-center
      md:py-12
      lg:py-24
    `}>
      <p className={`
        mb-7 font-general text-sm uppercase
        md:text-xxs
      `}>
        the open ip universe
      </p>
      <div className="relative size-full">
        <AnimatedTitle
          text="the st<b>o</b>ry of<br/>a hidden real<b>m</b>"
          containerClass="mt-5 mix-blend-difference relative z-10"
        />
        <Preview3D
          ref={frameRef} 
          defaultRotateX={20}
          defaultRotateY={10}
          containerClass="mask-rect-clip-2 w-[64vw] mx-auto my-12 overflow-hidden absolute md:-top-24 lg:-top-28 xl:-top-32 md:left-12"
          borderClass="rounded-xl"
        >
          <img src="/img/entrance.webp" alt="entrance.webp" className={`
            size-full scale-400 object-cover
            md:scale-320
            lg:scale-200
            xl:scale-180
          `}/>
        </Preview3D>
      </div>
      <div className={`
        absolute bottom-12 z-50 -mt-18 flex w-full justify-center px-8
        sm:px-0
        md:relative md:bottom-16 md:me-32 md:justify-end
        lg:bottom-4 lg:me-40 lg:-mt-40
        xl:me-60
      `}>
        <div className={`
          flex h-full w-fit flex-col items-center gap-y-8
          md:items-start md:gap-y-4
        `}>
          <p className={`
            text-center font-roboto text-sm font-light
            sm:max-w-sm sm:text-lg/5.5
            md:max-w-64 md:text-start md:text-xs
            xl:max-w-72 xl:text-sm/4.5
          `}>
            Where realms converge, lies Zentry and the boundless pillar.
            Discover its secrets and shape your fate amidst infinite
            opportunities.
          </p>
          <Button
            id="realm-btn"
            text="discover prologue"
            containerClass="px-5 py-1"
            textClass="text-xs sm:text-sm md:text-xxs"
          />
        </div>
      </div>
    </section>
  );
};

export default Story;
