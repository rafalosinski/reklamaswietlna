import { useSelector, useDispatch } from 'react-redux';
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

import Step from '../components/Step';
import { setShape } from '../../../store/slices/configSlice';
import { SHAPES } from '../utils/constants';

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
    width: '370px',
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

interface FieldShapeProps {
  stepNumber: number;
}

export const shapes = [
  { name: 'Krzyż', value: SHAPES.CROSS, src: '/img/shapes/cross.png' },
  { name: 'Koło', value: SHAPES.CIRCLE, src: '/img/shapes/circle.png' },
  { name: 'Elipsa', value: SHAPES.ELIPSYS, src: '/img/shapes/elipsys.png' },
  {
    name: 'Prostokąt z zaokrąglonymi rogami',
    value: SHAPES.ROUNDED,
    src: '/img/shapes/rounded.png',
  },
];

const FieldShape = ({ stepNumber }: FieldShapeProps) => {
  const classes = useStyles();

  const config = useSelector((state) => state.config);
  const dispatch = useDispatch();

  return (
    <Step
      header={`${stepNumber}. Kształt`}
      description="Wybierz docelowy kształt kasetonu. Jeżeli Twojego kształtu nie ma na liście skontaktuj się z nami - wycenimy go indywidualnie."
    >
      <Box>
        <FormControl variant="outlined" margin="dense">
          <InputLabel htmlFor="conf-shape">Wybierz kształt</InputLabel>
          <Select
            className={classes.inputShort}
            id="conf-shape"
            value={config.shape}
            required
            onChange={(e) => dispatch(setShape(e.target.value))}
          >
            {shapes.map((shape) => {
              return (
                <MenuItem className={classes.selectItem} value={shape.value} key={shape.value}>
                  <Avatar className={classes.colorPreview} alt={shape.name} src={shape.src} />
                  <Typography>{shape.name}</Typography>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Step>
  );
};

export default FieldShape;
