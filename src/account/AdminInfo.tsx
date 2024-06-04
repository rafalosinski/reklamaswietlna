import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Button, Grid, makeStyles } from '@material-ui/core';

import { axiosInstance } from '../configurator/utils/axiosInstance';
import { logout } from '../../store/slices/userSlice';
import UserInfoPart from './UserInfoPart';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 20px',
    marginTop: '0px',
    marginRight: '20px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    height: '150px',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '300px',
    },
  },
  logout: {
    width: '100px',
    marginTop: '22px',
  },
}));

const AdminInfo = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [ordersCount, setOrdersCount] = useState(null);

  useEffect(() => {
    fetchOrdersCount();
  }, []);

  const fetchOrdersCount = async () => {
    try {
      const { data } = await axiosInstance('/orders/count', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
      });
      setOrdersCount(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    sessionStorage.removeItem('jwt');
    router.push('/');
  };

  return (
    <Grid container item sm={12} className={classes.root} alignContent="flex-start">
      <UserInfoPart label="Ilość zamówień" value={ordersCount} />
      <Button size="small" variant="outlined" onClick={handleLogout} className={classes.logout}>
        Wyloguj
      </Button>
    </Grid>
  );
};

export default AdminInfo;
