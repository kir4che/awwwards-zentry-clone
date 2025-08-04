import AnimatedTitle from "../atoms/AnimatedTitle";
import TypewriterText from "../atoms/TypewriterText";
import BentoGrids from "../molecules/BentoGrids";

const StatsOverview = () => {
  return (
    <section id="stats-overview" className="px-6 py-24">
      <div className={`
        text-center
        md:text-left
      `}>
        <TypewriterText text="Our universe in a nutshell" textClass='mb-7 md:mb-4.5' />
        <AnimatedTitle
          text="ze<b>n</b>try at a<br/>glan<b>c</b>e"
          fontSizeClass="text-7xl sm:text-[12vw] md:text-7xl lg:text-[7.5vw]"
        />
      </div>
      <div className={`
        mx-auto py-16
        md:max-w-screen-sm
        lg:max-w-screen-md
        xl:max-w-[960px]
      `}>
        <BentoGrids />
      </div>
    </section>

  );
};

export default StatsOverview;
