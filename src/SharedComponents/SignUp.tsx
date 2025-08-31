import Box from "./BoxComponent";
import EnterSignup from "./EnterSignup";
import InputField from "./TextInputComponent";
import UserSvg from "../assets/icons/user.svg";
import GmailSvg from "../assets/icons/gmail.svg";
import keySvg from "../assets/icons/key.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import lootka from "../assets/images/logo-removebg-preview.png";
import { ReactComponent as Close } from "../assets/icons/x-circle.svg";

const signupSchema = z
  .object({
    username: z
      .string({ required_error: "نام کاربری برای ثبت نام لازمه!" })
      .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" })
      .max(30, { message: "نام کاربری باید حداکثر 30 کاراکتر باشد" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "نام کاربری فقط باید شامل حروف بزرگ و کوچک و اعداد باشد" })
      .refine(s => !s.includes(' '), { message: "نام کاربری نباید شامل فاصله باشد" }),
    phone: z
      .string({ required_error: "شماره تلفن برای ثبت نام لازمه!" })
      .max(15, { message: "شماره تلفن نباید بیشتر از 15 رقم باشد" })
      .regex(/^(\+98|0)?9\d{9}$/, { message: "شماره تلفن معتبر نیست" }),

    password: z
      .string({ required_error: "رمز عبور برای ثبت نام لازمه!" })
      .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" })
      .max(50, { message: "نام کاربری باید حداکثر 50 کاراکتر باشد" })
      .regex(/[A-Z]/, { message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" })
      .regex(/[a-z]/, { message: "رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
      .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
    repeatpassword: z
      .string({ required_error: "تکرار رمز عبور مورد نیاز است" })
  })
  .superRefine(({ repeatpassword, password }, ctx) => {
    if (repeatpassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "پسورد‌ها باید یکسان باشند",
        path: ["repeatpassword"],
      });
    }
  });

  interface SignUpProps {
    onClose?: () => void;
    switchToLogin?: () => void;
  }

interface SignupFormData {
  username: string;
  phone: string;
  password: string;
  repeatpassword: string;
}

const SignUp = ({ onClose, switchToLogin }: SignUpProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: SignupFormData) => {

  };
 return (
    <Box heightClass="h-[500px] relative p-4">
      {/* Close Button */}

  <button
    onClick={onClose}
    className="absolute top-6 left-6 z-50 text-gray-700 hover:text-gray-500 text-2xl font-myIranSansFaNumBold"
    aria-label="Close"
  >
 <Close></Close>
  </button>



      <img src={lootka} alt="lootka" className="absolute top-2 w-[50%]" />
      <EnterSignup switchToLogin={switchToLogin} />


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[34%] flex flex-col items-center"
      >
        <InputField
          type="text"
          placeholder="نام کاربری"
          name="username"
          iconsrc={UserSvg}
          error={errors.username?.message}
          register={register}
        />
        <InputField
          type="text"
          placeholder="شماره موبایل"
          name="phone"
          iconsrc={GmailSvg}
          error={errors.phone?.message}
          register={register}
        />
        <InputField
          type="password"
          placeholder="رمز عبور"
          name="password"
          iconsrc={keySvg}
          error={errors.password?.message}
          register={register}
        />
        {/* <InputField
          type="password"
          placeholder="تکرار رمز عبور"
          name="repeatpassword"
          iconsrc={keySvg}
          error={errors.repeatpassword?.message}
          register={register}
        /> */}
        <CustomButton
          text="ثبت نام"
          className="mt-6 bg-[#4D93A5] text-white w-[50%] justify-center text-sm font-myYekanMedium"
        />
      </form>
    </Box>
  );
};

export default SignUp;