import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const partners = [
  
  { name: "YZiLabs", category: "BACKERS" },
  { name: "Coinbase Ventures", category: "BACKERS" },
  { name: "Pantera Capital", category: "BACKERS" },
  { name: "DeFiance Capital", category: "BACKERS" },
  { name: "Animoca Brands", category: "BACKERS" },
  { name: "SkyVision Capital", category: "BACKERS" },
  { name: "Play Venture", category: "BACKERS" },
  { name: "Vessel Capital", category: "BACKERS" },
  { name: "Arche Fund", category: "BACKERS" },
  { name: "Marblex", category: "GAMING" },
  { name: "Fnatic", category: "GAMING" },
  { name: "XSET", category: "GAMING" },
  { name: "Jambo", category: "WEB3" },
  { name: "AWS", category: "BRANDS" },
];

const Partners = () => {
  const containerRef = useRef(null);
  const liRefs = useRef([]);

  useGSAP(() => {
    const items = liRefs.current;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: items[0]?.parentNode,
        start: "top 80%",
        end: "bottom 30%",
        scrub: true,
      }
    });

    tl.to(items, {
      color: "#EDFF67",
      stagger: {
        amount: 1,
        each: 0.2,
        onStart: (target) => {
          items.forEach(el => el !== target && gsap.set(el, { color: "#DFDFF0" }));
        }
      },
      duration: 0.15,
    });
  }, { scope: containerRef });

  return (
    <section id='partners' ref={containerRef} className={`
      mx-auto flex max-w-screen-sm flex-col justify-between gap-20 px-6 py-12
      md:flex-row md:items-center md:gap-18
      lg:max-w-screen-lg
    `}>
      <p className={`
        mx-auto max-w-96 font-roboto text-xl
        md:text-xs
        lg:text-base
      `}>Our partners <span className={`text-white/40`}>span gaming, Web3, AI, and beyond—backing our growth, sparking innovation, and elevating the player experience.</span></p>
      <div>
        <h1 className={`
          ml-12 hidden font-zentry text-4xl/9 text-violet-50
          md:block
          lg:text-[3.2rem]/12
        `}>O<b>U</b>RPARTNERS</h1>
        <ul>
          {partners.map((partner, idx) => (
            <li
              key={partner.name}
              ref={el => liRefs.current[idx] = el}
              className={`
                flex font-zentry text-5xl text-nowrap text-violet-50
                transition-colors duration-500
                md:text-4xl/9
                lg:text-[3.2rem]/12
              `}
            style={{ transition: "color 0.2s" }}
          >
              <span className={`
                mr-8 font-roboto text-xxs leading-4 text-white/40
                md:mr-3 md:text-[.5rem]
              `}>
                {partner.category}
              </span>
              <span>{partner.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Partners;
