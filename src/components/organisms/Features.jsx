import { useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

import { useFlipCardAnimation } from "../../hooks/useFlipCardAnimation";

import Button from '../atoms/Button';
import Preview3D from '../molecules/Preview3D';

const Card = ({ src, title, description, isComingSoon = true, isLaunch = false }) => {
  const videoRef = useRef(null);

  const handleVideoPlay = () => videoRef.current?.play();
  const handleVideoPause = () => {
    videoRef.current?.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <div className="relative size-full" onMouseEnter={handleVideoPlay} onMouseLeave={handleVideoPause}>
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        className="absolute top-0 left-0 size-full object-cover object-center"
      />
      <div className={`
        relative flex size-full flex-col justify-between p-4 pb-8
        md:p-6
      `}>
        <div className="space-y-2.5 text-blue-50">
          <h1 className="font-zentry text-6xl font-medium uppercase">{title}</h1>
          {description && (
            <p className={`
              max-w-52 font-roboto text-xs text-gray-300
              sm:text-base/5
              md:text-xs
              lg:text-sm/4
            `}>{description}</p>
          )}
        </div>
        <div className={`
          flex flex-col gap-2
          md:flex-row md:items-center
        `}>
          {isComingSoon && (
            <Button
              id="coming-soon-btn"
              variant="disabled"
              text="Coming Soon"
              leftIcon={<TiLocationArrow size={14} />}
              disabled
              containerClass='px-4'
              textClass='text-sm md:text-xxs'
            />
          )}
          {isLaunch && (
            <Button
              id="launch-site-btn"
              variant="outline"
              text="Launch Site"
              rightIcon={<TiLocationArrow size={14} />}
              containerClass='px-4'
              textClass='text-sm md:text-xxs'
            />
          )}
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  const { containerRef, cardRef } = useFlipCardAnimation();

  return (
    <section ref={containerRef} className="bg-black">
      <div className={`
        mx-auto px-4 pt-12 pb-28
        md:px-24
      `}>
        <div className={`
          px-8 py-12
          md:px-0
        `}>
          <p className={`
            font-roboto text-lg text-blue-50
            sm:text-sm
            lg:text-base
          `}>
            Explore the Zentry Universe
          </p>
          <p className={`
            max-w-92 font-roboto text-lg/5 text-gray-400 opacity-65
            sm:text-sm/5
            lg:text-base/5
          `}>
            Immerse yourself in an IP-rich product universe where players, agentic AI and blockchain lead the new economic paradigm.
          </p>
        </div>
        <Preview3D ref={cardRef} containerClass="overflow-hidden mb-7 h-96 w-full md:h-[78vh]">
          <Card
            src="videos/feature-1.mp4"
            title={<>radia<b>n</b>t</>}
            description="The game of games app transforming moments across Web2 & Web3 titles into rewards"
            isComingSoon
          />
        </Preview3D>
        <div className={`
          grid grid-cols-1 gap-7
          md:grid-cols-2 md:grid-rows-3
        `}>
          <Preview3D ref={cardRef} containerClass="overflow-hidden md:row-span-2 ms-20 sm:ms-24 md:ms-0 order-3 md:order-none min-h-[500px]">
            <Card
              src="videos/feature-2.mp4"
              title={<>zig<b>m</b>a</>}
              description="The NFT collection merging Zentry&#39;s IP, AI, and gaming－pushing the boundaries of NFT innovation."
              isComingSoon
            />
          </Preview3D>
          <Preview3D ref={cardRef} containerClass="overflow-hidden sm:ms-40 md:ms-0 order-1 md:order-none min-h-78">
            <Card
              src="videos/feature-3.mp4"
              title={<>n<b>e</b>xus</>}
              description="The metagame protal uniting humans & AI to play, compete and earn."
              isComingSoon
              isLaunch
            />
          </Preview3D>
          <Preview3D ref={cardRef} containerClass="overflow-hidden sm:me-36 md:me-0 order-2 md:order-none min-h-80">
            <Card
              src="videos/feature-4.mp4"
              title={<>az<b>u</b>l</>}
              description="The agent of agents elevating agentic AI experience to be more fun and productive."
              isComingSoon
            />
          </Preview3D>
          <Preview3D ref={cardRef} containerClass="overflow-hidden col-span-1 row-span-1 order-4 md:order-none sm:me-64 md:me-0">
            <div className={`
              flex size-full flex-col justify-between bg-violet-300 p-6
            `}>
              <h1 className={`
                max-w-64 font-zentry text-6xl leading-14 text-black
              `}>
                M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
              </h1>
              <TiLocationArrow size={80} className="self-end" />
            </div>
          </Preview3D>
          <Preview3D containerClass="overflow-hidden col-span-1 row-span-1 order-5 md:order-none hidden md:block">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </Preview3D>
        </div>
      </div>
    </section>
  );
};

export default Features;
