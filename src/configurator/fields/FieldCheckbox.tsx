import {
  makeStyles,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Radio,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  pricePart: {
    marginTop: '9px',
    color: '#868686',
  },
}));

interface FieldCheckboxProps {
  name: string;
  label: any;
  value: boolean;
  price?: number;
  disabled?: boolean;
  radio?: boolean;
  onChange: () => void;
}

const FieldCheckbox = ({
  name,
  label,
  value,
  price,
  disabled,
  radio,
  onChange,
}: FieldCheckboxProps) => {
  const classes = useStyles();

  return (
    <FormGroup row>
      {radio ? (
        <FormControlLabel
          control={
            <Radio
              checked={value}
              onChange={onChange}
              name={name}
              color="primary"
              disabled={disabled}
            />
          }
          label={label}
        />
      ) : (
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={onChange}
              name={name}
              color="primary"
              disabled={disabled}
            />
          }
          label={label}
        />
      )}
      {price && (
        <Typography align="right" className={classes.pricePart}>
          +{price.toFixed(2)} zł
        </Typography>
      )}
    </FormGroup>
  );
};

export default FieldCheckbox;
