import { Typography, makeStyles } from '@material-ui/core';

import Help from '../src/help/help';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: '30px',
  },
  section: {
    marginBottom: '15px',
    fontSize: '1rem',
    '& a': {
      color: '#000',
      fontWeight: 'bolder',
      textDecoration: 'none',
      borderBottom: '1px solid #f0940c',
    },
    '& a:hover': {
      color: '#ffaf38',
      textDecoration: 'none',
      borderBottom: '1px solid #ffaf38',
    },
    '& p': {
      marginBottom: '12px',
      marginTop: '12px',
    },
    '& p:first-of-type': {
      fontSize: '1.3rem',
      fontWeight: 'bolder',
      paddingLeft: '0px',
    },
    '& ul': {
      listStyle: 'none',
      paddingLeft: '27px',
      '& li': {
        marginBottom: '10px',
      },
    },
  },
}));

const PolitykaPrywatnosci = () => {
  const classes = useStyles();

  return (
    <Help current="polityka-prywatnosci" titlePart="Polityka prywatności">
      <Typography variant="h5" component="h1" className={classes.header}>
        Polityka prywatności
      </Typography>
      <div className={classes.section}>
        <p>Kto jest administratorem danych?</p>
        <p>
          Właścicielem i Administratorem www.reklamaswietlna.com jest: Hermes Chechłowski Bręk
          spółka cywilna, ul. Anecińska 14, 03-106 Warszawa, NIP 5242896557. Email:{' '}
          <a href="mailto:biuro@reklamaswietlna.com">biuro@reklamaswietlna.com</a>
        </p>
      </div>
      <div className={classes.section}>
        <p>Przetwarzanie i gromadzenie danych</p>
        <p>
          Serwis www.reklamaswietlna.com nie udostępnia ani nie wykorzystuje w celach marketingowych
          danych przekazywanych przez Użytkowników portalu potrzebnych do realizacji zamówienia
          (dane osobowe, dane do faktury).
        </p>
        <p>
          Gromadzimy dane potrzebne do realizacji zamówienia, w tym dane do faktury, dane kontaktowe
          oraz adres dostawy. Oprócz tego zapisujemy email podany przy rejestracji serwisu, który
          jest powiązany z kontem Użytkownika.
        </p>
        <p>Serwis gromadzi i wykorzystuje anonimowe dane zbierane przez Google Analytics.</p>
      </div>
      <div className={classes.section}>
        <p>Twoje prawa</p>
        <p>
          Kazdy Użytkownik ma prawo do podglądu swoich danych oraz ich zmiany. Może też żądać
          bezpowrotnego usunięcia gromadzonych danych.
        </p>
      </div>
    </Help>
  );
};

export default PolitykaPrywatnosci;
