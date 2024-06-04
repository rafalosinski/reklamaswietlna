import { Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  step: {
    padding: '5px 0px',
    borderBottom: '1px solid #f0f0f0',
    borderRadius: '3px',
    marginBottom: '0px',
    '& label': {
      backgroundColor: 'white',
    },
  },
  stepNumber: {
    fontStyle: 'italic',
    fontWeight: 'lighter',
    color: '#868686',
  },
  stepHeader: {
    fontWeight: 'lighter',
  },
  stepDescription: {
    paddingRight: '35px',
    lineHeight: '1.1',
    fontWeight: 'lighter',
    fontSize: '0.9rem',
    color: '#868686',
  },
  consents: {
    marginTop: '30px',
  },
}));

const InfoPartial = ({ description, children }) => {
  const classes = useStyles();
  return (
    <Grid container item sm={12} alignItems="center" className={classes.step}>
      <Grid item sm={4}>
        <Typography variant="body2" className={classes.stepDescription}>
          {description}
        </Typography>
      </Grid>
      <Grid item sm={8}>
        {children}
      </Grid>
    </Grid>
  );
};

export default InfoPartial;
