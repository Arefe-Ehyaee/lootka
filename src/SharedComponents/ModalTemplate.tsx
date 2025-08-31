import React, { JSX } from "react";

interface ModalTemplateProps {
  showModal: boolean;
  onClose?: () => void;
  className?: string;
  mainComponent?: JSX.Element;
  children?:React.ReactNode
}

const ModalTemplate = ({
  showModal,
  onClose,
  mainComponent,
  children
}: ModalTemplateProps) => {
  return (
    <div   
      className={`fixed inset-0 z-50 flex items-center justify-center 
      ${showModal ? "visible bg-black-100/40 backdrop-blur-sm" : "invisible"}`}
      onClick={onClose}
    >
      <div
        className="flex flex-col items-center justify-center rounded-3xl border-grey-400 bg-grey-100 px-[35px] py-16"
        onClick={(e) => e.stopPropagation()} 
      >
        {mainComponent}
        {children}
      </div>
    </div>
  );
};

export default ModalTemplate;
