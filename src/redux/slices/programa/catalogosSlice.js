import { createSlice } from '@reduxjs/toolkit';

export const catalogosSlice = createSlice({

    name: 'catalogos',
    initialState: {
        statusCatalogo: 'empty',
        apoyos: null,
        calendarios: null,
        programas:null
        
    },
    reducers: {
        setCatalogo: (state, {payload}) => {
            state.statusCatalogo = 'full',
            state.apoyos = payload.catApoyos,
            state.calendarios = payload.catCalendarios,
            state.programas = payload.catProgramas
            
          

        },
        cleanCatalogos: (state) => {
            state.statusCatalogo = 'empty';
            state.catalogos = null;
            state.apoyos = null,
            state.calendarios = null,
            state.programas = null
            
        },
    }
});


export const { setCatalogo, cleanCatalogos } = catalogosSlice.actions;