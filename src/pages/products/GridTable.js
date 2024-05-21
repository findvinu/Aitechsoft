import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField } from "@mui/material";
import { updateRow, addRow, deleteRow } from "../../store/slices/gridSlice";
import { validateSalesCount, generateProductId } from "../../utils";
import moment from "moment";
import AddRowComponent from "./AddRowComponent";
import ModalComponent from "./ModalComponent";

const GridTable = () => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.grid.data);
  const gridData = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      id: row.product_id || index + 1,
    }));
  }, [data]);

  const handleEdit = (id, field) => {
    setEditingRowId(id);
    setEditingField(field);
    console.log("edit click :-", editingRowId, editingField);
  };

  const handleDelete = (id) => {
    dispatch(deleteRow(id));
  };

  const handleRowUpdateAndValidate = (params) => {
    const { id, field, value } = params;
    const newRow = { ...gridData.find((row) => row.id === id), [field]: value };

    if (validateSalesCount(newRow.sales_count)) {
      newRow.modified_date = moment().format("DD/MM/YYYY HH:mm:ss");
      dispatch(updateRow(newRow));
    } else {
      console.error("Sales count is invalid.");
    }
    setEditingRowId(null);
    setEditingField(null);
  };

  const handleEditPopup = (id) => {
    const rowToEdit = gridData.find((row) => row.id === id);
    setInitialData(rowToEdit);
    setModalOpen(true);
  };

  const handleRowSave = (newRow) => {
    if (newRow.id) {
      dispatch(updateRow(newRow));
    } else {
      newRow.id = generateProductId(gridData);
      dispatch(addRow(newRow));
    }
    setModalOpen(false);
  };

  const openAddRowModal = () => {
    const newProductId = generateProductId(gridData);
    setInitialData({
      id: newProductId,
      product_name: "",
      sales_count: "",
      sale_month: "",
      sale_year: "",
      modified_date: "",
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingRowId(null);
  };

  const renderCell = (params) => {
    const { id, field, value } = params;

    if (id === editingRowId && field === editingField) {
      console.log("editingField", editingField, setEditingField, editingRowId);
      return (
        <TextField
          value={value}
          onChange={(e) =>
            handleRowUpdateAndValidate({ id, field, value: e.target.value })
          }
          onBlur={() => {
            setEditingRowId(null);
            setEditingField(null);
          }}
          autoFocus
        />
      );
    }
    return value;
  };

  const columns = [
    { field: "product_id", headerName: "Product ID", flex: 0.5 },
    { field: "product_name", headerName: "Product Name", flex: 1, renderCell },
    { field: "sales_count", headerName: "Sales Count", flex: 1, renderCell },
    { field: "sale_month", headerName: "Sale Month", flex: 1, renderCell },
    { field: "sale_year", headerName: "Sale Year", flex: 1, renderCell },
    {
      field: "modified_date",
      headerName: "Modified Date",
      flex: 1,
      renderCell: (params) =>
        moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const { id } = params.row;
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(id, params.field)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(id)}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditPopup(id)}
            >
              Edit Popup
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <Button variant="contained" onClick={openAddRowModal}>
          Add Row
        </Button>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={gridData}
          columns={columns}
          onCellEditCommit={handleRowUpdateAndValidate}
          disableSelectionOnClick
          isCellEditable={(params) =>
            params.id === editingRowId && params.field === editingField
          }
        />
        <AddRowComponent openAddRowModal={openAddRowModal} />
        <ModalComponent
          open={modalOpen}
          closeHandler={closeModal}
          initialData={initialData}
          handleRowSave={handleRowSave}
        />
      </div>
    </div>
  );
};

export default GridTable;
