import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';
import { useRef } from 'react';

import About from '../components/organisms/About';
import Benefits from '../components/organisms/Benefits';
import Contact from '../components/organisms/Contact';
import Features from '../components/organisms/Features';
import Footer from '../components/organisms/Footer';
import Header from '../components/organisms/Header';
import Hero from '../components/organisms/Hero';
import Mission from '../components/organisms/Mission';
import Partners from '../components/organisms/Partners';
import StatsOverview from '../components/organisms/StatsOverview';
import Story from '../components/organisms/Story';
import Updates from '../components/organisms/Updates';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // #story
    ScrollTrigger.create({
      trigger: "#story",
      start: "bottom 50%",
      scrub: true,
      onEnter: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "var(--yellow-100)",
          color: "black",
          duration: 0,
        });
        gsap.to("#animated-text", {
          color: "black",
          duration: 0,
        });
        gsap.to("#story button", {
          backgroundColor: "black",
          color: "var(--blue-75)",
          duration: 0,
        });
      },
      onLeaveBack: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "black",
          color: "var(--blue-50)",
          duration: 0,
        });
        gsap.to("#animated-text", {
          color: "#white",
          duration: 0,
        });
        gsap.to("#story button", {
          backgroundColor: "var(--blue-75)",
          color: "black",
          duration: 0,
        });
      }
    });
    // #benefits
    ScrollTrigger.create({
      trigger: "#benefits",
      start: "bottom 80%",
      scrub: true,
      onEnter: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "var(--blue-75)",
          color: "black",
          duration: 0,
        });
      },
      onLeaveBack: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "var(--yellow-100)",
          color: "black",
          duration: 0,
        });
      }
    });
    // #mission
    ScrollTrigger.create({
      trigger: "#mission",
      start: "bottom 30%",
      scrub: true,
      onEnter: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "black",
          color: "var(--blue-50)",
          duration: 0,
        });
        gsap.to("#animated-text", {
          color: "var(--blue-50)",
          duration: 0,
        });
        gsap.to("#mission button", {
          backgroundColor: "var(--blue-75)",
          color: "black",
          duration: 0,
        });
      },
      onLeaveBack: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "var(--blue-75)",
          color: "black",
          duration: 0,
        });
        gsap.to("#animated-text", {
          color: "black",
          duration: 0,
        });
        gsap.to("#mission button", {
          backgroundColor: "black",
          color: "var(--blue-75)",
          duration: 0,
        });
      }
    });
    // #partners
    ScrollTrigger.create({
      trigger: "#partners",
      start: "bottom 30%",
      scrub: true,
      onEnter: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "var(--blue-75)",
          color: "black",
          duration: 0,
        });
        gsap.to("li", {
          color: "black",
          duration: 0,
        });
      },
      onLeaveBack: () => {
        gsap.to(containerRef.current, {
          backgroundColor: "black",
          color: "var(--blue-50)",
          duration: 0,
        });
        gsap.to("li", {
          color: "var(--blue-50)",
          duration: 0,
        });
      }
    });
  }, [containerRef]);

  return (
    <>
      <ReactLenis root />
      <main className='relative min-h-screen w-dvw scroll-smooth'>
        <Header />
        <Hero />
        <About />
        <Features />
        <div ref={containerRef} className={`
          min-h-dvh w-dvw bg-black text-violet-50
        `}>
          <Story />
          <Benefits />
          <Mission />
          <StatsOverview />
          <Partners />
          <Updates />
        </div>
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default Home;
