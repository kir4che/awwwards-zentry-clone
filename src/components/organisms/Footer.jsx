import { useRef } from "react";
import { FaDiscord, FaMedium, FaTwitter, FaYoutube } from "react-icons/fa";
import Text3DHover from "../molecules/Text3DHover";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord />, label: "Discord" },
  { href: "https://twitter.com", icon: <FaTwitter />, label: "Twitter" },
  { href: "https://youtube.com", icon: <FaYoutube />, label: "YouTube" },
  { href: "https://medium.com", icon: <FaMedium />, label: "Medium" },
];

const footerItems = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#home" },
      { label: "Prologue", href: "#prologue" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Radiant", href: "#radiant" },
      { label: "Nexus", href: "#nexus" },
      { label: "Zigma", href: "#zigma" },
      { label: "Azul", href: "#azul" },
    ],
  },
  {
    title: "Follow us",
    links: socialLinks.map((item) => ({
      label: item.label,
      href: item.href,
    })),
  },
  {
    title: "Media",
    links: [
      { label: "Media Kit", href: "#media-kit" }
    ],
  }
];

const Footer = () => {
  const titleRef = useRef(null);

  return (
    <footer className="bg-violet-200 border py-4 text-black">
      <Text3DHover ref={titleRef} containerClass="text-center">
        <h1 className={`
          font-zentry text-[32vw] leading-[28vw] font-medium tracking-wide
          text-nowrap uppercase
        `}>
          zentr<b>y</b>
        </h1>
      </Text3DHover>
      <div className={`
        my-16 flex w-full justify-between px-2
        sm:mt-20 sm:mb-28 sm:px-11
      `}>
        <a href="/">
          <img src="/img/logo.png" alt="logo" className="w-14" />
        </a>
        <div className={`
          grid grid-cols-2 gap-x-4 gap-y-12
          sm:grid-cols-4 sm:gap-x-32
        `}>
          {footerItems.map((column) => (
            <div className="min-w-32" key={column.title}>
              <h2 className="mb-4 text-xxs uppercase">{column.title}</h2>
              <ul className="-space-y-1 font-roboto">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={`
                      group py-2 btn-bounce inline-block rounded-md text-xl
                      tracking-wide transition-all duration-150
                      hover:-ml-4 hover:scale-x-90 hover:skew-x-6 hover:bg-black
                      hover:px-4 hover:text-violet-200
                      md:text-lg
                    `}>
                      <span className={`
                        inline-block
                        group-hover:-skew-x-6
                      `}>
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={`
        flex flex-col items-center justify-between px-11
        md:flex-row
      `}>
        <p className="text-xxs uppercase">©Zentry 2024. All rights reserved</p>
        <a href="#privacy-policy" className="text-xxs uppercase">
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;
