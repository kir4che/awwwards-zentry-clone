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
    const sections = [
      { id: 'story', bg: 'black', color: 'var(--blue-50)' },
      { id: 'benefits', bg: 'var(--yellow-100)', color: 'black' },
      { id: 'mission', bg: 'var(--blue-75)', color: 'black' },
      { id: 'stats-overview', bg: 'black', color: 'var(--blue-50)' },
      { id: 'partners', bg: 'black', color: 'var(--blue-50)' },
      { id: 'updates', bg: 'var(--blue-75)', color: 'black' }
    ];

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section.id}`,
        start: "top 65%",
        end: "bottom center",
        scrub: true,
        onEnter: () => {
          gsap.set(containerRef.current, {
            backgroundColor: section.bg,
            color: section.color
          });
        },
        onEnterBack: () => {
          gsap.set(containerRef.current, {
            backgroundColor: section.bg,
            color: section.color
          });
        }
      });
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
