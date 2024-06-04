import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../configurator/utils/axiosInstance';

const useStyles = makeStyles((theme) => ({
  btn: {
    marginBottom: '5px',
  },
  filesBox: {
    backgroundColor: '#f8f8f8',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
  },
  singleFile: {
    borderBottom: '1px solid #dbdbdb',
  },
  fileInfo: {
    color: '#9c9c9c',
    '& span': {
      marginRight: '10px',
    },
    '& a': {
      marginLeft: '10px',
      color: '#000',
    },
  },
}));

const Payment = ({ order }) => {
  const router = useRouter();

  const [paymentDisabled, setPaymentDisabled] = useState(false);
  const [paymentText, setPaymentText] = useState('Zapłać przez przelewy24');

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await axiosInstance.get(`/orders/${order.id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      if (data.paymentStatus === 'completed') {
        setPaymentText('Zamówienie opłacone');
        setPaymentDisabled(true);
      }
    };
    fetchOrder();
  }, []);

  const initPayment = async (orderId) => {
    const { data } = await axiosInstance.get(`/orders/${order.id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
      },
    });
    if (data.paymentStatus === 'completed') {
      setPaymentText('Zamówienie opłacone');
      setPaymentDisabled(true);
      return;
    }
    try {
      const { data } = await axiosInstance.post(
        '/payments',
        {
          orderId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        }
      );
      // window.open(`https://sandbox.przelewy24.pl/trnRequest/${data.token}`, '_blank');
      // router.push(`https://sandbox.przelewy24.pl/trnRequest/${data.token}`);
      router.push(`https://secure.przelewy24.pl/trnRequest/${data.token}`);
    } catch (error) {
      console.log(error);
    }
  };

  const classes = useStyles();
  return (
    <>
      <Grid container direction="column">
        <Box>
          <Button
            onClick={() => initPayment(order.orderId)}
            color="primary"
            variant="contained"
            size="small"
            className={classes.btn}
            disabled={paymentDisabled}
          >
            {paymentText}
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default Payment;
