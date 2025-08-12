import React from "react";
import logo from "../assets/icons/Group 60 (1).svg";
import back from "../assets/icons/Back-icon.svg";
import shopping from "../assets/icons/Shopping-icon.svg";
import locationIcon from "../assets/icons/Location.svg";
import rate from "../assets/icons/Star.svg";
import metro from "../assets/icons/metroicon.svg";
import time from "../assets/icons/openingicon.svg";
import parking from "../assets/icons/Parking.svg";
import phone from "../assets/icons/phoneicon.svg";
import restaurant from "../assets/images/hammmizimage.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function HammizData() {
  const location = useLocation();
  const navigate = useNavigate();

  const branch = location.state?.branch || JSON.parse(localStorage.getItem("selectedBranch") || "null");

  if (!branch) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4 font-myDanaDemiBold text-base">
        <p>این شعبه پیدا نشد</p>
        <p>لطفا دوباره جستجو کنید</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-[#F87A08] text-white rounded"
        >
          بازگشت
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="relative w-full max-w-md min-h-screen overflow-hidden bg-white shadow-xl">
        <div className="flex flex-col items-center text-center px-4 sm:px-6 pt-16 sm:pt-20 pb-[75px]">
          <div className="w-full max-w-sm">
            <div className="flex flex-row items-start justify-between mb-4">
              <button onClick={() => navigate("/branches")} className="p-2">
                <img src={back} alt="backIcon" />
              </button>

              <div className="flex flex-col items-center">
                <img
                  src={logo}
                  alt="hammizLogo"
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
                <p className="text-[#525252] text-sm sm:text-base leading-tight sm:leading-normal font-myDanaDemiBold mt-1">
                  {branch.name}
                </p>
              </div>

              <button className="p-2">
                <img src={shopping} alt="shoppingIcon" />
              </button>
            </div>





            <div className="flex flex-col text-[#525252] text-xs sm:text-sm font-myDanaFaNumRegular mt-6" dir="rtl">
              <div className="flex flex-row items-start justify-between w-full">
                <div className="flex flex-row items-start gap-1 sm:gap-2 flex-1">
                  <img src={locationIcon} alt="location" className="w-4 h-4 sm:w-5 sm:h-5 mt-1" />
                  <p className="text-right text-xs sm:text-sm">
                    {branch.attributes.address}
                  </p>
                </div>

                <div className="flex flex-row items-center gap-1 whitespace-nowrap ml-2">
                  <p>4.6</p>
                  <img src={rate} alt="rate" className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              <div className="flex flex-row mt-3 sm:mt-4 justify-between">
                <div className="flex flex-row items-center gap-1 sm:gap-2">
                  <img src={metro} alt="metro" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-xs sm:text-sm">{branch.attributes.metro_distance}</p>
                </div>
                <div className="flex flex-row items-center gap-1 sm:gap-2">
                  <img src={time} alt="time" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-right text-xs sm:text-sm">{branch.attributes.working_hours}</p>
                </div>
              </div>

              <div className="flex flex-row mt-3 sm:mt-4 justify-between">
                <div className="flex flex-row items-center gap-1 sm:gap-2">
                  <img src={parking} alt="parking" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-xs sm:text-sm">{branch.attributes.parking_distance}</p>
                </div>
                <div className="flex flex-row items-center gap-1 sm:gap-2">
                  <img src={phone} alt="phone" className="w-4 h-4 sm:w-5 sm:h-5" />
                  <p className="text-xs sm:text-sm">{branch.attributes.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 px-2 sm:px-0">
              <img
                src={restaurant}
                alt="restaurant"
                className="rounded-3xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}