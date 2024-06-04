import Step from '../components/Step';
import FieldDisabled from '../fields/FieldDisabled';

interface ProjectProps {
  stepNumber: number;
  description?: string;
}

const Project = ({ stepNumber, description }: ProjectProps) => {
  return (
    <Step
      header={`${stepNumber}. Front`}
      description={description ? description : 'Zadruk frontowej (świecącej) części kasetonu.'}
    >
      <FieldDisabled label="Zadruk" value="Pełny kolor - CMYK" />
    </Step>
  );
};

export default Project;
