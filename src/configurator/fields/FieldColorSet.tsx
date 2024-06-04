import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

import { oracal8500 } from '../colors/oracal8500';
import { oracal551 } from '../colors/oracal551';
import { tapesRal, tapesSpecial } from '../colors/tapes';
import { COLORS, COLOR_SETS } from '../utils/constants';

const useStyles = makeStyles(() => ({
  colorPreview: {
    width: '35px',
    height: '35px',
    margin: '2px',
    display: 'inline-block',
  },
  border: {
    border: '1px solid #cccccc',
  },
  inputShort: {
    width: '320px',
    '& p': {
      display: 'inline-block',
      marginLeft: '10px',
      marginTop: '8px',
      verticalAlign: 'top',
    },
  },
  selectItem: {
    display: 'flex',
    justifyContent: 'flex-start',
    '& p': {
      display: 'inline-block',
      marginLeft: '10px',
      verticalAlign: 'top',
    },
  },
  code: {
    fontWeight: 'lighter',
  },
}));

interface FieldColorSetProps {
  name: string;
  value: string;
  colorSet: string;
  onChange: (e) => void;
}

const FieldColorSet = ({ name, value, colorSet, onChange }: FieldColorSetProps) => {
  const classes = useStyles();

  const config = useSelector((state) => state.config);

  let colors;
  colorSet === COLOR_SETS.ORACAL_551 ? (colors = oracal551) : '';
  colorSet === COLOR_SETS.ORACAL_8500 ? (colors = oracal8500) : '';
  colorSet === COLOR_SETS.TAPES_RAL ? (colors = tapesRal) : '';
  colorSet === COLOR_SETS.TAPES_SPECIAL ? (colors = tapesSpecial) : '';

  return (
    <Box>
      <FormControl variant="outlined" margin="dense">
        <InputLabel htmlFor={name}>Wybierz kolor</InputLabel>
        <Select className={classes.inputShort} id={name} value={value} required onChange={onChange}>
          {colors.map((color) => {
            return (
              <MenuItem className={classes.selectItem} value={color.code} key={color.code}>
                {color.code === '010' ||
                color.code === '9016' ||
                color.code === '101' ||
                color.code === '102' ? (
                  <Avatar
                    className={`${classes.colorPreview} ${classes.border}`}
                    alt={color.name}
                    src={color.src}
                  />
                ) : (
                  <Avatar className={classes.colorPreview} alt={color.name} src={color.src} />
                )}

                <Typography>{color.name}</Typography>
                {config.color !== COLORS.TAPE_SPECIAL && (
                  <Typography className={classes.code}>{color.code}</Typography>
                )}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FieldColorSet;
