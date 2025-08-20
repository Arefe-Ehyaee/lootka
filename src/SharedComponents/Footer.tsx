import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/lootka_logo.png';
import ins from "../assets/icons/logo-instagram.svg";
import wat from "../assets/icons/logo-whatsapp.svg"
import tel from "../assets/icons/telegram-circled.svg"

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-start text-right">

          {/* Logo and About */}
          <div className="flex-1 desktop:hidden md:hidden space-y-1">
            <div>
              <Link to="/">
                <div className="flex flex-row gap-[12px] items-center justify-center">
                  <img src={logo} alt="Logo" className="desktop:w-[97px] desktop:h-[60px] w-[53px] h-[40px]" />
                  <h2 className="text-[#4C3516] font-myIranSansBold text-[24px] desktop:text-[40px]">لوتکا</h2>
                </div>
              </Link>
            </div>
            <p className="text-gray-600 text-sm font-myIranSansMedium leading-relaxed pt-[32px]">
              لوتکا یک بستر جامع برای کشف بهترین مکان‌های گردشگری، اقامتی و رستوران ها در شهرهای شمال ایران است.             </p>

            <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular py-[32px]">
              <li>ایمیل: lootka.info@gmail.com</li>
              <li>تلفن:013۳۲۲۲۲۲۲۲</li>
            </ul>
          </div>

          <div className='flex-1 flex-col'>

            <div className='flex flex-row flex-1 mx-auto'>
              {/* Links */}
              <div className="flex-1 space-y-2">
                <h4 className="font-myIranSansBold mb-[32px] text-gray-800">لوتکا</h4>
                <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular">
                  <li><Link to="/" className="hover:text-lootka-green">ارتباط با لوتکا</Link></li>
                  <li><Link to="/" className="hover:text-lootka-green">پشتیبانی</Link></li>
                  <li><Link to="/" className="hover:text-lootka-green">قوانین و مقررات</Link></li>
                  <li><Link to="/aboutUs" className="hover:text-lootka-green">درباره لوتکا</Link></li>
                </ul>
              </div>

              {/* Links */}
              <div className="flex-1 space-y-2">
                <h4 className="font-myIranSansBold mb-[32px] text-gray-800">دسترسی سریع</h4>
                <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular">
                  <li><Link to="/restaurants" className="hover:text-lootka-green">خورد و خوراک</Link></li>
                  <li><Link to="/attractions" className="hover:text-lootka-green">جاهای دیدنی</Link></li>
                  <li><Link to="/hostels" className="hover:text-lootka-green">اقامتگاه</Link></li>
                  <li><Link to="/addForm" className="hover:text-lootka-green">ثبت مکان جدید</Link></li>
                </ul>
              </div>

              {/* Contact / Language */}
              <div className="desktop:flex desktop:flex-col desktop:flex-1 hidden space-y-2">
                <h4 className="font-myIranSansBold mb-[32px] text-gray-800">تماس با لوتکا</h4>
                <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular">
                  <li>ایمیل: lootka.info@gmail.com</li>
                  <li>تلفن:013۳۲۲۲۲۲۲۲</li>
                  <li>
                    آدرس: ایران، تهران
                  </li>
                </ul>
              </div>
            </div>

            {/* Social Media */}
            <ul className='flex flex-row items-center desktop:justify-start md:justify-start justify-center gap-[16px] mt-[60px]'>
              <li>
                <img src={tel} alt="" />
              </li>
              <li>
                <img src={ins} alt="" />
              </li>
              <li>
                <img src={wat} alt="" />
              </li>
            </ul>
          </div>


          {/* Logo and About */}
          <div className="desktop:flex desktop:flex-col desktop:flex-1 md:flex md:flex-col md:flex-1 hidden space-y-1 ">
            <div>
              <Link to="/">
                <div className="flex flex-row gap-[12px] items-center">
                  <img src={logo} alt="Logo" className="desktop:w-[97px] desktop:h-[60px] w-[43px] h-[30px]" />
                  <h2 className="text-[#4C3516] font-myIranSansBold text-[24px] desktop:text-[40px]">لوتکا</h2>
                </div>
              </Link>
            </div>
            <p className="text-gray-600 text-sm font-myIranSansMedium leading-relaxed pt-[32px]">
              لوتکا یک بستر جامع برای کشف بهترین مکان‌های گردشگری، اقامتی و رستوران ها در شهرهای شمال ایران است.             </p>

            <ul className="text-gray-600 text-sm gap-4 font-myIranSansFaNumRegular py-[32px] hidden desktop:hidden md:flex md:flex-row">
              <li>ایمیل: lootka.info@gmail.com</li>
              <li>تلفن:013۳۲۲۲۲۲۲۲</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500 font-myIranSansFaNumRegular">
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </div>
      </div>

    </footer>
  );
};

export default Footer;
