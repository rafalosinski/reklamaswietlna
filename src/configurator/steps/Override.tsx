import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldCheckbox from '../fields/FieldCheckbox';
import { toggleOverride } from '../../../store/slices/configSlice';

interface OverrideProps {
  stepNumber: number;
}

const Override = ({ stepNumber }: OverrideProps) => {
  const dispatch = useDispatch();
  const { config, prices } = useSelector((state) => state);

  return (
    <Step
      header={`${stepNumber}. Przysłonięcie lica`}
      description="Przysłonięcie fragmentu lica nieświecącym elementem."
    >
      <FieldCheckbox
        name="override"
        label="Przysłonięcie lica"
        value={config.override}
        price={prices.override}
        onChange={() => dispatch(toggleOverride())}
      />
    </Step>
  );
};

export default Override;
