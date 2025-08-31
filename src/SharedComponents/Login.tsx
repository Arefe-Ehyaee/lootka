import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "./TextInputComponent";
import Box from "./BoxComponent";
import EnterSignup from "./EnterSignup";
import { NavLink, useNavigate } from "react-router-dom";
import UserSvg from "../assets/icons/user.svg";
import keySvg from "../assets/icons/key.svg";
import CustomButton from "./CustomButton";
import lootka from "../assets/images/logo-removebg-preview.png";
import { ReactComponent as Close } from "../assets/icons/x-circle.svg";

const loginSchema = z.object({
  phone: z
    .string({ required_error: "شماره تلفن برای ثبت نام لازمه!" })
    .max(15, { message: "شماره تلفن نباید بیشتر از 15 رقم باشد" })
    .regex(/^(\+98|0)?9\d{9}$/, { message: "شماره تلفن معتبر نیست" }),

  password: z
    .string({ required_error: "رمز عبور مورد نیاز است" })
    .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" })
    .max(50, { message: "نام کاربری باید حداکثر 50 کاراکتر باشد" })
    .regex(/[A-Z]/, { message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" })
    .regex(/[a-z]/, { message: "رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
    .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
});

interface LoginFormData {
  phone: string;
  password: string;
}

interface LoginProps {
  onClose?: () => void;
  switchToSignup?: () => void;
}

const Login = ({ onClose, switchToSignup }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const onSubmit = async (data: LoginFormData) => {

  };

  return (
    <Box heightClass="h-[500px] p-4">

      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-50 text-gray-700 hover:text-gray-500 text-2xl font-myIranSansFaNumBold"
        aria-label="Close"
      >
        <Close></Close>
      </button>
      <img src={lootka} alt="lootka" className="absolute top-2 w-[50%]" />
      <EnterSignup switchToSignup={switchToSignup} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[12%] flex flex-col items-center"
      >
        <InputField
          type="text"
          placeholder="شماره موبایل"
          error={errors.phone?.message}
          register={register}
          name="phone"
          iconsrc={UserSvg}
        />
        <InputField
          type="password"
          placeholder="رمز عبور"
          error={errors.password?.message}
          register={register}
          name="password"
          iconsrc={keySvg}
        />
        {/* <RememberMe /> */}
        <CustomButton
          text="ورود به لوتکا"
          className="mt-4 bg-[#4D93A5] text-white text-sm w-[50%] justify-center font-myYekanMedium"
        ></CustomButton>
        <div className="flex flex-col gap-4 absolute bottom-8 mx-auto ">
          <button
            type="button"
            onClick={switchToSignup}
            className="mt-2 text-sm text-lootka-darkGreen hover:text-lootka-lightGreen font-myYekanRegular"
          >
            فراموشی رمز عبور
          </button>

          <button
            type="button"
            onClick={switchToSignup}
            className="mt-2 text-sm text-lootka-darkGreen hover:text-lootka-lightGreen font-myYekanRegular"
          >
            حساب کاربری ندارید؟ ثبت‌نام کنید
          </button>

        </div>
      </form>
    </Box>

  );
};

export default Login;
