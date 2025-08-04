import clsx from "clsx";

import AnimatedTitle from "../atoms/AnimatedTitle";
import Button from "../atoms/Button";
import Preview3D from "../molecules/Preview3D";

const galleryImages = [
  {
    name: "Nexus: Zentry’s Metagame Portal Bridging Human & AI in the Global Play Economy",
    src: "/img/gallery-1.webp",
    date: "09.05.2024"
  },
  {
    name: "Zentry Whitepaper: The Blueprint to the Metagame",
    src: "/img/gallery-2.webp",
    date: "22.11.2024"
  },
];

const Updates = () => {
  return (
    <section id="updates" className={`
      flex flex-col justify-between gap-y-28 px-12 py-24
      md:flex-row md:px-16
    `}>
      <div className="space-y-5">
        <AnimatedTitle text="lat<b>e</b>st<br/><b>u</b>pdates"/>
        <p className={`
          max-w-72 font-roboto text-lg/6
          sm:max-w-100 sm:text-xl
          md:max-w-72 md:text-xs
        `}>Stay updated with the latest news, events, and updates in our ecosystem. Be part of our universe&#39;s growth and evolution.</p>
        <Button
          id='read-all-news-btn'
          variant="secondary"
          text="Read All News"
          containerClass="px-5 py-1 sm:px-9 sm:py-2.5 md:px-6 md:py-1"
          textClass="text-sm sm:text-base md:text-xs"
        />
      </div>
      <ul className={`
        space-y-16
        md:space-y-8
      `}>
        {galleryImages.map((img, idx) => (
          <li key={img.name} className={clsx(`
            flex max-w-88 cursor-pointer flex-col gap-y-6
            sm:max-w-md
          `, {
            "ml-auto": idx === 0,
          })}
          >
            <Preview3D
              maxX={20}
              maxY={20}
              containerClass="overflow-hidden"
              borderClass="rounded-lg border-[1.25px] border-black shadow"
            >
              <img
                src={img.src}
                alt={img.name}
                className={`
                  size-full object-cover transition-transform duration-700
                  hover:scale-110
                `}
              />
            </Preview3D>
            <div className={`
              flex flex-row-reverse gap-x-12
              md:flex-row
            `}>
              <p className={`
                text-xxs
                sm:text-sm
                md:text-xxs
              `}>{img.date}</p>
              <p className={`
                font-roboto text-base/5.5 font-medium
                sm:text-2xl
                md:max-w-60 md:text-sm/4.5
              `}>{img.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Updates;
