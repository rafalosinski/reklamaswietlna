import Step from '../components/Step';
import FieldPreview from '../fields/FieldPreview';

interface PreviewProps {
  stepNumber: number;
}

const Preview = ({ stepNumber }: PreviewProps) => {
  return (
    <Step
      header={`${stepNumber}. Podgląd kolorów`}
      description="Wizualizacja połączenia kolorów świecenia oraz koloru obudowy bez uwzględnienia rozmiarów kasetonu (wizualizator nie działa przy wyborze opcji 'mam swój projekt'). Kolory rzeczywiste mogą się różnić w zależności od ustawienia monitora."
    >
      <FieldPreview />
    </Step>
  );
};

export default Preview;
