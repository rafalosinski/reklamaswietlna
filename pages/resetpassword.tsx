import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { Button, CircularProgress, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { axiosInstance } from '../src/configurator/utils/axiosInstance';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
    maxWidth: '1200px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      paddingBottom: '300px',
    },
  },
  logo: {
    marginTop: '20px',
  },
  form: {
    maxWidth: '350px',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    '& > *': {
      marginTop: '15px',
      width: '100%',
    },
  },
  success: {
    marginTop: '20px',
  },
}));

const ResetPassword = () => {
  const classes = useStyles();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
  const [resetError, setResetError] = useState(false);
  const [resetErrorMessage, setResetErrorMessage] = useState('');
  const [resetButtonDisabled, setResetButtonDisabled] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetError(false);
    setResetButtonDisabled(true);
    if (newPassword !== newPasswordRepeat) {
      setResetError(true);
      setResetErrorMessage('Hasła nie są takie same');
      setResetButtonDisabled(false);
      return;
    }
    if (newPassword.length < 6) {
      setResetError(true);
      setResetErrorMessage('Hasło za krótkie. Minimum 6 znaków.');
      setResetButtonDisabled(false);
      return;
    }
    try {
      const { data } = await axiosInstance.post('/auth/reset-password', {
        password: newPassword,
        passwordConfirmation: newPassword,
        code: router.query.code,
      });
      setResetButtonDisabled(false);
      setResetSuccess(true);
    } catch (error) {
      console.log(error);
      if (
        error.response.data.message[0].messages[0].id === 'Auth.form.error.params.provide' ||
        error.response.data.message[0].messages[0].id === 'Auth.form.error.code.provide'
      ) {
        setResetError(true);
        setResetErrorMessage(
          'Niepoprawny token, spróbuj ponownie skorzystać z przypomnienia hasła. W razie dalszych problemów skontaktuj się z nami.'
        );
      }
      setResetButtonDisabled(false);
    }
  };

  return (
    <>
      <Head>
        <title>Zmiana hasła</title>
      </Head>
      <Grid container justify="center" className={classes.root}>
        <Link href="/">
          <img
            className={classes.logo}
            src="/logo_reklama_swietlna.jpg"
            alt="Reklama Świetlna"
            width="350px"
          />
        </Link>
        {resetSuccess ? (
          <Alert severity="success" className={classes.success}>
            Hasło zostało zmienione, możesz zamknąć to okno.
          </Alert>
        ) : (
          <form className={classes.form} onSubmit={handleResetPassword}>
            <Typography variant="h6" component="p">
              Zmiana hasła
            </Typography>
            {resetError && <Alert severity="error">{resetErrorMessage}</Alert>}
            <TextField
              type="password"
              size="small"
              variant="outlined"
              id="password"
              label="Nowe hasło"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              type="password"
              size="small"
              variant="outlined"
              id="repeat-password"
              label="Powtórz nowe hasło"
              value={newPasswordRepeat}
              onChange={(e) => setNewPasswordRepeat(e.target.value)}
            />
            <Button
              type="submit"
              disabled={resetButtonDisabled}
              variant="contained"
              color="primary"
            >
              {resetButtonDisabled ? (
                <CircularProgress color="secondary" size={25} />
              ) : (
                'ZMIEŃ HASŁO'
              )}
            </Button>
          </form>
        )}
      </Grid>
    </>
  );
};

export default ResetPassword;
