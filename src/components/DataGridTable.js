import { DataGrid } from "@mui/x-data-grid";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import AddRowComponent from "../pages/Products/AddRowComponent";
import EditRowComponent from "../pages/Products/EditRowComponent"; 

const DataGridTable = ({ rows, columns, onRowDelete, onRowEdit }) => {
  const handleRowDelete = (productId) => {
    // Implement row deletion logic
    console.log("Deleting row with productId:", productId);
    // Call onRowDelete function if provided
    if (onRowDelete) {
      onRowDelete(productId);
    }
  };

  const handleRowEdit = (productId, field, value) => {
    // Implement row editing logic
    console.log("Editing row with productId:", productId, "Field:", field, "Value:", value);
    // Call onRowEdit function if provided
    if (onRowEdit) {
      onRowEdit(productId, field, value);
    }
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      components={{
        Row: ({ row, ...props }) => {
          if (row.isAddRow) {
            return <AddRowComponent {...props} />;
          } else if (row.isEditRow) { // Check if it's an edit row
            return <EditRowComponent {...props} row={row} onSave={handleRowEdit} />;
          } else {
            return <TableRow {...props} />;
          }
        },
      }}
      onDelete={(rowIds) => {
        rowIds.forEach((rowId) => handleRowDelete(rowId));
      }}
    />
  );
};

export default DataGridTable;
