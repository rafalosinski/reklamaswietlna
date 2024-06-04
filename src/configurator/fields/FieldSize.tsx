import { useDispatch, useSelector } from 'react-redux';
import { TextField, makeStyles } from '@material-ui/core';

interface Props {
  id: string;
  label: string;
  value: number;
  width?: string;
  onChange: (e) => void;
  onBlur?: () => void;
  disabled?: boolean;
}

const InputSize = ({ id, label, value, width, onBlur, onChange, disabled = false }: Props) => {
  const dispatch = useDispatch();

  const { sizeWidth } = useSelector((state) => state.config);

  const useStyles = makeStyles((theme) => ({
    inputSize: {
      width: width ? width : '130px',
      marginRight: '15px',
    },
  }));
  const classes = useStyles();

  // const { dispatchConfig } = useContext(ConfigContext);

  return (
    <TextField
      className={classes.inputSize}
      id={id}
      label={label}
      variant="outlined"
      type="number"
      margin="dense"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      inputProps={{ pattern: '[0-9]*' }}
    />
  );
};

export default InputSize;
