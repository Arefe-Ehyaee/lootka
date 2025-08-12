interface EnterSignupProps {
    switchToSignup?: () => void;
    switchToLogin?: () => void;
  }
  
  export default function EnterSignup({ switchToSignup, switchToLogin }: EnterSignupProps) {
    return (
      <div className="flex gap-x-10 absolute top-36 text-xl">
        <button onClick={switchToSignup} className="text-lootka-darkGreen hover:text-lootka-lightGreen">ثبت نام</button>
        <span className="block w-px h-8  bg-lootka-darkGreen"></span>
        <button onClick={switchToLogin} className="text-lootka-darkGreen hover:text-lootka-lightGreen">ورود</button>
      </div>
    );
  }
  