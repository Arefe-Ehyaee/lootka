import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserIcon from '../assets/icons/user-circle.svg';
import search from "../assets/icons/search-md.svg";
import logo from '../assets/images/lootka_logo.png';
import plus from "../assets/icons/Add Square.svg";
import login from "../assets/icons/login.svg";
import ModalTemplate from './ModalWrapper';
import SignUp from './SignUp';
import Login from './Login';

const cities: string[] = ['رشت', 'بندرانزلی', 'ماسوله', 'لاهیجان'];

const Navbar = () => {
  const [cityIndex, setCityIndex] = useState<number>(0);
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchFocused, setSearchFocused] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'signup' | 'login' | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav className="absolute top-0 left-0 w-full z-20 font-myIranSansRegular h-[90px] desktop:px-[80px] px-[24px] desktop:py-[22px] py-[16px]">
      <div className="mx-auto">
        <div className="flex justify-between items-center text-white relative">

          {/* Logo - left */}
          <div>
            <Link to="/">
              <div className="flex flex-row gap-[6px] items-center">
                <img src={logo} alt="Logo" className="w-[57px] h-[40px]" />
                <h2 className="text-[#4C3516] font-myIranSansBold text-[24px]">لوتکا</h2>
              </div>
            </Link>
          </div>

          {/* Centered Nav */}
          <div className="absolute left-1/2 -translate-x-1/2 desktop:flex hidden items-center desktop:gap-[32px] gap-4 text-[#222222] font-myIranSansBold">
            <button
              className="flex flex-row items-center desktop:text-base tablet:text-base text-sm"
              onClick={() => navigate("/")}
            >
              خانه
            </button>
            <button
              className="flex flex-row items-center desktop:text-base tablet:text-base text-sm"
              onClick={() => navigate("/aboutUs")}
            >
              درباره ما
            </button>
            <button
              className="flex flex-row items-center desktop:text-base tablet:text-base text-sm"
              onClick={() => navigate("/contact")}
            >
              ارتباط با ما
            </button>
          </div>

          {/* Icons - right */}
          <div className="flex items-center desktop:gap-[28px] gap-[8px] text-sm font-myIranSansRegular">
            <button
              className="flex flex-row gap-[8px] text-[#222222] items-center desktop:text-base tablet:text-base text-[10px]"
              onClick={() => navigate("/addForm")}
            >
              <img src={plus} alt="plus" className="h-5 w-5 mr-1" />
              ثبت مکان جدید
            </button>
            <button
              className="bg-[#647B3B] desktop:px-[16px] px-0 desktop:py-[4px] py-0 rounded-[8px] desktop:w-[168px] w-[90px] desktop:h-[48px] h-[25px] text-white flex flex-row desktop:gap-[8px] items-center desktop:text-base text-[10px]"
              onClick={() => setModalType('login')}
            >
              <img src={login} alt="plus" className="h-5 w-5 mr-1" />
              ورود / ثبت نام
            </button>
          </div>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
