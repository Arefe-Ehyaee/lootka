import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import heroAboutUs from '../assets/images/photo_2025-05-18_17-27-08.jpg';
import balloon from "../assets/icons/hot-air-balloon.svg.svg";
import umb from "../assets/icons/div.featureCard__icon.svg";
import journey from "../assets/images/Group 2085663018.svg";
import lamp from "../assets/icons/Lamp - Iconly Pro.svg";
import medal from "../assets/icons/medal.svg.svg"
import { useNavigate } from 'react-router-dom';

const FormLanding: React.FC = () => {
        const navigate = useNavigate();
    return (
        <div className="min-h-screen min-w-screen font-myIranSansMedium bg-white text-gray-900 font-myIranSansFaNumRegular">
            <Navbar />

            <div className='flex flex-row gap-2 justify-center items-center my-[250px]'>
                <button className='w-[100px] h-[60px] border rounded-lg bg-blue-100 hover:bg-blue-200'  onClick={() => navigate("/addPlace")}>
                    رستواران
                </button>

                <button className='w-[100px] h-[60px] border rounded-lg bg-blue-100 hover:bg-blue-200' onClick={() => navigate("/addHostel")}>
                    اقامتگاه
                </button>
                                <button className='w-[100px] h-[60px] border rounded-lg bg-blue-100 hover:bg-blue-200' onClick={() => navigate("/addAttraction")}>
                    جای دیدنی
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default FormLanding;
