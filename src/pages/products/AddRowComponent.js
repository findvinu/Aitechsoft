import { Button, TextField, TableCell } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRow } from '../../store/slices/gridSlice';

const AddRowComponent = ({lastProductItemId}) => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState({
    product_id: lastProductItemId,
    product_name: "",
    sales_count: "",
    sale_month: "",
    sale_year: "",
    modified_date: new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
  });

  const addRowHandler = () => {
    if (
      rowData.sales_count !== "" &&
      !isNaN(rowData.sales_count) &&
      rowData.sales_count >= 1 &&
      rowData.sales_count <= 5000
    ) {
      dispatch(addRow(rowData));
      setRowData((prevData) => ({
        product_id: prevData.product_id + 1, // Auto-increment Product ID for next row
        product_name: "",
        sales_count: "",
        sale_month: "",
        sale_year: "",
        modified_date: new Date().toLocaleString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      }));
    } else {
      alert("Sales count must be between 1 and 5000 and cannot be empty.");
    }
  };

  const rowChangeHandler = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <TableCell>
        <TextField
          name="product_id"
          label="Product ID"
          value={lastProductItemId}
          onChange={rowChangeHandler}
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="product_name"
          label="Product Name"
          value={rowData.product_name}
          onChange={rowChangeHandler}
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="sales_count"
          label="Sales Count"
          value={rowData.sales_count}
          onChange={rowChangeHandler}
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="sale_month"
          label="Sales Month"
          value={rowData.sale_month}
          onChange={rowChangeHandler}
          size="small"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="sale_year"
          label="Sales Year"
          value={rowData.sale_year}
          onChange={rowChangeHandler}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={addRowHandler} sx={{ mt: 1.7 }}>
          Add Row
        </Button>
      </TableCell>
    </>
  );
};

export default AddRowComponent;
