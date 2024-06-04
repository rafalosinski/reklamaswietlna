import Image from 'next/image';
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { SRLWrapper } from 'simple-react-lightbox';

import Help from '../src/help/help';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: '25px',
  },
  table: {
    '& thead': {
      backgroundColor: '#f1f1f1',
      '& img': {
        cursor: 'pointer',
      },
    },
  },
  rightCell: {
    maxWidth: '200px',
    textAlign: 'center',
  },
  leftCell: {
    backgroundColor: '#f7f7f7',
    maxWidth: '300px',
    minWidth: '250px',
    '& span': {
      display: 'block',
      fontSize: '0.8rem',
      color: '#6b6b6b',
    },
  },
  headRight: {
    textAlign: 'center',
  },
  sectionHeader: {
    textAlign: 'center',
    color: '#454545',
    fontWeight: 'lighter',
    letterSpacing: '2px',
  },
}));

const rows = [
  {
    sectionHeader: true,
    name: 'WYMIARY',
  },
  {
    name: 'Maksymalny rozmiar pojedynczego kasetonu bez łączeń',
    description: '',
    dibond: '390 x 180 cm',
    aluPlex: '400 x 200 cm',
    aluStretch: '4900 x 300 cm',
    aluShape: '200 x 200 cm (koło, krzyż), 400 x 200 cm (elipsa, prostokąt)',
  },
  // {
  //   name: 'Maksymalny rozmiar większego kasetonu z łączeniami',
  //   description:
  //     'Łączenie na ramie i froncie (kaseton z dibondu i z frontem z pleksy) lub łączenie tylko na ramie (kaseton z napinanym frontem)',
  //   dibond: 'nieograniczona szerokość, wysokość do 180 cm',
  //   aluPlex: 'nieograniczona szerokość, wysokość do 200 cm',
  //   aluStretch: '4900 x 300 cm',
  //   aluShape: '-',
  // },
  {
    name: 'Minimalna grubość kasetonu jednostronnego',
    description: '',
    dibond: '6 cm',
    aluPlex: '10 cm',
    aluStretch: '14 cm',
    aluShape: '6 cm',
  },
  {
    name: 'Możliwa wersja dwustronna',
    description: 'tzw. semafor',
    dibond: 'TAK',
    aluPlex: 'TAK',
    aluStretch: '-',
    aluShape: 'TAK',
  },
  {
    sectionHeader: true,
    name: 'CZAS REALIZACJI',
  },
  {
    name: 'Standardowy czas realizacji',
    description: 'w dniach roboczych',
    dibond: '5-10 dni',
    aluPlex: '5-10 dni',
    aluStretch: '5-10 dni',
    aluShape: '5-10 dni',
  },
  {
    name: 'Ekspresowy czas realizacji',
    description: 'w dniach roboczych',
    dibond: 'do 3 dni',
    aluPlex: 'do 3 dni',
    aluStretch: 'do 5 dni',
    aluShape: 'do 5 dni',
  },
  {
    sectionHeader: true,
    name: 'KOLOR OBUDOWY / RAMY',
  },
  {
    name: 'Podstawowe kolory',
    description: '',
    dibond: 'Biały / Czarny, (błysk lub mat)',
    aluPlex: 'Surowe aluminium',
    aluStretch: 'Surowe aluminium',
    aluShape: '10 kolorów',
  },
  {
    name: 'Kolory specjalne',
    description: '',
    dibond: 'Antracyt / Aluminium szczotkowane',
    aluPlex: 'Dowolny RAL',
    aluStretch: 'Dowolny RAL',
    aluShape: 'Srebrny / Złoty',
  },
  {
    name: 'Zadruk UV mat',
    description: 'wg. projektu lub dowolny kolor CMYK',
    dibond: 'TAK',
    aluPlex: '-',
    aluStretch: '-',
    aluShape: '-',
  },
  {
    name: 'Zadruk solvent na folii mat/błysk ',
    description: 'wg. projektu lub dowolny kolor CMYK',
    dibond: 'TAK',
    aluPlex: 'TAK',
    aluStretch: 'TAK',
    aluShape: 'TAK',
  },
  {
    name: 'Folia polimerowa fabrycznie barwiona w masie',
    description: '',
    dibond: 'TAK',
    aluPlex: 'TAK',
    aluStretch: 'TAK',
    aluShape: 'TAK',
  },
  {
    name: 'Lakierowanie proszkowe ',
    description: 'wg. wzornika RAL',
    dibond: '-',
    aluPlex: 'TAK',
    aluStretch: 'TAK',
    aluShape: '-',
  },
  {
    sectionHeader: true,
    name: 'FUNCKJE I RODZAJE PODŚWIETLENIA',
  },
  {
    name: 'Świeci cały front',
    description: 'wydruk pełnokolorowy CMYK',
    dibond: '-',
    aluPlex: 'TAK',
    aluStretch: 'TAK',
    aluShape: '-',
  },
  {
    name: 'Potrójny zadruk UV ',
    description:
      'połączenie CMYK + biały + CMYK to żywe kolory przy włączonym i wyłączonym oświetleniu',
    dibond: 'TAK',
    aluPlex: 'TAK',
    aluStretch: 'TAK',
    aluShape: 'TAK',
  },
  {
    name: 'Świecą wybrane elementy',
    description: 'wycięte z lica obudowy',
    dibond: 'TAK',
    aluPlex: '-',
    aluStretch: '-',
    aluShape: 'TAK',
  },
  {
    name: 'Możliwy efekt 3D ',
    description: 'wypukłe elementy świecące',
    dibond: 'TAK',
    aluPlex: '-',
    aluStretch: '-',
    aluShape: 'TAK',
  },
  {
    name: 'Standardowy kolor świecenia wyciętych elementów - BIAŁY',
    description: '',
    dibond: 'TAK',
    aluPlex: '-',
    aluStretch: '-',
    aluShape: '-',
  },
  {
    name: 'Zmiana koloru świecenia za pomocą folii translucentnej Oracal 8500',
    description: '',
    dibond: 'TAK',
    aluPlex: '-',
    aluStretch: '-',
    aluShape: '-',
  },
  {
    name: 'Możliwość wycięcia świecącego fragmentu pod zadruk CMYK',
    description: '',
    dibond: 'TAK',
    aluPlex: '-',
    aluStretch: '-',
    aluShape: 'TAK',
  },
  {
    sectionHeader: true,
    name: 'ELEKTRYKA',
  },
  {
    name: 'Moduły LED marki REFOND',
    description: '',
    dibond: 'TAK',
    aluPlex: 'TAK',
    aluStretch: 'TAK',
    aluShape: 'TAK',
  },
  {
    name: 'Zasilacze marki MEAN WELL',
    description: '',
    dibond: 'TAK',
    aluPlex: 'TAK',
    aluStretch: 'TAK',
    aluShape: 'TAK',
  },
];

