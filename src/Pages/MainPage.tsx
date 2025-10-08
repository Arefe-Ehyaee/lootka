import React, { useRef, useState } from 'react';
import NavbarMain from '../SharedComponents/NavbarMain';
import Hero from '../SharedComponents/Hero';
import HeroNavigation from '../SharedComponents/HeroNavigatoin';
import HeroNavigationMobile from '../SharedComponents/HeroNavigationMobile';
import PopularDestinations from '../SharedComponents/PopularDestinations';
import ExperienceSection from '../SharedComponents/ExperienceSection';
import PopularEat from '../SharedComponents/PopularEat';
import PopularCafes from '../SharedComponents/PopularCafes';
import TravelFeatures from '../SharedComponents/TravelFeatures';
import PopularHostels from '../SharedComponents/PopularHostels';
import UserComments from '../SharedComponents/UserComments';
import Footer from '../SharedComponents/Footer';

const MainPage: React.FC = () => {
  const assistantRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const scrollToAssistant = () => {
    assistantRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen min-w-screen">
      <NavbarMain />

      <div className="relative">
        <Hero onAdventureClick={scrollToAssistant} />

        <div className="desktop:flex hidden relative -mt-14 z-10">
          <HeroNavigation />
        </div>

        <div className="desktop:hidden flex relative mt-[16px] z-10">
          <HeroNavigationMobile />
        </div>
      </div>

      <div className="max-w-8xl mx-auto py-2">

        <div className="pt-6">
          <PopularDestinations />
        </div>

        <ExperienceSection />
        <PopularEat />
        <PopularCafes />
        <TravelFeatures />
        <PopularHostels />
        <UserComments />
      </div>

      <Footer />
    </div>
  );
};

export default MainPage;
