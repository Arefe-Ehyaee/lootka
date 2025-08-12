import hammizLogo from "../assets/icons/Onboarding-logo.svg";
import hammiz from "../assets/icons/Logotype.svg";
import SubmitButton from "../SharedComponents/SubmitButton";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100">
      <div className="relative w-[393px] h-[852px] overflow-hidden bg-[#F87A08] shadow-xl">
        <div className="flex flex-col items-center text-center px-6">
          <img src={hammizLogo} alt="hammizLogo" className="mt-[182px] h-[226px] w-[226px]" />
          <img src={hammiz} alt="hammiz" className="mx-auto mt-[39px] h-[94px] w-[178px]" />
          <p className="mt-[64px] flex items-center text-white text-[18px] mb-[112px] h-[53px] font-myDanaRegular">
            با همممیز، میز و غذاهای دلخواهتو هماهنگ کن
          </p>
          <SubmitButton
            text={"آغاز"}
            className={"bg-white text-[#F87A08] mb-[32px] mx-auto"}
            handleOnClick={() => navigate("/branches")}
          ></SubmitButton>
        </div>
      </div>
    </div>
  );
}