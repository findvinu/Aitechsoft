// TableGrid.js
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";

const TableGrid = () => {
  const data = useSelector((state) => state.gridData);
  const [editableRowIndex, setEditableRowIndex] = useState(null);

  const handleEditClick = (index) => {
    setEditableRowIndex(index);
  };

  const handleSaveClick = () => {
    setEditableRowIndex(null);
    // Dispatch action to save data
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.product_id}>
              <TableCell>{editableRowIndex === index ? <input value={row.product_id} /> : row.product_id}</TableCell>
              <TableCell>{editableRowIndex === index ? <input value={row.product_name} /> : row.product_name}</TableCell>
              <TableCell>{editableRowIndex === index ? <input value={row.price} /> : row.price}</TableCell>
              <TableCell>
                {editableRowIndex === index ? (
                  <Button onClick={handleSaveClick}>Save</Button>
                ) : (
                  <Button onClick={() => handleEditClick(index)}>Edit</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableGrid;