const options = {
  settings: {
    overlayColor: 'rgb(245,245,245)',
    autoplaySpeed: 3500,
    transitionSpeed: 900,
  },
  buttons: {
    backgroundColor: '#FBA82C',
    iconColor: 'rgba(0,0,0, 0.8)',
  },
  caption: {
    captionColor: '#000000',
  },
};

const Porownanie = () => {
  const classes = useStyles();

  return (
    <Help current="porownanie-kasetonow" titlePart="Porównanie kasetonów">
      <Grid container item sm={12} alignContent="flex-start">
        <Typography className={classes.header} variant="h5" component="h1">
          Porównanie kasetonów
        </Typography>
        <SRLWrapper options={options}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>Rodzaj kasetonu</TableCell>
                  <TableCell className={classes.headRight} align="right">
                    z dibondu
                  </TableCell>
                  <TableCell className={classes.headRight} align="right">
                    na ramie aluminiowej <br />z frontem z pleksy
                  </TableCell>
                  <TableCell className={classes.headRight} align="right">
                    na ramie aluminiowej <br />z napinanym frontem
                  </TableCell>
                  <TableCell className={classes.headRight} align="right">
                    z taśmy aluminiowej <br />- nietypowy kształt
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>Schemat (kliknij żeby powiększyć)</TableCell>

                  <TableCell className={classes.headRight} align="right">
                    <Image
                      src="/img/vis/dibond_jednostronny.png"
                      alt="Kaseton z dibondu"
                      width={854}
                      height={371}
                    />
                  </TableCell>
                  <TableCell className={classes.headRight} align="right">
                    <Image
                      src="/img/vis/aluminium_pleksa_jednostronny.png"
                      alt="Kaseton na ramie aluminiowej z pleksy"
                      width={854}
                      height={371}
                    />
                  </TableCell>
                  <TableCell className={classes.headRight} align="right">
                    <Image
                      src="/img/vis/aluminium_napinany_jednostronny.png"
                      alt="Kaseton na ramie aluminiowej z napinanym frontem"
                      width={854}
                      height={371}
                    />
                  </TableCell>
                  <TableCell className={classes.headRight} align="right">
                    <Image
                      src="/img/vis/aluminium_tasma_jednostronny.png"
                      alt="Kaseton z taśmy aluminiowej - nietypowy kształt"
                      width={854}
                      height={371}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    {row.sectionHeader ? (
                      <TableCell className={classes.sectionHeader} colSpan={5}>
                        {row.name}
                      </TableCell>
                    ) : (
                      <>
                        <TableCell className={classes.leftCell} component="th" scope="row">
                          {row.name} {row.description && <span>{row.description}</span>}
                        </TableCell>
                        <TableCell className={classes.rightCell} align="right">
                          {row.dibond === 'TAK' ? <DoneIcon /> : row.dibond}
                        </TableCell>
                        <TableCell className={classes.rightCell} align="right">
                          {row.aluPlex === 'TAK' ? <DoneIcon /> : row.aluPlex}
                        </TableCell>
                        <TableCell className={classes.rightCell} align="right">
                          {row.aluStretch === 'TAK' ? <DoneIcon /> : row.aluStretch}
                        </TableCell>
                        <TableCell className={classes.rightCell} align="right">
                          {row.aluShape === 'TAK' ? <DoneIcon /> : row.aluShape}
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SRLWrapper>
      </Grid>
    </Help>
  );
};

export default Porownanie;
