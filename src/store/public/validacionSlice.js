import { createSlice } from '@reduxjs/toolkit';

export const validacionSlice = createSlice({
  name: 'validacion',
  initialState: {
    isSaving: false,
    status: 'wait',
    dataValidate: null,
    folio: null,
    curp: null,
    id: null,
  },
  reducers: {
    savingData: (state) => {
      state.isSaving = true;
    },
    addData: (state, payload) => {
      state.isSaving = false;
      state.status = 'saved';
      state.dataValidate = payload;
    },
    failData: (state, payload) => {
      state.isSaving = false;
      state.status = 'fail';
      state.dataValidate = payload;
    },
    cleanData: (state) => {
      state.isSaving = false;
      state.status = 'wait';
      state.dataValidate = null;
      state.folio = null;
      state.curp = null;
      state.id = null;
    },
    setFolio: (state, action) => {
      state.folio = action.payload;
    },
    setCURP: (state, action) => {
      state.curp = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    }
  },
});

// Exportar los action creators
export const { 
  savingData,
  addData,
  failData,
  cleanData,
  setFolio,
  setCURP,
  setId 
} = validacionSlice.actions;

export default validacionSlice.reducer;