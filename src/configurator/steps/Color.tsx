import { useSelector, useDispatch } from 'react-redux';
import { TextField } from '@material-ui/core';

import Step from '../components/Step';
import FieldSelect from '../fields/FieldSelect';
import FieldColorSet from '../fields/FieldColorSet';
import { setColor, setColorCode, setColorRal } from '../../../store/slices/configSlice';
import FieldCMYK from '../fields/FieldCMYK';
import { COLORS, COLOR_SETS, LIGHTING } from '../utils/constants';

interface ColorProps {
  stepNumber: number;
  currentProduct: any;
  descriptionPart: string;
}

const Color = ({ stepNumber, currentProduct, descriptionPart }: ColorProps) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  return (
    <Step header={`${stepNumber}. Kolor obudowy`} description={descriptionPart}>
      <FieldSelect
        id="Color"
        label="Kolor obudowy"
        value={config.color}
        options={currentProduct.colorOptions}
        showColorPrice
        onChange={(e) => {
          dispatch(
            setColor({
              value: e.target.value,
              premium: currentProduct.colorOptions.find((el) => el.value === e.target.value)
                .premium,
            })
          );
          e.target.value === COLORS.TAPE_RAL ? dispatch(setColorCode('9006')) : '';
          e.target.value === COLORS.TAPE_SPECIAL ? dispatch(setColorCode('silver-mirror')) : '';
          e.target.value === LIGHTING.PALETTE ? dispatch(setColorCode('020')) : '';
        }}
      />
      {config.color === COLORS.FOIL_PALETTE_GLOSSY && (
        <FieldColorSet
          value={config.colorCode}
          colorSet={COLOR_SETS.ORACAL_551}
          name="color-template"
          onChange={(e) => dispatch(setColorCode(e.target.value))}
        />
      )}
      {(config.color === COLORS.FOIL_CMYK_MAT || config.color === COLORS.FOIL_CMYK_GLOSSY) && (
        <FieldCMYK />
      )}
      {config.color === COLORS.TAPE_RAL && (
        <FieldColorSet
          value={config.colorCode}
          colorSet={COLOR_SETS.TAPES_RAL}
          name="tape-template"
          onChange={(e) => dispatch(setColorCode(e.target.value))}
        />
      )}
      {config.color === COLORS.TAPE_SPECIAL && (
        <FieldColorSet
          value={config.colorCode}
          colorSet={COLOR_SETS.TAPES_SPECIAL}
          name="tape-template"
          onChange={(e) => dispatch(setColorCode(e.target.value))}
        />
      )}
      {config.color === COLORS.CUSTOM_RAL && (
        <TextField
          style={{ marginTop: '10px' }}
          id="ralNumber"
          label="Nazwa lub kod koloru RAL"
          variant="outlined"
          size="small"
          value={config.colorRal}
          onChange={(e) => dispatch(setColorRal(e.target.value))}
        />
      )}
    </Step>
  );
};

export default Color;
