import { useSelector, useDispatch } from 'react-redux';

import Step from '../components/Step';
import FieldSelect from '../fields/FieldSelect';
import { setRevision } from '../../../store/slices/configSlice';

interface RevisionProps {
  stepNumber: number;
  currentProduct: any;
}

const Revision = ({ stepNumber, currentProduct }: RevisionProps) => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config);

  return (
    <Step
      header={`${stepNumber}. Rewizja`}
      description="Wybierz taką stronę kasetonu na umiejscowienie otworu rewizyjnego, z której nie będzie żadnych przeszkód jak rynny, glify, etc. czyli taką, do której będzie najwygodniejszy dostęp po zamontowaniu kasetonu."
    >
      <FieldSelect
        id="revision"
        label="Otwór rewizyjny"
        value={config.revision}
        options={currentProduct.revisionOptions}
        showRevisionPrice
        onChange={(e) => {
          dispatch(
            setRevision({
              value: e.target.value,
              premium: currentProduct.revisionOptions.find((el) => el.value === e.target.value)
                .premium,
            })
          );
        }}
      />
    </Step>
  );
};

export default Revision;
