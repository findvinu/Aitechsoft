// ProductDetailsForm.js
import React, { useState } from "react";
import { TextField } from "@mui/material";

const ProductDetailsForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [salesCount, setSalesCount] = useState("");

  // Add validation if needed

  return (
    <div>
      <TextField
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <TextField
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Sales Count"
        value={salesCount}
        onChange={(e) => setSalesCount(e.target.value)}
      />
    </div>
  );
};

export default ProductDetailsForm;
