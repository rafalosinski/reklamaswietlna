import { Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  badge: {
    marginTop: '10px',
    padding: '3px 8px',
    borderRadius: '5px',
    fontSize: '0.8rem',
    marginRight: '15px',
  },
  yellow: {
    backgroundColor: '#fcf6cc',
    color: '#857400',
  },
  green: {
    backgroundColor: '#dafccc',
    color: '#364f00',
  },
}));

const Badge = ({ text, color }) => {
  const classes = useStyles();
  return <Typography className={`${classes.badge} ${color}`}>{text}</Typography>;
};

const OrderStatusBar = ({ order }) => {
  const classes = useStyles();
  return (
    <Grid item container sm={12} justify="flex-start" alignContent="center">
      {order.orderStatus === 'production' && <Badge text="W realizacji" color={classes.green} />}
      {order.orderStatus === 'completed' && <Badge text="Zrealizowane" color={classes.green} />}
      {order.paymentStatus === 'pending' && (
        <Badge text="Oczekuje na płatność" color={classes.yellow} />
      )}
      {order.paymentStatus === 'processing' && (
        <Badge text="Płatność w trakcie rozliczania" color={classes.yellow} />
      )}
      {order.proofStatus === 'ready' && (
        <Badge text="Projekt czeka na akceptację" color={classes.yellow} />
      )}
      {order.proofStatus === 'accepted' && (
        <Badge text="Projekt zaakceptowany" color={classes.green} />
      )}

      {order.paymentStatus === 'completed' && <Badge text="Opłacone" color={classes.green} />}
    </Grid>
  );
};

export default OrderStatusBar;
