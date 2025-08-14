import React, { useRef } from 'react';
import PopularDestinations from '../SharedComponents/PopularDestinations';
import Navbar from '../SharedComponents/Navbar';
import Hero from '../SharedComponents/Hero';
import Footer from '../SharedComponents/Footer';
import PopularEat from '../SharedComponents/PopularEat';
import PopularHostels from '../SharedComponents/PopularHostels';
import { ReactComponent as Magnifier } from "../assets/icons/Minimalistic Magnifer.svg";
import ExperienceSection from '../SharedComponents/ExperienceSection';
import HeroNavigation from '../SharedComponents/HeroNavigatoin';
import HeroNavigationMobile from '../SharedComponents/HeroNavigationMobile';

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

        <div className="mt-[32px] px-[24px] flex desktop:hidden justify-center items-center w-full text-center">
          <div className="relative w-[600px]">
            <Magnifier className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-[20px] h-[20px]" />
            <input
              type="text"
              placeholder="جستجوی جاذبه‌های دیدنی، رستوران و اقامتگاه"
              className="w-full h-[40px] font-myIranSansRegular text-[#222222] text-[10px] pr-12 pl-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>
        {/* ExperienceSection positioned to overlap Hero and Features */}
        <div className="desktop:flex hidden relative -mt-14 z-10">
          <HeroNavigation />
        </div>
        <div className="desktop:hidden flex relative mt-[16px] z-10">
          <HeroNavigationMobile />
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