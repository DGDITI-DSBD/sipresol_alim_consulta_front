import React, { useState, useEffect } from 'react'
import StateBar from './StateBar';
import { DatosPersonales } from './DatosPersonales';
import { DatosDomic } from './DatosDomic';
import { FormPreguntas } from './FormPreguntas';
import { Concentrado_mujeres } from './Concentrado_mujeres';
import { useSelector } from 'react-redux';
import { LoadingPage } from '../../ui/components';
import { useLocation } from 'react-router-dom';
import { FormularioDatosPersonales } from './FormularioDatosPersonales';
import { Cuestionario } from './Cuestionario';
import { useNavigate } from 'react-router-dom';


export const MujerForm = () => {

    const navigate = useNavigate();

    const location = useLocation();

    //console.log("información", infoCiudadano);
    const [activeTab, setActiveTab] = useState("paso1");
    const [canGoBack, setCanGoBack] = useState(true);
    const [paso1Completed, setPaso1Completed] = useState(false);

    const [registroId, setRegistroId] = useState(null);
    const [statusBeneficiario, setStatusBeneficiario] = useState(null);

    const [infoCiudadano, setInfoCiudadano] = useState(null);
    const [infoBeneficiario, setInfoBeneficiario] = useState(null);

    const handleStepComplete = () => {
        setPaso1Completed(true);
        setActiveTab("paso2");
        setCanGoBack(false);
    };


    useEffect(() => {
        if (location.state) {
            const { infoCiudadano, infoBeneficiario, registroId } = location.state;
            //console.log("state", location.state);
            setInfoCiudadano(infoCiudadano);
            setInfoBeneficiario(infoBeneficiario);
            if (registroId) {
                setRegistroId(registroId);
                handleStepComplete();
            }
        }

    }, [location.state]);


    return (
        <>
            <div>
                <div className="grid grid-cols-1 p-5 ">
                    <div>
                        <StateBar />
                    </div>
                </div>

                <div className="p-2">
                    {/* DESACTIVAR CUANDO TERMINE DE VALIDAR LOS DATOS  */}
                    <div className="mb-10 px-14">{/* <DatosPersonales /> */}</div>

                    <div className="relative p-2 sm:p-10">
                        <ul
                            className="relative flex flex-wrap  list-none rounded-md bg-gray-200 "
                            data-tabs="tabs"
                            role="list"
                        >
                            <li
                                className={`z-30 flex-auto text-center ${!canGoBack ? "pointer-events-none opacity-50" : ""
                                    }`}
                            >
                                <a
                                    className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-md cursor-pointer 
                                            ${activeTab ===
                                            "paso1"
                                            ? "bg-colorPrimario text-white"
                                            : " text-black"
                                        }`}
                                    onClick={() => canGoBack && setActiveTab("paso1")}
                                    data-tab-target=""
                                    role="tab"
                                    aria-selected={activeTab === "paso1"}
                                    aria-controls="paso1"
                                    // disabled={!canGoBack}
                                >
                                    Paso 1
                                </a>
                            </li>

                            <li className="z-30 flex-auto text-center">
                                <a
                                    className={`z-30 flex items-center justify-center w-full px-0 py-2 text-sm mb-0 transition-all ease-in-out border-0 rounded-lg cursor-pointer 
                                                                                            ${activeTab ===
                                            "paso2"
                                            ? "bg-colorPrimario text-white"
                                            : " text-black"
                                        }`}
                                    onClick={() => paso1Completed && setActiveTab("paso2")}
                                    data-tab-target=""
                                    role="tab"
                                    aria-selected={activeTab === "paso2"}
                                    aria-controls="paso2"
                                >
                                    Paso 2
                                </a>
                            </li>
                        </ul>

                        <div data-tab-content="" className="">
                            <div id="paso1" role="tabpanel">
                                <div
                                    className={` ${activeTab === "paso1" ? "" : "hidden opacity-0"
                                        }`}
                                >
                                    <FormularioDatosPersonales
                                        infoCiudadano={infoCiudadano}
                                        infoBeneficiario = {infoBeneficiario}
                                        onStepComplete={handleStepComplete}
                                        putRegistro={setRegistroId}
                                        putStatusBeneficiario={setStatusBeneficiario}
                                    />
                                </div>
                            </div>
                            <div id="paso2" role="tabpanel">
                                <div
                                    className={` ${activeTab === "paso2" ? "" : "hidden opacity-0"
                                        }`}
                                >
                                    <Cuestionario infoRegistro={[registroId, statusBeneficiario]} />
                                </div>
                            </div>
                        </div>
                    </div>





                </div>
            </div>
        </>
    );
};
