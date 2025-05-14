import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { urlBase } from '../../api';
import { useForm } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
// import { cleanData, storeData } from '../../store';

export const DatosDomic = ({ onStepComplete }) => {

    const [calleChecked, setCalleChecked] = useState(false);
    const [numExtChecked, setNumExtChecked] = useState(false);
    const [numIntChecked, setnumIntChecked] = useState(false);

    const folio = useSelector(state => state.validacion.folio);
    const curp = useSelector(state => state.validacion.curp);
    const id = useSelector(state => state.validacion.id);

    const [actualId, setActualId] = useState(null); // Estado para almacenar el ID final
    useEffect(() => {
        if (folio && !id) {
            setActualId(folio);
        } else if (!folio && id) {
            setActualId(id);
        }
    }, [folio, id]);

    // Configuración del formulario con valores iniciales
    const { register, formState: { errors }, watch, handleSubmit, setValue } = useForm({
        defaultValues: {
            id: '',        // Inicializar como string vacío
            folio_asignado: '',
            curp: '',
            municipio: '',
            localidad: '',
            colonia: '',
            codigo_postal: '',
            calle: '',
            num_ext: '',
            num_int: '',
            entre_calle: '',
            y_calle: '',
            otra_referencia: '',
            cve_municipio: '',     // Nuevo campo para el ID
            cve_localidad: '',     // Nuevo campo para el ID
            cve_asentamiento: '',  // Nuevo campo para el ID
        }
    });

// Efecto para mantener los campos sincronizados con Redux
useEffect(() => {
    setValue('id', actualId);
    setValue('folio_asignado', folio);
    setValue('curp', curp);
}, [id, folio, curp, actualId, setValue]);

    const token = 1;
    // FILTROS DE MUNICIPIO, LOCALIDAD Y COLONIA 
    const [MU, setMU] = useState([]);
    const [, setMunLocCol] = useState({});
    useEffect(() => {
        const fetchAndSetMunicipios = async () => {
            try {
                const response = await axios.get(`${urlBase}/municipios`, { headers: { 'token': token } });
                const municipios = response.data;
                setMU(municipios);
                // setStatusMu(status);
                // console.log(status);
                // // setLOC(localidades);
                // console.log("Municipios:", municipios);
                setMunLocCol(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchAndSetMunicipios();
    }, [token]);

    const [cve_municipio, setMunicipioID] = useState();
    // console.log("Municipio ID:", cve_municipio);
    const [cve_localidad, setLocalidadID] = useState();
    // console.log("Localidad ID:", cve_localidad);
    const [cve_asentamiento, setColoniaID] = useState();
    // console.log("Colonia ID:", cve_asentamiento);

    const [LOC, setLOC] = useState([]);
    const [, setLocal] = useState([]);
    useEffect(() => {
        const fetchAndSetLocalidades = async () => {
            try {
                if (!cve_municipio) return; // Evitar petición sin municipio seleccionado

                const response = await axios.post(`${urlBase}/obLocalidad`, { cve_municipio });
                const localidad = response.data.data;
                setLOC(localidad);
              
                setLocal(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchAndSetLocalidades();
    }, [cve_municipio]); // Cambiar de [token] a [cve_municipio]

    const [COL, setCOL] = useState([]);
    const [, setColonias] = useState([]);
    useEffect(() => {
        const fetchAndSetColonias = async () => {
            try {
                if (!cve_municipio) return;
                const response = await axios.post(`${urlBase}/obColonias`, { cve_municipio });
                const colonia = response.data.data;
                setCOL(colonia);
           
                setColonias(response.data);
            } catch (error) {
                console.error("Error al obtener los datos:", error);
            }
        };

        fetchAndSetColonias();
    }, [cve_municipio]);

    const onSubmit = async (data) => {
      
      
        const response = await axios.post(`${urlBase}/modificarDomicilio`, { data });
        
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
        } else if (response.data.message === '50000') {

            Swal.fire({
                title: '¿Estas seguro de guardar tus datos domiciliarios?',
                text: 'Una vez guardados tus datos, no podran ser modificados.',
                icon: 'warning',
                width: '40rem',
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
                        title: 'Datos domiciliarios guardados correctamente',
                        text: 'Tus datos han sido guardados, puedes continuar con el siguiente paso',
                        icon: 'success',
                        allowOutsideClick: false,
                        showConfirmButton: true,
                        confirmButtonColor: '#8a2036',
                        confirmButtonText: 'Continuar - Paso 2'
                    });
                    onStepComplete();

                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire({
                        title: 'Operación Cancelada',
                        text: 'Tus datos no han sido guardados, por favor verifica que los datos sean correctos antedes de guardarlos.',
                        icon: 'error',
                        allowOutsideClick: false,
                        showConfirmButton: true,
                        confirmButtonColor: '#8a2036',
                        confirmButtonText: 'Aceptar'
                    })

                }
            }
            );
        }
    };


    return (
        <div>
            <div className="col p-3 text-xl text-left bg-colorPrimario text-white">
                <label className="col-form-label">Datos Domiciliarios</label>
            </div >

            <form onSubmit={handleSubmit(onSubmit)}
            >
                <div className="pb-5 text-sm text-slate-500">

                    <div className="grid sm:grid-cols-4 md:gap-3 p-2 bg-gray-200">


                        {actualId ? (
                            <>
                                <input type="hidden" {...register("id")} value={actualId} />
                                <input type="hidden" {...register("folio_asignado")} value={actualId} />
                            </>
                        ) : null}

                        <input type="hidden" {...register("curp")} value={curp} />

                        <input
                            type="hidden"
                            value={cve_municipio}
                            {...register("cve_municipio")}
                            className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                        />

                        <input
                            type="hidden"
                            value={cve_localidad}
                            {...register("cve_localidad")}
                            className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                        />

                        <input
                            type="hidden"
                            value={cve_asentamiento}
                            {...register("cve_asentamiento")}
                            className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                        />


                        <div className="mb-4 w-full group">
                            <label className="block mb-1 text-sm text-center text-black mt-4">Municipio</label>
                            {Array.isArray(MU) && MU.length > 0 ? (
                                <select
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                                    {...register("municipio", {
                                        required: "Este campo es necesario",
                                        onChange: (e) => {
                                            const selectedMunicipio = MU.find(m => m.municipionombre === e.target.value);
                                            if (selectedMunicipio) {
                                                setValue("municipio", selectedMunicipio.municipionombre);
                                                setValue("cve_municipio", selectedMunicipio.municipioid); // Guarda el ID
                                                setMunicipioID(selectedMunicipio.municipioid);

                                            }
                                        }
                                    })}
                                >
                                    <option value=''>Seleccione una opción</option>
                                    {MU.map((option) => (
                                        <option value={option.municipionombre}>
                                            {option.municipionombre}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className='text-center'>No hay municipios disponibles</p>
                            )}
                        </div>

                        <div className="mb-4 w-full group">
                            <label className="block mb-1 text-sm text-center text-black mt-4">
                                Localidad
                            </label>

                            {Array.isArray(LOC) && LOC.length > 0 ? (
                                <select
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                                    {...register("localidad", {
                                        required: "Este campo es necesario",
                                        onChange: (e) => {
                                            const selectedLocalidad = LOC.find(l => l.desc_localidad === e.target.value);
                                            if (selectedLocalidad) {
                                                setValue("localidad", selectedLocalidad.desc_localidad);
                                                setValue("cve_localidad", selectedLocalidad.cve_localidad);
                                                setLocalidadID(selectedLocalidad.cve_localidad);
                                            }
                                        }
                                    })}
                                >
                                    <option value=''>Seleccione una opción</option>
                                    {LOC.map((option) => (
                                        <option value={option.desc_localidad}>
                                            {option.desc_localidad}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className='text-center'>No hay localidades disponibles</p>
                            )}
                        </div>

                        <div className="mb-4 w-full group">
                            <label className="block mb-1 text-sm text-center text-black mt-4">
                                Colonia
                            </label>
                            {Array.isArray(COL) && COL.length > 0 ? (
                                <select
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer`}
                                    {...register("colonia", {
                                        required: "Este campo es necesario",
                                        onChange: (e) => {
                                            const selectedColonia = COL.find(c => c.desc_asenta === e.target.value);
                                            if (selectedColonia) {
                                                setValue("colonia", selectedColonia.desc_asenta);
                                                setValue("cve_asentamiento", selectedColonia.id_asenta_cpcons);
                                                setColoniaID(selectedColonia.id_asenta_cpcons);
                                            }
                                        }
                                    })}
                                >
                                    <option value=''>Seleccione una opción</option>
                                    {COL.map((option) => (
                                        <option value={option.desc_asenta}>
                                            {option.desc_asenta} - {option.cp_sipo}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <p className='text-center'>No hay colonias disponibles</p>
                            )}
                        </div>


                        <div className="mb-6 w-full group">
                            <label className="block mb-1 text-sm text-center text-black mt-4">
                                Codigo Postal
                            </label>
                            <div className="col-sm-8">
                                <input type="number"
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900  bg-white border-0 peer`}
                                    placeholder="Digite el código postal"
                                    {...register("codigo_postal", { required: "Este campo es necesario" })}
                                />

                            </div>
                        </div>

                    </div>

                    <div className="grid md:grid-cols-3 md:gap-3 p-2 bg-gray-200">

                        <div className="mb-4 w-full group">

                            <div className="grid sm:grid-cols-2 md:gap-3  bg-gray-200">
                                <label className="block mb-1 text-sm text-center text-black mt-4 border ">Calle</label>
                                <div className="inline-flex items-center">
                                    <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                                        <input
                                            type="checkbox"
                                            {...register("calle", { required: "Este campo es necesario" })}
                                            className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-red-900 checked:border-slate-800"
                                            id="check-2"
                                            onChange={(e) => setCalleChecked(e.target.checked)}
                                        />
                                    </label>

                                    <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
                                        {calleChecked ? "Cuento con esa dirección" : "No cuento con ese dato"}
                                    </label>

                                </div>

                            </div>
                            {calleChecked == false ? (
                                < input
                                    type="text"
                                    placeholder="Escriba el nombre de la calle"
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer ${calleChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    {...register("calle", { required: "Este campo es necesario" })}
                                />
                            ) : (
                                < input
                                    type="text"
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer ${calleChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    {...register("calle", { required: "Este campo es necesario" })}
                                    value="S/D"
                                    disabled={calleChecked}
                                />
                            )
                            }
                        </div>

                        <div className="mb-4 w-full group">

                            <div className="grid sm:grid-cols-2 md:gap-3  bg-gray-200">
                                <label className="block mb-1 text-sm text-center text-black mt-4 border ">Numero Exterior</label>
                                <div className="inline-flex items-center">
                                    <label className="flex items-center cursor-pointer relative" htmlFor="check-3">
                                        <input type="checkbox"
                                            {...register("num_ext", { required: "Este campo es necesario" })}
                                            className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-red-900 checked:border-slate-800"
                                            id="check-3"
                                            onChange={(e) => setNumExtChecked(e.target.checked)}
                                        />
                                    </label>
                                    <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
                                        {numExtChecked ? "Cuento con el numero Exterior" : "No cuento con ese dato"}
                                    </label>
                                </div>

                            </div>
                            {numExtChecked == false ? (
                                < input
                                    type="text"
                                    placeholder="Escriba el número exterior"
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer ${numExtChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    {...register("num_ext", { required: "Este campo es necesario" })}
                                />
                            ) : (
                                < input
                                    type="text"
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer ${numExtChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    // {...register("calle", { required: "Este campo es necesario" })}
                                    value="S/N"
                                    disabled={numExtChecked}
                                />
                            )
                            }
                            {/* <input type="text" placeholder="Escriba el número exterior"
                                className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900  bg-white border-0 peer`}
                                {...register("num_ext", { required: "Este campo es necesario" })}
                            /> */}

                        </div>

                        <div className="mb-4 w-full group">

                            <div className="grid sm:grid-cols-2 md:gap-3  bg-gray-200">

                                <label className="block mb-1 text-sm text-center text-black mt-4 border ">
                                    Numero Interior
                                </label>

                                <div className="inline-flex items-center">
                                    <label className="flex items-center cursor-pointer relative" htmlFor="check-4">
                                        <input type="checkbox"
                                            {...register("num_int", { required: "Este campo es necesario" })}
                                            className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-red-900 checked:border-slate-800"
                                            id="check-4"
                                            onChange={(e) => setnumIntChecked(e.target.checked)}
                                        />
                                    </label>
                                    <label className="cursor-pointer ml-2 text-slate-600 text-sm" htmlFor="check-2">
                                        {numIntChecked ? "Cuento con el numero Interior" : "No cuento con ese dato"}
                                    </label>
                                </div>

                            </div>
                            {numIntChecked == false ? (
                                < input
                                    type="text"
                                    placeholder="Escriba el número exterior"
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer ${numIntChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    {...register("num_int", { required: "Este campo es necesario" })}
                                />
                            ) : (
                                < input
                                    type="text"
                                    className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900 bg-white border-0 peer ${numIntChecked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    // {...register("calle", { required: "Este campo es necesario" })}
                                    value="S/N"
                                    disabled={numIntChecked}
                                />
                            )
                            }
                            {/* <input
                                type="text"
                                className={`block py-2.5 px-0 w-full text-lg text-center rounded-lg text-gray-900  bg-white border-0 peer`}
                                placeholder="Escriba el número interior"
                                {...register("num_int", { required: "Este campo es necesario" })}
                            /> */}

                        </div>

                    </div>

                    <div className="grid md:grid-cols-3 md:gap-3 p-3 bg-gray-200">

                        <div className="mb-4 w-full group">
                            <label htmlFor="staticEmail"
                                className="block mb-1 text-sm text-center text-black mt-4">
                                Entre Calle
                            </label>
                            <input
                                type="text"
                                className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900 bg-white border-0 rounded-lg peer`}
                                placeholder="Escriba la entre calle"
                                {...register("entre_calle", { required: "Este campo es necesario" })}
                            />

                        </div>

                        <div className="mb-4 w-full group">
                            <label className="block mb-1 text-sm text-center text-black mt-4">
                                Y Calle
                            </label>
                            <input
                                type="text"
                                className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900  bg-white border-0 rounded-lg peer`}
                                placeholder="Escriba y calle"
                                {...register("y_calle", { required: "Este campo es necesario" })}
                            />

                        </div>

                        <div className="mb-4 w-full group">
                            <label htmlFor="staticEmail"
                                className="block mb-1 text-sm text-center text-black mt-4">
                                Otra Referencia
                            </label>
                            <input type="text"
                                className={`block py-2.5 px-0 w-full text-lg text-center text-gray-900  bg-white border-0 rounded-lg peer`}
                                placeholder="Escriba otra referencia"
                                {...register("otra_referencia", { required: "Este campo es necesario" })}
                            />
                        </div>

                    </div>

                </div>
                <button
                    type="submit"
                    className={`col-span-6 bg-colorPrimario text-white hover:bg-colorSecundario hover:text-white border-2 focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>
                    Guardar
                </button>
            </form>
        </div>
    )
};


