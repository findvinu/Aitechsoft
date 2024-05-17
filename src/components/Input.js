import TextField from '@mui/material/TextField';

const InputField = ({value, id, type="text", name, label, onChange}) => {
    return (  <TextField value={value} id={id} type={type} name={name} label={label} variant="standard" onChange={onChange} /> );
}
 
export default InputField;