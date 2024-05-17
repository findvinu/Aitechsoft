import { useState } from "react";
import { useDispatch } from "react-redux";
import { TableRow, TableCell, TextField, Button} from "@mui/material";
import { editProduct} from "../../store/slices/gridSlice";

const EditRowComponent = () => {
    const [rowData, setRowData] = useState();
   const dispatch = useDispatch();

   const rowUpdateHandler = () => {
    dispatch(editProduct(rowData));
   }

   const rowChangeHandler = (e) => {
    const { name, value } = e.target;
    setRowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    return ( 
        <TableRow>
            <TableCell>{rowData.productId}</TableCell>
            <TableCell><TextField name="name" value={rowData.name} onChange={rowChangeHandler} /></TableCell>
            <TableCell><TextField name="description" value={rowData.description} onChange={rowChangeHandler} /></TableCell>
            <TableCell><TextField name="price" value={rowData.price} /></TableCell>
            <TableCell><Button variant="contained" onClick={rowUpdateHandler}>Save</Button></TableCell>
        </TableRow>
     );
}
 
export default EditRowComponent;