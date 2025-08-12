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
import FreeHostels from '../SharedComponents/FreeHostels';
import PopularCafes from '../SharedComponents/PopularCafes';

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
      <Hero onAdventureClick={scrollToAssistant} />
      {/* <SearchBar /> */}
      <div className="max-w-8xl mx-auto py-3">
        {/* <div ref={assistantRef}>
          <AIAssistant />
        </div> */}
        <Features></Features>
        <PopularEat></PopularEat>
                <PopularCafes></PopularCafes>

        {/* <PopularDestinationsNew /> */}
                <PopularDestinations />
        <PopularHostels></PopularHostels>
        {/* <FreeHostels></FreeHostels> */}
        {/* <Suggestions />
        <Specials></Specials> */}
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;