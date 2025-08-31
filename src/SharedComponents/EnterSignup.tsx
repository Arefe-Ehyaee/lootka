interface EnterSignupProps {
    switchToSignup?: () => void;
    switchToLogin?: () => void;
  }
  
  export default function EnterSignup({ switchToSignup, switchToLogin }: EnterSignupProps) {
    return (
      <div className="flex gap-x-8 absolute top-32 text-base font-myYekanMedium">
        <button onClick={switchToSignup} className="text-lootka-darkGreen hover:text-[#4D93A5]/80">ثبت نام</button>
        <span className="block w-px h-8  bg-black/10"></span>
        <button onClick={switchToLogin} className="text-lootka-darkGreen hover:text-[#4D93A5]/80">ورود</button>
      </div>
    );
  }
  