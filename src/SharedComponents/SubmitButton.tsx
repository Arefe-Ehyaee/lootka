interface SubmitButtonProps {
  text: string;
  className: string;
  handleOnClick?: () => void;
}

export default function SubmitButton({
  text,
  className,
  handleOnClick,
}: SubmitButtonProps) {
  return (
    <button
      onClick={handleOnClick}
      className={`w-full max-w-[345px] py-[0px] h-[50px] rounded-[50px] text-[18px] font-myDanaDemiBold ${className}`}
    >
      <p className="h-[32px]">{text}</p>
    </button>
  );
}
