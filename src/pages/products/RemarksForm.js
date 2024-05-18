import React, { useState } from "react";
import { TextField, Box } from "@mui/material";

const RemarksForm = ({ remarks, setRemarks, productDetails }) => {
  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <div>
        <h3>Product Details</h3>
        <p>Product Name: {productDetails.productName}</p>
        <p>Sales Count: {productDetails.salesCount}</p>
        <p>Sale Month: {productDetails.saleMonth}</p>
        <p>Sale Year: {productDetails.saleYear}</p>
      </div>
      <TextField
        label="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        multiline
        rows={4}
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default RemarksForm;
