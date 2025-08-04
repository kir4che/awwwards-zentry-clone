import AnimatedTitle from "../atoms/AnimatedTitle";
import Button from "../atoms/Button";

const ImageClipBox = ({ ref, src, clipClass = '', imgClass = '' }) => (
  <div ref={ref} className={clipClass}>
    <img src={src} className={imgClass} />
  </div>
);

const Contact = () => {
  return (
    <div id="contact" className={`
      mt-40 mb-10 min-h-96 px-6
      xl:px-9
    `}>
      <div className="relative bg-amber-200">
        <div className={`
          relative overflow-hidden rounded-lg bg-black py-32 text-blue-50
          md:py-16
          xl:py-24
        `}>
          <div className={`
            absolute top-[26rem] left-1/2 h-full w-80 -translate-x-1/2
            sm:block
            md:top-0 md:left-0 md:translate-x-0
            lg:left-[10vw]
            xl:left-20 xl:w-[28vw]
          `}>
            <ImageClipBox
              src="/img/contact-1.webp"
              clipClass="contact-clip-path-1 -translate-y-15 hidden md:block"
            />
            <ImageClipBox
              src="/img/contact-2.webp"
              clipClass="contact-clip-path-2 translate-y-16 md:translate-y-20"
            />
          </div>
          <div className={`
            relative z-50 flex flex-col items-center gap-y-10 text-center
            md:gap-y-7
          `}>
            <p className={`
              font-general text-sm uppercase
              md:text-xxs
            `}>
              Join Zentry
            </p>
            <AnimatedTitle text="let&#39;s b<b>u</b>ild the<br/>new era of g<b>a</b>ming<br/>t<b>o</b>gether." />
            <Button
              id="contact-btn"
              text="contact us"
              containerClass="px-8 py-2 lg:px-5 lg:py-1"
              textClass="text-sm lg:text-xxs"
            />
          </div>
        </div>
        <div className={`
          absolute -top-32 left-1/2 w-80 -translate-x-[40%]
          md:-top-4 md:left-[72vw] md:w-60 md:translate-0
          lg:-top-8 lg:w-92
          xl:-top-10 xl:w-[28vw] xl:max-w-96
        `}>
          <ImageClipBox
            src="/img/swordman-partial.webp"
            clipClass="absolute scale-125"
          />
          <ImageClipBox
            src="/img/swordman.webp"
            clipClass="sword-man-clip-path"
            imgClass="scale-125"
          />
        </div>
      </div>
    </div>
  );
};


export default Contact;
