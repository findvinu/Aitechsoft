import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { generateProductId, validateSalesCount } from "../../utils";
import moment from "moment";
import { ButtonComponent as Button } from "../../components/";

const EditablePopupDataGrid = ({ data = [], handleRowUpdate }) => {
  const [rows, setRows] = useState(data);
  const [editRow, setEditRow] = useState(null);

  const handleAddRow = () => {
    const newRow = {
      id: generateProductId(rows),
      product_name: "",
      sales_count: "",
      sale_month: "",
      sale_year: "",
      modified_date: "",
    };
    setRows([...rows, newRow]);
  };

  const handleEditRow = (id) => {
    setEditRow(id);
  };

  const handleRowUpdateLocal = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    handleRowUpdate(newRow);
    setEditRow(null);
  };

  const handleRowUpdateAndValidate = (params) => {
    const newRow = { ...params.row };
    if (validateSalesCount(newRow.sales_count)) {
      newRow.modified_date = moment().format("DD/MM/YYYY hh:mm:ss");
      handleRowUpdateLocal(newRow);
    } else {
      console.error("Sales count is invalid.");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150, editable: false },
    {
      field: "product_name",
      headerName: "Product Name",
      width: 200,
      editable: true,
    },
    {
      field: "sales_count",
      headerName: "Sales Count",
      width: 150,
      editable: true,
    },
    {
      field: "sale_month",
      headerName: "Sale Month",
      width: 150,
      editable: true,
    },
    { field: "sale_year", headerName: "Sale Year", width: 150, editable: true },
    {
      field: "modified_date",
      headerName: "Modified Date",
      width: 200,
      editable: false,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowEditCommit={handleRowUpdateAndValidate}
        isCellEditable={(params) => params.id === editRow}
        onCellClick={(params) => handleEditRow(params.id)}
        disableSelectionOnClick
      />
      <Button onClick={handleAddRow}>Add Row</Button>
    </div>
  );
};

export default EditablePopupDataGrid;
