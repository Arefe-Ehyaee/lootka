interface AICommentProps {
  text: string;
}

const AIComment = ({ text }: AICommentProps) => {
  return (

    <div>
              <h4 className="text-xl font-myIranSansMedium">خلاصه نظرات و پیشنهادات کاربران</h4>
        {/* <h5 className="text-sm text-gray-500">تولید شده با هوش مصنوعی</h5> */}
      <div className=' h-[300px] w-full rounded-lg border border-gray-200 p-4 mt-2 text-justify text-base
        '>

        {text}
      </div>
    </div>


  );
};

export default AIComment;
