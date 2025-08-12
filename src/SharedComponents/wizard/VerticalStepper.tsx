import React from 'react';

interface Step {
    id: number;
    label: string;
}

interface VerticalStepperProps {
    currentStep: number;
    onStepClick: (stepId: number) => void;
}
 
const steps: Step[] = [
    { id: 1, label: 'مقصد سفر' },
    { id: 2, label: 'وسیله سفر' },
    { id: 3, label: 'تقویم سفر' },
    { id: 4, label: 'همراهان سفر' },
    { id: 5, label: 'علاقه‌مندی‌ها' },
    { id: 6, label: 'بودجه سفر' },
    { id: 7, label: 'نوع اقامتگاه' }
];

const VerticalStepper: React.FC<VerticalStepperProps> = ({ currentStep, onStepClick }) => {
    return (
        <div className="flex flex-col pr-12 mt-20 font-myIranSansFaNumMedium text-base" dir="rtl">
            <div className="relative flex flex-col items-start">
                {steps.map((step, index) => {
                    const isCompleted = step.id < currentStep;
                    const isCurrent = step.id === currentStep;

                    return (
                        <div key={step.id} className="relative flex items-center mb-10 last:mb-0">
                            {/* Vertical Line */}
                            {index < steps.length - 1 && (
                                <div className="absolute right-[13px] top-[30px] w-0.5 h-10 bg-gray-300 z-0" />
                            )}

                            {/* Step Circle */}
                            <button
                                onClick={() => onStepClick(step.id)}
                                className={`
    relative z-10 w-[29.47px] h-[29.47px] rounded-full flex items-center justify-center
    font-myIranSansFaNumBold text-sm transition-all duration-200 hover:scale-105
    ${isCompleted ? 'bg-[#648A33] text-white shadow-md'
                                        : isCurrent ? 'bg-[#648A33] text-white shadow-lg'
                                            : 'bg-gray-300 text-gray-700 hover:bg-gray-400'}
  `}
                            >
                                {isCompleted ? '✔' : step.id}
                            </button>

                            {/* Step Label */}
                            <div className="mr-4" onClick={() => onStepClick(step.id)}
                            >
                                <span
                                    className={`text-base cursor-pointer font-medium transition-colors duration-150
                    ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-500'}`}

                                >
                                    {step.label}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default VerticalStepper;
