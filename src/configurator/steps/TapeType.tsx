import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldSelect from '../fields/FieldSelect';
import { setTapeType } from '../../../store/slices/configSlice';

interface TapeTypeProps {
  stepNumber: number;
  currentProduct: any;
}

const TapeType = ({ stepNumber, currentProduct }: TapeTypeProps) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  return (
    <Step
      header={`${stepNumber}. Wykończenie taśmy`}
      description="Wygląd krawędzi taśmy aluminiowej - taśmy płaskie są zlicowane z licem (najczęściej wykonanym z pleksy), natomiast podwójnie zagięta tworzy kilkumilimetrowy rant. Aby zobaczyć przykłady wykończenia zajrzyj do zakładki Realizacje."
    >
      <FieldSelect
        id="tape-types"
        label="Rodzaj taśmy"
        value={config.tapeType}
        options={currentProduct.tapeTypes}
        onChange={(e) => {
          dispatch(setTapeType(e.target.value));
        }}
      />
    </Step>
  );
};

export default TapeType;
