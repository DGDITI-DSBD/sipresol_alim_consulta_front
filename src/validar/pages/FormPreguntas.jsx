import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { cleanData, storeData } from '../../store';
import Colibri from '../../images/colibri.png';

export const FormPreguntas = () => {

    const [estudiando, setEstudiando] = useState(false);

    const handleRadioChange2 = (event) => {
        setEstudiando(event.target.value === "1");
    };

    const [isEnabled, setIsEnabled] = useState(false);


    const [otroSeleccionado, setOtroSeleccionado] = useState(false);

    const handleRadioChange = (event) => {
        setOtroSeleccionado(event.target.value === "otro");
    };

    const token = 1;


    //APARTADO PARA EL SELECT DE  PARENTESCO
    // Estado para los checkboxes y valores numéricos/textuales
    const [parentescoValues, setParentescoValues] = useState({
        Cónyuge: { checked: false, cantidad: "" },
        Yerno: { checked: false, cantidad: "" },
        Hijas: { checked: false, cantidad: "" },
        Sobrinos: { checked: false, cantidad: "" },
        Padres: { checked: false, cantidad: "" },
        Nietos: { checked: false, cantidad: "" },
        Hermanas: { checked: false, cantidad: "" },
        "Sin parentesco": { checked: false, cantidad: "" },
        Abuelos: { checked: false, cantidad: "" },
        Suegra: { checked: false, cantidad: "" },
        Nuera: { checked: false, cantidad: "" },
        Otro: { checked: false, especificar: "" },
    });

    // Manejo de cambios en los checkboxes
    const handleCheckboxSelection = (event) => {
        const { value, checked } = event.target;

        setParentescoValues((prev) => ({
            ...prev,
            [value]: { ...prev[value], checked: checked },
        }));
    };

    // Manejo de cambios en los campos numéricos y de texto
    const handleInputChange = (event, label, field) => {
        const value = field === "cantidad" ? Number(event.target.value) : event.target.value;

        setParentescoValues((prev) => ({
            ...prev,
            [label]: { ...prev[label], [field]: value },
        }));
    };






    // ESTADO PARA LOS CHECKBOX - SERVICIOS
    const [serviciosValues, setServiciosValues] = useState({
        Luz: 0,
        Agua: 0,
        Drenaje: 0,
        Gas: 0,
        Internet: 0,
    });
    // SERVICIOS - CHECKBOX
    const handleCheckboxSelection2 = (event) => {
        const target = event.target;
        const value = target.value;
        setServiciosValues((prev) => ({
            ...prev,
            [value]: target.checked ? 1 : 0,
        }));
    };

    // FUNCION PARA GUARDAR LOS DATOS
    const dispatch = useDispatch();
    const { isSaving, status } = useSelector(state => state.validacion);
    // FORMULARIO
    const { register, control, resetField, formState: { errors }, handleSubmit, reset } = useForm({ // useForm es un hook personalizado para administrar formularios con facilidad
        defaultValues: {
            // SECCION 1
            jefa_familia: '',
            estudios: '',
            empleo_formal: '',
            ingresos_mensuales: '',
            seguro_social: '',
            bnf_programa: '',
            mfbnf_programa: '',
            parentesco: '',
            // SECCION 2
            zona: '',
            casa: '',
            cuartos: '',
            personas: '',
            paredes_vivienda: '',
            pisos_vivienda: '',
            techo_vivienda: '',
            servicios: '',
            // SECCION 3
            indigena: '',
            afromexicana: '',
            enfermedad: '',
            discapacidad: '',
            cuida_personas: '',
            victima: '',
            repatriada: '',
        }
    });
    // FUNCION PARA GUARDAR LOS DATOS
    const onSubmit = (formData) => {
      
        formData.parentesco = Object.values(parentescoValues).join('');
        formData.servicios = Object.values(serviciosValues).join('');
        // console.log(formData.parentesco);
        dispatch(storeData('modificarForms', formData));
    };
    // SWEETALER PARA GUARDAR Y CANCELAR
    if (status === 'saved') {
        Swal.fire({
            text: 'Guardado correctamente',
            title: 'Solicitud Aceptada',
            icon: 'success',
            allowOutsideClick: false,
            showCancelButton: false,
            confirmButtonColor: '#CA2525',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cleanData());
            }
        });
    } else if (status === 'fail') {
        Swal.fire({
            title: 'Ese registro ya existe',
            // text: 'NOMBRE: ' + dataValidate?.payload.email,
            icon: 'warning',
            allowOutsideClick: false,
            showCancelButton: false,
            confirmButtonColor: '#CA2525',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} >



                <div className="col p-3 text-xl text-left bg-red-900 text-white">
                    <label className="col-form-label">
                        3. IDENTIFICACIÓN DE TIPOS DE CARENCIAS DE LA MUJER  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-2 bg-gray-200"></div>

                <div className="col p-3 text-xl text-left bg-gray-400 text-white">
                    <label className="col-form-label">Sección 1</label>
                </div>

                <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">



                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >
                            3.1  El hogar se encuentra en:
                        </label>
                        <div className="grid md:grid-cols-2 md:gap-6 justify-center text-center">
                            <div className="flex items-center me-4">
                                <input type="radio" name="9"
                                    {...register("zona", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">Zona Urbana</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="9"
                                    {...register("zona", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900">Zona Rural</label>
                            </div>
                        </div>
                    </div>



                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">


                        <label
                            htmlFor="inputPassword"
                            className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >
                            3.2  ¿Cuenta con empleo formal?
                        </label>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <input type="radio" name="3"
                                    {...register("empleo_formal", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900" >
                                    Sí
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="3"
                                    {...register("empleo_formal", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    No
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            3.3  ¿A cuánto ascienden los ingresos mensuales del hogar?
                        </label>
                        <div className="grid md:grid-cols-5 gap-4">
                            <div className="flex items-center">
                                <input type="radio" name="4"
                                    {...register("ingresos_mensuales", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    De $1 a $500
                                </label>
                            </div>
                            <br></br>
                            <div className="flex items-center">
                                <input type="radio" name="4"
                                    {...register("ingresos_mensuales", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900" >
                                    De $501 a $1,000
                                </label>
                            </div>
                            <br></br>
                            <div className="flex items-center">
                                <input type="radio" name="4"
                                    {...register("ingresos_mensuales", { required: "Este campo es necesario" })}
                                    value="2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    De $1,001 a $1,500
                                </label>
                            </div>
                            <br></br>
                            <div className="flex items-center">
                                <input type="radio" name="4"
                                    {...register("ingresos_mensuales", { required: "Este campo es necesario" })}
                                    value="3"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900" >
                                    De $1,501 a $2,000
                                </label>
                            </div>
                            <br></br>
                            <div className="flex items-center">
                                <input type="radio" name="4"
                                    {...register("ingresos_mensuales", { required: "Este campo es necesario" })}
                                    value="4"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    Más de $2,000
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            3.4 ¿Cuentas con seguro social?
                        </label>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                                <input type="radio" name="5"
                                    {...register("seguro_social", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    Servicios Médicos
                                </label>
                            </div>

                            <div className="flex items-center">
                                <input type="radio" name="5"
                                    {...register("seguro_social", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    Pensión
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="5"
                                    {...register("seguro_social", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    SAR o AFORE
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="5"
                                    {...register("seguro_social", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900" >
                                    No
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            3.5   ¿Es beneficiaria de algún programa social del carácter federal, estatal o municipal?
                        </label>

                        <div className="grid md:grid-cols-3 gap-4">
                            {/* Opción Sí */}
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="bnf_programa"
                                    value="1"
                                    onChange={() => setIsEnabled(true)}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <label className="ml-2 text-sm font-semibold text-gray-900">
                                    Sí
                                </label>
                            </div>

                            {/* Campo de texto que se activa al seleccionar Sí */}

                            <div className="flex flex-wrap items-center gap-2">
                                <label htmlFor="bnf_programa" className="text-sm font-semibold text-gray-900">
                                    ¿Cuál?
                                </label>
                                <input
                                    type="text"
                                    {...register("bnf_programa", { required: isEnabled ? "Este campo es necesario" : false })}
                                    className={`w-full sm:w-80 px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 ${!isEnabled ? "bg-gray-200 cursor-not-allowed" : ""}`}
                                    placeholder="Especificar"
                                    maxLength={60}
                                    disabled={!isEnabled}
                                />
                            </div>
                            <br></br>

                            {/* Opción No */}
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="bnf_programa"
                                    value="0"
                                    onChange={() => setIsEnabled(false)}  // Ahora desactiva el campo de texto
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                />
                                <label className="ml-2 text-sm font-semibold text-gray-900">
                                    No
                                </label>
                            </div>


                        </div>
                    </div>

                    {/* 
                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            ¿Algún miembro de su familia cuenta con algún programa social de carácter federal, estatal o municipal?
                        </label>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                                <input type="radio" name="8"
                                    {...register("mfbnf_programa", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    Sí
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input type="radio" name="8"
                                    {...register("mfbnf_programa", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900">
                                    No
                                </label>
                            </div>

                        </div>
                    </div> */}



                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            Parentesco de los dependientes económicos, respecto a la jefa del hogar:
                        </label>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                {Object.keys(parentescoValues).map((label, index) => (
                                    <div key={index} className="flex items-center mb-2">
                                        <input
                                            type="checkbox"
                                            value={label}
                                            checked={parentescoValues[label].checked}
                                            onChange={handleCheckboxSelection}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label className="ml-2 text-sm font-semibold text-gray-900">{label}</label>

                                        {/* Si está seleccionado y NO es "Otro", se muestra el campo numérico */}
                                        {parentescoValues[label].checked && label !== "Otro" && (
                                            <input
                                                type="number"
                                                min="1"
                                                className="ml-2 w-20 px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Cantidad"
                                                value={parentescoValues[label].cantidad}
                                                onChange={(e) => handleInputChange(e, label, "cantidad")}
                                            />
                                        )}
                                    </div>
                                ))}

                                {/* Si selecciona "Otro", se muestra el campo de texto */}
                                {parentescoValues["Otro"].checked && (
                                    <div className="mt-2">
                                        <label className="text-sm font-semibold text-gray-900">¿Cuál?</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-2 mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Especificar"
                                            value={parentescoValues["Otro"].especificar}
                                            onChange={(e) => handleInputChange(e, "Otro", "especificar")}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>





                <div className="col p-3 text-xl text-left bg-gray-400 text-white">
                    <label className="col-form-label">Sección 2</label>
                </div>

                {/*  modificando el estilo  para ponerlo en  cuadritos */}
                <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">


                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >
                            La casa donde actualmente vive es:
                        </label>
                        <div className="grid md:grid-cols-8 md:gap-6">

                            <div className="flex items-center me-4">
                                <input type="radio" name="10"
                                    {...register("casa", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">Propia </label>
                            </div>
                            <br></br>
                            <div className="flex items-center me-4">
                                <input type="radio" name="10"
                                    {...register("casa", { required: "Este campo es necesario" })}
                                    value="2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900">Rentada </label>
                            </div>
                            <br></br>
                            <div className="flex items-center me-4">
                                <input type="radio" name="10"
                                    {...register("casa", { required: "Este campo es necesario" })}
                                    value="3"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Prestada </label>
                            </div>
                            <br></br>
                            <div className="flex items-center me-4">
                                <input type="radio" name="10"
                                    {...register("casa", { required: "Este campo es necesario" })}
                                    value="4"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> La estoy pagando</label>
                            </div>

                            <br></br>
                            <div className="flex flex-wrap items-center gap-2 me-4">
                                <label htmlFor="casa" className="text-sm font-semibold text-gray-900">
                                    Otra
                                </label>
                                <input
                                    type="text"
                                    {...register("casa", { required: "Este campo es necesario" })}
                                    className="w-full sm:w-80 px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Ingrese la información"
                                />
                            </div>



                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >
                            3.8 ¿Cuántos cuartos tiene su vivienda, contando baños?
                        </label>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="11"
                                    {...register("cuartos", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Dos</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="11"
                                    {...register("cuartos", { required: "Este campo es necesario" })}
                                    value="2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> Tres</label>
                            </div>
                            {/* <div className="flex items-center me-4">
                                <input type="radio" name="11"
                                    {...register("cuartos", { required: "Este campo es necesario" })}
                                    value="3"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Cuatro</label>
                            </div> */}
                            <div className="flex items-center me-4">
                                <input type="radio" name="11"
                                    {...register("cuartos", { required: "Este campo es necesario" })}
                                    value="4"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> Mas de cuatro</label>
                            </div>
                        </div>
                    </div>




                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label
                            htmlFor="inputPassword"
                            className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >

                            3.9   Número de personas de viven en su casa:</label>
                        <div className="grid md:grid-cols-5 md:gap-6">

                            <div className="flex items-center me-4">
                                <input type="radio" name="12"
                                    {...register("personas", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio"
                                    className="ml-2 text-sm font-semibold text-gray-900">
                                    Dos</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="12"
                                    {...register("personas", { required: "Este campo es necesario" })}
                                    value="2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio"
                                    className="ml-2 text-sm font-semibold text-gray-900">
                                    Tres</label>
                            </div>
                            {/* <div className="flex items-center me-4">
                                <input type="radio" name="12"
                                    {...register("personas", { required: "Este campo es necesario" })}
                                    value="3"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio"
                                    className="ml-2 text-sm font-semibold text-gray-900">
                                    Cuatro</label>
                            </div> */}
                            <div className="flex items-center me-4">
                                <input type="radio" name="12"
                                    {...register("personas", { required: "Este campo es necesario" })}
                                    value="4"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio"
                                    className="ml-2 text-sm font-semibold text-gray-900">
                                    Mas de cuatro</label>
                            </div>

                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >
                            ¿De qué material son en mayor parte las paredes de su vivienda?</label>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="13"
                                    {...register("paredes_vivienda", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Tierra</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="13"
                                    {...register("paredes_vivienda", { required: "Este campo es necesario" })}
                                    value="2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> Cemento </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="13"
                                    {...register("paredes_vivienda", { required: "Este campo es necesario" })}
                                    value="3"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Material de desecho</label>
                            </div>

                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >
                            ¿De qué material son en mayor parte las pisos de su vivienda?
                        </label>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="14"
                                    {...register("pisos_vivienda", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Tierra</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="14"
                                    {...register("pisos_vivienda", { required: "Este campo es necesario" })}
                                    value="2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> Cemento </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="14"
                                    {...register("pisos_vivienda", { required: "Este campo es necesario" })}
                                    value="3"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Material de mdesecho </label>
                            </div>
                            {/* <div className="flex items-center me-4">
                                <input type="radio" name="14"
                                    {...register("pisos_vivienda", { required: "Este campo es necesario" })}
                                    value="4"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> Otro</label>
                            </div> */}

                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2" >
                            ¿De que material son en mayor parte el techo de su vivienda?
                        </label>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="15"
                                    {...register("techo_vivienda", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900">Lamina  </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="15"
                                    {...register("techo_vivienda", { required: "Este campo es necesario" })}
                                    value="2"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> Cemento </label>
                            </div>
                            {/* <div className="flex items-center me-4">
                                <input type="radio" name="15"
                                    {...register("techo_vivienda", { required: "Este campo es necesario" })}
                                    value="3"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Madera </label>
                            </div> */}
                            <div className="flex items-center me-4">
                                <input type="radio" name="15"
                                    {...register("techo_vivienda", { required: "Este campo es necesario" })}
                                    value="4"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> Material de desecho </label>
                            </div>
                        </div>
                    </div>


                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            3.11 ¿Cuáles de estos servicios tienes en tu casa?
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {Object.keys(serviciosValues).map((label, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        value={label}
                                        {...register("servicios")}
                                        onChange={handleCheckboxSelection2}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor={`bordered-checkbox-${index}`} className="text-sm font-semibold text-gray-900">
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>




                        {/* <div className="grid md:grid-cols-11 md:gap-6">
                                                <div className="flex items-center me-4">
                                                    <input id="bordered-checkbox-1" name="16"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="bordered-checkbox-1"
                                                        className="ml-2 text-sm font-semibold text-gray-900">
                                                        Luz</label>
                                                </div>
                                                <div className="flex items-center me-4">
                                                    <input id="bordered-checkbox-1" type="checkbox" name="16"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="bordered-checkbox-1"
                                                        className="ml-2 text-sm font-semibold text-gray-900">
                                                        Gas</label>
                                                </div>
                                                <div className="flex items-center me-4">
                                                    <input id="bordered-checkbox-1" type="checkbox" name="16" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="bordered-checkbox-1"
                                                        className="ml-2 text-sm font-semibold text-gray-900">
                                                        Agua</label>
                                                </div>
                                                <div className="flex items-center me-4">
                                                    <input id="bordered-checkbox-1" type="checkbox" name="16" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="bordered-checkbox-1"
                                                        className="ml-2 text-sm font-semibold text-gray-900">
                                                        Internet</label>
                                                </div>
                                                <div className="flex items-center me-4">
                                                    <input id="bordered-checkbox-1" type="checkbox" name="16" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label htmlFor="bordered-checkbox-1"
                                                        className="ml-2 text-sm font-semibold text-gray-900">
                                                        Drenaje</label>
                                                </div>
                                            </div> */}
                    </div>
                </div>

                <div className="col p-3 text-xl text-left bg-gray-400 text-white"><label className="col-form-label"> Sección 3</label></div>
                <div className="grid md:grid-cols-1 md:gap-6">
                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">



                        <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                            <label
                                htmlFor="gradoEstudios"
                                className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                                3.12  ¿Cuál es su grado de estudios?
                            </label>

                            <div className="grid md:grid-cols-9 md:gap-6">
                                {[
                                    { label: "Ninguna", value: "0" },
                                    { label: "Primaria", value: "1" },
                                    { label: "Secundaria", value: "2" },
                                    { label: "Preparatoria o Bachillerato", value: "3" },
                                    { label: "Licenciatura", value: "4" },
                                    { label: "Posgrado", value: "5" }
                                ].map((option, index) => (
                                    <div key={index} className="flex items-center me-4">
                                        <input
                                            type="radio"
                                            name="estudios"
                                            {...register("estudios", { required: "Este campo es necesario" })}
                                            value={option.value}
                                            onChange={handleRadioChange}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label className="ms-2 text-sm font-medium text-black">{option.label}</label>
                                    </div>
                                ))}

                                {/* Opción "Otro" */}
                                <div className="flex items-center me-4">
                                    <input
                                        type="radio"
                                        name="estudios"
                                        {...register("estudios", { required: "Este campo es necesario" })}
                                        value="otro"
                                        onChange={handleRadioChange}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label className="ms-2 text-sm font-medium text-black">Otro</label>
                                </div>
                            </div>

                            {/* Campo de texto cuando se selecciona "Otro" */}
                            {otroSeleccionado && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">¿Cuál?</label>
                                    <input
                                        type="text"
                                        {...register("estudios_otro", { required: "Por favor, especifique su grado de estudios" })}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ingrese su grado de estudios"
                                    />
                                </div>
                            )}
                        </div>



                        <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                            <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                                3.13 Actualmente ¿Se encuentra estudiando?
                            </label>

                            <div className="grid md:grid-cols-2 md:gap-6 justify-center text-center">
                                <div className="flex items-center me-4">
                                    <input
                                        type="radio"
                                        name="estudiando"
                                        {...register("estudiando", { required: "Este campo es necesario" })}
                                        value="1"
                                        onChange={handleRadioChange2}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label className="ml-2 text-sm font-semibold text-gray-900">Sí</label>
                                </div>
                                <div className="flex items-center me-4">
                                    <input
                                        type="radio"
                                        name="estudiando"
                                        {...register("estudiando", { required: "Este campo es necesario" })}
                                        value="0"
                                        onChange={handleRadioChange2}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label className="ml-2 text-sm font-semibold text-gray-900">No</label>
                                </div>
                            </div>

                            {/* Campo de texto adicional si responde "Sí" */}
                            {estudiando && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">¿Qué grado está cursando?</label>
                                    <input
                                        type="text"
                                        {...register("grado_actual", { required: "Por favor, ingrese el grado que cursa" })}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Ej. Universidad, Bachillerato, etc."
                                    />
                                </div>
                            )}
                        </div>


                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            3.14   En los ultimos tres meses, por falta de dinero  o recursos ¿Solo comio una vez, o dejo de comer todo el día?
                        </label>
                        <div className="grid md:grid-cols-2 md:gap-6 justify-center text-center">
                            <div className="flex items-center me-4">
                                <input type="radio" name="9"
                                    {...register("indigena", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="9"
                                    {...register("indigena", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="col p-3 text-xl text-left bg-red-900 text-white">
                    <label className="col-form-label">
                        4. CARACTERISTICAS ADICIONALES DE LA SOLICITANTE  </label>
                </div>

                <div className="col p-3 text-xl text-left bg-gray-400 text-white"><label className="col-form-label">  4.1 ¿Se encuentra en alguna de las siguientes circunstancias?</label></div>
                <div className="grid md:grid-cols-1 md:gap-6">




                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            A) ¿Es jefa de Familia?
                        </label>
                        <div className="grid md:grid-cols-8 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="17"
                                    {...register("Familia", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="17"
                                    {...register("Familia", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>
                        </div>
                    </div>




                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            B) ¿Se reconoce como indigena?
                        </label>
                        <div className="grid md:grid-cols-8 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="17"
                                    {...register("indigena", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="17"
                                    {...register("indigena", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>
                        </div>
                    </div>




                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            C) Se reconoce como afromexicana:
                        </label>
                        <div className="grid md:grid-cols-8 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="17"
                                    {...register("afromexicana", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="17"
                                    {...register("afromexicana", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            D)  ¿Tiene alguna enfermedad crónico degenerativa?
                        </label>
                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="18"
                                    {...register("enfermedad", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="18"
                                    {...register("enfermedad", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>

                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            E)  ¿Tiene alguna discapacidad permanente?
                        </label>
                        <div className="grid md:grid-cols-5 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="19"
                                    {...register("discapacidad", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si</label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="19"
                                    {...register("discapacidad", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            F) ¿Cuida a personas con alguna discapacidad?
                        </label>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="20"
                                    {...register("cuida_personas", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="20"
                                    {...register("cuida_personas", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            G)    ¿Ha sido víctima u ofendida de algún delito?
                        </label>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="21"
                                    {...register("victima", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="21"
                                    {...register("victima", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                        <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                            H)    ¿Es repatriada?
                        </label>
                        <div className="grid md:grid-cols-3 md:gap-6">
                            <div className="flex items-center me-4">
                                <input type="radio" name="22"
                                    {...register("repatriada", { required: "Este campo es necesario" })}
                                    value="1"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                            </div>
                            <div className="flex items-center me-4">
                                <input type="radio" name="22"
                                    {...register("repatriada", { required: "Este campo es necesario" })}
                                    value="0"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                            </div>

                        </div>
                    </div>

                </div>


                <button
                    disabled={isSaving}
                    type="submit"
                    className={`col-span-6 bg-colorPrimario text-white hover:bg-colorSecundario hover:text-white border-2 focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>
                    Guardar
                </button>
            </form>


            <br></br>
            {/* TALON FUB */}
{/* <>
<div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2 text-justify">
                    Por este medio, yo  "_______________________________" solicito mi registro al PROGRAMA DE DESARROLLO SOCIAL MUJERES CON BIENESTAR 2023 con la finalidad de
                    ser beneficiario del mismo y mejorar mi bienestar; manifiesto  que toda la información aqui contenida es verídica, fehacientemente y apegada a la realidad
                    y consiento que se integre el expediente que me identifique como beneficiario y verifique la acreditación de los requisitos que establecen en las mismas.
                    Bajo protesta de decir verdad manifiesto que la información proporcionada es verídica, Autorizo que el personal responsable de operar el programa pueda verificar los datos asentados en esta solicitud  y en caso de encontrarse  falsedad en los mismos, podrá ser motivo de que el apoyo  se cancele aun cuando
                    ya se haya asignado. Al firmar la presente solicitud  manifestó  conocer los derechos  y obligaciones asociados  al Programa  y me comprometo a cumplir  las responsabilidades que se deriven de la asignación del apoyo.
                    AUTORIZACION DE USO DE DATOS PERSONALES.
                    Los datos personales recabados serán protegidos, incorporados y tratados en la Base de Datos de este programa de Desarrollo social, información de que si  o no podría transmitirse con fundamento dispuesto en los artículos 1,2,18,19 y 97de la ley de Protección de Datos Personales en Posesión  de Sujetos  Obligados  del Estado de México y Municipios; 2fracción, 21, 22, 23 y  24 fracción XIV de la Ley de Transparencia y Acceso a la Información  Publica  del Estado de México  y Municipios, con las finalidades señaladas en los citados artículos y previa justificación de la misma, además otras transmisiones previstas en la ley . El interesado  podrá ejecutar los derechos de acceso , rectificación, cancelación  y oposición sobre sus datos personales  en posesión de los sujetos obligados correspondientes. Por lo que usted podrá consultar  el aviso de privacidad en la siguiente dirección electrónica  https://mujeresconbienestar.gob.mx/ avisodeprivacidad/

                    "ESTE PROGRAMA ES PUBLICO , AJENO A CUALQUIER PARTIDO POLÍTICO . QUEDA PROHIBIDO SU USO PARA FINES DISTINTOS AL DESARROLLO SOCIAL, QUIEN HAGA USO INDEBIDO  DE LOS RECURSOS DE ESTE PROGRAMA DEBERA SER DENUNCIADO Y SANCIONADO ANTE LAS AUTORIDADES CONFORME A LA LEY EN LA MATERIA".
                </label>
            </div>

            <div className="flex space-x-8 mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-bold text-slate-700">Firma del Solicitante</label>
                    <input
                        type="text"
                        placeholder="Nombre del solicitante"
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-colorPrimario"
                    />
                </div>

                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-bold text-slate-700">Firma del Aplicador</label>
                    <input
                        type="text"
                        placeholder="Nombre del aplicador"
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-colorPrimario"
                    />
                </div>
            </div>

            <div className="mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                <label className="block mb-4 text-sm font-bold text-slate-700 border-b border-gray-400 pb-2">
                    Una vez analizada la información proporcionada por la solicitante se desprende que se encuentra en situación de pobreza.
                </label>
                <div className="grid md:grid-cols-3 md:gap-6">
                    <div className="flex items-center me-4">
                        <input type="radio" name="22"
                            {...register("repatriada", { required: "Este campo es necesario" })}
                            value="1"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="inline-radio" className="ml-2 text-sm font-semibold text-gray-900"> Si </label>
                    </div>
                    <div className="flex items-center me-4">
                        <input type="radio" name="22"
                            {...register("repatriada", { required: "Este campo es necesario" })}
                            value="0"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label htmlFor="inline-2-radio" className="ml-2 text-sm font-semibold text-gray-900"> No</label>
                    </div>

                </div>
            </div>

            <nav className="bg-white shadow-xl">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center w-full p-2">
                        <img
                            src={Colibri}
                            alt="Logo"
                            width={30}
                            height={30}
                            className="mr-4"
                        /> logos
                    </div></div>
            </nav>

            <div className="flex space-x-8 mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-bold text-slate-700">Fecha de la solicitud</label>
                    <input
                        type="text"
                        placeholder="Fecha de la solicitud"
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-colorPrimario"
                    />
                </div>

                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-bold text-slate-700">Folio</label>
                    <input
                        type="text"
                        placeholder="Folio"
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-colorPrimario"
                    />
                </div>
            </div>

            <div className="flex space-x-8 mb-6 w-full group bg-gray-200 p-4 rounded-lg shadow-md">
                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-bold text-slate-700">Nombre </label>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-colorPrimario"
                    />
                </div>

                <div className="w-1/2">
                    <label className="block mb-2 text-sm font-bold text-slate-700">Firma</label>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-colorPrimario"
                    />
                </div>
            </div>
</> */}




        </div>





    )




};

