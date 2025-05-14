import { createSlice } from '@reduxjs/toolkit';

export const curpSlice = createSlice({
    name: 'curp',
    initialState: {
        loadingCurp: 'esperando'
    },
    reducers: {
        sendingCurp: ( state ) => {
            state.loadingCurp = 'enviando';
        },
        responseCurp: ( state ) => {
            state.loadingCurp = 'recibido';
        },
        cleaningCurp: ( state ) => {
            state.loadingCurp = 'esperando';
        },
    }
});


// Action creators are generated for each case reducer function
export const { sendingCurp,
    responseCurp, cleaningCurp } = curpSlice.actions;