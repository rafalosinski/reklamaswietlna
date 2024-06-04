import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, makeStyles } from '@material-ui/core';

import { oracal8500 } from '../colors/oracal8500';
import { COLORS, LIGHTING } from '../utils/constants';

const FieldPreview = () => {
  const config = useSelector((state) => state.config);

  const [rgbRed, setRgbRed] = useState(0);
  const [rgbGreen, setRgbGreen] = useState(0);
  const [rgbBlue, setRgbBblue] = useState(0);
  const [src, setSrc] = useState('');
  const [textColor, setTextColor] = useState('#EEDA47');

  const useStyles = makeStyles(() => ({
    preview: {
      border: '2px solid #ebebeb',
      background: `url(${src}) no-repeat`,
      backgroundSize: '130% 130%',
      backgroundPosition: 'center',
      backgroundColor: `rgb(${rgbRed}, ${rgbGreen}, ${rgbBlue})`,
      width: '300px',
      textAlign: 'center',
      padding: '10px 0px',
      fontSize: '1.6rem',
      fontWeight: 'bolder',
      letterSpacing: '1px',
      color: `${textColor}`,
      textShadow: `0px 0px 1px ${textColor}`,
      marginBottom: '15px',
      borderRadius: '5px',
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    if (config.lighting === LIGHTING.WHITE || config.lighting === LIGHTING.CUSTOM_UV) {
      setTextColor('#ffffff');
    } else {
      const { hex } = oracal8500.find((el) => el.code === config.lightingCode);
      setTextColor(hex);
    }

    setSrc('');
    if (config.color === COLORS.FOIL_CMYK_MAT || config.color === COLORS.FOIL_CMYK_GLOSSY) {
      setRgbRed(255 * (1 - config.cmyk[0] / 100) * (1 - config.cmyk[3] / 100));
      setRgbGreen(255 * (1 - config.cmyk[1] / 100) * (1 - config.cmyk[3] / 100));
      setRgbBblue(255 * (1 - config.cmyk[2] / 100) * (1 - config.cmyk[3] / 100));
    } else if (config.color === COLORS.BLACK_MAT || config.color === COLORS.BLACK_GLOSSY) {
      setRgbRed(0);
      setRgbGreen(0);
      setRgbBblue(0);
    } else if (config.color === COLORS.ANTHRACITE) {
      setRgbRed(60);
      setRgbGreen(60);
      setRgbBblue(60);
    } else if (config.color === COLORS.WHITE_MAT || config.color === COLORS.WHITE_GLOSSY) {
      setRgbRed(255);
      setRgbGreen(255);
      setRgbBblue(255);
    } else if (config.color === COLORS.FOIL_PALETTE_GLOSSY) {
      setSrc(`/img/551/${config.colorCode}.png`);
    } else if (config.color === COLORS.RAW_ALUMINIUM || config.color === COLORS.BRUSHED_ALUMINIUM) {
      setSrc('/img/aluminium.jpg');
    }
  }, [config.cmyk, config.color, config.lighting, config.lightingCode, config.colorCode, classes]);

  return <Box className={classes.preview}>PODGLĄD KOLORÓW</Box>;
};

export default FieldPreview;
