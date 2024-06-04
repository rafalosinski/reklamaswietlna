import { COLORS, LIGHTING, PRODUCTS, REVISION_SIDES, TAPE_TYPES } from './utils/constants';

export const priceLevels = {
  standardSingleSet: {
    levelOne: { size: 1, price: 1500 },
    levelTwo: { size: 4, price: 1000 },
    levelThree: { price: 800 },
  },
  standardDoubleSet: {
    levelOne: { size: 1, price: 2600 },
    levelTwo: { size: 4, price: 1750 },
    levelThree: { price: 1400 },
  },
};

interface lightingOptions {
  value: string;
  label: string;
  premium: boolean;
}

const lightingOptions = {
  dibondSet: [
    { value: LIGHTING.WHITE, label: 'Biały', premium: false },
    {
      value: LIGHTING.PALETTE,
      label: 'Folia (wzornik)',
      premium: true,
    },
    {
      value: LIGHTING.CUSTOM_UV,
      label: 'Nadruk UV (własny projekt)',
      premium: true,
    },
  ],
};

interface colorOptions {
  value: string;
  label: string;
  finishLabel: '' | 'mat' | 'błysk';
  premium: boolean;
}

const colorOptions = {
  dibondSet: [
    {
      value: COLORS.BLACK_MAT,
      label: 'Czarny',
      finishLabel: 'mat',
      premium: false,
      priceTier: 0,
    },
    {
      value: COLORS.BLACK_GLOSSY,
      label: 'Czarny',
      finishLabel: 'błysk',
      premium: false,
      priceTier: 0,
    },
    {
      value: COLORS.WHITE_MAT,
      label: 'Biały',
      finishLabel: 'mat',
      premium: false,
      priceTier: 0,
    },
    {
      value: COLORS.WHITE_GLOSSY,
      label: 'Biały',
      finishLabel: 'błysk',
      premium: false,
      priceTier: 0,
    },
    {
      value: COLORS.BRUSHED_ALUMINIUM,
      label: 'Aluminium szczotkowane',
      finishLabel: '',
      premium: true,
      priceTier: 1,
    },
    {
      value: COLORS.ANTHRACITE,
      label: 'Antracyt',
      finishLabel: '',
      premium: true,
      priceTier: 1,
    },
    {
      value: COLORS.FOIL_CMYK_MAT,
      label: 'Nadruk UV - CMYK',
      finishLabel: 'mat',
      premium: true,
      priceTier: 1,
    },
    {
      value: COLORS.FOIL_CMYK_GLOSSY,
      label: 'Folia - CMYK',
      finishLabel: 'błysk',
      premium: true,
      priceTier: 1,
    },
    {
      value: COLORS.FOIL_PALETTE_GLOSSY,
      label: 'Folia - wzornik',
      finishLabel: 'błysk',
      premium: true,
      priceTier: 1,
    },
  ],
  aluSet: [
    {
      value: COLORS.RAW_ALUMINIUM,
      label: 'Surowe aluminium',
      finishLabel: '',
      premium: false,
      priceTier: 0,
    },
    {
      value: COLORS.FOIL_CMYK_MAT,
      label: 'Folia - CMYK',
      finishLabel: 'mat',
      premium: true,
      priceTier: 1,
    },
    {
      value: COLORS.FOIL_CMYK_GLOSSY,
      label: 'Folia - CMYK',
      finishLabel: 'błysk',
      premium: true,
      priceTier: 1,
    },
    {
      value: COLORS.FOIL_PALETTE_GLOSSY,
      label: 'Folia - wzornik',
      finishLabel: 'błysk',
      premium: true,
      priceTier: 1,
    },
    {
      value: COLORS.CUSTOM_RAL,
      label: 'Lakier proszkowy RAL',
      finishLabel: '',
      premium: true,
      priceTier: 2,
    },
  ],
  tapeSet: [
    {
      value: COLORS.TAPE_RAL,
      label: 'Wzornik fabryczny - RAL',
      finishLabel: '',
      premium: false,
      priceTier: 0,
    },
    {
      value: COLORS.TAPE_SPECIAL,
      label: 'Wzornik fabryczny - specjalny',
      finishLabel: '',
      premium: false,
      priceTier: 0,
    },
    // {
    //   value: 'foil_cmyk_mat',
    //   label: 'Folia - CMYK',
    //   finishLabel: 'mat',
    //   premium: true,
    //   priceTier: 1,
    // },
    // {
    //   value: 'foil_cmyk_glossy',
    //   label: 'Folia - CMYK',
    //   finishLabel: 'błysk',
    //   premium: true,
    //   priceTier: 1,
    // },
    // {
    //   value: 'foil_palette_glossy',
    //   label: 'Folia - wzornik',
    //   finishLabel: 'błysk',
    //   premium: true,
    //   priceTier: 1,
    // },
  ],
};

