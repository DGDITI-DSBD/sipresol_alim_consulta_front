import { createSlice } from '@reduxjs/toolkit';

export const publicConsultsSlice = createSlice({
    name: 'publicConsults',
    initialState: {
        loading: true,
        currentPage: 1,
        lastPage: null,
        from: null,
        to: null,
        perPage: null,
        total: null,
        path: null,
        consulta: null,
        links: null
    },
    reducers: {
        gettingConsultas: (state, { payload } ) => {
            if(typeof(payload.path) === "undefined")
            {
                state.consulta = payload;
                state.loading = false;
            }else{
                const pathOfExile = payload.path.split('/');
                state.loading = false;
                state.currentPage = payload.current_page;
                state.lastPage = payload.last_page;
                state.from = payload.from;
                state.to = payload.to;
                state.perPage = payload.per_page;
                state.total = payload.total;
                state.path = '/'+pathOfExile[5];
                // state.path = '/'+pathOfExile[6];
                state.consulta = payload.data;
                state.links = payload.links;
            }
        },
        cleanConsultas: ( state ) => {
            state.loading = true;
            state.currentPage = null;
            state.lastPage = null;
            state.from = null;
            state.to = null;
            state.perPage = null;
            state.total = null;
            state.path = null;
            state.consulta = null;
            state.links = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { gettingConsultas,
                cleanConsultas } = publicConsultsSlice.actions;