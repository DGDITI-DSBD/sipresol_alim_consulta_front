import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { urlBase } from "../../api";
import { useParams, Route, Routes, useNavigate, Link } from "react-router-dom";
import { Controller, useForm } from 'react-hook-form';
import { pass } from "../../api";
import axios from "axios";
import alimentacion_bienestar from "../../images/canasta_alimentario_p1.JPEG";
import { Header } from "../../router/components/Header";
import { Footer } from "../../router/components/Footer";
import { Personalinfo } from "../../ui/components/personalInfo";
import Swal from "sweetalert2";

export const Visor = () => {
  const stylesBanner = {
    backgroundImage:
      "linear-gradient(to bottom, rgba(0,0,36,0.67), rgba(28,20,39,0.4514180672268907)), url(" +
      alimentacion_bienestar +
      ")",
    backgroundPosition: "bottom",
    backgroundColor: "#d9d9d9",
    boxShadow: "0rem 0rem 0rem 0.05rem #666666",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  };

  const styleTables = {
    background: "rgb(200,127,143)",
    background:
      "linear-gradient(90deg, rgba(200,127,143,1) 4%, rgba(186,168,85,0.5270483193277311) 100%, rgba(255,255,255,0.16290266106442575) 100%)",
  };

  const users = [
    'DATACENTER0001', 'DATACENTER0002'
  ];

  const navigate = useNavigate();

  const [linkedDym, setLinkDym] = useState("");
  const [statusComponent, setStatusComponent] = useState("");
  const [isComponent, setIsComponent] = useState('personal');
  const [dataInfo, setDataInfo] = useState([]);
  const [isCurpSearch, setCurpSearch] = useState('none');
  const [buttonSearch, setButtonSearch] = useState();

  
    const { register, handleSubmit, control, reset, formState: { errors }, setValue } = useForm({
    defaultValues: {
      curp: '',
      key: ''
    }
  });

    //   useEffect(() => {
    //     const onSubmit = async (form) => {

    //       console.log(form);

      
    // }
    //     onSubmit(formData);
    // },[formData]);

    const onSubmit = async (formData) => {
   
      const {curp, key} = formData;

      const isExists = users.find((user) => user == key);

        if(isExists) {

        try {

            const reemplazar_respuesta = await axios.post(`${urlBase}/registros/busquedaCurp`, {
              curp:curp,
              key:key
            });

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
      }else{

                  Swal.fire({
                       icon: "warning",
                       title: "Llave inválida",
                       text: "Verifique el acceso",
                       confirmButtonColor: "#8a2036",
                    });
        
      }
  };

  return (
    <>
      <div className={`bg-white w-full`}>
        <Header />

        <div
          style={stylesBanner}
          class="h-full min-h-[703px] w-full p-4 border-2 border-b-colorPrimario border-l-colorSecundario border-r-colorSecundario border-t-colorSecundario content-center"
        >

          
          <div
            className={`grid ${
              statusComponent != "ViewApertura"
                ? "md:grid-row-4 flex justify-center"
                : "md:grid-row-10"
            } gap-5 w-full overflow-x-scroll`}
            style={styleTables}
          >
            
            <div className="space-y-4 max-w-4xl mx-auto content-center p-2">
              <p class = "text-3xl text-white text-bold text-center">Busqueda por curp.</p>
              <p class = "text-xl text-white text-bold text-center">Inserta la Clave Única de Verificación para Busquedas para iniciar a consultar.</p>
              <form onSubmit={handleSubmit(onSubmit)} class="flex items-center max-w-sm mx-auto">  

               
               <label for="simple-search" class="sr-only">Busqueda</label>
                <div class="relative w-full">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                       
                    </div>
                    <input type="text" id="curp" name = "curp" 
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digitar curp." required 
                     {...register("curp")}
                    />
                    
                </div>
                <button type="submit"  onClick = {() => {
                  setStatusComponent('viewSinApertura')
                }}
                class="p-2.5 ms-2 text-sm font-medium text-white bg-colorPrimario rounded-lg border border-bgSecundario hover:bg-colorSecundario focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    <span class="sr-only">Buscar</span>
                </button>

             

                    <input type="text" id="key" name = "key" class=" ms-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Llave de usuario ..." required 
                     {...register("key")}
                    />

                
                  
            </form>
              
              {/* <button type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Registrar</button> */}

             

              {statusComponent != "viewApertura" ? (
                ""
              ) : (
                <div className="lg:px-8 py-2">
                  <div
                    className={`rounded-lg py-10 drop-shadow-2xl ${
                      isComponent == null ? "hidden" : ""
                    }`}
                  >
                    <div
                      class={`relative overflow-x-auto shadow-md sm:rounded-lg p-2 ${
                        isComponent != "personal" ? "hidden" : ""
                      }`}
                    >
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 text-white uppercase dark:text-gray-400 bg-colorPrimario">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Nombre
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Municipio
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Localidad
                            </th>
                            {dataInfo.estado_beneficiario != "300" ? <><th scope="col" class="px-6 py-3">
                              Formato Único de Bienestar
                            </th>
                            </>:<></>}

                            {dataInfo.estado_beneficiario == "300" ? <>
                           
                              <th scope="col" class="px-6 py-3">
                                Permanencia y Carta Compromiso
                              </th>
                             </>:<></>}
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                            {`${dataInfo.nombres} ${dataInfo.primer_ap} ${dataInfo.segundo_ap}`}
                            </th>
                            <td class="px-6 py-4">{dataInfo.municipio}</td>
                            <td class="px-6 py-4">{dataInfo.localidad}</td>

                              {dataInfo.estado_beneficiario!= "300" ? <>
                            <td class="px-6 py-4  justify-center">
                                {/* Fub */}
                                  <button 
                                      class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                      onClick={() => navigate(`Fum-Pdf/${ CryptoJS.AES.encrypt( JSON.stringify( dataInfo.id ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`)}
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
                              </> : <></>}

                              {dataInfo.estado_beneficiario== "300" ? <>

                                <td class="px-6 py-4  justify-center">
                                {/* PERMANENCIA */}
                                  <button 
                                      class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                      onClick={() => navigate(`PDFs/${ CryptoJS.AES.encrypt( JSON.stringify( dataInfo.id ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`)}
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
                              </> : <></>}

                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      class={`relative overflow-x-auto shadow-md sm:rounded-lg p-2 ${
                        isComponent != "validacion" ? "hidden" : ""
                      }`}
                    >
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 text-white uppercase dark:text-gray-400 bg-colorPrimario">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Sector prioritario
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Puntuación
                            </th>
                            <th scope="col" class="px-6 py-3">
                              Estado
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              1
                            </th>
                            <td class="px-6 py-4">90%</td>
                            <td class="px-6 py-4">EN PROCESO</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div
                      class={`relative overflow-x-auto shadow-md sm:rounded-lg p-2 ${
                        isComponent != "asignacion" ? "hidden" : ""
                      }`}
                    >
                      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 text-white uppercase dark:text-gray-400 bg-colorPrimario">
                          <tr>
                            <th scope="col" class="px-6 py-3">
                              Municipio
                            </th>
                            <th scope="col" class="px-6 py-3">
                              CEDIS
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              MUNICIPIO
                            </th>
                            <td class="px-6 py-4">NO ASIGNADO</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};
