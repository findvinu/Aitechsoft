// RemarksForm.js
import React, { useState } from "react";
import { TextField } from "@mui/material";

const RemarksForm = () => {
  const [remarks, setRemarks] = useState("");

  return (
    <div>
      <TextField
        label="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        multiline
        rows={4}
      />
    </div>
  );
};

export default RemarksForm;
