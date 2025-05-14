import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { urlBase } from '../../api';

// Base URL for API calls
const baseURL = process.env.API_URL || 'http://localhost:8000/api';

// Async thunks for programs
export const fetchProgramas = createAsyncThunk(
    'programa/fetchProgramas',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${urlBase}/programas`);
        
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Error al cargar programas');
        }
    }
);

// Async thunks for calendars
export const fetchCalendarios = createAsyncThunk(
    'programa/fetchCalendarios',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${urlBase}/calendarios`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Error al cargar calendarios');
        }
    }
);

// Async thunks for supports
export const fetchApoyos = createAsyncThunk(
    'programa/fetchApoyos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${urlBase}/apoyos`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data || 'Error al cargar apoyos');
        }
    }
);

export const programaSlice = createSlice({
    name: 'programa',
    initialState: {
        programas: {
            items: [],
            loading: false,
            error: null,
        },
        calendarios: {
            items: [],
            loading: false,
            error: null,
        },
        apoyos: {
            items: [],
            loading: false,
            error: null,
        }
    },
    reducers: {
        clearProgramaErrors: (state) => {
            state.programas.error = null;
            state.calendarios.error = null;
            state.apoyos.error = null;
        }
    },
    extraReducers: (builder) => {
        // Program reducers
        builder
            .addCase(fetchProgramas.pending, (state) => {
                state.programas.loading = true;
                state.programas.error = null;
            })
            .addCase(fetchProgramas.fulfilled, (state, action) => {
                state.programas.loading = false;
                state.programas.items = action.payload;
              
            })
            .addCase(fetchProgramas.rejected, (state, action) => {
                state.programas.loading = false;
                state.programas.error = action.error;
                

            });

        // Calendar reducers
        builder
            .addCase(fetchCalendarios.pending, (state) => {
                state.calendarios.loading = true;
                state.calendarios.error = null;
            })
            .addCase(fetchCalendarios.fulfilled, (state, action) => {
                state.calendarios.loading = false;
                state.calendarios.items = action.payload;
            })
            .addCase(fetchCalendarios.rejected, (state, action) => {
                state.calendarios.loading = false;
                state.calendarios.error = action.error;
            });

        // Support reducers
        builder
            .addCase(fetchApoyos.pending, (state) => {
                state.apoyos.loading = true;
                state.apoyos.error = null;
            })
            .addCase(fetchApoyos.fulfilled, (state, action) => {
                state.apoyos.loading = false;
                state.apoyos.items = action.payload;
            })
            .addCase(fetchApoyos.rejected, (state, action) => {
                state.apoyos.loading = false;
                state.apoyos.error = action.error;
            });
    }
});

export const { clearProgramaErrors } = programaSlice.actions;
export default programaSlice.reducer;