interface revisionOptions {
  value: string;
  label: string;
  premium: boolean;
}

export const revisionOptions = {
  standardSet: [
    { value: REVISION_SIDES.LEFT, label: 'Lewa strona', premium: false },
    { value: REVISION_SIDES.RIGHT, label: 'Prawa strona', premium: false },
    { value: REVISION_SIDES.UP, label: 'Góra', premium: true },
    { value: REVISION_SIDES.DOWN, label: 'Dół', premium: true },
  ],
};

export const tapeTypes = [
  {
    value: TAPE_TYPES.FLAT,
    label: 'Płaska',
  },
  {
    value: TAPE_TYPES.DOUBLE_FOLDED,
    label: 'Podwójnie zagięta',
  },
];

interface product {
  name: string;
  label: string;
  doubleSide: boolean;
  priceLevels: any;
  thickness: number[];
  fastProductionDays: number;
  lightingOptions?: lightingOptions[];
  colorOptions?: any;
  sizeMaxSingleOptions?: any;
  tapeTypes?: any;
  defaults: any;
  description: string;
  imgSrc: string;
  revisionOptions?: revisionOptions[];
  visSrc: string;
}

const standardDefaults = {
  colorCode: '020',
  sizeMaxSingle: 400,
  sizeMaxDouble: 200,
};

