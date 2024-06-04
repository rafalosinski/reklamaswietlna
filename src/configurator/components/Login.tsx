import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Button,
  Checkbox,
  TextField,
  makeStyles,
  FormControlLabel,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { setJwt } from '../../../store/slices/userSlice';
import { axiosInstance } from '../utils/axiosInstance';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '20px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      marginTop: '15px',
      width: '70%',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: '0px',
      paddingBottom: '30px',
      borderBottom: '1px solid #ccc',
    },
  },
  regLink: {
    marginLeft: '5px',
    marginRight: '5px',
    textDecoration: 'underline 1px solid #000',
    color: '#000',
    cursor: 'pointer',
  },
  regForm: {
    borderRadius: '5px',
    paddingBottom: '30px',
    border: '1px solid #FBA82C',
  },
}));

const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false);

  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordRepeat, setRegisterPasswordRepeat] = useState('');
  const [registerConsent, setRegisterConsent] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [registerErrorMessage, setRegisterErrorMessage] = useState('');
  const [registerButtonDisabled, setRegisterButtonDisabled] = useState(false);

  const [passwordRestoration, setPasswordRestoration] = useState(false);
  const [passwordRestorationError, setPasswordRestorationError] = useState(false);
  const [restorationButtonDisabled, setRestorationButtonDisabled] = useState(false);
  const [restorationMessageSuccess, setRestorationMessageSuccess] = useState(false);

  const user = useSelector((state) => state.user);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginButtonDisabled(true);
    try {
      const { data } = await axiosInstance.post('/auth/local', {
        identifier: loginEmail,
        password: loginPassword,
      });
      const { jwt } = data;
      dispatch(setJwt(jwt));
      sessionStorage.setItem('jwt', jwt);
      data.user.role.name === 'Manager' ? router.push('/admin') : '';
    } catch (error) {
      setLoginError(true);
    } finally {
      setLoginButtonDisabled(false);
    }
  };

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    setRegisterError(false);
    setRegisterButtonDisabled(true);
    if (registerEmail === '' || registerPassword === '') {
      setRegisterError(true);
      setRegisterErrorMessage('Wypełnij formularz');
      setRegisterButtonDisabled(false);
      return;
    }
    if (registerPassword !== registerPasswordRepeat) {
      setRegisterError(true);
      setRegisterErrorMessage('Hasła nie są takie same');
      setRegisterButtonDisabled(false);
      return;
    }
    if (registerPassword.length < 6) {
      setRegisterError(true);
      setRegisterErrorMessage('Hasło za krótkie. Min. 6 znaków');
      setRegisterButtonDisabled(false);
      return;
    }
    if (!registerConsent) {
      setRegisterError(true);
      setRegisterErrorMessage('Musisz zaakceptować regulamin');
      setRegisterButtonDisabled(false);
      return;
    }
    try {
      const response = await axiosInstance.post('/auth/local/register', {
        email: registerEmail,
        username: registerEmail,
        password: registerPassword,
      });
      const { jwt } = await response.data;
      dispatch(setJwt(jwt));
      sessionStorage.setItem('jwt', jwt);
    } catch (error) {
      if (error.response.data.message[0].messages[0].id === 'Auth.form.error.email.taken') {
        setRegisterError(true);
        setRegisterErrorMessage(
          'Konto z tym adresem email już istnieje. Skorzystaj z przypomnienia hasła.'
        );
      }
    } finally {
      setRegisterButtonDisabled(false);
    }
  };

  const handleRestorePassword = async (e) => {
    e.preventDefault();
    setRestorationMessageSuccess(false);
    setPasswordRestorationError(false);
    setRestorationButtonDisabled(true);
    try {
      const { data } = await axiosInstance.post('/auth/forgot-password', {
        email: loginEmail,
      });
      setRestorationMessageSuccess(true);
      setRestorationButtonDisabled(false);
    } catch (error) {
      console.log(error);
      setPasswordRestorationError(true);
      setRestorationButtonDisabled(false);
    }
  };

  return (
    <>
      {!user.isLoggedIn && (
        <Grid container className={classes.root}>
          <Grid container item sm={6} alignItems="flex-start">
            {!passwordRestoration ? (
              <form className={classes.form} onSubmit={handleLoginSubmit}>
                <Typography variant="h6" component="p">
                  Zaloguj się
                </Typography>
                {loginError && <Alert severity="error">Niepoprawny email lub hasło.</Alert>}
                <TextField
                  size="small"
                  variant="outlined"
                  id="login-email"
                  label="Email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <TextField
                  type="password"
                  size="small"
                  variant="outlined"
                  id="login-password"
                  label="Hasło"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <Box
                  className={classes.regLink}
                  onClick={() => setPasswordRestoration(!passwordRestoration)}
                >
                  {passwordRestoration ? 'Powrót do logowania' : 'Zapomniałeś hasła?'}
                </Box>
                <Button
                  type="submit"
                  disabled={loginButtonDisabled}
                  variant="contained"
                  color="primary"
                  id="login-button"
                >
                  {loginButtonDisabled ? (
                    <CircularProgress color="secondary" size={25} />
                  ) : (
                    'ZALOGUJ'
                  )}
                </Button>
              </form>
            ) : (
              <form className={classes.form} onSubmit={handleRestorePassword}>
                <Typography variant="h6" component="p">
                  Resetowanie hasła
                </Typography>
                <Box>
                  Wprowadź adres email podany przy rejestracji. Wyślemy na niego link do zmiany
                  hasła.
                </Box>
                {passwordRestorationError && (
                  <Alert severity="error">Niepoprawny adres email</Alert>
                )}
                {restorationMessageSuccess && (
                  <Alert severity="success">Sprawdź skrzynkę email.</Alert>
                )}
                <TextField
                  size="small"
                  variant="outlined"
                  id="password-restoration"
                  label="Email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
                <Box
                  className={classes.regLink}
                  onClick={() => setPasswordRestoration(!passwordRestoration)}
                >
                  {passwordRestoration ? 'Powrót do logowania' : 'Zapomniałeś hasła?'}
                </Box>
                <Button
                  type="submit"
                  disabled={restorationButtonDisabled}
                  variant="contained"
                  color="primary"
                >
                  {restorationButtonDisabled ? (
                    <CircularProgress color="secondary" size={25} />
                  ) : (
                    'RESETUJ HASŁO'
                  )}
                </Button>
              </form>
            )}
          </Grid>
          <Grid container item sm={6} alignItems="center">
            <form
              className={`${classes.form} ${classes.regForm}`}
              onSubmit={handleRegistrationSubmit}
            >
              <Typography variant="h6" component="p">
                Nie masz konta?
              </Typography>
              {registerError && <Alert severity="error">{registerErrorMessage}</Alert>}
              <TextField
                size="small"
                type="email"
                variant="outlined"
                id="register-email"
                label="Email"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <TextField
                size="small"
                type="password"
                variant="outlined"
                id="register-password"
                label="Hasło"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <TextField
                size="small"
                type="password"
                variant="outlined"
                id="register-password"
                label="Powtórz hasło"
                onChange={(e) => setRegisterPasswordRepeat(e.target.value)}
              />
              <FormControlLabel
                control={
                  <>
                    <Checkbox
                      checked={registerConsent}
                      name="register-consent"
                      color="primary"
                      onChange={() => setRegisterConsent(!registerConsent)}
                    />
                    <label>
                      Akceptuję
                      <Link href="/regulamin">
                        <a target="_blank" className={classes.regLink}>
                          regulamin
                        </a>
                      </Link>
                      serwisu
                    </label>
                  </>
                }
                label=""
              />
              <Button
                type="submit"
                disabled={registerButtonDisabled}
                variant="contained"
                color="primary"
              >
                {registerButtonDisabled ? (
                  <CircularProgress color="secondary" size={25} />
                ) : (
                  'Zarejestruj się'
                )}
              </Button>
            </form>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Login;
