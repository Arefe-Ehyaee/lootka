import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  UserIcon  from '../assets/icons/user-circle.svg';
import search from "../assets/icons/search-md.svg";
import logo from '../assets/images/logo-removebg-preview.png';
import plus from "../assets/icons/plus.svg";
import Modal from './ModalWrapper';
import SignUp from './SignUp';
import ModalTemplate from './ModalWrapper';
import Login from './Login';

const cities: string[] = ['رشت', 'بندرانزلی', 'ماسوله', 'لاهیجان'];

const Navbar = () => {
  const [cityIndex, setCityIndex] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>(cities[0]);
  const [showCityDropdown, setShowCityDropdown] = useState<boolean>(false);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [showSignup, setShowSignup] = useState(false);
  const [modalType, setModalType] = useState<'signup' | 'login' | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md font-myIranSansRegular">
      <div className="max-w-7xl mx-auto px-2 tablet:px-6 desktop:px-4">
        <div className="flex justify-between h-16 items-center">
          <div className="">
            <Link to="/">
              <img src={logo} alt="Logo" className="desktop:w-[180px] desktop:h-[110px] w-[150px] h-[90px]" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-grow justify-center mx-6">
            <div className="relative w-full flex items-center">
              {/* City Selector Section */}
              <div className="relative">
                <div
                  className="flex items-center justify-center px-4 h-10 bg-white text-gray-700 border border-l-0 border-gray-300 rounded-r-full focus:outline-none"
                >
                  <span className="mr-1">شهر</span>
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="h-10 w-px bg-gray-300"></div>

              {/* Search Input Section with Label on Border */}
              <div className="relative flex-1">
                <div className="relative">
                  <input
                    type="text"
                    id="searchInput"
                    className="w-full h-10 pl-10 pr-2 text-right border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-green-200"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(searchInput.length > 0)}
                  />
                  <label
                    htmlFor="searchInput"
                    className={`absolute text-gray-500 transition-all desktop:text-sm tablet:text-xs duration-200 pointer-events-none bg-white
                      ${(searchFocused || searchInput.length > 0)
                        ? 'text-xs top-0 -mt-2 right-3 z-10'
                        : 'text-base top-3 right-2'}`}
                  >
                    خوردنی‌ها، گشتنی‌ها و دیدنی‌ها، موندنی‌ها و ...           </label>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img src={search} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center desktop:gap-3 gap-4 text-sm">
            <button className="text-gray-600 hover:text-gray-900 flex flex-row items-center  desktop:text-base tablet:text-base text-sm" onClick={() => navigate("/addForm")}>
              <img src={plus} alt="plus" className="h-5 w-5" />
              ثبت مکان جدید
            </button>

            <button className="text-gray-600 hover:text-gray-900 flex flex-row items-center  desktop:text-base tablet:text-base text-sm" onClick={() => navigate("/aboutUs")}>
              درباره ما
            </button>
            <button
              className="flex flex-row items-center text-gray-600 hover:text-gray-900  desktop:text-base tablet:text-base text-sm"
              onClick={() => setModalType('signup')}
            >
              <img src={UserIcon} alt="" className='w-6 h-6' />
            </button>

          </div>
        </div>

        <ModalTemplate showModal={modalType !== null} onClose={() => setModalType(null)}>
          {modalType === 'signup' && (
            <SignUp
              onClose={() => setModalType(null)}
              switchToLogin={() => setModalType('login')}
            />
          )}
          {modalType === 'login' && (
            <Login
              onClose={() => setModalType(null)}
              switchToSignup={() => setModalType('signup')}
            />
          )}
        </ModalTemplate>


      </div>

      {/* Tailwind Custom Style */}
      <style>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          100% {
            opacity: 1;
            transform: translateY(0%);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease forwards;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;