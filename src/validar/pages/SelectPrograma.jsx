import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCatalogo } from '../../redux/slices/programa';
import { baseApi } from '../../api';
import Swal from 'sweetalert2';
import vivienda_bienestar from '../../images/vivienda_bienestar.JPEG';
import primer_hogar from '../../images/primer_hogar_programa.JPEG';
import { Typography } from '@material-tailwind/react';
import { Loading } from '../../ui/components/Loading';
import { Errortype } from '../../ui/components/errorType';

import { fetchProgramas, fetchCalendarios, fetchApoyos } from '../../store/public/programaSlice';


export const SelectPrograma = () => {

    const dispatch = useDispatch();

    const { programas, calendarios, apoyos } = useSelector(state => state.programa);
    let inViewCharge;

    useEffect(() => {
        dispatch(fetchProgramas());
        dispatch(fetchCalendarios());
        dispatch(fetchApoyos());
    }, []);

    // useEffect(() => {
    //     if (programas.error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: programas.error
    //         });
    //         dispatch(clearProgramaErrors());
    //     }
    // }
    //     , [programas.error]);

    // useEffect(() => {
    //     if (calendarios.error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: calendarios.error
    //         });
    //         dispatch(clearProgramaErrors());
    //     }
    // }
    //     , [calendarios.error]);

    // useEffect(() => {
    //     if (apoyos.error) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Error',
    //             text: apoyos.error
    //         });
    //         dispatch(clearProgramaErrors());
    //     }
    // }
    //     , [apoyos.error]);

    useEffect(() => {
        if (programas.items.length > 0) {
          
      
        }
    }, [programas]);

    useEffect(() => {
        if (calendarios.items.length > 0) {
            
         
        }
    }, [calendarios]);

    useEffect(() => {
        if (apoyos.items.length > 0) {
          
            
        }
    }, [apoyos]);


    //Rendering templates

    // if(programas.loading && calendarios.loading && apoyos.loading){
    //         inViewCharge = <Loading />
    // }else if (programas.error && calendarios.error && apoyos.error){
    //         inViewCharge = <errorType />
    // }else{
    //         inViewCharge 
    // }



    return (
        <>
            {/* muestra mensaje de carga para programas, apoyos y calendarios
            {programas.loading && <p>Cargando programas...</p>}
            {calendarios.loading && <p>Cargando calendarios...</p>}
            {apoyos.loading && <p>Cargando apoyos...</p>}

            muestra mensaje de error para programas, apoyos y calendarios 
            {programas.error && <p>{programas.error}</p>}
            {calendarios.error && <p>{calendarios.error}</p>}
            {apoyos.error && <p>{apoyos.error}</p>} */}

            {programas.loading && calendarios.loading && apoyos.loading ? ( <Loading/> ) : ( programas.error || calendarios.error || apoyos.error ? <Errortype /> :
            <div class="bg-gradient-to-r from-red-900 from-50%  to-colorPrimario to-100% backdrop-invert backdrop-opacity-20 min-h-screen h-full">
                <div className="grid grid-rows-1">
                    <div className="row-span-1 pl-5 pr-5 pt-2 content-center md:justify-items-center shadow-xl">
                        <div className="flex w-full h-auto md:w-full md:h-auto rounded-md grid grid-rows-2 border border-colorPrimario justify-items-center bg-colorPrimario p-1">
                            <p class="font-[Montserrat] font-bold text-2xl text-white">Programa de Bienestar</p>
                            <p class="font-[Montserrat] text-lg text-white" >Selecciona el programa de registro</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-row-1 min-h-screen">

                    <div className={`row-span-1 content-center pl-5 pr-5`}>

                        <div className={`flex grid grid-cols-1 md:grid-cols-2 justify-items-center`}>


                            <Link to='/validar/CURP' class="flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gradient-to-r from-[#FFFFFF] via-[#E7DAC7] to-[#DCBCC3] dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 border-3 border-r-colorSecundario border-l-colorSecundario border-b-colorPrimario border-t-colorPrimario shadow-xl" state={1}>
                                <img class="object-cover border-3 border-b-colorSecundario md:border-r-colorSecundario w-full rounded-t-lg h-96 md:h-50 md:w-48 md:rounded-none md:rounded-s-lg" src={primer_hogar} alt="" />
                                <div class="flex flex-col justify-between p-4 leading-normal">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mi primer hogar</h5>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem pariatur exercitationem consequuntur quod commodi. Itaque dolore omnis odio temporibus. Tenetur molestiae atque illum praesentium sed. Nostrum reiciendis exercitationem nisi excepturi!</p>
                                </div>
                            </Link>



                            <Link to='/validar/CURP' class="flex flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-xl hover:bg-gradient-to-r from-[#FFFFFF] via-[#E7DAC7] to-[#DCBCC3] dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 border-3 border-r-colorSecundario border-l-colorSecundario border-b-colorPrimario border-t-colorPrimario shadow-xl" state={2}>
                                <img class="object-cover border-3 border-b-colorSecundario md:border-r-colorSecundario w-full rounded-t-lg h-96 md:h-50 md:w-48 md:rounded-none md:rounded-s-lg" src={vivienda_bienestar} alt="" />
                                <div class="flex flex-col justify-between p-4 leading-normal">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Vivienda para el Bienestar</h5>
                                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo similique dignissimos alias ducimus aperiam delectus architecto consequuntur, reprehenderit quae harum repellat fugit odio excepturi animi iusto adipisci rerum incidunt atque!</p>
                                </div>
                            </Link>


                        </div>

                    </div>

                    <div className='flex justify-center rounded-xl shadow-xl'>

                        <footer className="flex w-full flex-row flex-wrap items-center justify-center border-t border-blue-gray-50 py-8 text-center">
                            <Typography color="white" className="flex justify-center">
                                &copy; 2025 Derechos Reservados <br></br>
                                Dirección General de Desarrollo Institucional y Tecnologias de la Información
                            </Typography>
                        </footer>

                    </div>

                </div>

            </div> )}

        </>
    )
};

