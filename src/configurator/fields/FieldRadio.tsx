import {
  makeStyles,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  radio: {
    '& legend': {
      fontSize: '0.75rem',
    },
    '& label': {
      marginRight: '25px',
    },
  },
}));

interface FieldRadioProps {
  name: string;
  options: number[];
  value: boolean;
  onChange: (e) => void;
  disabled?: boolean;
  disabledFirst?: boolean;
  disabledSecond?: boolean;
}

const InputSize = ({
  name,
  options,
  value,
  onChange,
  disabled,
  disabledFirst,
  disabledSecond,
}: FieldRadioProps) => {
  const classes = useStyles();

  // const { dispatchConfig } = useContext(ConfigContext);

  return (
    <FormControl component="fieldset" className={classes.radio}>
      <FormLabel component="legend">{name}</FormLabel>
      <RadioGroup row aria-label="position" name="position" value={value} onChange={onChange}>
        {options.map((option, i) => {
          return (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio color="primary" />}
              label={`${option} cm`}
              labelPlacement="end"
              disabled={disabled || (disabledFirst && i === 0) || (disabledSecond && i === 1)}
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default InputSize;
