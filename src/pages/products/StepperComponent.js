import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";
import ProductDetailsForm from "./ProductDetailsForm";
import RemarksForm from "./RemarksForm";
import HeaderDetailsForm from "./HeaderDetailsForm";
import { ButtonComponent as Button } from "../../components/";
import { useDispatch, useSelector } from "react-redux";
import { addRow, updateRow } from "../../store/slices/gridSlice";
import moment from "moment";

const StepperComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [productDetails, setProductDetails] = useState({
    productName: "",
    salesCount: "",
    saleMonth: "",
    saleYear: "",
  });
  const [errors, setErrors] = useState({
    productName: false,
    salesCount: false,
    saleMonth: false,
    saleYear: false,
  });
  const [remarks, setRemarks] = useState("");
  const dispatch = useDispatch();
  const gridData = useSelector((state) => state.grid.data);

  const steps = ["Product Details", "Remarks", "Header & Details"];

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      productName: false,
      salesCount: false,
      saleMonth: false,
      saleYear: false,
    };

    if (productDetails.productName.trim() === "") {
      newErrors.productName = true;
      valid = false;
    }
    if (
      productDetails.salesCount.trim() === "" ||
      isNaN(productDetails.salesCount)
    ) {
      newErrors.salesCount = true;
      valid = false;
    }
    if (productDetails.saleMonth.trim() === "") {
      newErrors.saleMonth = true;
      valid = false;
    }
    if (
      productDetails.saleYear.trim() === "" ||
      isNaN(productDetails.saleYear)
    ) {
      newErrors.saleYear = true;
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (activeStep === 0 && !validateFields()) {
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSaveAndClose = () => {
    const newRow = {
      product_id: gridData.length + 1,
      product_name: productDetails.productName,
      sales_count: productDetails.salesCount,
      sale_month: productDetails.saleMonth,
      sale_year: productDetails.saleYear,
      modified_date: moment().format("DD/MM/YYYY HH:mm:ss"),
    };

    dispatch(addRow(newRow));
    console.log("productDetails", newRow);

    setTimeout(() => {
      alert("Transaction saved and closed.");
      handleRestart();
    }, 1000); // Simulate a delay of 1 second
  };

  const handleRestart = () => {
    // Reset all state and go back to the first step
    setActiveStep(0);
    setProductDetails({
      productName: "",
      salesCount: "",
      saleMonth: "",
      saleYear: "",
    });
    setRemarks("");
    setErrors({
      productName: false,
      salesCount: false,
      saleMonth: false,
      saleYear: false,
    });
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box sx={{ mt: 5, mb: 5 }}>
            <ProductDetailsForm
              productDetails={productDetails}
              setProductDetails={setProductDetails}
              errors={errors}
            />
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 5, mb: 5 }}>
            <RemarksForm
              remarks={remarks}
              setRemarks={setRemarks}
              productDetails={productDetails}
            />
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 5, mb: 5 }}>
            <HeaderDetailsForm
              remarks={remarks}
              gridData={[productDetails]}
              onSaveAndClose={handleSaveAndClose}
              onRestart={handleRestart}
            />
          </Box>
        );
      default:
        return "Unknown stepIndex";
    }
  };

  return (
    <div>
      <Stepper activeStep={activeStep} sx={{ mt: 5, mb: 5 }}>
        {steps.map((label, inx) => (
          <Step key={inx}>
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
              <Button
                type="text"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
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
