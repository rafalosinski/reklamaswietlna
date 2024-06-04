import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Grid, Hidden, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import FacebookIcon from '@material-ui/icons/Facebook';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { setJwt } from '../../store/slices/userSlice';

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    padding: '40px 0px',
    display: 'flex',
    alignContent: 'space-between',
    alignItems: 'center',
    '& button': {
      color: '#575757',
      fontWeight: '300',
      marginLeft: '10px',
    },
    '& img': {
      cursor: 'pointer',
    },
  },
  headerNav: {
    '& a': {
      marginRight: '5px',
      backgroundColor: '#fff',
      padding: '7px 11px 2px 11px',
      textDecoration: 'none',
      color: '#333333',
      fontSize: '0.9rem',
      borderRadius: '4px',
      transition: '0.2s all ease-in-out',
      letterSpacing: '0.5px',
      cursor: 'pointer',
    },
    '& a:hover': {
      backgroundColor: theme.palette.grey[100],
    },
    '& a.current': {
      backgroundColor: theme.palette.primary.main,
      fontWeight: 'normal',
      boxShadow: '0px 3px 3px #d9d9d9',
    },
    '& a.current:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  mobile: {
    marginBottom: '20px',
    marginTop: '-30px',
    '& a': {
      marginLeft: '5px',
      marginRight: '5px',
      marginBottom: '8px',
      textDecoration: 'none',
      borderRadius: '3px',
      color: '#000',
      padding: '5px 10px 5px 10px',
    },
    '& a.current': {
      backgroundColor: theme.palette.primary.main,
      fontWeight: 'normal',
    },
  },
  subActive: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Header = () => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirect = (path) => {
    router.push(path);
  };

  useEffect(() => {
    const jwt = sessionStorage.getItem('jwt');
    jwt !== null ? dispatch(setJwt(jwt)) : '';
  }, []);

  return (
    <Grid container item xs={12} md={10} style={{ maxWidth: '1200px' }} spacing={3}>
      <header className={classes.header}>
        <Grid item xs={8} lg={3}>
          <Link href="/">
            <span>
              <Image width={389} height={50} src="/logo.jpg" alt="Reklama Świetlna" />
            </span>
          </Link>
        </Grid>
        <Grid
          justify="flex-end"
          container
          item
          xs={4}
          lg={9}
          spacing={2}
          className={classes.headerNav}
        >
          <Hidden mdDown>
            <Link href="/">
              <a className={router.pathname === '/' ? 'current' : ''}>Home</a>
            </Link>
            <Link href="/konfigurator">
              <a className={router.pathname === '/konfigurator' ? 'current' : ''}>Konfigurator</a>
            </Link>
            <a
              className={
                router.pathname === '/kasetony-jednostronne' ||
                router.pathname === '/kasetony-dwustronne' ||
                router.pathname === '/litery-3d'
                  ? 'current'
                  : ''
              }
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              Oferta
            </a>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                className={router.pathname === '/kasetony-jednostronne' ? classes.subActive : ''}
                onClick={() => redirect('/kasetony-jednostronne')}
              >
                Kasetony jednostronne
              </MenuItem>
              <MenuItem
                className={router.pathname === '/kasetony-dwustronne' ? classes.subActive : ''}
                onClick={() => redirect('/kasetony-dwustronne')}
              >
                Kasetony dwustronne
              </MenuItem>
              <MenuItem
                className={router.pathname === '/litery-3d' ? classes.subActive : ''}
                onClick={() => redirect('/litery-3d')}
              >
                Litery 3D
              </MenuItem>
            </Menu>
            <Link href="/realizacje">
              <a className={router.pathname === '/realizacje' ? 'current' : ''}>Realizacje</a>
            </Link>
            <Link href="/faq">
              <a
                className={
                  router.pathname === '/faq' ||
                  router.pathname === '/porownanie-kasetonow' ||
                  router.pathname === '/regulamin' ||
                  router.pathname === '/proces-zamowienia' ||
                  router.pathname === '/polityka-prywatnosci'
                    ? 'current'
                    : ''
                }
              >
                Pomoc
              </a>
            </Link>
            <Link href="/kontakt">
              <a className={router.pathname === '/kontakt' ? 'current' : ''}>Kontakt</a>
            </Link>
            {user.isLoggedIn ? (
              <Link href="/konto">
                <a className={router.pathname === '/konto' ? 'current' : ''}>Twoje konto</a>
              </Link>
            ) : (
              <Link href="/logowanie">
                <a className={router.pathname === '/logowanie' ? 'current' : ''}>
                  Logowanie / Rejestracja
                </a>
              </Link>
            )}

            <a target="_blank" href="https://www.facebook.com/hermesprintingsolutions/">
              <FacebookIcon fontSize="small" />
            </a>
          </Hidden>
          <Hidden lgUp>
            <IconButton>
              {mobileMenu ? (
                <CloseIcon onClick={() => setMobileMenu(!mobileMenu)} />
              ) : (
                <MenuIcon onClick={() => setMobileMenu(!mobileMenu)} />
              )}
            </IconButton>
          </Hidden>
        </Grid>
      </header>
      {mobileMenu && (
        <Grid
          container
          item
          sm={12}
          justify="center"
          alignItems="center"
          className={classes.mobile}
        >
          <Link href="/">
            <a className={router.pathname === '/' ? 'current' : ''}>Home</a>
          </Link>
          <Link href="/konfigurator">
            <a className={router.pathname === '/konfigurator' ? 'current' : ''}>Konfigurator</a>
          </Link>
          <Link href="/realizacje">
            <a className={router.pathname === '/realizacje' ? 'current' : ''}>Realizacje</a>
          </Link>
          <Link href="/faq">
            <a
              className={
                router.pathname === '/faq' ||
                router.pathname === '/porownanie-kasetonow' ||
                router.pathname === '/regulamin' ||
                router.pathname === '/proces-zamowienia' ||
                router.pathname === '/polityka-prywatnosci'
                  ? 'current'
                  : ''
              }
            >
              Pomoc
            </a>
          </Link>
          <Link href="/kontakt">
            <a className={router.pathname === '/kontakt' ? 'current' : ''}>Kontakt</a>
          </Link>
          {user.isLoggedIn ? (
            <Link href="/konto">
              <a className={router.pathname === '/konto' ? 'current' : ''}>Twoje konto</a>
            </Link>
          ) : (
            <Link href="/logowanie">
              <a className={router.pathname === '/logowanie' ? 'current' : ''}>
                Logowanie / Rejestracja
              </a>
            </Link>
          )}
          <a target="_blank" href="https://www.facebook.com/hermesprintingsolutions/">
            <FacebookIcon fontSize="small" />
          </a>
        </Grid>
      )}
    </Grid>
  );
};

export default Header;
