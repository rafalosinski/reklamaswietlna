import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldCheckbox from '../fields/FieldCheckbox';
import { toggleEffect3D } from '../../../store/slices/configSlice';

interface Effect3DProps {
  stepNumber: number;
}

const Effect3D = ({ stepNumber }: Effect3DProps) => {
  const dispatch = useDispatch();
  const { config, prices } = useSelector((state) => state);

  return (
    <Step
      header={`${stepNumber}. Wypukłe litery 3D`}
      description="Litery, logo lub inne elementy wyfrezowane z oddzielnego kawałka pleksy gr. 10mm. Wystają delikatnie z kasetonu tworząc efekt 3D."
    >
      <FieldCheckbox
        name="effect3d"
        label="Efekt 3D"
        value={config.effect3D}
        price={prices.effect3D}
        onChange={() => dispatch(toggleEffect3D())}
      />
    </Step>
  );
};

export default Effect3D;