export const productsData: product[] = [
  {
    name: PRODUCTS.SINGLE_DIBOND,
    label: 'z dibondu',
    description:
      'Nowoczesna i elegancka forma reklamy. Dibond jest frezowany (wycinany) i podklejany miejscowo pleksą w różnych wariantach, dzięki czemu uzyskujemy efektowne podświetlenie.',
    imgSrc: '/img/vis/dibond_jednostronny.png',
    visSrc: '/img/vis/kaseton_dibond_jednostronny.jpg',
    doubleSide: false,
    thickness: [6, 8, 10],
    sizeMaxSingleOptions: [
      { thickness: 6, size: 390 },
      { thickness: 8, size: 385 },
      { thickness: 10, size: 380 },
    ],
    priceLevels: {
      min: 840,
      first: 1320,
      second: 1188,
      third: 1056,
      fourth: 924,
    },
    // priceLevels: {
    //   min: 700,
    //   first: 1100,
    //   second: 990,
    //   third: 880,
    //   fourth: 770,
    // },
    lightingOptions: lightingOptions.dibondSet,
    colorOptions: colorOptions.dibondSet,
    fastProductionDays: 3,
    defaults: { ...standardDefaults, sizeMaxSingle: 390, sizeMaxDouble: 180 },
  },
  {
    name: PRODUCTS.SINGLE_ALU_PLEX,
    label: 'na ramie aluminiowej z frontem z pleksy',
    description:
      'Główną cechą charakterystyczną dla kasetonów na ramie jest świecenie całego lica (frontu) kasetonu, kaseton tego typu jest zazwyczaj w formie prostokąta.',
    imgSrc: '/img/vis/aluminium_pleksa_jednostronny.png',
    visSrc: '/img/vis/kaseton_aluminium_pleksa_jednostronny.jpg',
    doubleSide: false,
    thickness: [10],
    priceLevels: {
      min: 840,
      first: 1320,
      second: 1188,
      third: 1056,
      fourth: 924,
    },
    // priceLevels: {
    //   min: 700,
    //   first: 1100,
    //   second: 990,
    //   third: 880,
    //   fourth: 770,
    // },
    colorOptions: colorOptions.aluSet,
    fastProductionDays: 3,
    defaults: standardDefaults,
    revisionOptions: revisionOptions.standardSet,
  },
  {
    name: PRODUCTS.SINGLE_ALU_STRETCH,
    label: 'na ramie aluminiowej z napinanym frontem',
    description:
      'Kaseton na ramie aluminiowej z licem z dedykowanego vinyla. Jego główną zaletą jest brak łączeń na wydruku do nawet 49 metrów długości.',
    imgSrc: '/img/vis/aluminium_napinany_jednostronny.png',
    visSrc: '/img/vis/kaseton_aluminium_napinany_jednostronny.jpg',
    doubleSide: false,
    thickness: [14],
    priceLevels: {
      min: 1080,
      first: 1584,
      second: 1452,
      third: 1320,
      fourth: 1188,
    },
    // priceLevels: {
    //   min: 900,
    //   first: 1320,
    //   second: 1210,
    //   third: 1100,
    //   fourth: 990,
    // },
    colorOptions: colorOptions.aluSet,
    fastProductionDays: 5,
    defaults: { ...standardDefaults, sizeMaxSingle: 4900, sizeMaxDouble: 300 },
  },
  {
    name: PRODUCTS.SINGLE_ALU_SHAPE,
    label: 'nietypowy kształt',
    description:
      'Kasetony z giętych taśm aluminiowych. Możemy uzyskać dzieki tej technologii dowolny kształt kasetonu, od koła, po skomplikowane logo.',
    imgSrc: '/img/vis/aluminium_tasma_jednostronny.png',
    visSrc: '/img/vis/kaseton_aluminium_tasma_jednostronny.jpg',
    doubleSide: false,
    thickness: [6, 8],
    tapeTypes: tapeTypes,
    priceLevels: {
      min: 840,
      first: 1320,
      second: 1188,
      third: 1056,
      fourth: 924,
    },
    // priceLevels: {
    //   min: 700,
    //   first: 1100,
    //   second: 990,
    //   third: 880,
    //   fourth: 770,
    // },
    colorOptions: colorOptions.tapeSet,
    fastProductionDays: 5,
    defaults: { ...standardDefaults, colorCode: '9006' },
  },
  {
    name: PRODUCTS.DOUBLE_DIBOND,
    label: 'z dibondu',
    description:
      'Nowoczesna i elegancka forma reklamy. Dibond jest frezowany (wycinany) i podklejany miejscowo pleksą w różnych wariantach, dzięki czemu uzyskujemy efektowne podświetlenie.',
    imgSrc: '/img/vis/dibond_dwustronny.png',
    visSrc: '/img/vis/kaseton_dibond_dwustronny.jpg',
    doubleSide: true,
    thickness: [12],
    priceLevels: {
      min: 1320,
      first: 2112,
      second: 1716,
      third: 1584,
      fourth: 1452,
    },
    // priceLevels: {
    //   min: 1100,
    //   first: 1760,
    //   second: 1430,
    //   third: 1320,
    //   fourth: 1210,
    // },
    lightingOptions: lightingOptions.dibondSet,
    colorOptions: colorOptions.dibondSet,
    fastProductionDays: 3,
    defaults: { ...standardDefaults, sizeMaxSingle: 390, sizeMaxDouble: 180 },
  },
  {
    name: PRODUCTS.DOUBLE_ALU_PLEX,
    label: 'na ramie aluminiowej z frontem z pleksy',
    description:
      'Główną cechą charakterystyczną dla kasetonów na ramie jest świecenie całego lica (frontu) kasetonu, kaseton tego typu jest zazwyczaj w formie prostokąta.',
    imgSrc: '/img/vis/aluminium_pleksa_dwustronny.png',
    visSrc: '/img/vis/kaseton_aluminium_pleksa_dwustronny.jpg',
    doubleSide: true,
    thickness: [10, 14],
    priceLevels: {
      min: 1200,
      first: 1980,
      second: 1584,
      third: 1452,
      fourth: 1320,
    },
    // priceLevels: {
    //   min: 1000,
    //   first: 1650,
    //   second: 1320,
    //   third: 1210,
    //   fourth: 1100,
    // },
    colorOptions: colorOptions.aluSet,
    fastProductionDays: 3,
    defaults: standardDefaults,
    revisionOptions: revisionOptions.standardSet,
  },
  {
    name: PRODUCTS.DOUBLE_ALU_SHAPE,
    label: 'nietypowy kształt',
    description:
      'Kasetony z giętych taśm aluminiowych. Możemy uzyskać dzieki tej technologii dowolny kształt kasetonu, od koła, po skomplikowane logo.',
    imgSrc: '/img/vis/aluminium_tasma_dwustronny.png',
    visSrc: '/img/vis/kaseton_aluminium_tasma_dwustronny.jpg',
    priceLevels: {
      min: 1440,
      first: 2244,
      second: 1848,
      third: 1716,
      fourth: 1584,
    },
    // priceLevels: {
    //   min: 1200,
    //   first: 1870,
    //   second: 1540,
    //   third: 1430,
    //   fourth: 1320,
    // },
    doubleSide: true,
    tapeTypes: tapeTypes,
    thickness: [12, 16],
    colorOptions: colorOptions.tapeSet,
    fastProductionDays: 5,
    defaults: { ...standardDefaults, colorCode: '9006' },
  },
];
