import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { addRow, updateRow, deleteRow } from '../../store/slices/gridSlice';
import { validateSalesCount } from './utils';
import moment from 'moment';
import AddRowComponent from './AddRowComponent';

const GridTable = () => {
  const dispatch = useDispatch();
  const [editingRowId, setEditingRowId] = useState(null);

  // Memoize the selector result
  const data = useSelector(state => state.grid.data);
  const gridData = useMemo(() => {
    return data.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
  }, [data]);

  const handleEdit = id => {
    setEditingRowId(id);
  };

  const handleDelete = id => {
    dispatch(deleteRow(id));
  };

  const handleRowUpdateAndValidate = (newRow) => {
    if (validateSalesCount(newRow.sales_count)) {
      newRow.modified_date = moment().format('DD/MM/YYYY hh:mm:ss');
      dispatch(updateRow(newRow));
    } else {
      console.error('Sales count is invalid.');
    }
  };

  const formatDate = (date) => {
    return moment(date).format('DD/MM/YYYY HH:mm:ss');
  };
  
  const columns = [
    { field: 'product_id', headerName: 'Product ID', flex: 1 },
    { field: 'product_name', headerName: 'Product Name', flex: 1 },
    { field: 'sales_count', headerName: 'Sales Count', flex: 1 },
    { field: 'sale_month', headerName: 'Sale Month', flex: 1 },
    { field: 'sale_year', headerName: 'Sale Year', flex: 1 },
    {
      field: 'modified',
      headerName: 'Modified Date',
      width: 200,
      renderCell: (params) => formatDate(params.row.modified),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableClickEventBubbling: true,
      renderCell: params => {
        return (
          <div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleEdit(params.row.product_id)}
              sx={{ mr: 1 }}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDelete(params.row.product_id)}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const lastProductId = gridData.length + 1;
  /* const lastRow = {
    id: 'addRow',
    product_id: lastProductId,
    row: <AddRowComponent lastProductId={lastProductId}  />
  }; */

 // const rowsWithLastRow = [...gridData, lastRow];

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        
      </div>
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={gridData}
          columns={columns}
          onRowEditCommit={handleRowUpdateAndValidate}
          disableSelectionOnClick
          isCellEditable={params => editingRowId === params.id}
          onCellEditCommit={params => handleEdit(params.id)}
          components={{
            Toolbar: () => null,
          }}
        />
        <AddRowComponent lastProductItemId={lastProductId} />
      </div>
    </div>
  );
};

export default GridTable;
