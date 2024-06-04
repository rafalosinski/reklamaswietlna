import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  makeStyles,
  Grid,
  Button,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import dayjs from 'dayjs';

import { axiosInstance } from '../configurator/utils/axiosInstance';
import OrderInfo from './OrderInfo';
import OrderListPartial from './OrderListPartial';
import OrderStatusBar from './OrderStatusBar';
import FileUpload from './FileUpload';
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
    marginTop: '25px',
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
  const [disabledPayment, setDisabledPayment] = useState(false);
  const [disabledOrderStatus, setDisabledOrderStatus] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/orders/all', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      setOrderList(data);
    } catch (error) {
      setOrderList([]);
      router.push('/');
    }
  };

  const paymentOptions = [
    { label: 'Brak płatności', value: 'pending' },
    { label: 'Zapłacone', value: 'completed' },
  ];
  const statusOptions = [
    { label: 'W realizacji', value: 'production' },
    { label: 'Zrealizowane', value: 'completed' },
  ];

  const handlePaymentChange = async (event, order) => {
    try {
      setDisabledPayment(true);
      const { data } = await axiosInstance.put(
        `/orders/${order.id}`,
        { paymentStatus: event.target.value },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` } }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setDisabledPayment(false);
    }
  };

  const handleStatusChange = async (event, order) => {
    try {
      setDisabledOrderStatus(true);
      const { data } = await axiosInstance.put(
        `/orders/${order.id}`,
        { orderStatus: event.target.value },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` } }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setDisabledOrderStatus(false);
    }
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
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
                    <span className={classes.headerPrice}>
                      {order.author && order.author.email}
                    </span>
                  </Typography>
                </Grid>
                <OrderStatusBar order={order} />

                <OrderListPartial label="Pliki">
                  <FileUpload order={order} admin />
                </OrderListPartial>

                <OrderListPartial label="Status">
                  <FormControl variant="outlined" margin="dense">
                    <Select
                      id="status"
                      value={order.orderStatus}
                      disabled={disabledPayment}
                      onChange={(event) => handleStatusChange(event, order)}
                    >
                      {statusOptions.map((option) => {
                        return (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </OrderListPartial>

                <OrderListPartial label="Płatność">
                  <FormControl variant="outlined" margin="dense">
                    <Select
                      id="payment"
                      value={order.paymentStatus}
                      disabled={disabledPayment}
                      onChange={(event) => handlePaymentChange(event, order)}
                    >
                      {paymentOptions.map((option) => {
                        return (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </OrderListPartial>

                <OrderListPartial label="Faktura">
                  <Invoice order={order} admin />
                </OrderListPartial>

                <OrderListPartial label="Wizualizacja">
                  <ProofUpload order={order} admin />
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
