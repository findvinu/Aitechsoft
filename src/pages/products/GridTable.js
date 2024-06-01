import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { TextField, useMediaQuery } from "@mui/material";
import {
  updateRow,
  addRow,
  deleteRow,
  fetchData,
} from "../../store/slices/gridSlice";
import { validateSalesCount, generateProductId } from "../../utils";
import moment from "moment";
import AddRowComponent from "./AddRowComponent";
import ModalComponent from "./ModalComponent";
import { ButtonComponent as Button } from "../../components/";
// import useFetch from "./hooks/useFetch";
// import { getDataURL } from "./api";
import styles from "./GridTable.module.css";

const GridTable = () => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector((state) => state.grid);

  useEffect(() => {
    const method = "GET";
    const url = "/data.json";
    dispatch(fetchData({ method, url }));
  }, [dispatch]);

  const gridData = useMemo(() => {
    return (
      data.data &&
      data.data.map((row, index) => ({
        ...row,
        id: row.product_id || index + 1,
      }))
    );
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

  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery("(max-width:960px)");

  const columns = [
    {
      field: "product_id",
      headerName: "Product ID",
      flex: isSmallScreen ? 50 : isMediumScreen ? 75 : 100,
    },
    {
      field: "product_name",
      headerName: "Product Name",
      flex: isSmallScreen ? 250 : isMediumScreen ? 200 : 300,
      renderCell,
    },
    {
      field: "sales_count",
      headerName: "Sales Count",
      flex: isSmallScreen ? 100 : isMediumScreen ? 75 : 100,
      renderCell,
    },
    {
      field: "sale_month",
      headerName: "Sale Month",
      flex: isSmallScreen ? 100 : isMediumScreen ? 75 : 100,
      renderCell,
    },
    {
      field: "sale_year",
      headerName: "Sale Year",
      flex: isSmallScreen ? 100 : isMediumScreen ? 75 : 100,
      renderCell,
    },
    {
      field: "modified_date",
      headerName: "Modified Date",
      flex: isSmallScreen ? 100 : isMediumScreen ? 150 : 200,
      renderCell: (params) =>
        moment(params.value).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: isSmallScreen ? 100 : isMediumScreen ? 50 : 75,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          className={styles.button}
          variant="outlined"
          onClick={() => handleEdit(params.row.id, params.field)}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "delete",
      headerName: " ",
      flex: isSmallScreen ? 100 : isMediumScreen ? 60 : 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          className={styles.button}
          variant="contained"
          onClick={() => handleDelete(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
    {
      field: "editPopup",
      headerName: "",
      flex: isSmallScreen ? 100 : isMediumScreen ? 80 : 110,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Button
          className={styles.button}
          variant="outlined"
          onClick={() => handleEditPopup(params.row.id)}
        >
          Edit Popup
        </Button>
      ),
    },
  ];

  if (loading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data || !data.data) {
    return <div>No data available</div>;
  }

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
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          onCellEditCommit={handleRowUpdateAndValidate}
          // disableSelectionOnClick
          isCellEditable={(params) =>
            params.id === editingRowId && params.field === editingField
          }
          className={styles.dataGridRoot}
          classes={{
            cell: styles.dataGridCell,
            columnHeaders: styles.dataGridColumnHeaders,
            viewport: styles.dataGridViewport,
            footerContainer: styles.dataGridFooterContainer,
          }}
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
