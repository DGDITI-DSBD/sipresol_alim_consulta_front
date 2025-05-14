import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { urlBase } from '../../api';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
// import { cleanData, cleaningEditData, storeData } from '../../store';
import Swal from 'sweetalert2';

export const DatosPersonales = () => {
    // const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const folio = useSelector(state => state.validacion.folio);
    const curp = useSelector(state => state.validacion.curp);
    const id = useSelector(state => state.validacion.id);
    const [selectedDoc, setSelectedDoc] = useState('');
    const [actualId, setActualId] = useState(null); // Estado para almacenar el ID final

    const [beneficiario, setBeneficiario] = useState([]);
    const [consulta, setConsulta] = useState({});
    // const prevFolioId = useRef(folio || id);

    // Agregar un nuevo estado para controlar si el acordeón está deshabilitado
    const [isDisabled, setIsDisabled] = useState(false);


    // Efecto para determinar si es un registro nuevo o existente
    useEffect(() => {
        if (folio && !id) {
            // Es un registro nuevo
            setActualId(folio);
        } else if (!folio && id) {
            // Es un registro existente
            setActualId(id);
        }
    }, [folio, id]);

    useEffect(() => {
        const cargarDatos = async () => {
            setIsLoading(true);

            try {
                // // Obtener datos del beneficiario
                // const data = { id: folio || id };
                // Cuando necesites usar el ID en las llamadas API:
                const data = { id: actualId };
                const response = await axios.post(`${urlBase}/getBeneficiario`, { data });
                setBeneficiario(response.data.data);
                setConsulta(response.data);

                // Obtener catálogos si no están cargados
                if (!DOC.length || !DOM.length || !EC.length || !ENTI.length) {
                    await fetchCatalogos();
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // if (folio || id) {
        //     cargarDatos();
        // }
        if (actualId) { // Verifica si hay un ID válido
            cargarDatos();
        }


        // }, [folio, id]);
    }, [actualId]);

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({});

    // Modificar el useEffect que maneja los datos de beneficiario
    useEffect(() => {
        if (beneficiario?.length) {
            reset({
                id: beneficiario.id || "",
                folio_asignado: beneficiario.id || "",
                id_nacionalidad: beneficiario.cve_nacionalidad || "",
                curp: beneficiario.curp || "",
                cve_entidad_nacimiento: beneficiario.cve_entidad_nacimiento || "",
                fecha_nacimiento: beneficiario.fecha_nacimiento || "",
                nombre: beneficiario.nombre || "",
                primer_apellido: beneficiario.primer_apellido || "",
                segundo_apellido: beneficiario.segundo_apellido || "",
                sexo: beneficiario.sexo || null,
                telefono: beneficiario.telefono || "",
                telefono_fijo: beneficiario.telefono_fijo || "",
                tp_id_oficial: beneficiario.tp_id_oficial || "",
                ct_edo_civil: beneficiario.ct_edo_civil || "",
                e_mail: beneficiario.e_mail || ""
            });
        }
    }, [beneficiario, reset]);

    const [concatenatedEmail, setConcatenatedEmail] = useState('');
    const [isExpanded, setIsExpanded] = useState(true);


    const toggleAccordion = (index) => {
        if (!isDisabled) {
            setIsExpanded(!isExpanded);
        }
    };

    const token = 1;
    const [DOC, setDOC] = useState([]);
    const [DOM, setDOM] = useState([]);
    const [EC, setEC] = useState([]);
    const [ENTI, setENTI] = useState([]);

    const [cat, setCat] = useState({}); // EL CAMPO "CAT SERA PARA UNA VALIDACION GLOBAL YA QUE ESTE TRAE LA DATA COMPLETA"

    useEffect(() => {
        const fetchAndSetData = async () => {
            try {
                const response = await axios.get(`${urlBase}/catalogos`, { headers: { 'token': token } });
                const { docsoficiales, dominios, estadocivil, entidades } = response.data;

                // Actualizar los estados directamente
                setDOC(docsoficiales);
                setDOM(dominios);
                setEC(estadocivil);
                setENTI(entidades);
                // Si se necesita actualizar otro estado con todos los datos
                setCat(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchAndSetData();
    }, [token]);

    const { isSaving, status } = useSelector(state => state.validacion);

    const onSubmit = async (data) => {

       
        const response = await axios.post(`${urlBase}/modificarGenerales`, { data });
        const datos = response.data.data;
       
        if (response.data.message === '50001') {
            Swal.fire({
                title: 'Error al guardar',
                text: 'Verifique que los datos no esten vacios',
                icon: 'error',
                allowOutsideClick: false,
                showCancelButton: false,
                confirmButtonColor: '#CA2525',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            })
        } else if (response.data.message === '50007') {
            Swal.fire({
                title: 'Error al guardar',
                text: 'Hubo un problema al guardar los datos',
                icon: 'error',
                allowOutsideClick: false,
                showCancelButton: false,
                confirmButtonColor: '#CA2525',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Aceptar'
            })
        } else if (response.data.message === '50000') {

            Swal.fire({
                title: '¿Estas seguro de guardar tus datos personales?',
                text: 'Una vez guardados tus datos personales, no podran ser modificados.',
                icon: 'warning',
                allowOutsideClick: false,
                showCancelButton: true,
                showConfirmButton: true,
                confirmButtonColor: '#BC955B',
                cancelButtonColor: '#8a2036',
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Datos personales guardados correctamente',
                        text: 'Tus datos han sido guardados, puedes continuar con el siguiente paso',
                        icon: 'success',
                        allowOutsideClick: false,
                        showConfirmButton: true,
                        confirmButtonColor: '#8a2036',
                        confirmButtonText: 'Continuar - Paso 1'
                    }).then((result) => {
                        if(result.isConfirmed){
                            setIsExpanded(false); // Cierra el acordeón
                            setIsDisabled(true);  // Deshabilita el acordeón
                        }
                    });

                }
            }
            );
        }
    };



    return (

        <>
            {isLoading && (
                <div className="fixed inset-0 bg-colorPrimario flex items-center justify-center z-50">
                    <div className="animate-spin rounded-full h-24 w-24 border-4 border-primary border-t-transparent" />

                    <span className="text-white text-2xl"><b>Cargando informacion...</b></span>
                </div>
            )}

            {!isLoading && (
                <div className="border-slate-200 shadow-xl rounded-lg">
                    <button
                        onClick={() => toggleAccordion()}
                        className={`w-full flex justify-between items-center text-left py-5 text-white bg-colorPrimario rounded-lg ${isDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isDisabled}
                    >
                        <span className='text-xl m-2 w-full'>Datos Personales</span>
                        <span id="icon-1" className='text-right text-black'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-bar-down p-2 w-10 h-10" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5M8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6" />
                            </svg>
                        </span>
                    </button>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div id="content-1" className={`max-h-0 rounded-lg overflow-hidden transition-all duration-300 ease-in-out justify-center ${isExpanded ? 'max-h-max' : ''}`}>
                            <div className="p-5 text-sm text-slate-500">

                                <div className="grid sm:grid-cols-3 md:gap-2 bg-gray-200">

                                    {actualId ? (
                                        <>
                                            <input type="hidden" className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                                                value={actualId}
                                                {...register("id")}
                                            />

                                            <input type="hidden" className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                                                value={actualId}
                                                {...register("folio_asignado")}
                                            />
                                        </>
                                    ) : null}

                                    <input type="hidden" className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                                        value={beneficiario.cve_nacionalidad}
                                        {...register("id_nacionalidad")}
                                    />

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">CURP</label>
                                        <input type="hidden"
                                            value={beneficiario.curp}
                                            {...register("curp")}
                                        />
                                        <label className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900 rounded-lg bg-white border-0 peer`}>{beneficiario.curp}</label>

                                    </div>

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Entidad de Nacimiento</label>
                                        {Array.isArray(ENTI) && ENTI.length > 0 ? (
                                            <>
                                                <input
                                                    type="hidden"
                                                    {...register("cve_entidad_nacimiento")}
                                                    value={beneficiario.cve_entidad_nacimiento}
                                                />
                                                <label className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}>
                                                    {ENTI.find(ent => ent.entidadfedid === beneficiario.cve_entidad_nacimiento)?.entidadfed_desc || ''}
                                                </label>
                                            </>
                                        ) : (
                                            <p className='text-center'>No hay entidades disponibles</p>
                                        )}
                                    </div>

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Clave de Entidad</label>
                                        {Array.isArray(ENTI) && ENTI.length > 0 ? (
                                            <>
                                                <input
                                                    type="hidden"
                                                    {...register("cve_entidad_nacimiento")}
                                                    value={beneficiario.cve_entidad_nacimiento}
                                                />
                                                <label className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}>
                                                    {beneficiario.cve_entidad_nacimiento || ''}
                                                </label>
                                            </>
                                        ) : (
                                            <p className='text-center'>No hay entidades disponibles</p>
                                        )}
                                    </div>


                                </div>

                                <div className="grid md:grid-cols-3 md:gap-2  bg-gray-200">

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Genero</label>

                                        <div className="relative flex w-full flex-col rounded-xl bg-white ">
                                            <nav className="flex w-full flex-row gap-1 p-2">

                                                <div role="button" className="flex w-full items-center rounded-lg transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                                                    <label htmlFor="react-horizontal" className="flex w-full cursor-pointer items-center px-3 py-2">
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center cursor-pointer" htmlFor="react-horizontal">
                                                                <input
                                                                    name="framework-horizontal"
                                                                    type="radio"
                                                                    className="h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 bg-white transition-all"
                                                                    value="H"
                                                                    id="react-horizontal"
                                                                    {...register("sexo")}
                                                                    checked={beneficiario?.sexo === "H"}
                                                                />
                                                                <span className="absolute bg-white w-3 h-3 rounded-full opacity-0 rounded-lg-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                                            </label>
                                                            <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="react-horizontal">Hombre</label>
                                                        </div>
                                                    </label>
                                                </div>

                                                <div role="button" className="flex w-full items-center rounded-lg p-0 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100">
                                                    <label htmlFor="vue-horizontal" className="flex w-full cursor-pointer items-center px-3 py-2">
                                                        <div className="inline-flex items-center">
                                                            <label className="relative flex items-center cursor-pointer" htmlFor="vue-horizontal">
                                                                <input
                                                                    name="framework-horizontal"
                                                                    type="radio"
                                                                    className="h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-400 bg-white transition-all"
                                                                    value="M"
                                                                    id="vue-horizontal"
                                                                    {...register("sexo")}
                                                                    checked={beneficiario?.sexo === "M"}
                                                                />
                                                                <span className="absolute bg-white w-3 h-3 rounded-full opacity-0 rounded-lg-checked:opacity-100 transition-opacity duration-200 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                                                            </label>
                                                            <label className="ml-2 text-slate-600 cursor-pointer text-sm" htmlFor="vue-horizontal">Mujer</label>
                                                        </div>
                                                    </label>
                                                </div>

                                            </nav>
                                        </div>

                                    </div>

                                    <div className="mb-6 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Fecha de Nacimiento</label>
                                        <div className="col-sm-8">
                                            <input type="hidden"
                                                {...register("fecha_nacimiento")}
                                                value={beneficiario.fecha_nacimiento}
                                            />
                                            <label className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900 rounded-lg bg-white border-0 peer`}>{beneficiario.fecha_nacimiento}</label>

                                        </div>
                                    </div>

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Edad</label>
                                        <div className="col-sm-8">
                                            <input type="hidden"
                                            />
                                            <label className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900 rounded-lg bg-white border-0 peer`}>{beneficiario.edad}</label>

                                        </div>
                                    </div>

                                </div>

                                <div className="grid md:grid-cols-3 md:gap-2  bg-gray-200">

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Apellido Paterno</label>
                                        <input
                                            type="hidden"
                                            value={beneficiario.primer_apellido}
                                            {...register("primer_apellido")}
                                        />
                                        <label className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900 rounded-lg bg-white border-0 peer`}>{beneficiario.primer_apellido}</label>
                                    </div>

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Apellido Materno</label>
                                        <input
                                            type="hidden"
                                            value={beneficiario.segundo_apellido}
                                            {...register("segundo_apellido")}
                                        />
                                        <label className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900 rounded-lg bg-white border-0 peer`}>{beneficiario.segundo_apellido}</label>
                                    </div>

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Nombre(s)</label>
                                        <input
                                            type="hidden"
                                            value={beneficiario.nombre}
                                            {...register("nombre")}
                                        />
                                        <label className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900 rounded-lg bg-white border-0 peer`}>{beneficiario.nombre}</label>
                                    </div>

                                </div>

                                <div className="grid md:grid-cols-3 md:gap-2 bg-gray-200">

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Estado Civil</label>
                                        {Array.isArray(EC) && EC.length > 0 ? (
                                            <select
                                                className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0
                        ${!errors.cve_estado_civil?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`}
                                                {...register("ct_edo_civil", { required: "Este campo es necesario" })}
                                            >
                                                <option value=''>Seleccione una opción</option>
                                                {EC.map((option) => (
                                                    <option key={option.cve_estado_civil} value={option.cve_estado_civil}>
                                                        {option.estado_civil}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className='text-center'>No hay estados civiles disponibles</p>
                                        )}

                                    </div>

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Telefono fijo</label>
                                        <input
                                            type="number"
                                            {...register("telefono", { required: "Este campo es necesario" })}
                                            className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900  bg-white border-0 rounded-lg peer`}
                                            placeholder="Escribe tu numero de telefono fijo"
                                        />
                                    </div>

                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">Telefono celular</label>
                                        <input
                                            type="number"
                                            {...register("telefono_fijo", { required: "Este campo es necesario" })}
                                            className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900  bg-white border-0 rounded-lg peer`}
                                            placeholder="Escribe tu numero de telefono celular"
                                        />
                                    </div>

                                </div>

                                <div className="grid md:grid-cols-3 md:gap-2 bg-gray-200">


                                    <div className="mb-2 w-full group">
                                        <label className="block mb-1 text-sm text-center text-black mt-4">
                                            Documento Oficial
                                        </label>
                                        {Array.isArray(DOC) && DOC.length > 0 ? (
                                            <select
                                                className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                                                {...register("tp_id_oficial", {
                                                    required: "Este campo es necesario",
                                                    onChange: (e) => {
                                                        const value = e.target.value;
                                                        setSelectedDoc(value);
                                                        // Actualiza el valor del formulario
                                                        setValue("id_oficial", value ? "" : "");
                                                    }
                                                })}
                                            >
                                                <option value="">Seleccione una opción</option>
                                                {DOC.map((option) => (
                                                    <option key={option.id_documento} value={option.id_documento}>
                                                        {option.desc_documento}
                                                    </option>
                                                ))}
                                            </select>
                                        ) : (
                                            <p className="text-center">No hay documentos disponibles</p>
                                        )}
                                    </div>

                                    <div className="mb-2 w-full group">
                                        {selectedDoc && (
                                            <div>
                                                <label className="block mb-1 text-sm text-center text-black mt-4">Identificador</label>
                                                <input
                                                    type="text"
                                                    {...register("id_oficial", { required: "Este campo es necesario" })}
                                                    className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900  bg-white border-0 rounded-lg peer`}
                                                    placeholder="Ingrese el número de documento"
                                                    disabled={!selectedDoc}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-2 w-full group">
                                        <div className="relative">
                                            <div className="flex justify-center">
                                                <label className="block mb-1 text-sm text-center text-black mt-4">Correo Electronico</label>
                                            </div>
                                            <input
                                                type="search"
                                                className="block w-full p-4 text-lg text-black border-transparent rounded-lg bg-gray-50 dark:bg-gray-200 dark:placeholder-gray-400 dark:text-black dark:focus:ring-red-400 dark:focus:border-red-900"
                                                placeholder="Correo Electronico"
                                                required
                                                onChange={(e) => {
                                                    setConcatenatedEmail(`${e.target.value}`);
                                                    register("e_mail").onChange(e);
                                                }}
                                            />
                                            {Array.isArray(DOM) && DOM.length > 0 ? (
                                                <select
                                                    className={`absolute end-2.5 bottom-2 bg-colorPrimario text-white border-colorPrimario hover:bg-colorPrimario hover:text-white rounded-lg text-sm px2 py-2 text-center peer`}
                                                    {...register("e_mail", { required: "Este campo es necesario" })}
                                                >
                                                    <option value=''>Seleccione una opción</option>
                                                    {DOM.map((option) => (
                                                        <option key={option.id_sigesp} value={`${concatenatedEmail}${option.dominio_mail}`}>
                                                            {option.dominio_mail}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : (
                                                <p className='text-center'>No hay dominios disponibles</p>
                                            )}


                                        </div>


                                    </div>

                                </div>

                            </div>
                            <div className='flex justify-center'>
                                <button
                                    // disabled={isSaving}
                                    type="submit"
                                    className={`col-span-6 bg-colorPrimario text-white hover:bg-colorSecundario hover:text-white border-2 focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>
                                    Guardar
                                </button>

                            </div>
                        </div>
                    </form >
                </div >
            )}
        </>


    )
};


