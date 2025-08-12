import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo-removebg-preview.png';
import faInstagram from '../assets/icons/instagram-1-svgrepo-com 1.svg';
import faLinkedin from '../assets/icons/linkedin-engine.svg';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <footer className="bg-white shadow-inner border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 text-right">

          {/* Logo and About */}
          <div className="flex-1 space-y-1">
            <img src={logo} alt="Logo" className="w-[180px] h-[110px] mx-auto md:mx-0" />
            <p className="text-gray-600 text-sm font-myIranSansMedium leading-relaxed">
              یک بستر جامع برای کشف بهترین مکان‌های گردشگری، اقامتی و رستوران‌ها در شهرهای شمال ایران.
            </p>

          </div>

          {/* Links */}
          <div className="flex-1 space-y-2">
            <h4 className="font-myIranSansMedium text-gray-800">دسترسی سریع</h4>
            <ul className="text-gray-600 text-sm space-y-1 font-myIranSansFaNumRegular">
              <li><Link to="/restaurants" className="hover:text-lootka-green">خورد و خوراک</Link></li>
              <li><Link to="/attractions" className="hover:text-lootka-green">جاهای دیدنی</Link></li>
              <li><Link to="/hostels" className="hover:text-lootka-green">اقامتگاه</Link></li>
              <li><Link to="/addForm" className="hover:text-lootka-green">ثبت مکان جدید</Link></li>
            </ul>
          </div>

          {/* Contact / Language */}
          <div className="flex-1 space-y-2">
            <h4 className="font-myIranSansMedium text-gray-800">ارتباط با ما</h4>
            <ul className="text-gray-600 text-sm space-y-1 font-myIranSansFaNumRegular">
              <li>ایمیل: lootka.info@gmail.com</li>
              <li>تلفن: ۰۱۳-۳۲۲۲۲۲۲۲</li>
              <li>
                <button className="text-gray-600 hover:text-gray-900 flex flex-row items-center  desktop:text-base tablet:text-base text-sm" onClick={() => navigate("/aboutUs")}>
                  درباره ما
                </button>
              </li>
              {/* Social Media */}
              <div className="flex flex-row items-center justify-start gap-4 pt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-pink-600 transition-colors"
                >
                  <img src={faInstagram} alt="" />
                </a>
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <img src={faLinkedin} alt="" />
                </a>

              </div>
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
