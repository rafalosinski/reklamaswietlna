import Step from '../components/Step';
import FieldDisabled from '../fields/FieldDisabled';

interface ProjectProps {
  stepNumber: number;
}

const Project = ({ stepNumber }: ProjectProps) => {
  return (
    <Step
      header={`${stepNumber}. Zasilanie i LEDy`}
      description="Korzystamy wyłącznie z markowych produktów renomowanych producentów."
    >
      <FieldDisabled label="Producent" value="Mean Well / Refond" />
    </Step>
  );
};

export default Project;
