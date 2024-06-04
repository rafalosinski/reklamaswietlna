import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldCheckbox from '../fields/FieldCheckbox';
import { toggleDuskSensor } from '../../../store/slices/configSlice';

interface DuskSensorProps {
  stepNumber: number;
}

const DuskSensor = ({ stepNumber }: DuskSensorProps) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);
  const prices = useSelector((state) => state.prices);

  return (
    <Step
      header={`${stepNumber}. Czujnik zmierzchu`}
      description="Automatycznie włącza i wyłącza podświetlenie w zależności od pory dnia; możliwość regulacji czułości czujnika."
    >
      <FieldCheckbox
        name="dusk-sensor"
        label="Czujnik zmierzchu"
        value={config.duskSensor}
        price={prices.duskSensor}
        onChange={() => dispatch(toggleDuskSensor())}
      />
    </Step>
  );
};

export default DuskSensor;
