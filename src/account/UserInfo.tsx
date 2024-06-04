import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../configurator/utils/axiosInstance';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

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
      marginRight: '0px',
    },
  },
  logout: {
    width: '100px',
    marginTop: '22px',
    [theme.breakpoints.down('sm')]: {},
  },
}));

const UserInfo = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState('...');

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosInstance('/users/me', {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('jwt')}` },
      });
      setUserEmail(data.email);
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
    <Grid
      container
      item
      sm={12}
      className={classes.root}
      alignContent="flex-start"
      direction="column"
    >
      <UserInfoPart label="Użytkownik" value={userEmail} />
      <Box>
        <Button size="small" variant="outlined" onClick={handleLogout} className={classes.logout}>
          Wyloguj
        </Button>
      </Box>
    </Grid>
  );
};

export default UserInfo;
