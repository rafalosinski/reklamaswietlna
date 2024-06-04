import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Typography,
  makeStyles,
  Grid,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from '@material-ui/core';
import dayjs from 'dayjs';

import { axiosInstance } from '../configurator/utils/axiosInstance';
import OrderListPartial from './OrderListPartial';

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
    marginTop: '15px',
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

const UserList = () => {
  const router = useRouter();

  const [userList, setUserList] = useState(null);
  const [disabledDiscount, setDisabledDiscount] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosInstance.get('/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      setUserList(data);
    } catch (error) {
      setUserList([]);
      router.push('/');
    }
  };

  const paymentOptions = [
    { label: 'brak', value: '0' },
    { label: '1%', value: '1' },
    { label: '2%', value: '2' },
    { label: '3%', value: '3' },
    { label: '4%', value: '4' },
    { label: '5%', value: '5' },
    { label: '6%', value: '6' },
    { label: '7%', value: '7' },
    { label: '8%', value: '8' },
    { label: '9%', value: '9' },
    { label: '10%', value: '10' },
    { label: '11%', value: '11' },
    { label: '12%', value: '12' },
    { label: '13%', value: '13' },
    { label: '14%', value: '14' },
    { label: '15%', value: '15' },
    { label: '16%', value: '16' },
    { label: '17%', value: '17' },
    { label: '18%', value: '18' },
    { label: '19%', value: '19' },
    { label: '21%', value: '21' },
    { label: '22%', value: '22' },
    { label: '23%', value: '23' },
    { label: '24%', value: '24' },
    { label: '25%', value: '25' },
    { label: '26%', value: '26' },
    { label: '27%', value: '27' },
    { label: '28%', value: '28' },
    { label: '29%', value: '29' },
    { label: '30%', value: '30' },
  ];

  const handleDiscountChange = async (event, user) => {
    try {
      setDisabledDiscount(true);
      const { data } = await axiosInstance.put(
        `/users/${user.id}`,
        { discount: Number(event.target.value) },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` } }
      );
      fetchOrders();
    } catch (error) {
      console.log(error);
    } finally {
      setDisabledDiscount(false);
    }
  };

  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {userList ? (
          userList.map((user) => (
            <Box key={user.id} className={classes.single}>
              <Grid container>
                <Grid item sm={12}>
                  <Typography variant="h6" className={classes.header}>
                    <span className={classes.headerOrderNumber}>{user.email}</span>{' '}
                    <span className={classes.headerDate}>
                      {dayjs(user.createdAt).format('DD/MM/YYYY')}
                    </span>
                    <span className={classes.headerPrice}>{`Zamówień: ${user.orders.length}`}</span>
                  </Typography>
                </Grid>
                <OrderListPartial label={`Rabat ${user.discount}%`}>
                  <FormControl variant="outlined" margin="dense">
                    <Select
                      id="discount"
                      value={user.discount}
                      disabled={disabledDiscount}
                      onChange={(event) => handleDiscountChange(event, user)}
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

export default UserList;
