import { useSelector, useDispatch } from 'react-redux';
import { TextField, makeStyles } from '@material-ui/core';

import Step from '../components/Step';
import FieldCheckbox from '../fields/FieldCheckbox';
import { setProjectInfo, toggleProject } from '../../../store/slices/configSlice';

const useStyles = makeStyles((theme) => ({
  projectInfo: {
    width: '100%',
  },
}));

interface ProjectProps {
  stepNumber: number;
}

const Project = ({ stepNumber }: ProjectProps) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { config, prices } = useSelector((state) => state);

  return (
    <Step
      header={`${stepNumber}. Projekt graficzny`}
      description="Jeśli nie masz gotowego projektu możemy go dla Ciebie przygotować!"
    >
      <FieldCheckbox
        name="project"
        label="Projekt graficzny"
        value={config.project}
        price={prices.project}
        onChange={() => dispatch(toggleProject())}
      />
      {config.project && (
        <>
          <TextField
            id="additionalInfo"
            variant="outlined"
            placeholder="Opisz naszemu grafikowi jak powinien wyglądać projekt (tekst, kolory, rodzaj czcionki itp.)"
            multiline
            rows={3}
            className={classes.projectInfo}
            value={config.projectInfo}
            onChange={(e) => dispatch(setProjectInfo(e.target.value))}
          />
        </>
      )}
    </Step>
  );
};

export default Project;
