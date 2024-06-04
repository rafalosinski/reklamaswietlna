import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, makeStyles } from '@material-ui/core';

import FieldSize from './FieldSize';
import { setCmyk, toggleCmykProject } from '../../../store/slices/configSlice';
import FieldCheckbox from './FieldCheckbox';
import { PRODUCTS } from '../utils/constants';

const FieldCMYK = () => {
  const dispatch = useDispatch();
  const { config, app } = useSelector((state) => state);

  const [rgbRed, setRgbRed] = useState(0);
  const [rgbGreen, setRgbGreen] = useState(0);
  const [rgbBlue, setRgbBblue] = useState(0);

  const useStyles = makeStyles(() => ({
    root: {
      marginTop: '10px',
      marginBottom: '5px',
    },
    colorField: {
      border: '1px solid #bdbdbd',
      width: '50px',
      verticalAlign: 'middle',
      display: 'inline-block',
      height: '50px',
      borderRadius: '50px',
      maxWidth: '25%',
      backgroundColor: `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`,
    },
    caption: {
      display: 'inline-block',
      verticalAlign: 'middle',
      marginLeft: '10px',
      width: '60%',
      lineHeight: '1.1rem',
      fontSize: '0.9rem',
      '& span': {
        fontWeight: 'lighter',
      },
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    setRgbRed(255 * (1 - config.cmyk[0] / 100) * (1 - config.cmyk[3] / 100));
    setRgbGreen(255 * (1 - config.cmyk[1] / 100) * (1 - config.cmyk[3] / 100));
    setRgbBblue(255 * (1 - config.cmyk[2] / 100) * (1 - config.cmyk[3] / 100));
  }, [config.cmyk]);

  const cmykColors = [
    { id: 'cmykC', label: 'C', index: 0 },
    { id: 'cmykM', label: 'M', index: 1 },
    { id: 'cmykY', label: 'Y', index: 2 },
    { id: 'cmykK', label: 'K', index: 3 },
  ];

  return (
    <>
      {(app.currentProduct === PRODUCTS.SINGLE_DIBOND ||
        app.currentProduct === PRODUCTS.DOUBLE_DIBOND) && (
        <>
          <Box>
            Możemy zadrukować obudowę Twoim gotowym projektem lub użyć jednolitego koloru CMYK.
          </Box>
          <Box>
            <FieldCheckbox
              name="cmykProject"
              value={config.cmykProject}
              label="Mam swój projekt"
              onChange={() => dispatch(toggleCmykProject())}
            />
          </Box>
        </>
      )}
      <Box>
        {cmykColors.map(({ id, label, index }) => (
          <FieldSize
            id={id}
            label={label}
            value={config.cmyk[index]}
            width="80px"
            onChange={(e) => dispatch(setCmyk({ index: index, value: e.target.value }))}
          />
        ))}
      </Box>
      <Box className={classes.root}>
        <div className={classes.colorField}></div>
        <Typography className={classes.caption}>
          Podgląd koloru CMYK
          <span>
            <br />
            może różnić się od rzeczywistego
            <br />w zależności od ustawień monitora.
          </span>
        </Typography>
      </Box>
    </>
  );
};

export default FieldCMYK;
