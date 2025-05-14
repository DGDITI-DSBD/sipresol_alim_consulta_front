import React, { useState, useEffect } from 'react';
import Compromiso from './Compromiso';
import Conocimiento from './Conocimiento';
import Permanencia from './Permanencia';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // importación
import LogoEdoMex from '../../images/logos_edomex3.png';
import LogoIsem from '../../images/logos_edomex2.png';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG';
import CryptoJS from "crypto-js";



const VistaPDFS = () => {
    const { registroId } = useParams();
    const [activeTab, setActiveTab] = useState("compromiso");

    useEffect(() => {
        Swal.fire({
            title: 'Atención',
            html: `
                <p>Descarga los dos archivos PDF para poder seguir con tu tramite </p>
                <ul style="text-align: left; margin-top: 10px;">
                    <li>* PDF Permanencia</li>
                    <li>* PDF Compromiso</li>
                </ul>
            `,
            icon: 'info',
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            allowEscapeKey: false,
            customClass: {
                confirmButton: 'mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded',
              },
        });
    }, []);

    return (
        <div className="p-4">
            {/* Encabezado con logos y textos */}
            <div className="w-full flex justify-center items-center gap-8 mb-4 px-4 bg-[#977e5b]">
                <img src={LogoEdoMex} alt="Logo Edomex" className="h-24" />

                <div className="text-center text-white text-sm md:text-base leading-tight">
                    <p className="font-semibold">Secretaría de Bienestar</p>
                    <p>Dirección General de Bienestar Social y Fortalecimiento Familiar</p>
                </div>

                <img src={LogoIsem} alt="Logo ISEM" className="h-24" />
            </div>

            <div className="flex gap-4 mb-4 justify-center">
                <button
                    onClick={() => setActiveTab("compromiso")}
                    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
                >
                    Generar PDF Compromiso
                </button>
                <button
                    onClick={() => setActiveTab("permanencia")}
                    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
                >
                    Generar PDF Permanencia
                </button>
            </div>

            <div>
                {activeTab === "compromiso" && <Compromiso registroId={registroId} />}
                {activeTab === "permanencia" && <Permanencia registroId={registroId} />}
            </div>
        </div>
    );
};

export default VistaPDFS;
