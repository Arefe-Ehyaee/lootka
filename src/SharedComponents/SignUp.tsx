import Box from "./BoxComponent";
import InputField from "./TextInputComponent";
import UserSvg from "../assets/icons/user.svg";
import PhoneSvg from "../assets/icons/gmail.svg"; // maybe rename later if it's phone icon
import keySvg from "../assets/icons/key.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import lootka from "../assets/images/logo-removebg-preview.png";
import { ReactComponent as Close } from "../assets/icons/x-circle.svg";

import useUserStore from "../store/userStore";
import { signupUser } from "../services/authService";

// ✅ Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterChoise from "./RegisterChoise";

// ✅ Schema
const signupSchema = z.object({
  username: z
    .string({ required_error: "نام کاربری برای ثبت نام لازمه!" })
    .min(3, { message: "نام کاربری باید حداقل 3 کاراکتر باشد" })
    .max(30, { message: "نام کاربری باید حداکثر 30 کاراکتر باشد" })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "نام کاربری فقط باید شامل حروف بزرگ و کوچک و اعداد باشد",
    })
    .refine((s) => !s.includes(" "), {
      message: "نام کاربری نباید شامل فاصله باشد",
    }),

  fullname: z
    .string({ required_error: "نام کامل برای ثبت نام لازمه!" })
    .min(3, { message: "نام کامل باید حداقل 3 کاراکتر باشد" })
    .max(50, { message: "نام کامل نباید بیشتر از 50 کاراکتر باشد" })
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, {
      message: "نام کامل فقط باید شامل حروف فارسی یا انگلیسی باشد",
    }),

  phone: z
    .string({ required_error: "شماره تلفن برای ثبت نام لازمه!" })
    .max(15, { message: "شماره تلفن نباید بیشتر از 15 رقم باشد" })
    .regex(/^(\+98|0)?9\d{9}$/, { message: "شماره تلفن معتبر نیست" }),

  password: z
    .string({ required_error: "رمز عبور برای ثبت نام لازمه!" })
    .min(8, { message: "رمز عبور باید حداقل 8 کاراکتر باشد" })
    .max(50, { message: "رمز عبور باید حداکثر 50 کاراکتر باشد" })
    .regex(/[A-Z]/, { message: "رمز عبور باید شامل حداقل یک حرف بزرگ باشد" })
    .regex(/[a-z]/, { message: "رمز عبور باید شامل حداقل یک حرف کوچک باشد" })
    .regex(/[0-9]/, { message: "رمز عبور باید شامل حداقل یک عدد باشد" }),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignUpProps {
  onClose?: () => void;
  switchToLogin?: () => void;
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

  const setUser = useUserStore((state) => state.setUser);
  const loading = useUserStore((state) => state.loading);
  const setLoading = useUserStore((state) => state.setLoading);

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);

      const result = await signupUser({
        username: data.username,
        email: `${data.phone}@example.com`,
        full_name: data.fullname,
        password: data.password,
      });

      setUser(
        { userId: result.user_id, username: result.username },
        result.token ?? ""
      );

      // ✅ Show success toast
      toast.success("ثبت نام با موفقیت انجام شد! لطفا وارد شوید.");

      // ✅ Switch to login after short delay
      setTimeout(() => {
        if (switchToLogin) switchToLogin();
      }, 1500);
    } catch (error: any) {
      toast.error(error.message || "خطایی رخ داد!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box heightClass="h-[500px] relative p-2">
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 left-6 z-50 text-gray-700 hover:text-gray-500 text-2xl font-myIranSansFaNumBold"
        aria-label="Close"
      >
        <Close />
      </button>

      <img src={lootka} alt="lootka" className="absolute top-2 w-[50%]" />
      <RegisterChoise switchToLogin={switchToLogin} active="signup" />

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
          iconsrc={PhoneSvg}
          error={errors.phone?.message}
          register={register}
        />
        <InputField
          type="text"
          placeholder="نام و نام خانوادگی"
          name="fullname"
          iconsrc={UserSvg}
          error={errors.fullname?.message}
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

        <CustomButton
          text={loading ? "در حال ثبت نام..." : "ثبت نام"}
          className="mt-0 bg-[#4D93A5] text-white w-full rounded-lg justify-center text-sm font-myYekanMedium disabled:opacity-50"
        />
      </form>
    </Box>
  );
};

export default SignUp;
