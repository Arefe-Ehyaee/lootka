import React, { useRef } from 'react';
import PopularDestinations from '../SharedComponents/PopularDestinations';
import Navbar from '../SharedComponents/Navbar';
import Hero from '../SharedComponents/Hero';
import Footer from '../SharedComponents/Footer';
import PopularEat from '../SharedComponents/PopularEat';
import PopularHostels from '../SharedComponents/PopularHostels';
import ExperienceSection from '../SharedComponents/ExperienceSection';
import HeroNavigation from '../SharedComponents/HeroNavigatoin';
import HeroNavigationMobile from '../SharedComponents/HeroNavigationMobile';
import PopularCafes from '../SharedComponents/PopularCafes';
import TravelFeatures from '../SharedComponents/TravelFeatures';
import UserComments from '../SharedComponents/UserComments';

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

        <div className="desktop:flex hidden relative -mt-14 z-10">
          <HeroNavigation />
        </div>
        <div className="desktop:hidden flex relative mt-[16px] z-10">
          <HeroNavigationMobile />
        </div>
      </div>

      {/* <SearchBar /> */}
      <div className="max-w-8xl mx-auto py-2">
        {/* <div ref={assistantRef}>
          <AIAssistant />
        </div> */}

        <div className="pt-6">
          <PopularDestinations />
        </div>

        <ExperienceSection />
        <PopularEat />
        <PopularCafes />
        <TravelFeatures></TravelFeatures>
        <PopularHostels />
        <UserComments></UserComments>

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