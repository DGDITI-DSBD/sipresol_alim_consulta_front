import { configureStore } from "@reduxjs/toolkit";
import { catalogosSlice } from "../redux/slices/programa/catalogosSlice";

export const store = configureStore({
    reducer:{
        catalogos: catalogosSlice.reducer
    },
});