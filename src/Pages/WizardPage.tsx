import React, { useState } from 'react';
import Navbar from '../SharedComponents/Navbar';
import Footer from '../SharedComponents/Footer';
import VerticalStepper from '../SharedComponents/wizard/VerticalStepper';
import StepOne from '../SharedComponents/wizard/StepOne';
import StepThree from '../SharedComponents/wizard/StepThree';
import StepFour from '../SharedComponents/wizard/StepFour';
import StepFive from '../SharedComponents/wizard/StepFive';
import StepSix from '../SharedComponents/wizard/StepSix';
import StepSeven from '../SharedComponents/wizard/StepSeven';
import StepEight from '../SharedComponents/wizard/StepEight';
import GetPlan from '../SharedComponents/wizard/GetPlan';
// Import other steps when you create them (e.g., StepFour, StepFive, etc.)

const WizardPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(1);

    const handleNext = () => {
        setCurrentStep(prev => Math.min(prev + 1, 8));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleStepClick = (stepId: number) => {
        setCurrentStep(stepId);
    };

    const renderStepComponent = () => {
        switch (currentStep) {
            case 1:
                return <StepOne onNext={handleNext} />;
            case 2:
                return <StepThree onNext={handleNext} onBack={handleBack} />;
            case 3:
                return <StepFour onNext={handleNext} onBack={handleBack} />;
            case 4: return <StepFive onNext={handleNext} onBack={handleBack} />;
            case 5: return <StepSix onNext={handleNext} onBack={handleBack} />;
            case 6: return <StepSeven onNext={handleNext} onBack={handleBack} />;
            case 7: return <StepEight onNext={handleNext} onBack={handleBack} />;
            case 8: return <GetPlan  />;

            default:
                return <div>پایان مراحل</div>;
        }
    };

    return (
<div className="min-h-screen flex flex-col">
  <Navbar />

  <div className="flex flex-1 flex-row overflow-hidden">
    {/* Side Panel */}
    <div className="min-w-[210px] max-w-[250px] overflow-y-auto px-4">
      <VerticalStepper currentStep={currentStep} onStepClick={handleStepClick} />
    </div>

    {/* Main Content */}
    <div className="flex-grow overflow-y-auto px-1">
      {renderStepComponent()}
    </div>
  </div>

  <Footer />
</div>

    );
};

export default WizardPage;
