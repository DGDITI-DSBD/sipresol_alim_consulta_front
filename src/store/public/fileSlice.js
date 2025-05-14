import { createSlice } from '@reduxjs/toolkit';

export const fileSlice = createSlice({
    name: 'file',
    initialState: {
        loadingFile: 'esperando'
    },
    reducers: {
        sendingFile: ( state ) => {
            state.loadingFile = 'enviando';
        },
        responseFile: ( state ) => {
            state.loadingFile = 'recibido';
        },
        cleaningFile: ( state ) => {
            state.loadingFile = 'esperando';
        },
    }
});


// Action creators are generated for each case reducer function
export const { sendingFile,
    responseFile, cleaningFile } = fileSlice.actions;