import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { urlBase, pass } from "../../api";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from "axios";
import alimentacion_bienestar from "../../images/canasta_alimentario_p1.JPEG";
import { Header } from "../../router/components/Header";
import { Footer } from "../../router/components/Footer";
import Swal from "sweetalert2";

export const Visor = () => {
  // Estilos
  const stylesBanner = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,36,0.67), rgba(28,20,39,0.45)), url(${alimentacion_bienestar})`,
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
    background: "linear-gradient(90deg, rgba(200,127,143,1) 4%, rgba(186,168,85,0.53) 100%, rgba(255,255,255,0.16) 100%)",
  };

  // Lista de usuarios autorizados
   const users = [
    'C3NTE4DATAVENA01.',
    'C3NTE4DATABUEN02.',
    'C3NTE4DATATHAN03.',
    'C3NTE4DATAVELA04.',
    'C3NTE4DATAJESS05.',
    'C3NTE4DATAOMA06.',
    'C3NTE4DATAEDA07.',
    'C3NTE4DATALRS08.',
    'C3NTE4DATACEL09.',
    'C3NTE4DATAMON10.'
  ];

  // Estados y navegación
  const navigate = useNavigate();
  const [statusComponent, setStatusComponent] = useState("");
  const [isComponent, setIsComponent] = useState('personal');
  const [dataInfo, setDataInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  // Configuración de react-hook-form
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      curp: '',
      key: localStorage.getItem('lastKey') || ''
    }
  });

  // Efecto para cargar los datos guardados al iniciar
  useEffect(() => {
    // Restaurar datos del formulario si existen en localStorage
    const lastKey = localStorage.getItem('lastKey');
    
    if (lastKey) setValue('key', lastKey);
    
  }, [setValue]);

  // Función para guardar datos en localStorage
  const saveToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error al guardar en localStorage (${key}):`, error);
    }
  };

  // Función para manejar la navegación a los PDFs
  const handlePdfNavigation = (route, id) => {
    const encryptedId = CryptoJS.AES.encrypt(
      JSON.stringify(id),
      pass
    ).toString()
      .replace(/\+/g, 'p1L2u3S')
      .replace(/\//g, 'bXaJN0921')
      .replace(/=/g, 'e1Q2u3A4l');
    
    navigate(`${route}/${encryptedId}`);
  };

  // Manejo del envío del formulario
  const onSubmit = async (formData) => {
    const { curp, key } = formData;

    // Guardar los datos del formulario para futura referencia
    
    saveToLocalStorage('lastKey', key);

    // Verificar si la llave es válida
    const isExists = users.includes(key);
    if (!isExists) {
      Swal.fire({
        icon: "warning",
        title: "Llave inválida",
        text: "Verifique el acceso",
        confirmButtonColor: "#8a2036",
      });
      return;
    }

    // Iniciar la búsqueda
    setLoading(true);
    setNoResults(false);
    setStatusComponent('');

    try {
      const response = await axios.post(`${urlBase}/registros/busquedaCurp`, {
        curp: curp.toUpperCase(),
        key: key
      });

      const { status } = response;
      const { data } = response.data;

      if (status !== 200 || !data || Object.keys(data).length === 0) {
        setStatusComponent('viewSinApertura');
        setNoResults(true);
      } else {
        setStatusComponent('viewApertura');
        setDataInfo(data);
        // Guardar los resultados de la búsqueda
      }
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setStatusComponent('viewSinApertura');
      setNoResults(true);
      
      Swal.fire({
        icon: "error",
        title: "Error en la búsqueda",
        text: "No se pudo realizar la consulta. Intente nuevamente.",
        confirmButtonColor: "#8a2036",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white w-full">
        <Header />

        <div
          style={stylesBanner}
          className="h-full min-h-[703px] w-full p-4 border-2 border-b-colorPrimario border-l-colorSecundario border-r-colorSecundario border-t-colorSecundario content-center"
        >
          <div
            className={`grid ${
              statusComponent !== "viewApertura"
                ? "md:grid-row-4 flex justify-center"
                : "md:grid-row-10"
            } gap-5 w-full overflow-x-scroll`}
            style={styleTables}
          >
            <div className="space-y-4 max-w-4xl mx-auto content-center p-2">
              <p className="text-3xl text-white font-bold text-center">Búsqueda por curp.</p>
              <p className="text-xl text-white font-bold text-center">Inserta la Clave Única de Verificación para Búsquedas para iniciar a consultar.</p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Campo CURP */}
                  <div className="flex-1">
                    <label htmlFor="curp" className="sr-only">CURP</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="curp"
                        name="curp"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Ingrese su CURP"
                        onInput={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        {...register("curp", { 
                          required: 'Campo requerido',
                          pattern: {
                            value: /^[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[HM][A-Z]{5}[0-9A-Z][0-9]$/,
                            message: 'Estructura de CURP inválida'
                          } 
                        })}
                      />
                      {errors.curp && (
                        <p className="mt-1 text-sm text-white font-bold">{errors.curp.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Campo Llave */}
                  <div className="flex-1">
                    <label htmlFor="key" className="sr-only">Llave de usuario</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="key"
                        name="key"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        placeholder="Llave de usuario"
                        {...register("key", {required: 'La llave es requerida'})}
                      />
                      {errors.key && (
                        <p className="mt-1 text-sm text-white font-bold">{errors.key.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Botón de búsqueda */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white bg-colorPrimario hover:bg-colorSecundario focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex items-center disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Buscando...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        Buscar
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              {/* Mensaje de carga */}
              {loading && (
                <div className="text-center p-4">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                  <p className="mt-2 text-white font-medium">Cargando resultados...</p>
                </div>
              )}
              
              {/* Mensaje de sin resultados */}
              {noResults && !loading && (
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md">
                  <p className="font-bold">No se encontraron registros</p>
                  <p>Verifique la CURP e intente nuevamente.</p>
                </div>
              )}

              {/* Resultados de la búsqueda */}
              {statusComponent === "viewApertura" && !loading && Object.keys(dataInfo).length > 0 && (
                <div className="lg:px-8 py-2">
                  <div className="rounded-lg py-10 drop-shadow-2xl">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
                      <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-white uppercase bg-colorPrimario">
                          <tr>
                            <th className="px-6 py-3">Nombre</th>
                            <th className="px-6 py-3">Municipio</th>
                            <th className="px-6 py-3">Localidad</th>
                            {dataInfo.estado_beneficiario !== "300" && (
                              <th className="px-6 py-3">
                                Formato Único de Bienestar
                              </th>
                            )}
                            {dataInfo.estado_beneficiario === "300" && (
                              <th className="px-6 py-3">
                                Permanencia y Carta Compromiso
                              </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">{`${dataInfo.nombres || ''} ${dataInfo.primer_ap || ''} ${dataInfo.segundo_ap || ''}`}</td>
                            <td className="px-6 py-4">{dataInfo.municipio || 'N/A'}</td>
                            <td className="px-6 py-4">{dataInfo.localidad || 'N/A'}</td>
                            
                            {dataInfo.estado_beneficiario !== "300" && (
                              <td className="px-6 py-4 justify-center">
                                <button 
                                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center"
                                  onClick={() => handlePdfNavigation('Fum-Pdf', dataInfo.id)}
                                  aria-label="Ver formato único de bienestar"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf mr-2">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                    <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
                                    <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
                                    <path d="M17 18h2" />
                                    <path d="M20 15h-3v6" />
                                    <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
                                  </svg>
                                  Ver documento
                                </button>
                              </td>
                            )}

                            {dataInfo.estado_beneficiario === "300" && (
                              <td className="px-6 py-4 justify-center">
                                <button 
                                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 flex items-center justify-center"
                                  onClick={() => handlePdfNavigation('PDFs', dataInfo.id)}
                                  aria-label="Ver permanencia y carta compromiso"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf mr-2">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                                    <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" />
                                    <path d="M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6" />
                                    <path d="M17 18h2" />
                                    <path d="M20 15h-3v6" />
                                    <path d="M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z" />
                                  </svg>
                                  Ver documento
                                </button>
                              </td>
                            )}
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
