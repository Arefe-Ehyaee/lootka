import React, { useRef } from 'react';
import PopularDestinations from '../SharedComponents/PopularDestinations';
import Navbar from '../SharedComponents/Navbar';
import Hero from '../SharedComponents/Hero';
import Footer from '../SharedComponents/Footer';
import Suggestions from '../SharedComponents/Suggestions';
import PopularEat from '../SharedComponents/PopularEat';
import Specials from '../SharedComponents/Specials';
import Resort from '../SharedComponents/Resort';
import PopularHostels from '../SharedComponents/PopularHostels';
import Features from '../SharedComponents/Features';
import PopularCafes from '../SharedComponents/PopularCafes';
import ExperienceSection from '../SharedComponents/ExperienceSection';
import HeroNavigation from '../SharedComponents/HeroNavigatoin';

const MainPage: React.FC = () => {
  const assistantRef = useRef<HTMLDivElement>(null);

  const scrollToAssistant = () => {
    assistantRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen min-w-screen">
      <Navbar />
      <div className="relative">
        <Hero onAdventureClick={scrollToAssistant} />

        {/* ExperienceSection positioned to overlap Hero and Features */}
        <div className="relative -mt-14 z-10">
          <HeroNavigation />
        </div>
      </div>

      {/* <SearchBar /> */}
      <div className="max-w-8xl mx-auto py-3">
        {/* <div ref={assistantRef}>
          <AIAssistant />
        </div> */}

        {/* Features section with padding to account for overlapping ExperienceSection */}
        <div className="pt-32">
          <PopularDestinations />

        </div>


        <ExperienceSection />
        <PopularEat />
        {/* <PopularCafes /> */}

        <PopularHostels />

        {/* <PopularDestinationsNew /> */}
        {/* <FreeHostels></FreeHostels> */}
        {/* <Suggestions />
        <Specials></Specials> */}
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;