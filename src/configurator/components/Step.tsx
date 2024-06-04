import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  step: {
    borderBottom: '1px solid #e6e6e6',
    padding: '15px 15px',
    borderRadius: '3px',
    marginBottom: '0px',
    '& label': {
      backgroundColor: 'white',
    },
  },
  stepHeader: {
    fontWeight: 'lighter',
  },
  stepDescription: {
    paddingRight: '35px',
    lineHeight: '1.1',
    fontWeight: 'lighter',
    fontSize: '0.9rem',
    color: '#6e6e6e',
    '& a': {
      color: '#000',
      textDecoration: '',
    },
    '& a:hover': {
      color: theme.palette.primary.main,
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '10px',
    },
  },
}));

interface StepProps {
  children: React.ReactNode;
  header: string;
  description: any;
}

const Step = ({ children, header, description }: StepProps) => {
  const classes = useStyles();

  return (
    <Grid container item sm={12} alignItems="center" className={classes.step}>
      <Grid item sm={6}>
        <Typography variant="h6" className={classes.stepHeader}>
          {header}
        </Typography>
        <Typography component="div" variant="body2" className={classes.stepDescription}>
          {description}
        </Typography>
      </Grid>
      <Grid item sm={6}>
        {children}
      </Grid>
    </Grid>
  );
};

export default Step;
