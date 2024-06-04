import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  background: {
    borderTop: '4px solid #fff',
    borderBottom: '0px solid #ccc',
    backgroundColor: '#f8f8f8',
    textAlign: 'center',
    color: '#525252',
    fontSize: '1.5rem',
    padding: '25px 0px',
  },
  header: {
    fontWeight: 'lighter',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      marginBottom: '10px',
    },
  },
  warrantyItem: {
    marginLeft: '15px',
    fontSize: '1rem',
    padding: '5px',
    '& span': {
      fontSize: '1.8rem',
      fontWeight: 'bolder',
      display: 'block',
      paddingBottom: '0px',
      marginBottom: '-5px',
    },
    background: 'url(/img/ico_warranty.png) no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
}));

const Warranty = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.background} justify="center">
        <Grid
          container
          item
          sm={12}
          md={10}
          justify="space-between"
          alignItems="center"
          style={{ maxWidth: '1200px' }}
        >
          <Grid item sm={12} md={6} className={classes.header}>
            Na wszystkie nasze produkty udzielamy gwarancji
          </Grid>
          <Grid container item sm={12} md={6} justify="center">
            <Grid item className={classes.warrantyItem}>
              <span>5 lat</span>
              na elektrykę
            </Grid>
            <Grid item className={classes.warrantyItem}>
              <span>3 lata</span>
              na wydruki
            </Grid>
            <Grid item className={classes.warrantyItem}>
              <span>3 lata</span>
              na konstrukcję
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Warranty;
