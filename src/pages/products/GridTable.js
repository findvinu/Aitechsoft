import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { updateRow, addRow, deleteRow } from "../../store/slices/gridSlice";
import { validateSalesCount, generateProductId } from "../../utils";
import moment from "moment";
import AddRowComponent from "./AddRowComponent";
import ModalComponent from "./ModalComponent";

const GridTable = () => {
  const dispatch = useDispatch();
  const [editingRowId, setEditingRowId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);

  // Memoize the selector result
  const data = useSelector((state) => state.grid.data);
  const gridData = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      id: row.product_id || index + 1,
    }));
  }, [data]);

  const handleEdit = (id) => {
    setEditingRowId(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteRow(id));
  };

  const handleRowUpdateAndValidate = (params) => {
    const newRow = { ...params.row, [params.field]: params.value };

    if (validateSalesCount(newRow.sales_count)) {
      newRow.modified_date = moment().format("DD/MM/YYYY hh:mm:ss");
      dispatch(updateRow(newRow));
    } else {
      console.error("Sales count is invalid.");
    }
    setEditingRowId(null);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY HH:mm:ss");
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

  const columns = [
    { field: "product_id", headerName: "Product ID", flex: 0.5 },
    { field: "product_name", headerName: "Product Name", flex: 1 },
    { field: "sales_count", headerName: "Sales Count", flex: 1 },
    { field: "sale_month", headerName: "Sale Month", flex: 1 },
    { field: "sale_year", headerName: "Sale Year", flex: 1 },
    {
      field: "modified",
      headerName: "Modified Date",
      flex: 1,
      renderCell: (params) => formatDate(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.5,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(params.row.id)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(params.row.id)}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEditPopup(params.row.id)}
            >
              Edit Popup
            </Button>
          </div>
        );
      },
    },
  ];

  const lastProductId = gridData.length + 1;

  return (
    <div>
      <div style={{ marginBottom: "10px" }}></div>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={gridData}
          columns={columns}
          onRowEditCommit={handleRowUpdateAndValidate}
          disableSelectionOnClick
          isCellEditable={(params) => editingRowId === params.id}
        />
        <AddRowComponent
          lastProductItemId={lastProductId}
          openAddRowModal={openAddRowModal}
        />

        <ModalComponent
          open={modalOpen}
          closeHandler={() => setModalOpen(false)}
          initialData={initialData}
          handleRowSave={handleRowSave}
        />
      </div>
    </div>
  );
};

export default GridTable;
