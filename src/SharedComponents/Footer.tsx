import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/lootka_logo.png';
import ins from "../assets/icons/logo-instagram.svg";
import wat from "../assets/icons/logo-whatsapp.svg";
import tel from "../assets/icons/telegram-circled.svg";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start text-right">

          {/* لوگو + توضیح */}
          <div className="w-full md:w-2/5">
            <Link to="/" className="flex flex-row gap-[12px] items-center justify-center md:justify-start">
              <img src={logo} alt="Logo" className="w-[53px] h-[40px] md:w-[97px] md:h-[60px]" />
              <h2 className="text-[#4C3516] font-myIranSansBold text-[24px] md:text-[40px]">لوتکا</h2>
            </Link>
            <p className="text-gray-600 text-sm font-myIranSansMedium leading-relaxed pt-[24px] text-justify md:text-right">
              لوتکا یک بستر جامع برای کشف بهترین مکان‌های گردشگری، اقامتی و رستوران‌ها در شهرهای شمال ایران است.
            </p>
          </div>

          {/* بخش‌های کناری */}
          <div className="flex flex-row flex-wrap md:flex-nowrap md:w-3/5 md:justify-between md:gap-8">

            {/* لوتکا */}
            <div className="w-1/2 md:w-1/5">
              <h4 className="font-myIranSansBold mb-4 text-gray-800">لوتکا</h4>
              <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular">
                <li><Link to="/" className="hover:text-lootka-green">ارتباط با لوتکا</Link></li>
                <li><Link to="/" className="hover:text-lootka-green">پشتیبانی</Link></li>
                <li><Link to="/" className="hover:text-lootka-green">قوانین و مقررات</Link></li>
                <li><Link to="/aboutUs" className="hover:text-lootka-green">درباره لوتکا</Link></li>
              </ul>
            </div>

            {/* دسترسی سریع */}
            <div className="w-1/2 md:w-1/5">
              <h4 className="font-myIranSansBold mb-4 text-gray-800">دسترسی سریع</h4>
              <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular">
                <li><Link to="/restaurants" className="hover:text-lootka-green">خورد و خوراک</Link></li>
                <li><Link to="/attractions" className="hover:text-lootka-green">جاهای دیدنی</Link></li>
                <li><Link to="/hostels" className="hover:text-lootka-green">اقامتگاه</Link></li>
                <li><Link to="/addForm" className="hover:text-lootka-green">ثبت مکان جدید</Link></li>
              </ul>
            </div>

            {/* تماس با لوتکا (فقط دسکتاپ) */}
            <div className="hidden md:block md:w-1/5">
              <h4 className="font-myIranSansBold mb-4 text-gray-800">تماس با لوتکا</h4>
              <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular">
                <li>ایمیل: lootka.info@gmail.com</li>
                <li>تلفن:09019419057</li>
                <li>آدرس: ایران، گیلان</li>
              </ul>
            </div>

          </div>
        </div>

        {/* راه‌های ارتباطی (فقط موبایل) */}
        <div className="md:hidden mt-10 text-right">
          <p className="font-myIranSansBold mb-3 text-gray-800">راه‌های ارتباطی</p>
          <ul className="text-gray-600 text-sm space-y-2 font-myIranSansFaNumRegular">
            <li>ایمیل: lootka.info@gmail.com</li>
            <li>تلفن:09019419057</li>
          </ul>
        </div>

        {/* شبکه‌های اجتماعی */}
        <ul className='flex flex-row items-center justify-center md:justify-start gap-[16px] mt-[30px]'>
          <a
            href="https://t.me/yourTelegramUsername"
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
            href="https://wa.me/yourWhatsappNumber"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img src={wat} alt="Whatsapp" className="w-8 h-8 cursor-pointer" />
          </a>
        </ul>

        {/* کپی‌رایت */}
        <div className="border-t mt-8 pt-4 text-center text-sm text-gray-500 font-myIranSansFaNumRegular">
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
