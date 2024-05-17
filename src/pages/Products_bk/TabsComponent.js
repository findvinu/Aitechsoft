// TabsComponent.js
import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import ProductDetailsForm from "./ProductDetailsForm";
import RemarksForm from "./RemarksForm";
import HeaderDetailsForm from "./HeaderDetailsForm";

const TabsComponent = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleChange}>
          <Tab label="Product Details" />
          <Tab label="Remarks" />
          <Tab label="Header & Details" />
        </Tabs>
      </Box>
      <Box>
        {activeTab === 0 && <ProductDetailsForm />}
        {activeTab === 1 && <RemarksForm />}
        {activeTab === 2 && <HeaderDetailsForm />}
      </Box>
    </div>
  );
};

export default TabsComponent;
