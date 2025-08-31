interface BoxProps {
  heightClass: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ heightClass, children }) => {
  return (
    <div
      className={`relative desktop:w-[440px] w-[340px] bg-white ${heightClass} box-style shadow-main border rounded-3xl px-0 flex flex-row items-center justify-center`}
    >
      {children}
    </div>
  );
};

export default Box;