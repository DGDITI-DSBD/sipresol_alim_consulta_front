import React, {useEffect, useState} from 'react';
import CryptoJS from "crypto-js";
import { urlBase } from '../../api';
import { useParams, Route, Routes, useNavigate } from "react-router-dom";
import { pass } from '../../api';
import axios from 'axios';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG'
import { Header } from '../../router/components/Header';
import { Footer } from '../../router/components/Footer';
import { Personalinfo } from '../../ui/components/personalInfo';





export const Registro = () => {

    const  stylesBanner = {
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,36,0.67), rgba(28,20,39,0.4514180672268907)), url(' + alimentacion_bienestar + ')',
        backgroundPosition: 'bottom',
        backgroundColor: '#d9d9d9',
        boxShadow: '0rem 0rem 0rem 0.05rem #666666',
        backgroundRepeat: 'no-repeat', 
        backgroundSize: 'cover',
        overflow: 'hidden',
        width: '100%',
        height: '100%'
    
      }

    const styleTables = {
        background: 'rgb(200,127,143)',
        background: 'linear-gradient(90deg, rgba(200,127,143,1) 4%, rgba(186,168,85,0.5270483193277311) 100%, rgba(255,255,255,0.16290266106442575) 100%)'
    }

    const navigate = useNavigate();

    const [linkedDym, setLinkDym] = useState('');
    const [statusComponent, setStatusComponent] = useState('');
    const [isComponent, setIsComponent] = useState('personal');
    const [dataInfo, setDataInfo] = useState([]);

    const params = useParams();

    
    


  

    useEffect(() => {
        const handleExampleData = async (info) => {

  

        try {

            const reemplazar_respuesta = await axios.get(`${urlBase}/registros/uuid/${info}`);

            const {status} = reemplazar_respuesta;

            const {data} = reemplazar_respuesta?.data;
         

            if(status != 200){
                setStatusComponent('viewSinApertura');
            }else{
                setStatusComponent('viewApertura');
                setDataInfo(data);
            }
            
        } catch (error) {
            setStatusComponent('viewApertura');
        }
    }
        handleExampleData(params.uuid)
    },[params.uuid]);

 

    return (
        <>
        <div className={`bg-white w-full`} >
            <Header />
        
        <div style={stylesBanner} class = "h-full min-h-screen w-full p-4 border-2 border-b-colorPrimario border-l-colorSecundario border-r-colorSecundario border-t-colorSecundario content-center">
        
              <div className={`grid ${statusComponent != 'viewApertura' ? 'md:grid-row-4 flex justify-center' : 'md:grid-row-10'} gap-5 w-full overflow-x-scroll overflow-y-scroll p-5`} style = {styleTables}>
             
                <div className="space-y-4 max-w-4xl mx-auto content-center">
                
                  <h1 className="grid space-y-4 max-w-3x1 text-3xl font-extrabold text-white sm:text-2xl md:text-3xl text-center">
                    <span className="block text-[3rem]">
                        {statusComponent != 'viewApertura' ? '¡Hola! ¿Nuev@ por aquí?' : '!Hola! Bienvenid@.'}
                      </span>
                  </h1>

                  <h1 className="grid space-y-4 max-w-3x1 text-3xl font-extrabold text-white sm:text-2xl md:text-3xl text-center">
                    <span className="block text-2xl">
                        {statusComponent != 'viewApertura' ? 'Al perecer no has comenzado con tu registro' : 'Aquí podrás verificar el estado de tu registro.'}    
                      </span>
                  </h1>

                  <h1 className="grid space-y-4 max-w-3x1 text-3xl font-extrabold text-white sm:text-2xl md:text-3xl text-center">
                    <span className="block text-base">
                        {statusComponent != 'viewApertura' ? 'Si cumples con los requisitos del programa te invitamos a comenzar con tu preregistro' : ''}    
                      </span>
                  </h1>

              { statusComponent != 'viewApertura' ? '' :
                   <ol class="flex justify-center w-auto p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
                    <li class="flex items-center text-colorSecundario dark:colorSecundario cursor-pointer" onClick={() => {
                        setIsComponent('personal');
                    }}>
                        <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border border-colorPrimario rounded-full shrink-0 dark:colorPrimario">
                            1
                        </span>
                        <p class = "hover:text-colorPrimario" >Validación de información personal</p>
                        
                    </li>
                </ol>
                }

    {  statusComponent != 'viewApertura' ? '' :
        <div className="lg:px-1 py-2 w-auto">
                
            <div className={`rounded-lg py-10 drop-shadow-2xl ${isComponent == null ? 'hidden' : ''}`}>

                <div class={`relative overflow-x-auto shadow-md sm:rounded-lg p-2 overflow-x-scroll ${isComponent != 'personal' ? 'hidden' : ''}`}>
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 text-white uppercase dark:text-gray-400 bg-colorPrimario">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Folio
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Municipio
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Localidad
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Estado de registro
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Formato Único de Bienestar
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                   {dataInfo.folio_relacionado}
                                </th>
                                <th class="px-6 py-4">
                                   {`${dataInfo.nombres} ${dataInfo.primer_ap} ${dataInfo.segundo_ap}`}
                                </th>
                                <td class="px-6 py-4">
                                    {dataInfo.municipio}
                                </td>
                                <td class="px-6 py-4">
                                    {dataInfo.localidad}
                                </td>
                                <td class="px-6 py-4">

                                    {(() => {
                                        switch (dataInfo.estado_beneficiario) {
                                            case '100':
                                                return 'EN PROCESO';
                                            case '200':
                                                return 'BENEFICIARIO';
                                            case '300':
                                                return 'PERMANENCIA';
                                            default:
                                                return 'DESCONOCIDO';
                                        }
                                    })()}

                                </td>
                                <td class="px-6 py-4 flex justify-center">

                                    <button 
                                        class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        onClick={() => navigate(`../Fum-Pdf/${ CryptoJS.AES.encrypt( JSON.stringify( dataInfo.id ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                            <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
                                            <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
                                            <path d="M17 18h2" />
                                            <path d="M20 15h-3v6" />
                                            <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
                                        </svg>
                                    </button>
                                    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
            
    }  
                       
                </div>
        
              </div>
                  
              </div>

              <Footer/>
            
        </div>

            
        </>
    );


}

export default Registro;