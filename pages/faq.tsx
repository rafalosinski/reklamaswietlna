import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import Help from '../src/help/help';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  header: { marginBottom: '20px' },
  accordionSummary: {
    boxShadow: 'none',
    borderBottom: '1px solid #ccc',
    borderTop: '0px',
    borderRadius: '0px',
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
  },
}));
const faqList = [
  {
    question: 'Kim jesteśmy?',
    answear: (
      <Box>
        Właścicielem i administratorem www.reklamaswietlna.com jest: Hermes Chechłowski Bręk spółka
        cywilna, ul. Anecińska 14, 03-106 Warszawa, NIP 5242896557. Jesteśmy producentem kasetonów z
        wieloletnim doświadczeniem. Oprócz tego działamy również jako drukarnia wizualna. Nasza
        pełna oferta dostępna jest na stronie{' '}
        <a href="https://printing-solutions.pl" target="_blank">
          printing-solutions.pl
        </a>
      </Box>
    ),
  },
  {
    question: 'Jak złożyć zamówienie?',
    answear: (
      <Box>
        Aby złożyć zamówienie skorzystaj z naszego{' '}
        <Link href="/konfigurator">
          <a>konfiguratora</a>
        </Link>{' '}
        kasetonów. W kroku 3 będziesz musiał zalogować się na swoje konto (lub zarejestrować się
        jeśli nie masz konta). Więcej informacji o procesie zamawiania znajdziesz w zakładce{' '}
        <Link href="/proces-zamowienia">
          <a>Proces składania zamówienia</a>
        </Link>{' '}
      </Box>
    ),
  },
  {
    question: 'Jaki kaseton wybrać?',
    answear: (
      <Box>
        Obecnie w naszym konfiguratorze oferujemy wybór 4 różnych kasetonów, z czego 3 z nich
        również w wersji dwustronnej. Przykładowe kasetony z każdej grupy znajdziesz w zakładce{' '}
        <Link href="/realizacje">
          <a>Realizacje</a>
        </Link>
        . W wyborze może też pomóc tabela z{' '}
        <Link href="/porownanie-kasetonow">
          <a>porównaniem kasetonów</a>
        </Link>
        . Jeśli potrzebujesz dodatkowych informacji możemy doradzić Ci również telefonicznie lub
        mailowo.
      </Box>
    ),
  },
  {
    question: 'Problem z konfiguratorem?',
    answear: (
      <Box>
        Jeśli masz wątpliwości jak skorzystać z konfiguratora lub potrzebujesz więcej informacji na
        temat jakiejś opcji skontaktuj się z nami telefonicznie pod nr{' '}
        <a href="tel:+48509467369">509 467 369</a>.
      </Box>
    ),
  },
  {
    question: 'Metody dostawy i odbiór',
    answear: (
      <Box>
        Każdy kaseton można odebrać osobiście w siedzibie firmy - ul. Anecińska 14, 03-106 Warszawa.
        Oferujemy też wysyłkę paczką standardową lub gabarytową w zależności od rozmiaru.
        Dysponujemy też własnym transportem - możemy dowieźć kaseton w dowolne miejsce w Polsce.
        Aktualne opcje z ceną znajdziesz w 2 kroku konfiguratora.
      </Box>
    ),
  },
  {
    question: 'Gwarancja',
    answear: (
      <Box>
        Zapewniamy najwyższą jakość naszych produktów! Wszystkie kasetony objęte są 5-letnią
        gwarancją na elektrykę oraz 3-letnią gwarancją na konstrukcję i wydruki. Gwarancję
        realizujemy w formie door-to-door.
      </Box>
    ),
  },
  {
    question: 'Montaż kasetonu',
    answear: (
      <Box>
        Oferujemy montaż na terenie Warszawy i okolic, a także w całej Polsce. Każde zlecenie jest
        wyceniane indywidualnie. Żeby otrzymać wycenę wyślij maila na adres{' '}
        <a href="mailto:biuro@reklamaswietlna.com">biuro@reklamaswietlna.com</a> ze zdjęciami
        miejsca montażu, lokalizacją, ewentualnymi wymogami technicznymi oraz nr zamówienia jakiego
        dotyczy wycena
      </Box>
    ),
  },
  {
    question: 'Termin realizacji',
    answear: (
      <Box>
        Standardowy termin realizacji na zamówienia złożone za pośrednictwem konfiguratora wynosi
        5-10 dni roboczych od momentu akceptacji wizualizacji kasetonu (więcej informacji w zakładce{' '}
        <Link href="/proces-zamowienia">
          <a>Proces składania zamówienia</a>
        </Link>
        ). Dostępny jest również tryb ekspresowy realizacji do 3 lub 5 dni roboczych w zależności od
        rodzaju kasetonu
      </Box>
    ),
  },
  {
    question: 'Nie znalazłeś szukanego produktu?',
    answear: (
      <Box>
        Oprócz produktów w konfiguratorze oferujemy również całą gamę innych form reklam świetlnych,
        liter 3D, pylonów itd. W razie pytań{' '}
        <Link href="/kontakt">
          <a>skontaktuj się</a>
        </Link>{' '}
        z nami.
      </Box>
    ),
  },
];

const FAQ = () => {
  const classes = useStyles();

  return (
    <Help current="FAQ" titlePart="FAQ - pytania i odpowiedzi">
      <Typography variant="h5" component="h1" className={classes.header}>
        Pytania i odpowiedzi
      </Typography>
      <Box>
        {faqList.map(({ question, answear }) => (
          <Accordion className={classes.accordionSummary} key={question}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id={question}
              key={question}
              style={{ border: '0px', paddingLeft: '5px' }}
            >
              <Typography>
                <strong>{question}</strong>
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ border: '0px', marginTop: '-10px', paddingLeft: '5px' }}>
              <Typography component="div">{answear}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Help>
  );
};

export default FAQ;
