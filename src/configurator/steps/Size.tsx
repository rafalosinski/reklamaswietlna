import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import Step from '../components/Step';
import FieldSize from '../fields/FieldSize';
import { setSizeWidth, setSizeHeight } from '../../../store/slices/configSlice';
import { setStepError } from '../../../store/slices/appSlice';
import { PRODUCTS, SHAPES } from '../utils/constants';

const useStyles = makeStyles(() => ({
  alert: {
    marginTop: '10px',
  },
}));

interface SizeProps {
  stepNumber: number;
  descriptionPart?: string;
}

const Size = ({ stepNumber, descriptionPart = '' }: SizeProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const app = useSelector((state) => state.app);

  const [sizeError, setSizeError] = useState(false);
  const [equalSizes, setEqualSizes] = useState(false);

  useEffect(() => {
    if (
      app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
      app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE
    ) {
      config.shape === SHAPES.CROSS || config.shape === SHAPES.CIRCLE
        ? dispatch(setSizeHeight(config.sizeWidth))
        : '';
    }
  }, []);

  useEffect(() => {
    if (
      app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
      app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE
    ) {
      if (config.shape === SHAPES.CROSS || config.shape === SHAPES.CIRCLE) {
        setEqualSizes(true);
        dispatch(setSizeHeight(config.sizeWidth));
      } else {
        setEqualSizes(false);
      }
    }
  }, [config.shape]);

  useEffect(() => {
    if (config.sizeWidth > config.sizeMaxDouble && config.sizeHeight > config.sizeMaxDouble) {
      setSizeError(true);
      dispatch(setStepError(true));
    } else {
      setSizeError(false);
      dispatch(setStepError(false));
    }
  }, [config.sizeHeight, config.sizeWidth]);

  const validateSize = () => {
    if (config.sizeWidth < 25) {
      dispatch(setSizeWidth(25));
    }
    if (config.sizeHeight < 25) {
      dispatch(setSizeHeight(25));
    }
  };

  const calculateParts = () => {
    const partsWidth = Math.ceil(config.sizeWidth / config.sizeMaxSingle);
    const partsHeight = Math.ceil(config.sizeHeight / config.sizeMaxSingle);
    const partsAmount = Math.max(partsWidth, partsHeight);

    if (
      (app.currentProduct === PRODUCTS.SINGLE_ALU_SHAPE ||
        app.currentProduct === PRODUCTS.DOUBLE_ALU_SHAPE) &&
      (config.sizeWidth > config.sizeMaxSingle || config.sizeHeight > config.sizeMaxSingle)
    ) {
      dispatch(setStepError(true));
      return (
        <Alert severity="error" className={classes.alert}>
          Maksymalny możliwy wymiar kasetonu o nietypowym kształcie to 400 x 200 cm.
        </Alert>
      );
    }

    if (
      partsAmount > 1 &&
      (app.currentProduct === PRODUCTS.SINGLE_ALU_PLEX ||
        app.currentProduct === PRODUCTS.DOUBLE_ALU_PLEX)
    ) {
      return (
        <Alert severity="info" className={classes.alert}>
          Lico Twojego kasetonu będzie się składać z <strong>{partsAmount} części</strong>.
          Maksymalny wymiar kasetonu z licem bez łączenia o grubości {config.thickness} cm wynosi{' '}
          {config.sizeMaxSingle} cm.
        </Alert>
      );
    }

    if (partsAmount > 1) {
      return (
        <Alert severity="info" className={classes.alert}>
          Twój kaseton będzie się składał z <strong>{partsAmount} części</strong>. Maksymalny wymiar
          pojedynczego kasetonu o grubości {config.thickness} cm wynosi {config.sizeMaxSingle} cm.
        </Alert>
      );
    }
  };

  return (
    <Step
      header={`${stepNumber}. Rozmiar`}
      description={`Minimalny możliwy rozmiar to 25 x 25 cm. Koszt liczony jest na podstawie pola powierzchni. ${descriptionPart}`}
    >
      <FieldSize
        id="conf-size-width"
        label="Szerokość (cm)"
        value={config.sizeWidth}
        onChange={(e) => {
          dispatch(setSizeWidth(e.target.value));
          equalSizes ? dispatch(setSizeHeight(e.target.value)) : '';
        }}
        onBlur={validateSize}
      />
      <FieldSize
        id="conf-size-height"
        label="Wysokość (cm)"
        value={config.sizeHeight}
        onChange={(e) => {
          dispatch(setSizeHeight(e.target.value));
          equalSizes ? dispatch(setSizeWidth(e.target.value)) : '';
        }}
        onBlur={validateSize}
      />
      {calculateParts()}
      {sizeError && (
        <Alert severity="error" className={classes.alert}>
          Tylko jeden z wymiarów może być większy niż {config.sizeMaxDouble} cm
        </Alert>
      )}
    </Step>
  );
};

export default Size;
