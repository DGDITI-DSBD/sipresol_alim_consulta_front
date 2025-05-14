import { createSlice } from '@reduxjs/toolkit';

export const catalogosSlice = createSlice({
    name: 'catalogos',
    initialState: {
        status: 'empty',
        dominios: null,
        estadocivil: null,
        docoficiales: null,
        entidades: null,
        municipios: null,

    },
    reducers: {
        setCatalogos: ( state, { payload } ) => {
            state.status = 'full';
            state.dominios = payload.dominios;
            state.estadocivil = payload.estadocivil;
            state.docoficiales = payload.docoficiales;
            state.entidades = payload.entidades;
            state.municipios = payload.municipios;

        },
        cleanCatalogos: ( state ) => {
            state.status = 'empty';
            state.dominios = null;
            state.estadocivil = null;
            state.docoficiales = null;
            state.entidades = null;
            state.municipios = null;

        }
    }
});


// Action creators are generated for each case reducer function
export const { setCatalogos,
                cleanCatalogos } = catalogosSlice.actions;