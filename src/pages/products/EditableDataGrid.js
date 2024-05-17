import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { generateProductId, validateSalesCount } from './utils';
import moment from 'moment';

const EditableDataGrid = ({ data, handleRowUpdate }) => {
  const [rows, setRows] = useState(data);

  const handleAddRow = () => {
    const newRow = {
      id: generateProductId(rows),
      product_name: '',
      sales_count: '',
      sale_month: '',
      sale_year: '',
    };
    setRows([...rows, newRow]);
  };

  const handleRowUpdateLocal = (newRow) => {
    const updatedRows = rows.map((row) => (row.id === newRow.id ? newRow : row));
    setRows(updatedRows);
    handleRowUpdate(newRow);
  };

  const handleRowUpdateAndValidate = (newRow) => {
    if (validateSalesCount(newRow.sales_count)) {
      newRow.modified_date = moment().format('DD/MM/YYYY hh:mm:ss');
      handleRowUpdateLocal(newRow);
    } else {
      console.error('Sales count is invalid.');
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150, editable: false },
    { field: 'product_name', headerName: 'Product Name', width: 200, editable: true },
    { field: 'sales_count', headerName: 'Sales Count', width: 150, editable: true },
    { field: 'sale_month', headerName: 'Sale Month', width: 150, editable: true },
    { field: 'sale_year', headerName: 'Sale Year', width: 150, editable: true },
    { field: 'modified_date', headerName: 'Modified Date', width: 200, editable: false },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        onRowEditCommit={handleRowUpdateAndValidate}
        disableSelectionOnClick
      />
      <button onClick={handleAddRow}>Add Row</button>
    </div>
  );
};

export default EditableDataGrid;
