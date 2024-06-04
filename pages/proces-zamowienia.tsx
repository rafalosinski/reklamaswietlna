import { Box, makeStyles, Typography } from '@material-ui/core';

import Help from '../src/help/help';

const useStyles = makeStyles((theme) => ({
  header: { marginBottom: '25px' },
  section: {
    marginBottom: '25px',
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
      borderBottom: '2px solid #FBA82C',
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

const Proces = () => {
  const classes = useStyles();

  return (
    <Help current="proces-zamowienia" titlePart="Proces składania zamówienia">
      <Typography variant="h5" component="h1" className={classes.header}>
        Proces składania zamówień
      </Typography>
      <Box>
        <div className={classes.section}>
          <p>1. Konfigurator</p>
          <p>
            <strong>Produkt.</strong> Krok 1 to wybór rodzaju kasetonu i konfiguracja podstawowych
            opcji, w tym rozmiaru, kolorów i opcji dodatkowych.
          </p>
          <p>
            <strong>Wysyłka.</strong> Kolejny etap to wybór metody dostawy. Dostępne metody zależą
            od rodzaju i rozmiaru wybranego kasetonu. Zaznacz jedną z nich.
          </p>
          <p>
            <strong>Twoje dane.</strong> Jeśli nie zalogowałeś się wcześniej najpierw wyświetlą się
            okna logowania / rejestracji. Po zalogowaniu / rejestracji pojawią się pola do
            wprowadzenia danych do faktury i danych kontaktowych. Możesz również wpisać dodatkowe
            informacje i uwagi odnośnie kasetonu. Jeśli to Twoje kolejne zamówienie możesz uzupełnić
            pola w tym kroku automatycznie danymi z poprzedniego zamówienia.
          </p>
          <p>
            <strong>Podsumowanie.</strong> Ostatnim krokiem jest sprawdzenie poprawności danych
            zamówienia, potwierdź zgodność i zaznajomienie się z regulaminem serwisu i na koniec
            kliknij "Zamów". Jeśli wszystko przebiegło pomyślnie zobaczysz komunikat o złożeniu
            zamówienia z przypisanym numerem.
          </p>
        </div>
        <div className={classes.section}>
          <p>2. Płatność i pliki</p>
          <p>
            Listę i szczegóły swoich zamówień możesz sprawdzić w zakładce Konto dostępnej po
            zalogowaniu.
          </p>
          <p>
            Opłać zamówienie - tymczasowo dostępna jest jedynie płatność przelewem na konto bankowe.
            W tytule przelewu wpisz nr zamówienia.
          </p>
          <p>
            Prześlij pliki - opcja dostępna po zalogowaniu w zakładce Konto. Możesz dodać dowolną
            ilość plików potrzebnych do zamówienia (nie większych niż 200MB). Większe pliki możesz
            przesłać na nasz FTP lub wysłać link, po więcej informacji skonaktuj się z nami.
          </p>
        </div>
        <div className={classes.section}>
          <p>3. Akceptacja finalnego podglądu</p>
          <p>
            Po opłaceniu zamówienia i ewentualnym przesłaniu plików przygotujemy finalny podgląd
            kasetonu, który wyślemy na Twojego maila podanego przy rejestracji.
          </p>
          <p>Po Twojej akceptacji zamówienie przekazywane jest do realizacji.</p>
        </div>
        <div className={classes.section}>
          <p>4. Realizacja</p>
          <p>
            Termin realizacji liczony jest od momentu zaakceptowania finalnego podglądu, standardowo
            5-10 dni roboczych, ekspres od 3 do 5 dni w zależności od rodzaju kasetonu.
          </p>
          <p>O możliwości odbioru lub wysyłce poinforujemy Cię telefonicznie lub mailowo.</p>
          <p>Fakturę vat lub paragon dostaniesz mailowo w dniu otrzymania / odbioru zamówienia.</p>
        </div>
      </Box>
    </Help>
  );
};

export default Proces;
