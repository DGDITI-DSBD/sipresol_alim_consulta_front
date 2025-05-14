import { createSlice } from '@reduxjs/toolkit';

export const infoSlice = createSlice({
    name: 'info',
    initialState: {
        loadingInfo: 'esperando'
    },
    reducers: {
        sendingInfo: ( state ) => {
            state.loadingInfo = 'enviando';
        },
        responseInfo: ( state ) => {
            state.loadingInfo = 'recibido';
        },
        cleaningInfo: ( state ) => {
            state.loadingInfo = 'esperando';
        },
    }
});


// Action creators are generated for each case reducer function
export const { sendingInfo,
    responseInfo, cleaningInfo } = infoSlice.actions;