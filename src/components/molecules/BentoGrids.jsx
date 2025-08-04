
import { useFlipCardAnimation } from "../../hooks/useFlipCardAnimation";

const BentoGrids = () => {
  const { containerRef, cardRef } = useFlipCardAnimation();

  return (
    <div ref={containerRef} className={`
      grid grid-cols-1 gap-7
      md:grid-cols-2 md:gap-5
      lg:gap-7
    `}>
      {/* 左區 */}
      <div className={`
        space-y-7
        md:mt-25 md:space-y-5
        lg:space-y-7
      `}>
        <div ref={cardRef} className={`
          ms-20 flex aspect-video justify-between overflow-hidden rounded-lg
          border-[0.5px] border-white/30 bg-black p-4
          md:ms-0
        `}>
          <div>
            <p className="mb-2 font-roboto text-xs text-violet-50">Products</p>
            <p className={`
              font-zentry text-6xl text-violet-50
              md:text-[7vw]
              lg:text-[6vw]
            `}>4<b>+</b></p>
          </div>
          <video
            src="/videos/overview-1.mp4"
            autoPlay 
            loop 
            muted 
            className={`
              size-full -translate-x-12 scale-115 object-cover object-center
              mix-blend-screen
            `}
          />
        </div>
        <div ref={cardRef} className={`
          relative ms-52 aspect-square overflow-hidden rounded-lg bg-yellow-100
          p-4
          md:ms-32
          lg:ms-42
        `} style={{ containerType: 'size', containerName: 'parent' }}>
          <div className="flex size-full flex-col justify-between">
            <p className={`
              transform-matrix-3d
              xs:translate-x-20
              dynamic-text -translate-y-3 font-zentry tracking-tighter
              text-black
              md:-translate-x-4
              lg:-translate-x-2 lg:-translate-y-6
              xl:translate-x-6.5
            `}>
              3<b>0</b>+
            </p>
            <p className={`
              absolute right-4 bottom-4 self-end font-roboto text-base
              text-black
              md:text-xs
            `}>Partners</p>
          </div>
        </div>
        <div ref={cardRef} className={`
          relative mx-auto max-h-[40vw] min-h-80 max-w-80 rounded-lg
          bg-violet-200 p-4
          md:max-w-none
        `}>
          <div>
            <p className="mb-2 font-roboto text-xs text-black">Treasury</p>
            <p className={`
              font-zentry text-6xl text-black
              md:text-[7vw]
              lg:text-[6vw]
            `}>140<b>M+</b></p>
          </div>
          <div className={`
            relative -top-28
            md:-top-20
            lg:-top-[10vw]
            xl:-top-36
          `}>
            <img
              src="/img/logo.png"
              alt="Logo"
              className="absolute-center z-10 h-auto w-16"
            />
            <video
              src="/videos/overview-2.mp4"
              autoPlay
              loop
              muted
              className={`
                size-full -translate-y-6 object-cover object-center
                mix-blend-screen
              `}
            />
          </div>
          <img
            src="/img/overview-1.svg"
            alt="Overview"
            className={`
              absolute bottom-4 left-1/2 w-fit max-w-[90%] -translate-x-1/2
              object-cover
            `}
          />
        </div>
      </div>
      {/* 右區 */}
      <div className={`
        space-y-7
        md:space-y-5
        lg:space-y-7
      `}>
        <div ref={cardRef} className={`
          relative me-42 aspect-[4/5] overflow-hidden rounded-lg bg-violet-200
          p-4
          md:me-0
        `}>
          <p className="mb-2 font-roboto text-xs text-black">Residents</p>
          <p className={`
            transform-matrix-3d ml-28 font-zentry text-[10vw] leading-36
            text-black
          `}>500<b>K</b>+</p>
          <img 
            src="/img/overview-2.webp" 
            alt="Residents" 
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div ref={cardRef} className={`
          ms-64 aspect-square rounded-lg border-[0.5px] border-white/30 bg-black
          p-4
          md:ms-0 md:me-42
        `}>
          <h2 className="mb-6 font-zentry text-5xl text-violet-50 uppercase">
            W<b>o</b>rld-Class
            <br/>
            B<b>a</b>ckers
          </h2>
          <ul className={`
            text-right font-roboto text-xxs/3.5 text-violet-50 uppercase
          `}>
            <li>coinbase ventures</li>
            <li>yzi labs</li>
            <li>spartan</li>
            <li>longhash</li>
            <li>pantera capital</li>
            <li>animoca brands</li>
            <li>defiance capital</li>
            <li>play ventures</li>
            <li>skyvision capital</li>
            <li>vessel capital</li>
            <li>arche fund</li>
            <li>synergis</li>
          </ul>
        </div>
        <div ref={cardRef} className={`
          me-20 aspect-video rounded-lg bg-blue-50 p-4
          md:me-0
        `} style={{ containerType: 'size', containerName: 'parent' }}>
          <p className="mb-2 font-roboto text-xs text-black">Revenue generated<br/>2024</p>
          <p className={`
            transform-matrix-3d-2 dynamic-text-2 -translate-y-28 font-zentry
            text-black
            sm:-translate-x-16 sm:-translate-y-32
            md:translate-x-0 md:-translate-y-24
            lg:-translate-x-2 lg:-translate-y-28
            xl:-translate-x-8
          `}>40<b>M</b></p>
        </div>
      </div>
    </div>
  );
};

export default BentoGrids;
