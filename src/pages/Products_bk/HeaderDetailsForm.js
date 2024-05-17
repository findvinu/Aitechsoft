// HeaderDetailsForm.js
import React, { useState } from "react";
import { TextField } from "@mui/material";

const HeaderDetailsForm = () => {
  // Assuming you have a toggle state for show/hide details section

  return (
    <div>
      <div>
        <h3>Remarks:</h3>
        {/* Display remarks entered in the previous step */}
      </div>
      <div>
        <button>Show/Hide Details</button>
        {/* Display grid from the first form */}
      </div>
      <div>
        <button>Save & Close</button>
        <button>Restart</button>
      </div>
    </div>
  );
};

export default HeaderDetailsForm;
