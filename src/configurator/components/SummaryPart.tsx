import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  summaryPart: {
    borderBottom: '1px solid #DADADA',
    color: '#858585',
    textAlign: 'right',
  },
  stepPrice: {
    fontWeight: 'lighter',
    fontSize: '0.9rem',
  },
  priceCaption: {
    fontWeight: 'lighter',
    fontSize: '0.9rem',
  },
}));

interface SummaryPartProps {
  name: string;
  price: any;
}

const SummaryPart = ({ name, price }: SummaryPartProps) => {
  const classes = useStyles();

  return (
    <Grid container item xs={12} className={classes.summaryPart}>
      <Grid item xs={7}>
        <Typography className={classes.priceCaption} align="left">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography className={classes.stepPrice} align="right">
          {price} zł
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SummaryPart;
