import { createSlice } from '@reduxjs/toolkit';

export const auxPublicConsultsSlice = createSlice({
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
        consultaAux: null,
        links: null
    },
    reducers: {
        gettingConsultasAux: (state, { payload } ) => {
            // console.log(payload.path);
            if(typeof(payload.path) === "undefined")
            {
                state.consultaAux = payload;
                // console.log(payload);
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
                state.consultaAux = payload.data;
                state.links = payload.links;
            }
        },
        cleanConsultasAux: ( state ) => {
            state.loading = true;
            state.currentPage = null;
            state.lastPage = null;
            state.from = null;
            state.to = null;
            state.perPage = null;
            state.total = null;
            state.path = null;
            state.consultaAux = null;
            state.links = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { gettingConsultasAux,
                cleanConsultasAux } = auxPublicConsultsSlice.actions;