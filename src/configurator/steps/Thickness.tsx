import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldRadio from '../fields/FieldRadio';
import { setMaxSingle, setThickness } from '../../../store/slices/configSlice';
import { productsData } from '../productsData';
import { PRODUCTS } from '../utils/constants';

interface ThicknessProps {
  stepNumber: number;
  options: number[];
}

const Thickness = ({ stepNumber, options }: ThicknessProps) => {
  const dispatch = useDispatch();
  const { config, app } = useSelector((state) => state);

  const [disabled, setDisabled] = useState(false);
  const [disabledFirst, setDisabledFirst] = useState(false);
  const [disabledSecond, setDisabledSecond] = useState(false);

  useEffect(() => {
    options.length === 1 ? setDisabled(true) : '';
    if (app.currentProduct === PRODUCTS.DOUBLE_ALU_PLEX) {
      if (config.sizeWidth > 150 || config.sizeHeight > 150) {
        dispatch(setThickness(14));
        setDisabledFirst(true);
        setDisabledSecond(false);
      } else {
        dispatch(setThickness(10));
        setDisabledFirst(false);
        setDisabledSecond(true);
      }
    }
  }, [config.sizeWidth, config.sizeHeight]);

  const handleThicknessChange = (value) => {
    dispatch(setThickness(value));
    if (app.currentProduct === PRODUCTS.SINGLE_DIBOND) {
      const { sizeMaxSingleOptions } = productsData.find(
        (el) => el.name === PRODUCTS.SINGLE_DIBOND
      );
      const { size } = sizeMaxSingleOptions.find((el) => el.thickness === Number(value));
      dispatch(setMaxSingle(size));
    }
  };

  return (
    <Step header={`${stepNumber}. Grubość`} description="Trzeci wymiar, czyli głębokość kasetonu.">
      <FieldRadio
        name="Głębokość"
        options={options}
        value={config.thickness}
        onChange={(e) => handleThicknessChange(e.target.value)}
        disabled={disabled}
        disabledFirst={disabledFirst}
        disabledSecond={disabledSecond}
      />
    </Step>
  );
};

export default Thickness;
