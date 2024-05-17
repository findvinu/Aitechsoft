// StepperComponent.js
import React, { useState } from "react";
import { Stepper, Step, StepLabel, Button } from "@mui/material";
import ProductDetailsForm from "./ProductDetailsForm";
import RemarksForm from "./RemarksForm";
import HeaderDetailsForm from "./HeaderDetailsForm";

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Product Details", "Remarks", "Header & Details"];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <ProductDetailsForm />;
      case 1:
        return <RemarksForm />;
      case 2:
        return <HeaderDetailsForm />;
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <p>All steps completed</p>
          </div>
        ) : (
          <div>
            <div>{getStepContent(activeStep)}</div>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepperComponent;
