import { useSelector } from 'react-redux';
import { makeStyles, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  inputShort: {
    width: '320px',
  },
  colorType: {
    fontWeight: 'lighter',
    marginLeft: '5px',
    marginRight: '5px',
  },
}));

interface FieldSelectProps {
  id: string;
  label: string;
  value: string;
  options: any;
  showColorPrice?: boolean;
  showLightingPrice?: boolean;
  showRevisionPrice?: boolean;
  onChange: (e) => void;
}

const InputSize = ({
  id,
  label,
  value,
  options,
  showColorPrice,
  showLightingPrice,
  showRevisionPrice,
  onChange,
}: FieldSelectProps) => {
  const classes = useStyles();
  const prices = useSelector((state) => state.prices);

  return (
    <FormControl variant="outlined" margin="dense">
      <InputLabel htmlFor={id}>{label} </InputLabel>
      <Select className={classes.inputShort} id={id} value={value} required onChange={onChange}>
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
              {option.finishLabel && (
                <span className={classes.colorType}>{option.finishLabel}</span>
              )}
              {option.priceTier === 1 && showColorPrice && ` +${prices.colorTier1.toFixed(2)} zł`}
              {option.priceTier === 2 && showColorPrice && ` +${prices.colorTier2.toFixed(2)} zł`}
              {option.premium && showLightingPrice && ` +${prices.lighting.toFixed(2)} zł`}
              {option.premium && showRevisionPrice && ` +${prices.revision.toFixed(2)} zł`}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default InputSize;
