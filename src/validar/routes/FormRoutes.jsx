import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { MujerForm } from '../pages';

export const FormRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='Perfil' element={<MujerForm />} />
                <Route path='/*' element={<Navigate to="Perfil" />} />
            </Routes>
        </div>
    )
};









