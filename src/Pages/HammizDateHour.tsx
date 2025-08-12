import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/icons/Group 60 (1).svg";
import back from "../assets/icons/Back-icon.svg";
import shopping from "../assets/icons/Shopping-icon.svg";
import SubmitButton from "../SharedComponents/SubmitButton";

export default function HammizDateHour() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectionData = location.state;
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    start: '۱۲:۰۰',
    end: '۱۴:۰۰'
  });
  
const [selectedDateRange, setSelectedDateRange] = useState({
  selectedDate: null,
  selectedValue: null,
  gregorianISOString: null
});

const branch = selectionData?.branch || JSON.parse(localStorage.getItem("selectedBranch") || "null");

  // Function to handle time range changes
  const handleTimeRangeChange = (range: any) => {
    setSelectedTimeRange(range);
  };

  // Function to handle date range changes
  const handleDateRangeChange = (dateInfo: any) => {
    setSelectedDateRange(dateInfo);
  };

  // Function to handle the form submission
  const handleSubmit = () => {
    // Create an object with all the selection data
    const selectionData = {
      timeRange: selectedTimeRange,
      dateRange: selectedDateRange
    };
    
    // Navigate to the next page with the selection data
    navigate('/hammizTable', { state: selectionData });
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="relative w-full min-h-screen overflow-hidden bg-white shadow-xl">
        <div className="flex flex-col items-center text-center px-6 pt-0 xs:pt-[5px] sm:pt-[10px] md:pt-[82px] desktopL:pt-[50px]">
          <div className="w-full max-w-[345px]">
            <div className="flex flex-row items-start justify-between">
              <button>
                <img src={back} alt="backIcon" />
              </button>

              <div className="flex flex-col items-center">
                <img
                  src={logo}
                  alt="hammizLogo"
                  className="h-[54.28125px] w-[54.28125px]"
                />
                <p className="text-[#525252] text-[16px] leading-[32px] font-myDanaDemiBold">
                {branch.name}
                </p>
              </div>

              <button>
                <img src={shopping} alt="shoppingIcon" />
              </button>
            </div>


            <SubmitButton
              text={"برگزیدن"}
              className="bg-[#F87A08] text-white mt-[48px] md:mt-[48px] sm:mt-[10px] desktopL:mt-[50px]"
              handleOnClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}