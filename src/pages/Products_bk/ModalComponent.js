import { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addRow, updateRow } from "../store/gridSlice";

const ModalComponent = () => {
  const [rowData, setRowData] = useState();
  const dispatch = useDispatch(row || {});

  const rowSaveHandler = () => {
    if (rowData.productId) {
      dispatch(updateRow(rowData));
    } else {
      dispatch(addRow(rowData));
    }

    closeHandler();
  };

  const rowChangeHandler = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Modal open={open} onClose={rowChangeHandler}>
      <Box sx={{ width: 400, bgcolor: "background.paper", p: 2 }}>
        <TextField
          name="productId"
          label="Product ID"
          value={rowData.productId}
          onChange={rowChangeHandler}
        />
        <TextField
          name="name"
          label="Name"
          value={rowData.name}
          onChange={rowChangeHandler}
        />
        <TextField
          name="description"
          label="Description"
          value={rowData.description}
          onChange={rowChangeHandler}
        />
        <TextField
          name="price"
          label="Price"
          value={rowData.price}
          onChange={rowChangeHandler}
        />
        <Button variant="contained" onClick={rowSaveHandler}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalComponent;
