import { FormControl, InputLabel, Select, makeStyles, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputShort: {
    width: '300px',
    '& svg': {
      display: 'none',
    },
  },
}));

interface FieldDisabledProps {
  label: string;
  value: string;
}

const FieldDisabled = ({ label, value }: FieldDisabledProps) => {
  const classes = useStyles();

  return (
    <FormControl variant="outlined" margin="dense">
      <InputLabel htmlFor={label}>{label}</InputLabel>
      <Select className={classes.inputShort} id={label} value={value} disabled>
        <MenuItem value={value}>{value}</MenuItem>
      </Select>
    </FormControl>
  );
};

export default FieldDisabled;
