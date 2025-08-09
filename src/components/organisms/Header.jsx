import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import { BiSolidDownArrow } from "react-icons/bi";

import { useScrollDirection } from "../../hooks/useScrollDirection";

import AudioIndicator from "../atoms/AudioIndicator";
import Button from "../atoms/Button";
import NavMenu from "../organisms/NavMenu";

const NAV_ITEMS = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Header = () => {
  const { isVisible, scrollY } = useScrollDirection();
  const [isPlaying, setIsPlaying] = useState(false);
  const navRef = useRef(null);

  useGSAP(() => {
    if (!navRef.current) return;

    if (isVisible) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
      );
    } else gsap.to(navRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
  }, { dependencies: [isVisible], scope: navRef });

  return (
    <header className="fixed w-dvw inset-x-0 top-0 z-50">
      <nav
        ref={navRef}
        className={clsx(
          `
            mx-auto sm:mt-2 flex w-full sm:max-w-[95vw] items-center justify-between
            border px-2 py-3 sm:py-1.5 transition-colors delay-75 duration-300
            ease-in-out
            xl:max-w-[96vw] xl:px-4
          `, {
            "sm:rounded-lg sm:border-white/15 bg-black": scrollY > 0,
            "border-none": scrollY <= 0,
            "hidden": !isVisible,
          }
        )}
      >
        <div className={`
          flex items-center gap-x-2
          md:gap-x-3
        `}>
          <a href="/">
            <img src="/img/logo.png" alt="logo" className={`
              -mr-2 w-10
              sm:mr-0
              xl:mr-4
            `} />
          </a>
          <Button
            id="product-btn"
            text="Products"
            rightIcon={<BiSolidDownArrow size={10} />}
            containerClass="px-4 py-.5 bg-blue-50"
          />
          <Button
            id="whitepaper-btn"
            text="Whitepaper"
            containerClass="px-4 py-.5 bg-blue-50"
          />
        </div>
        <div className="flex items-center">
          <NavMenu items={NAV_ITEMS} />
          <AudioIndicator
            isPlaying={isPlaying}
            onToggle={() => setIsPlaying(prev => !prev)}
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
