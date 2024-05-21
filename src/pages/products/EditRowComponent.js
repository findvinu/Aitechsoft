import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import { updateRow } from "../../store/slices/gridSlice";
import moment from "moment";
import { validateSalesCount } from "../../utils";

const EditRowComponent = ({ rowId, closeHandler }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.grid.data);
  const gridData = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      id: row.product_id || index + 1,
    }));
  }, [data]);

  const [rowData, setRowData] = useState(
    gridData.find((row) => row.id === rowId) || {}
  );

  useEffect(() => {
    setRowData(gridData.find((row) => row.id === rowId) || {});
  }, [rowId, gridData]);

  const rowChangeHandler = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const rowUpdateHandler = () => {
    if (validateSalesCount(rowData.sales_count)) {
      const updatedRow = {
        ...rowData,
        modified_date: moment().format("DD/MM/YYYY hh:mm:ss"),
      };
      dispatch(updateRow(updatedRow));
      if (closeHandler) closeHandler();
    } else {
      console.error("Sales count is invalid.");
    }
  };

  return (
    <TableRow>
      <TableCell>{rowData.id}</TableCell>
      <TableCell>
        <TextField
          name="product_name"
          label="Product Name"
          value={rowData.product_name || ""}
          onChange={rowChangeHandler}
          fullWidth
          margin="normal"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="sales_count"
          label="Sales Count"
          value={rowData.sales_count || ""}
          onChange={rowChangeHandler}
          fullWidth
          margin="normal"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="sale_month"
          label="Sale Month"
          value={rowData.sale_month || ""}
          onChange={rowChangeHandler}
          fullWidth
          margin="normal"
        />
      </TableCell>
      <TableCell>
        <TextField
          name="sale_year"
          label="Sale Year"
          value={rowData.sale_year || ""}
          onChange={rowChangeHandler}
          fullWidth
          margin="normal"
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" onClick={rowUpdateHandler} sx={{ mr: 2 }}>
          Save
        </Button>
        {closeHandler && (
          <Button variant="outlined" onClick={closeHandler}>
            Cancel
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default EditRowComponent;
