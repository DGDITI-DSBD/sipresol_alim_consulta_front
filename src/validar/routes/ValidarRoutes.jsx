import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { MujerForm, VaidarPage, Visor ,FumPdf } from '../pages'; 
import Acuse from '../pages/Acuse';
import Comprobante from '../pages/Comprobante';
import Compromiso from '../pages/Compromiso';
import Conocimiento from '../pages/Conocimiento';
import Permanencia from '../pages/Permanencia';
import Registro from '../pages/Registro';
import { LoginPage } from '../../auth';
import VistaPDFS from '../pages/VistaPDFS'; 


export const ValidarRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path="Fum-Pdf/:registroId" element={<FumPdf />} />
                <Route path='Acuse' element={<Acuse />} />
                <Route path='Comprobante' element={<Comprobante />} />
                <Route path='Compromiso/:registroId' element={<Compromiso />} />
                <Route path='Conocimiento/:registroId' element={<Conocimiento />} />
                <Route path='Permanencia/:registroId' element={<Permanencia />} />
                <Route path='PDFs/:registroId' element={<VistaPDFS />} />
               
               



                
            </Routes>
        </div>
    )
};


