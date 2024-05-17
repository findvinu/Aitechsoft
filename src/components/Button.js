import Button from '@mui/material/Button';

const ButtonField = ({label, type="submit", onClick}) => {
    return ( <Button variant="contained" onClick={onClick} type={type}>{label}</Button> );
}
 
export default ButtonField;