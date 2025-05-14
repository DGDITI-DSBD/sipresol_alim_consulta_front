import { createSlice } from '@reduxjs/toolkit';

export const coordSlice = createSlice({
    name: 'coord',
    initialState: {
        status: 'checking', // 'checking', 'authenticated'
        lat: 0,
        lng: 0
    },
    reducers: {
        sendingCoord: ( state, {payload} ) => {
            //console.log(payload)
            state.loadingCoord = 'enviando';
            state.lat = payload.lat;
            state.lng = payload.lng;
        },
        // responseCoord: ( state, {payload} ) => {
        //     //console.log(payload)
        //     //state.loadingCoord = 'enviando';
        //     state.lat = payload.lat;
        //     state.lng = payload.lng;
        // },
        cleaningCoord: ( state ) => {
            state.loadingCoord = 'ocupado';
            state.lat = 1;
            state.lng = 1;
        },
        
    }
});


// Action creators are generated for each case reducer function
export const { sendingCoord, cleaningCoord } = coordSlice.actions;