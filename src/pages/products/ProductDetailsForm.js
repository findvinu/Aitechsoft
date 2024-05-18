import React from "react";
import { TextField, Box, Button } from "@mui/material";

const ProductDetailsForm = ({ productDetails, setProductDetails, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div>
      <Box sx={{ width: "100%", display: "flex", mb: 3 }}>
        <TextField
          label="Product Name"
          name="productName"
          value={productDetails.productName}
          onChange={handleChange}
          error={errors.productName}
          helperText={errors.productName && "Product Name is required"}
          sx={{ width: "50%", mr: 2 }}
        />
        <TextField
          label="Sales Count"
          name="salesCount"
          value={productDetails.salesCount}
          onChange={handleChange}
          error={errors.salesCount}
          helperText={
            errors.salesCount &&
            "Sales Count is required and should be a number"
          }
          sx={{ width: "50%" }}
        />
      </Box>
      <Box sx={{ width: "100%", display: "flex", mb: 3 }}>
        <TextField
          label="Sale Month"
          name="saleMonth"
          value={productDetails.saleMonth}
          onChange={handleChange}
          error={errors.saleMonth}
          helperText={errors.saleMonth && "Sale Month is required"}
          sx={{ width: "50%", mr: 2 }}
        />
        <TextField
          label="Sale Year"
          name="saleYear"
          value={productDetails.saleYear}
          onChange={handleChange}
          error={errors.saleYear}
          helperText={
            errors.saleYear && "Sale Year is required and should be a number"
          }
          sx={{ width: "50%" }}
        />
      </Box>
    </div>
  );
};

export default ProductDetailsForm;
