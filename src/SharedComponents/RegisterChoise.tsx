interface RegisterChoiseProps {
  switchToSignup?: () => void;
  switchToLogin?: () => void;
  active?: "signup" | "login"; // prop برای مشخص کردن حالت فعال
}

export default function RegisterChoise({
  switchToSignup,
  switchToLogin,
  active,
}: RegisterChoiseProps) {
  return (
    <div className="flex gap-1 absolute top-32 text-base font-myYekanMedium bg-gray-100 rounded-lg px-1 py-1 w-[40%]">
      <button
        onClick={switchToSignup}
        className={`px-1 py-1 rounded-lg w-full transition ${
          active === "signup"
            ? "bg-white text-black"
            : "bg-transparent text-black hover:text-[#4D93A5]"
        }`}
      >
        ثبت نام
      </button>

      <button
        onClick={switchToLogin}
        className={`px-1 py-1 rounded-lg w-full transition ${
          active === "login"
            ? "bg-white text-black"
            : "bg-transparent text-black hover:text-[#4D93A5]"
        }`}
      >
        ورود
      </button>
    </div>
  );
}
