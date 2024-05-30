import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ButtonComponent as Button } from "../../components/";

const HeaderDetailsForm = ({
  remarks,
  gridData,
  onSaveAndClose,
  onRestart,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <div>
        <h3>Remarks:</h3>
        <p>{remarks}</p>
      </div>
      <div>
        <Button variant="contained" onClick={toggleDetails} sx={{ mb: 5 }}>
          {showDetails ? "Hide Details" : "Show Details"}
        </Button>
        {showDetails && (
          <Box sx={{ mb: 3 }}>
            {gridData && gridData.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {Object.keys(gridData[0]).map((key) => (
                        <TableCell key={key}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gridData.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, i) => (
                          <TableCell key={i}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </div>
      <div>
        <Button variant="contained" onClick={onSaveAndClose} sx={{ mr: 1 }}>
          Save & Close
        </Button>
        <Button variant="outlined" onClick={onRestart}>
          Restart
        </Button>
      </div>
    </div>
  );
};

export default HeaderDetailsForm;
