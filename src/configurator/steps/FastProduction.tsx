import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldCheckbox from '../fields/FieldCheckbox';
import { toggleFastProduction } from '../../../store/slices/configSlice';

interface FastProductionProps {
  currentProduct: any;
  stepNumber: number;
}

const FastProduction = ({ stepNumber, currentProduct }: FastProductionProps) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const prices = useSelector((state) => state.prices);

  return (
    <Step
      header={`${stepNumber}. Ekspresowa realizacja`}
      description={`Realizacja do ${currentProduct.fastProductionDays} dni roboczych. Standardowy termin to 5-10 dni roboczych.`}
    >
      <FieldCheckbox
        name="fast-production"
        label={`Ekspres do ${currentProduct.fastProductionDays} dni roboczych`}
        value={config.fastProduction}
        price={prices.fastProduction}
        onChange={() => dispatch(toggleFastProduction())}
      />
    </Step>
  );
};

export default FastProduction;
