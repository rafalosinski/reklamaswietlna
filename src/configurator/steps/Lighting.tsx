import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldSelect from '../fields/FieldSelect';
import FieldColorSet from '../fields/FieldColorSet';
import { setLighting, setLightingCode } from '../../../store/slices/configSlice';
import { COLOR_SETS, LIGHTING } from '../utils/constants';

interface LightingProps {
  stepNumber: number;
  currentProduct: any;
  description?: string;
}

const Lighting = ({ stepNumber, currentProduct, description }: LightingProps) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  return (
    <Step
      header={`${stepNumber}. Kolor świecenia`}
      description={
        description
          ? description
          : 'Kolor pleksy. Możliwość zostawienia surowej pleksy jeśli docelowy kolor ma być biały lub oklejenie folią translucentną Oracal 8500."'
      }
    >
      <FieldSelect
        id="lighting"
        label="Kolor świecenia"
        value={config.lighting}
        options={currentProduct.lightingOptions}
        showLightingPrice
        onChange={(e) => {
          dispatch(
            setLighting({
              value: e.target.value,
              premium: currentProduct.lightingOptions.find((el) => el.value === e.target.value)
                .premium,
            })
          );
        }}
      />
      {config.lighting === LIGHTING.PALETTE && (
        <FieldColorSet
          value={config.lightingCode}
          colorSet={COLOR_SETS.ORACAL_8500}
          name="lighting-code"
          onChange={(e) => dispatch(setLightingCode(e.target.value))}
        />
      )}
    </Step>
  );
};

export default Lighting;
