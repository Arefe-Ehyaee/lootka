import MapComponentTest from "../SharedComponents/MapComponentTest";
import MapComponent from "../SharedComponents/MapComponent";

import SubmitButton from "../SharedComponents/SubmitButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BranchesMap() {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);

  useEffect(()=>{
    console.log(selectedBranch)
  })

    const handleSearch = (query: string) => {
      fetch(`/hammiz/${query}`)
        .then((res) => res.json())
        .then((data) => {
          navigate("/hammizData", { state: { branch: data } });
        })
        .catch((error) => {
          console.error("Error fetching branch data:", error);
        });
    };

    const handleSubmit = () => {
      if (!selectedBranch) {
        alert("لطفاً یک شعبه انتخاب کنید");
        return;
      }
    
      fetch(`http://localhost:3001/hammiz/${selectedBranch}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // optional, can be removed for GET
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Response from server:", data);
          localStorage.setItem("selectedBranch", JSON.stringify(data));
          navigate("/hammizData", { state: { branch: data } });
        })
        .catch((err) => {
          console.error("Failed to send selected branch:", err);
          alert("مشکلی در ارتباط با سرور پیش آمده است.");
        });
    };
    
    

    
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <MapComponentTest  />
      <div className="absolute top-[74px] left-1/2 transform -translate-x-1/2 z-10">

      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 w-full items-center flex flex-col">
        <SubmitButton handleOnClick={handleSubmit} text={"برگزیدن"} className={`${selectedBranch ? " bg-[#F87A08] text-white mx-auto" : "bg-[#999999] text-white"}`}  />
      </div>
    </div>
  );
}
