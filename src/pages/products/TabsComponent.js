import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProductDetailsForm from "./ProductDetailsForm";
import RemarksForm from "./RemarksForm";
import HeaderDetailsForm from "./HeaderDetailsForm";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(0);
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

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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

  const handleSaveAndClose = () => {
    console.log("Saving data...");

    setTimeout(() => {
      console.log("Data saved:", {
        productDetails,
        remarks,
      });

      alert("Transaction saved and closed.");

      setActiveTab(0);
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
    }, 1000);
  };

  const handleRestart = () => {
    setActiveTab(0);
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

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Product Details" />
          <Tab label="Remarks" />
          <Tab label="Header & Details" />
        </Tabs>
      </Box>
      <Box sx={{ mt: 5, mb: 5 }}>
        {activeTab === 0 && (
          <ProductDetailsForm
            productDetails={productDetails}
            setProductDetails={setProductDetails}
            errors={errors}
          />
        )}
        {activeTab === 1 && (
          <RemarksForm
            remarks={remarks}
            setRemarks={setRemarks}
            productDetails={productDetails}
          />
        )}
        {activeTab === 2 && (
          <HeaderDetailsForm
            remarks={remarks}
            gridData={[productDetails]}
            onSaveAndClose={handleSaveAndClose}
            onRestart={handleRestart}
          />
        )}
      </Box>
    </div>
  );
};

export default TabsComponent;
