import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/lootka_logo.png';
import ins from "../assets/icons/logo-instagram.svg";
import wat from "../assets/icons/logo-whatsapp.svg";
import tel from "../assets/icons/telegram-circled.svg";
import phone from "../assets/icons/device-phone.svg"
import loc from "../assets/icons/newLocation.svg";
import email from "../assets/icons/mail-1.svg";
import lnk from "../assets/icons/icons8-linkedin 1.svg"

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start text-right">

          {/* لوگو + توضیح */}
          <div className="w-full md:w-2/5">
            <Link to="/" className="flex flex-row gap-[12px] justify-start">
              <img src={logo} alt="Logo" className="w-[53px] h-[40px] md:w-[97px] md:h-[60px]" />
              <h2 className="text-[#4C3516] font-myYekanFaNumDemiBold text-[24px] md:text-[40px]">لوتکا</h2>
            </Link>
            <p className="text-gray-600 text-sm font-myYekanFaNumMedium leading-relaxed pt-[24px] text-justify md:text-right">
              لوتکا یک بستر جامع برای کشف بهترین مکان‌های گردشگری، اقامتی و رستوران‌ها در شهرهای شمال ایران است.
            </p>
          </div>

          {/* بخش‌های کناری */}
          <div className="flex flex-row flex-wrap md:flex-nowrap md:w-3/5 md:justify-between md:gap-8">

            {/* لوتکا */}
            <div className="w-1/2 md:w-1/5">
              <h4 className="font-myYekanFaNumDemiBold mb-4 text-gray-800">لوتکا</h4>
              <ul className="text-gray-600 text-sm space-y-2 font-myYekanFaNumRegular">
                <li><Link to="/" className="hover:text-lootka-green">ارتباط با لوتکا</Link></li>
                <li><Link to="/" className="hover:text-lootka-green">پشتیبانی</Link></li>
                <li><Link to="/" className="hover:text-lootka-green">قوانین و مقررات</Link></li>
                <li><Link to="/aboutUs" className="hover:text-lootka-green">درباره لوتکا</Link></li>
              </ul>
            </div>

            {/* دسترسی سریع */}
            <div className="w-1/2 md:w-1/5">
              <h4 className="font-myYekanFaNumDemiBold mb-4 text-gray-800">دسترسی سریع</h4>
              <ul className="text-gray-600 text-sm space-y-2 font-myYekanFaNumRegular">
                <li><Link to="/restaurants" className="hover:text-lootka-green">خورد و خوراک</Link></li>
                <li><Link to="/attractions" className="hover:text-lootka-green">جاهای دیدنی</Link></li>
                <li><Link to="/hostels" className="hover:text-lootka-green">اقامتگاه</Link></li>
                <li><Link to="/addForm" className="hover:text-lootka-green">ثبت مکان جدید</Link></li>
              </ul>
            </div>

            {/* تماس با لوتکا (فقط دسکتاپ) */}
            <div className="hidden md:block md:w-1/5">
              <h4 className="font-myYekanFaNumDemiBold mb-4 text-gray-800">تماس با لوتکا</h4>
              <ul className="text-gray-600 text-sm space-y-2 font-myYekanFaNumRegular">
                <li className='flex flex-row items-center gap-1'>
                  <img src={email} alt="" className='w-6 h-6' />
                  <span>lootka.info@gmail.com</span>
                </li>
                <li className='flex flex-row items-center gap-1'>
                  <img src={phone} alt="" className='w-6 h-6' />
                  <span>09019419057</span>
                </li>
                <li className='flex flex-row items-center gap-1'>
                  <img src={loc} alt="" className='w-5 h-5' />
                  <span>ایران، گیلان</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* راه‌های ارتباطی (فقط موبایل) */}
        <div className="md:hidden mt-10 text-right">
          <p className="font-myYekanFaNumDemiBold mb-3 text-gray-800">راه‌های ارتباطی</p>
          <ul className="text-gray-600 text-sm space-y-2 font-myYekanFaNumRegular">
            <li className='flex flex-row items-center gap-1'>
              <img src={email} alt="" className='w-6 h-6' />
              <span>lootka.info@gmail.com</span>
            </li>
            <li className='flex flex-row items-center gap-1'>
              <img src={phone} alt="" className='w-6 h-6' />
              <span>09019419057</span>
            </li>
            <li className='flex flex-row items-center gap-1'>
              <img src={loc} alt="" className='w-5 h-5' />
              <span>ایران، تهران</span>
            </li>

          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <ul className='flex flex-row justify-start gap-[16px] mt-[30px]'>
          <a
            href="https://t.me/lootkatrip"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img src={tel} alt="Telegram" className="w-8 h-8 cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/lootka.iran/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img src={ins} alt="Instagram" className="w-8 h-8 cursor-pointer" />
          </a>
          <a
            href="https://wa.me/989019419057"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img src={wat} alt="Whatsapp" className="w-8 h-8 cursor-pointer" />
          </a>
          <a
            href="https://www.linkedin.com/company/lootkatrip/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img src={lnk} alt="linkedin" className="w-8 h-8 cursor-pointer" />
          </a>
        </ul>

        {/* کپی‌رایت */}
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500 font-myYekanFaNumRegular">
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
