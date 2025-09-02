import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/lootka_logo.png";
import user from "../assets/icons/usercircle-Vector.svg";
import ModalTemplate from "./ModalWrapper";
import SignUp from "./SignUp";
import Login from "./Login";
import { Menu, X } from "lucide-react"; // آیکون‌های همبرگری

const cities: string[] = ["رشت", "بندرانزلی", "ماسوله", "لاهیجان"];

const Navbar = () => {
  const [cityIndex, setCityIndex] = useState<number>(0);
  const [modalType, setModalType] = useState<"signup" | "login" | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCityIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-20 h-[90px] desktop:px-[80px] px-[24px] py-[16px]">
        <div className="mx-auto">
          <div className="flex justify-between items-center text-white relative">
            {/* Logo */}
            <div>
              <Link to="/">
                <div className="flex flex-row gap-[6px] items-center">
                  {/* Hamburger menu button (mobile only) */}
                  <button
                    className="desktop:hidden flex items-center"
                    onClick={() => setIsMenuOpen(true)}
                  >
                    <Menu size={24} className="text-black" />
                  </button>

                  <img
                    src={logo}
                    alt="Logo"
                    className="desktop:w-[57px] desktop:h-[40px] w-[43px] h-[30px]"
                  />
                  <h2 className="text-[#4C3516] font-myYekanDemibold text-[16px] desktop:text-[24px]">
                    لوتکا
                  </h2>


                </div>
              </Link>
            </div>

            {/* Centered Nav (desktop only) */}
            <div className="absolute left-1/2 -translate-x-1/2 desktop:flex hidden items-center desktop:gap-[32px] gap-4 text-[#222222] font-myYekanDemibold">
              <button onClick={() => navigate("/")}>خانه</button>
              <button onClick={() => navigate("/aboutUs")}>درباره ما</button>
              <button onClick={() => navigate("/")}>قوانین و مقررات</button>
              <button onClick={() => navigate("/contact")}>ارتباط با ما</button>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center desktop:gap-[28px] gap-[8px] text-sm font-myIranSansRegular">
              <button
                className="bg-[#ffffff]/20 text-black font-myYekanMedium backdrop-blur-md border border-[0.6px] border-white desktop:px-[8px] px-2 desktop:py-[4px] py-0 rounded-full desktop:h-[40px] h-[24px] flex flex-row desktop:gap-[6px] gap-[4px] items-center desktop:text-base text-[10px]"
                onClick={() => setModalType("login")}
              >
                <img
                  src={user}
                  alt="user"
                  className="desktop:h-6 desktop:w-6 w-4 h-4"
                />
                ورود یا ثبت نام
              </button>

            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full px-4 pb-4 bg-white shadow-lg flex flex-col items-center gap-6 pt-4 text-[#222222] font-myYekanDemibold z-40">
          {/* Close button inside menu */}
          <button
            className="self-end mr-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <X size={16} />
          </button>

          <button
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            خانه
          </button>
          <button
            onClick={() => {
              navigate("/aboutUs");
              setIsMenuOpen(false);
            }}
          >
            درباره ما
          </button>
          <button
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            قوانین و مقررات
          </button>
          <button
            onClick={() => {
              navigate("/contact");
              setIsMenuOpen(false);
            }}
          >
            ارتباط با ما
          </button>
        </div>
      )}

      {/* Modal for login/signup */}
      {modalType && (
        <ModalTemplate
          showModal={true}
          onClose={() => setModalType(null)}
          mainComponent={
            modalType === "login" ? (
              <Login
                onClose={() => setModalType(null)}
                switchToSignup={() => setModalType("signup")}
              />
            ) : (
              <SignUp
                onClose={() => setModalType(null)}
                switchToLogin={() => setModalType("login")}
              />
            )
          }
        />
      )}
    </>
  );
};

export default Navbar;
