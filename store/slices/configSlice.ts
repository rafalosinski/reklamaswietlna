import { createSlice } from '@reduxjs/toolkit';
import {
  COLORS,
  LIGHTING,
  REVISION_SIDES,
  SHAPES,
  TAPE_TYPES,
} from '../../src/configurator/utils/constants';

const initialState = {
  sizeWidth: 100,
  sizeHeight: 100,
  sizeMaxSingle: 390,
  sizeMaxDouble: 180,
  cmyk: [0, 0, 0, 0],
  cmykProject: false,
  effect3D: false,
  override: false,
  duskSensor: false,
  project: false,
  projectInfo: '',
  fastProduction: false,
  thickness: 6,
  color: COLORS.BLACK_MAT,
  colorCode: '020',
  colorPremium: false,
  colorRal: '',
  lighting: LIGHTING.WHITE,
  lightingCode: '020',
  lightingPremium: false,
  shape: SHAPES.CROSS,
  tapeType: TAPE_TYPES.FLAT,
  revision: REVISION_SIDES.LEFT,
  revisionPremium: false,
  sizeChanged: false,
  calcSent: false,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setSizeWidth: (state, action) => {
      !action.payload ? (state.sizeWidth = null) : (state.sizeWidth = Number(action.payload));
      state.sizeChanged = true;
    },
    setSizeHeight: (state, action) => {
      !action.payload ? (state.sizeHeight = null) : (state.sizeHeight = Number(action.payload));
      state.sizeChanged = true;
    },
    setMaxSingle: (state, action) => {
      state.sizeMaxSingle = Number(action.payload);
    },
    setMaxDouble: (state, action) => {
      state.sizeMaxDouble = Number(action.payload);
    },
    setThickness: (state, action) => {
      state.thickness = Number(action.payload);
    },
    setColor: (state, action) => {
      state.color = action.payload.value;
      state.colorPremium = action.payload.premium;
    },
    setColorCode: (state, action) => {
      state.colorCode = action.payload;
    },
    setLighting: (state, action) => {
      state.lighting = action.payload.value;
      state.lightingPremium = action.payload.premium;
    },
    setLightingCode: (state, action) => {
      state.lightingCode = action.payload;
    },
    setCmyk: (state, { payload }) => {
      const { index, value } = payload;
      state.cmyk[index] = Number(value);
      value < 0 ? (state.cmyk[index] = 0) : '';
      value > 100 ? (state.cmyk[index] = 100) : '';
    },
    toggleEffect3D: (state) => {
      state.effect3D = !state.effect3D;
    },
    toggleOverride: (state) => {
      state.override = !state.override;
    },
    toggleDuskSensor: (state) => {
      state.duskSensor = !state.duskSensor;
    },
    toggleFastProduction: (state) => {
      state.fastProduction = !state.fastProduction;
    },
    toggleProject: (state) => {
      state.project = !state.project;
    },
    setShape: (state, action) => {
      state.shape = action.payload;
    },
    setProjectInfo: (state, action) => {
      state.projectInfo = action.payload;
    },
    toggleCmykProject: (state) => {
      state.cmykProject = !state.cmykProject;
    },
    setTapeType: (state, action) => {
      state.tapeType = action.payload;
    },
    setColorRal: (state, action) => {
      state.colorRal = action.payload;
    },
    setRevision: (state, action) => {
      state.revision = action.payload.value;
      state.revisionPremium = action.payload.premium;
    },
    resetConfig: () => initialState,
  },
});

export const {
  setSizeWidth,
  setSizeHeight,
  setMaxSingle,
  setMaxDouble,
  setThickness,
  setCmyk,
  toggleCmykProject,
  setColor,
  setColorCode,
  setLighting,
  setLightingCode,
  toggleEffect3D,
  toggleOverride,
  toggleDuskSensor,
  toggleFastProduction,
  toggleProject,
  resetConfig,
  setShape,
  setProjectInfo,
  setTapeType,
  setColorRal,
  setRevision,
} = configSlice.actions;

export default configSlice.reducer;
