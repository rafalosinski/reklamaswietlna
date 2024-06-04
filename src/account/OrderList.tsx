import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, makeStyles, Grid, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import dayjs from 'dayjs';

import { axiosInstance } from '../configurator/utils/axiosInstance';
import OrderInfo from './OrderInfo';
import OrderListPartial from './OrderListPartial';
import OrderStatusBar from './OrderStatusBar';
import FileUpload from './FileUpload';
import Payment from './Payment';
import Invoice from './Invoice';
import ProofUpload from './ProofUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  single: {
    width: '100%',
    backgroundColor: '#fff',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    padding: '20px 20px',
    marginBottom: '25px',
  },
  header: {
    fontWeight: 'lighter',
  },
  headerOrderNumber: {
    fontWeight: 'bold',
  },
  headerDate: {
    fontSize: '1rem',
    marginLeft: '15px',
  },
  headerPrice: {
    fontSize: '1rem',
    marginLeft: '15px',
  },
  payment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoBox: {
    boxShadow: 'none',
    width: '100%',
  },
  spinner: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '50px',
  },
  margin0: {
    margin: '0px',
    padding: '0px',
  },
  accordionSummary: {
    padding: '0px',
  },
  accordionSummaryText: {
    borderBottom: '1px dashed #969696',
  },
  btn: {
    marginBottom: '5px',
  },
}));

const OrderList = () => {
  const router = useRouter();

  const [orderList, setOrderList] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/orders', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      setOrderList(data);
    } catch (error) {
      setOrderList([]);
      setError(true);
      setErrorMessage(error.message);
      router.push('/');
    }
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {error && <Alert severity="error">{errorMessage}</Alert>}
        {orderList ? (
          orderList.map((order) => (
            <Box key={order.orderId} className={classes.single}>
              <Grid container>
                <Grid item sm={12}>
                  <Typography variant="h6" className={classes.header}>
                    Zamówienie nr <span className={classes.headerOrderNumber}>{order.orderId}</span>{' '}
                    <span className={classes.headerDate}>
                      {dayjs(order.createdAt).format('DD/MM/YYYY')}
                    </span>
                    <span className={classes.headerPrice}>
                      {order.prices.totalNet.toFixed(2)} zł netto
                    </span>
                  </Typography>
                </Grid>
                <OrderStatusBar order={order} />

                <OrderListPartial label="Pliki">
                  <FileUpload order={order} />
                </OrderListPartial>

                <OrderListPartial label="Płatność">
                  <Payment order={order} />
                </OrderListPartial>

                <OrderListPartial label="Faktura">
                  <Invoice order={order} />
                </OrderListPartial>

                <OrderListPartial label="Wizualizacja">
                  <ProofUpload order={order} />
                </OrderListPartial>

                <OrderListPartial label="Szczegóły zamówienia">
                  <OrderInfo order={order} />
                </OrderListPartial>
              </Grid>
            </Box>
          ))
        ) : (
          <CircularProgress size={50} className={classes.spinner} />
        )}
      </div>
    </>
  );
};

export default OrderList;
