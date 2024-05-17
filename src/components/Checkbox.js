import Checkbox from '@mui/material/Checkbox';

const CheckboxFeild = ({chacked, label}) => {
    return (<><span>{label} </span> <Checkbox type="checkbox" checked={chacked} /></> );
}
 
export default CheckboxFeild;