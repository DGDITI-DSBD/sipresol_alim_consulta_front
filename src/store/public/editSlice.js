import { createSlice } from '@reduxjs/toolkit';

export const editSlice = createSlice({
    name: 'edit',
    initialState: {
        loading: true,
        data: null
    },
    reducers: {
        gettingEditData: ( state, payload ) => {
            state.loading = false;
            state.data = payload;
        },
        cleaningEditData: ( state ) => {
            state.loading = true;
            state.data = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { gettingEditData,
                cleaningEditData } = editSlice.actions;