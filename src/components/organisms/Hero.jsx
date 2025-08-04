import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from 'react';
import { BiSolidRightArrow } from 'react-icons/bi';

import { useMouseMovement } from '../../hooks/useMouseMovement';

import Button from '../atoms/Button';
import LoadingSpinner from '../atoms/LoadingSpinner';
import Preview3D from '../molecules/Preview3D';

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  mouse: {
    delay: 100,
    showDuration: 0.1,
    hideDurations: [0.3, 0.15, 0.1],
    scales: [0.5, 0.3, 0.01]
  },
  video: {
    pulseScale: [0.85, 0.9],
    pulseDuration: 0.8,
    expandDuration: 1.5
  }
};

const Hero = () => {
  const { isMouseMoving, isHovering, handleMouseMove, handleMouseLeave, setHovering } = useMouseMovement(ANIMATION_CONFIG.mouse.delay);

  const [currIdx, setCurrIdx] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef(null);

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) setLoading(false);
  }, [loadedVideos]);

  // 鼠標移動狀態，影片小視窗動畫。
  useGSAP(() => {
    if (isHovering || hasClicked) return;
    
    gsap.killTweensOf("#next-video-container");
    const tl = gsap.timeline({ defaults: { transformOrigin: "center center" } });

    if (isMouseMoving) {
      tl.to("#next-video-container", {
        scale: 1,
        opacity: 1,
        duration: ANIMATION_CONFIG.mouse.showDuration,
        ease: "power2.out"
      });
    } else {
      const { hideDurations, scales } = ANIMATION_CONFIG.mouse;
      
      tl.to("#next-video-container", { scale: scales[0], opacity: 1, duration: hideDurations[0] })
        .to("#next-video-container", { scale: scales[1], opacity: 1, duration: hideDurations[1] })
        .to("#next-video-container", { scale: scales[2], opacity: 0, duration: hideDurations[2] });
    }

    return () => {
      tl.kill();
      gsap.killTweensOf("#next-video-container");
    };
  }, { dependencies: [isMouseMoving, isHovering, hasClicked] });

  // 點擊影片小視窗動畫
  useGSAP(() => {
    // 動畫展開點擊的影片
    if (hasClicked) {
      gsap.set('#transition-video', { visibility: 'visible' });
      gsap.to('#transition-video', {
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart: () => nextVideoRef.current.play()
      });
    }
    // 展開下一個影片小視窗（scale 0 -> 1）
    gsap.from('#next-video', {
      transformOrigin: 'center center',
      scale: 0,
      duration: 1.5,
      ease: 'power1.inOut'
    });
  }, { dependencies: [currIdx], revertOnUpdate: true });

  // 梯形遮罩動畫
  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(12% 0, 80% 0, 90% 92%, 0 88%)",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // 點擊影片小視窗後，展開下一個影片。
  const handleMiniVideoClick = () => {
    setHasClicked(true);
    setCurrIdx((prevIdx) => (prevIdx % totalVideos) + 1);
  };

  const getVideoSrc = (idx) => `/videos/hero-${idx}.mp4`;

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  return (
    <div className="relative h-dvh w-dvw overflow-hidden" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {loading && <LoadingSpinner />}
      <div className='absolute top-0 left-0 z-40'>
        <div className={`
          mt-24 px-6
          lg:px-8
          xl:px-10
        `}>
          <h1 className='special-font hero-heading text-blue-75'>redefi<b>n</b>e</h1>
          <p className='mb-5 max-w-64 font-roboto leading-5 text-blue-50'>Enter the Metagame<br/>Unleash the Play Economy</p>
          <Button
            id='watch-trailer-btn'
            variant='yellow'
            text='Watch Trailer'
            leftIcon={<BiSolidRightArrow size={12} />}
            containerClass='px-6 py-1'
          />
        </div>
      </div>
      <div id="video-frame" className={`
        relative z-10 h-dvh w-dvw rounded-xl bg-blue-75
      `}>
        <div>
          {/* 浮動可點擊的下一個影片小視窗 */}
            <Preview3D maxX="60" maxY="50" containerClass=" z-50 flex items-center justify-center h-dvh w-dvw" borderClass="">
              <div id='next-video-container' onClick={handleMiniVideoClick} className={`
                origin-center transition-all duration-500 ease-in
              `}>
                <video
                  id='next-video'
                  ref={nextVideoRef}
                  src={getVideoSrc((currIdx % totalVideos) + 1)}
                  loop
                  muted
                  className={`
                    size-52 origin-center rounded-xl border-[1.25px]
                    border-black object-cover object-center shadow
                  `}
                  onLoadedData={handleVideoLoad}
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                />
              </div>
            </Preview3D>
          {/* 點擊後展開中的影片（用於轉場） */}
          <video
            id='transition-video'
            ref={nextVideoRef}
            src={getVideoSrc(currIdx)}
            loop
            muted
            className={`
              absolute-center invisible z-20 size-52 object-cover object-center
            `}
            onLoadedData={handleVideoLoad}
          />
          {/* 當前播放的影片 */}
          <video
            id='current-video'
            src={getVideoSrc(currIdx === totalVideos - 1 ? 1 : currIdx)}
            loop
            muted
            autoPlay
            className="absolute-center size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className={`
          special-font hero-heading absolute right-5 bottom-5 z-40 text-blue-75
        `}>g<b>a</b>ming</h1>
      </div>
      <h1 className={`
        special-font hero-heading absolute right-5 bottom-5 text-black
      `}>
        g<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
