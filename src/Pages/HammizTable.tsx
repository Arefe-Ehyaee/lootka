import logo from "../assets/icons/Group 60 (1).svg";
import back from "../assets/icons/Back-icon.svg";
import shopping from "../assets/icons/Shopping-icon.svg";
import SubmitButton from "../SharedComponents/SubmitButton";
import price from "../assets/icons/chairpriceicon.svg";
import plane from "../assets/images/687aefef9e5f57ac3bfc5bebd37b77b0@2x.png";
import tour from "../assets/icons/Group 266.svg";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import table2Image from "../assets/images/tableimage.png";

export type TableStatus = 'available' | 'temporaryReserved' | 'reserved';

export default function HammizTable() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectionData = location.state;
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [tablesStatus, setTablesStatus] = useState<Record<number, TableStatus>>({});
  const [showPopup, setShowPopup] = useState(false);

  const branch = selectionData?.branch || JSON.parse(localStorage.getItem("selectedBranch") || "null");

  interface TableImagesType {
    [key: number]: string;
  }

  const tableImages: TableImagesType = {
    1: "../assets/images/table1.png",
    2: table2Image,
    3: "../assets/images/table3.png",
    4: "../assets/images/table4.png",
    5: "../assets/images/table5.png",
    6: "../assets/images/table6.png",
    7: "../assets/images/table7.png",
    8: "../assets/images/table8.png",
    9: "../assets/images/table9.png",
    10: "../assets/images/table10.png",
    11: "../assets/images/table11.png",
    12: "../assets/images/table12.png",
    13: "../assets/images/table13.png",
    14: "../assets/images/table14.png",
  };

  const getTableImagePath = (tableNumber: number): string => {
    return tableImages[tableNumber] || "";
  };

  const handleTableSelect = (tableNumber: number) => {
    console.log(tableNumber);
    setSelectedTable(tableNumber);
  };

  const handleCloseTableView = () => {
    setSelectedTable(null);
  };

  useEffect(() => {
    console.log(selectionData);
  }, [selectionData]);

  const handleSubmitTable = () => {
    if (selectedTable) {
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="relative w-[393px] h-[852px] overflow-hidden bg-white shadow-xl">
        <div className="flex flex-col items-center text-center px-6 pt-[82px]">
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


            <p className="text-[#525252] font-myDanaDemiBold text-[16px] text-right mb-[8px]">
              ساعت و روز دلخواهت رو هماهنگ کن:
            </p>

            <div className="flex flex-row mb-[12px] gap-[5px]">
              <img src={price} alt="price" />
              <p className="text-[#525252] font-myDanaFaNumRegular text-[14px]">
                هزینه اجاره هر صندلی: 30 هزارتومان
              </p>
            </div>

            <div className="relative">
              <div
                className={`transition-all duration-300 ${selectedTable ? 'blur-sm' : ''}`}
                onClick={selectedTable ? handleCloseTableView : undefined}
              >
                <img
                  src={plane}
                  alt="plane"
                  className="w-[344px] h-[344px] rounded-[34px] mb-[16px]"
                />

                <button className="flex flex-row items-center absolute bottom-0 border border-[#F87A08] left-0 w-[147.427px] h-[38px] bg-[#FFFFFFEB] rounded-tr-[34px] rounded-bl-[34px] m-[1px] mx-[2px]">
                  <img src={tour} alt="tour" className="mr-[12px] ml-[4px]" />
                  <p className="text-[#525252] text-[12px] font-myDanaRegular">تور مجازی رستوران</p>
                </button>
              </div>

              {selectedTable && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                  <img
                    src={getTableImagePath(selectedTable)}
                    alt={`Table ${selectedTable}`}
                    className="w-[180px] h-[180px] rounded-[20px] object-cover pointer-events-auto"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-row justify-between font-myDanaRegular text-[12px] text-[#525252]">
              <div className="flex flex-row items-center gap-[6.48px]">
                <p className="w-[14px] h-[14px] bg-[#57A433] rounded-full"></p>
                <p>آزاد</p>
              </div>

              <div className="flex flex-row items-center gap-[6.48px]">
                <p className="w-[14px] h-[14px] bg-[#FAC438] rounded-full"></p>
                <p>هماهنگ موقت</p>
              </div>

              <div className="flex flex-row items-center gap-[6.48px]">
                <p className="w-[14px] h-[14px] bg-[#CE0A0A] rounded-full"></p>
                <p>هماهنگ شده</p>
              </div>
            </div>

            <div className="flex flex-row gap-[12px]">
              <SubmitButton
                text={"برگزیدن"}
                className="w-[166.5px] bg-[#F87A08] text-white mt-[48px]"
                handleOnClick={handleSubmitTable}
              />
              <SubmitButton
                text={"رد کردن"}
                className="w-[166.5px] bg-white border border-[2px] border-[#F87A08] text-[#F87A08] mt-[48px]"
              />
            </div>
          </div>
        </div>

        {/* Pop-up that slides from bottom */}
        <div 
          className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg p-6 transition-transform duration-300 ease-in-out transform ${
            showPopup ? 'translate-y-0' : 'translate-y-full'
          }`}
          style={{ 
            maxWidth: '393px', 
            margin: '0 auto',
            zIndex: 50,
            height: '60%' 
          }}
        >
          <div className="flex flex-col items-center">
            <div className="w-16 h-1 bg-gray-300 rounded-full mb-6"></div>
            
            <h2 className="text-xl font-myDanaDemiBold text-[#525252] mb-4">
              تایید انتخاب میز
            </h2>
            
            {selectedTable && (
              <div className="my-6">
                <img
                  src={getTableImagePath(selectedTable)}
                  alt={`Table ${selectedTable}`}
                  className="w-[240px] h-[240px] rounded-[20px] object-cover mx-auto"
                />
                <p className="text-center mt-4 text-lg font-myDanaRegular text-[#525252]">
                  میز شماره {selectedTable}
                </p>
              </div>
            )}
            
            <div className="flex w-full gap-4 mt-8">
              <SubmitButton
                text={"تایید"}
                className="flex-1 bg-[#F87A08] text-white py-3"
                handleOnClick={() => {
                  // Handle confirmation here
                  console.log("Table confirmed:", selectedTable);
                  handleClosePopup();
                }}
              />
              <SubmitButton
                text={"انصراف"}
                className="flex-1 bg-white border border-[2px] border-[#F87A08] text-[#F87A08] py-3"
                handleOnClick={handleClosePopup}
              />
            </div>
          </div>
        </div>
        
        {/* Overlay for when popup is active */}
        {showPopup && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            style={{ maxWidth: '393px', margin: '0 auto' }}
            onClick={handleClosePopup}
          ></div>
        )}
      </div>
    </div>
  );
}