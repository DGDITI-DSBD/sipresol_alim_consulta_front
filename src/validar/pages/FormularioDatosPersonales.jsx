import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import { urlBase, pass } from '../../api';
import CryptoJS from "crypto-js";


import { useNavigate, Link } from 'react-router-dom';

export const FormularioDatosPersonales = ({ fields, onStepComplete, putRegistro, putStatusBeneficiario }) => {

    // Estados para el flujo
    const [loading, setLoading] = useState(true);
    const [infoCiudadano, setInfoCiudadano] = useState({});
    const [infoBeneficiario, setInfoBeneficiario] = useState({});
    const [infoPrograma, setInfoPrograma] = useState({});
    const [formConfig, setFormConfig] = useState(null);
    const location = useLocation();

    const navigate = useNavigate();

    // Estado para catálogos
    const [catalogos, setCatalogos] = useState({
        estadoCivil: [],
        gradosEstudio: [],
        municipios: [],
        localidades: [],
        documentos: [],
        codigos_postales:[],
        cedis_codigos_postales:[],
    });


    // Estado para localidades filtradas
    const [filteredLocalidades, setFilteredLocalidades] = useState([]);
    const [filteredCodigosPostales, setFilteredCodigosPostales] = useState([]);

    // Funciones de utilidad
    const fechaActualAAAAMMDD = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const obtenerFechaNacimientoYEdadDeCURP = useCallback((curp) => {
        if (!curp || curp.length !== 18) return { fechaNacimiento: null, edad: null, genero: null, entidad: null };

        const genero = curp.substring(10, 11) === 'H' ? 'H' : 'M';
        const entity = curp.substring(11, 13);

        const birthYear = parseInt(curp.substring(4, 6), 10) + (/[A-Z]/.test(curp[16]) ? 2000 : 1900);
        const birthDate = new Date(`${birthYear}-${curp.substring(6, 8)}-${curp.substring(8, 10)}`);
        const today = new Date();
        const yearDiff = today.getFullYear() - birthDate.getFullYear();
        const age = today.getTime() < birthDate.setFullYear(birthDate.getFullYear() + yearDiff) ?
            yearDiff - 1 : yearDiff;

        // Map state abbreviations to numeric codes
        const entityCodes = {
            'AS': '01', 'BC': '02', 'BS': '03', 'CC': '04', 'CL': '05',
            'CM': '06', 'CS': '07', 'CH': '08', 'DF': '09', 'DG': '10',
            'GT': '11', 'GR': '12', 'HG': '13', 'JC': '14', 'MC': '15',
            'MN': '16', 'MS': '17', 'NT': '18', 'NL': '19', 'OC': '20',
            'PL': '21', 'QT': '22', 'QR': '23', 'SP': '24', 'SL': '25',
            'SR': '26', 'TC': '27', 'TS': '28', 'TL': '29', 'VZ': '30',
            'YN': '31', 'ZS': '32', 'NE': '33'
        };

        const entidad = entityCodes[entity] || '15';
        const fechaNacimientoAAAAMMDD = `${birthYear}-${curp.substring(6, 8)}-${curp.substring(8, 10)}`;
        return { fechaNacimiento: fechaNacimientoAAAAMMDD, edad: age, genero: genero, entidad: entidad };
    }, []);

    // PASO 1: Cargar los catálogos
    useEffect(() => {
        const fetchCatalogs = async () => {
            try {
                const response = await axios.get(`${urlBase}/catalogos`);

                if (response.data) {
                    setCatalogos({
                        estadoCivil: response.data.data.estadocivil || [],
                        gradosEstudio: response.data.data.escolaridad || [],
                        municipios: response.data.data.municipios || [],
                        localidades: response.data.data.localidades || [],
                        documentos: response.data.data.docsoficiales || [],
                        codigos_postales: response.data.data.codigos_postales || [],
                        cedis_codigos_postales: response.data.data.cedis_codigos_postales || [],
                    });
                    //console.log('Catálogos cargados correctamente', response.data.data);
                }
            } catch (error) {
                //console.error('Error al cargar catálogos:', error);
            } finally {
                // Marcar como cargados incluso con error para continuar
                setLoading(false);
            }
        };
        fetchCatalogs();
       
    }, []);

    // PASO 2: Obtener información del ciudadano
    useEffect(() => {
        
        if (location.state && location.state.infoCiudadano && location.state.infoBeneficiario) {
            setInfoCiudadano(location.state.infoCiudadano[0]);
            //console.log("Información del ciudadano recibida:", location.state.infoCiudadano[0]);

            setInfoBeneficiario(location.state.infoBeneficiario[0]);
          


            // Establecer la información del programa
            if (location.state.infoCiudadano.programa) {
                setInfoPrograma({
                    programa_id: location.state.infoCiudadano.programa || 1,
                    apoyo_id: location.state.infoCiudadano.apoyo_id || 1,
                    calendario_id: location.state.infoCiudadano.calendario_id || 1,
                    padronStatus: location.state.infoCiudadano.padronStatus || 'NO',
                });
            } else {
                setInfoPrograma({
                    programa_id: 1,
                    apoyo_id: 1,
                    calendario_id: 1,
                    padronStatus: 'NO'
                });
            }
        } else {
            // Si no hay info, establecer valores por defecto
            setInfoCiudadano({});
            setInfoPrograma({
                programa_id: 1,
                apoyo_id: 1,
                calendario_id: 1,
                padronStatus: 'NO'
            });
        }

        if(location.state && location.state.infoBeneficiario){
            setInfoBeneficiario(location.state.infoBeneficiario[0]);
            //console.log("Información del beneficiario recibida:", location.state.infoBeneficiario[0]);
        }else{
            setInfoBeneficiario({});
        }
    }, [location]);





    // Definición de campos del formulario
    const mockFields = useMemo(()=> [
        {

            section: "Datos personales",
            fields: [
                { name: 'curp', label: 'CURP', type: 'text', cols: 12, habilitado: false },

                { name: 'nombres', label: 'Nombre(s)', type: 'text', cols: 4, habilitado: infoCiudadano.padronStatus === 'NO' && infoBeneficiario?.permanencia == false ? true : false },
                { name: 'primer_ap', label: 'Apellido Paterno', type: 'text', cols: 4, habilitado: infoCiudadano.padronStatus === 'NO' && infoBeneficiario?.permanencia == false ? true : false },
                { name: 'segundo_ap', label: 'Apellido Materno', type: 'text', cols: 4 ,habilitado: infoCiudadano.padronStatus === 'NO' && infoBeneficiario?.permanencia == false ? true : false },
                {
                    name: 'tp_id_oficial', label: 'Tipo de identificación oficial', type: 'select', cols: 6,
                    options: catalogos.documentos,
                    optionId: 'id',
                    optionLabel: 'tp_id_oficial'
                },
                { name: 'id_oficial', label: 'Clave de identificación oficial', type: 'text', cols: 6 },
                {
                    name: 'ct_edo_civil', label: 'Estado Civil', type: 'select', cols: 6,
                    options: catalogos.estadoCivil.length > 0 ? catalogos.estadoCivil : [
                        { id: '1', descripcion: 'Casada(a)' },
                        { id: '2', descripcion: 'Soltera(o)' },
                    ],
                    optionId: 'id',
                    optionLabel: 'estado_civil'
                }
            ]
        },
        {
            section: "Datos de contacto",
            fields: [
                { name: 'telefono', label: 'Teléfono Fijo', type: 'tel', cols: 3 },
                { name: 'celular', label: 'Celular', type: 'tel', cols: 3 },
                { name: 'email', label: 'Correo Electrónico', type: 'email', cols: 6 },
            ]
        },
        {
            section: "Dirección",
            fields: [
                { name: 'calle', label: 'Calle', type: 'text', cols: 6 },
                { name: 'num_ext', label: 'Número Exterior', type: 'text', cols: 3 },
                { name: 'num_int', label: 'Número Interior', type: 'text', cols: 3 },

                { name: 'entre_calle', label: 'Entre Calle', type: 'text', cols: 4 },
                { name: 'y_calle', label: 'Y Calle', type: 'text', cols: 4 },
                { name: 'otra_referencia', label: 'Otra Referencia', type: 'text', cols: 4 },
                {
                    name: 'ct_municipio', label: 'Municipio', type: 'select', cols: 6,
                    options: catalogos.municipios,
                    optionId: 'cve_municipio',
                    optionLabel: 'municipio'
                },
                {
                    name: 'ct_localidad', label: 'Localidad', type: 'select', cols: 6,
                    options: filteredLocalidades,
                    optionId: 'cve_localidad',
                    optionLabel: 'localidad'
                },
                { name: 'codigo_postal_id', label: 'Código Postal', type: 'select', cols: 4, options: catalogos.filteredCodigosPostales,
                    optionId: 'asentamiento_id',
                    optionLabel: 'codigo_asentamiento'
                },
                { name: 'colonia', label: 'Colonia', type: 'text', cols: 4 },

                {name:'cedis_nombre', label:'Cedis Asignado', type:'text', cols: 4, habilitado: false},
                
            ]
        },
    ], [catalogos, infoCiudadano, infoBeneficiario]);

    // PASO 3: Inicializar el formulario una vez tengamos catálogos e infoCiudadano
    useEffect(() => {
        if (loading) return;

        const actualFields = fields || mockFields;
        const allFields = actualFields.flatMap(section => section.fields);

        // Crear el esquema de validación
        const validationSchema = allFields.reduce((schema, field) => {
            // Base validation
            let fieldSchema = Yup.string()
                .required(`${field.label} es requerido`)
                .matches(/^[a-zA-Z0-9.,\sáéíóúÁÉÍÓÚñÑ()@/-_]+$/, 'Solo se permiten letras, números, espacios, puntos, comas, / , paréntesis y caracteres acentuados')
                .test('no-empty-spaces', `${field.label} no puede contener solo espacios en blanco`, value => value && value.trim().length > 0);

            // Apply specific validations based on field name or type
            switch (field.name) {
                case 'nombres':
                case 'primer_ap':
                case 'segundo_ap':
                    fieldSchema = fieldSchema
                        .matches(/^[a-zA-ZÀ-ÿ\s.]+$/, 'Solo se permiten letras, espacios y puntos')
                        .min(2, `${field.label} debe tener al menos 2 caracteres`);
                    break;
                case 'curp':
                    fieldSchema = fieldSchema
                        .matches(/^[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[M][A-Z]{5}[0-9A-F][0-9]$/, 'CURP inválida');
                    break;
                case 'telefono':
                    fieldSchema = fieldSchema
                    .matches(/^\d{10}$/, 'El número debe tener 10 dígitos')
                    .test('different-from-telefono', 'El teléfono fijo  no debe ser igual al celular', function (value) {
                        return value !== this.parent.celular;
                    });
                break;
                case 'celular':
                    fieldSchema = fieldSchema
                        .matches(/^\d{10}$/, 'El número debe tener 10 dígitos')
                        .test('different-from-telefono', 'El celular no debe ser igual al teléfono fijo', function (value) {
                            return value !== this.parent.telefono;
                        });
                    break;
                case 'id_oficial':
                    if (field.name === 'id_oficial' && field.type === 'text') {
                        fieldSchema = fieldSchema.test('id_oficial-validation', 'Ingrese la Clave de Elector correctamente', function (value) {
                            const { tp_id_oficial } = this.parent;
                            return tp_id_oficial !== '2' || /^[A-Z]{6}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(0[1-9]|[12][0-9]|3[0-3])[HM][0-9]{3}$/.test(value);
                        });
                    }
                    break;
                case 'email':
                    fieldSchema = fieldSchema
                        .email('Correo electrónico inválido')
                        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo electrónico inválido');
                    break;
                default:
                    if (field.type === 'select' && field.options) {
                        const validOptions = field.options.map(opt =>
                            opt[field.optionId || 'id']?.toString() || ''
                        );
                        if (validOptions.length > 0) {
                            fieldSchema = fieldSchema.oneOf(validOptions, 'Seleccione una opción válida');
                        }
                    }
            }

            schema[field.name] = fieldSchema;
            return schema;
        }, {});

        // Crear los valores iniciales
        const initialValues = allFields.reduce((values, field) => {
            values[field.name] = '';
            return values;
        }, {});

        // Establecer valores iniciales basados en infoCiudadano
        if (Object.keys(infoCiudadano).length > 0) {
            const padronStatus = infoCiudadano.padronStatus || 'NO';

            // Valores comunes
            initialValues.curp = infoCiudadano.curp || '';

            // Valores adicionales si está en el padrón
            if (padronStatus === 'SI') {
                initialValues.nombres = infoCiudadano.nombres || '';
                initialValues.primer_ap = infoCiudadano.primer_apellido || '';
                initialValues.segundo_ap = infoCiudadano.segundo_apellido || '';
            }
        }

        if(Object.keys(infoBeneficiario).length > 0) {
            // Valores adicionales si está en el padrón
            if(infoBeneficiario.permanencia) {
                initialValues.nombres = infoBeneficiario.nombres || '';
                initialValues.primer_ap = infoBeneficiario.primer_apellido || '';
                initialValues.segundo_ap = infoBeneficiario.segundo_apellido || '';
            }
        }

        // Guardar la configuración completa
        setFormConfig({
            initialValues,
            validationSchema: Yup.object(validationSchema),
            fields: actualFields
        });
    }, [loading, fields, mockFields, infoCiudadano, infoBeneficiario]);

    // Actualizar localidades cuando cambia el municipio seleccionado
    const handleMunicipioChange = (e, setFieldValue) => {
        const municipioId = e.target.value;
        //console.log('Municipio seleccionado:', municipioId);
        if (municipioId) {
            const filtered = catalogos.localidades.filter(
                localidad => localidad.municipio_id.toString() === municipioId.toString()
            );
            const codigos_filtrados = catalogos.codigos_postales.filter(
                codigo_postal => codigo_postal.municipio_id.toString() === municipioId.toString()
            )
            //console.log('Localidades filtradas:', filtered);
            //console.log('Codigos filtrados:', codigos_filtrados);
            setFilteredCodigosPostales(codigos_filtrados);
            setFilteredLocalidades(filtered);
            // Limpiar la localidad seleccionada cuando cambia el municipio
            setFieldValue('ct_localidad', '');
            setFieldValue('codigo_postal_id', '');
        } else {
            setFilteredLocalidades([]);
            setFilteredCodigosPostales([]);
        }
    };

    const handeCodigoPostalChange = (e, setFieldValue) => {
        const codigoPostalId = e.target.value;
        //console.log('Código Postal seleccionado:', codigoPostalId);
        if (codigoPostalId) {
            const filtered = filteredCodigosPostales.filter(
                codigopostal => codigopostal.asentamiento_id.toString() === codigoPostalId.toString()
            );
            //console.log('Código Postal filtrado:', filtered);

            if(filtered.length > 0){
                setFieldValue('colonia', filtered[0].asentamiento);
            }else{
                setFieldValue('colonia', '');
            }
            //buscar dentro de cedis_codigos_postales el cedis que corresponde al codigo postal
            const cedisFiltered = catalogos.cedis_codigos_postales.filter(
                cedis => cedis.codigo_postal.toString() === filtered[0].codigo_postal.toString()
            );
            //console.log('Cedis filtrados:', cedisFiltered);
            // setea el campo cedis con el cedis del codigo postal
            if (cedisFiltered.length > 0) {
                setFieldValue('cedis_id', cedisFiltered[0].cedis_id);
                setFieldValue('cedis_nombre', cedisFiltered[0].datos_cedis.nombre);

            } else {
                setFieldValue('cedis_id', null);
                setFieldValue('cedis_nombre', '');
            }
        } else {
            setFieldValue('cedis_id', null);
            setFieldValue('cedis_nombre', '');
        }
    };






    // Efecto para renderizar localidades cuando cambian
    useEffect(() => {
        if (formConfig && formConfig.fields) {
            // Busca la sección de dirección
            const direccionSection = formConfig.fields.find(section => 
                section.section === "Dirección"
            );
            
            if (direccionSection) {
                // Encuentra el campo de localidad
                const localidadField = direccionSection.fields.find(field => 
                    field.name === 'ct_localidad',
                );
                const codigoPostalField = direccionSection.fields.find(field =>
                    field.name === 'codigo_postal_id'
                );
                
                // Actualiza las opciones si existe el campo
                if (localidadField) {
                    localidadField.options = filteredLocalidades;
                }
                if (codigoPostalField) {
                    codigoPostalField.options = filteredCodigosPostales;
                }
            }
        }
    }, [filteredLocalidades, filteredCodigosPostales, formConfig]);

    // Procesar datos del CURP
    const handleCurpChange = (e, setFieldValue) => {
        const curp = e.target.value;

        if (curp && curp.length === 18) {
            const { fechaNacimiento, edad, genero, entidad } = obtenerFechaNacimientoYEdadDeCURP(curp);
            if (fechaNacimiento && edad) {
                setFieldValue('fecha_nacimiento', fechaNacimiento, false);
                setFieldValue('edad', edad, false);
                if (genero) setFieldValue('genero', genero, false);
                if (entidad) setFieldValue('ct_ent_nac', entidad, false);
            }
        }
    };

    // Enviar formulario
    const handleSubmit = async (values, { resetForm }) => {
        //console.log('Valores del formulario:', values);
        try {
            Swal.fire({
                title: 'Guardando...',
                text: 'Por favor espera mientras se guarda su información.',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                },
            });

            // Agregar datos adicionales
            values.programa_id = infoPrograma.programa_id || 1;
            values.apoyo_id = infoPrograma.apoyo_id || 1;
            values.calendario_id = infoPrograma.calendario_id || 1;
            
            values.fecha_solicitud = fechaActualAAAAMMDD();

            values.estado_validacion_renapo = 100;
            values.estado_solicitud = 100;
            values.estado_beneficiario = 100;

            values.ct_escolaridad = '1';

            //Si el ciudadano ya está en el padrón, se le asigna el estado 200
            
            if(infoCiudadano.padronStatus === 'SI'){
                values.estado_validacion_renapo = 200;

                // Si el ciudadano ya está en el padrón, se le asigna el estado 200
            }else if(infoBeneficiario.permanencia === true){
                values.folio_relacionado = infoBeneficiario.folio_relacionado || null;
                values.estado_validacion_renapo = 200;
                values.estado_solicitud = 200;
                values.estado_beneficiario = 300; //PERMANENCIA
            }

            // Datos de municipio y localidad
            if (values.ct_municipio && values.ct_municipio !== '') {
                const municipioSeleccionado = catalogos.municipios.find(
                    m => m.cve_municipio.toString() === values.ct_municipio.toString()
                );
                if (municipioSeleccionado) {
                    values.municipio = municipioSeleccionado.municipio;
                }
            }

            if (values.ct_localidad && values.ct_localidad !== '') {
                const localidadSeleccionada = filteredLocalidades.find(
                    l => l.cve_localidad.toString() === values.ct_localidad.toString()
                );
                if (localidadSeleccionada) {
                    values.localidad = localidadSeleccionada.localidad;
                }
            }

            if(values.codigo_postal_id && values.codigo_postal_id !== ''){
                const codigoPostalSeleccionado = filteredCodigosPostales.find(
                    c => c.asentamiento_id.toString() === values.codigo_postal_id.toString()
                );
                if (codigoPostalSeleccionado) {
                    values.codigo_postal = codigoPostalSeleccionado.codigo_postal;
                }   
            }

            // Datos de CURP
            const { fechaNacimiento, edad, genero, entidad } = obtenerFechaNacimientoYEdadDeCURP(values.curp);
            if (fechaNacimiento && edad && genero && entidad) {
                values.fecha_nacimiento = fechaNacimiento;
                values.edad = edad;
                values.genero = genero
                values.ct_ent_nac = entidad;
            }

            values.ct_entidad_federativa = '15';
            values.entidad_federativa = 'MEXICO';
            
            // Todos los string a mayusculas
            Object.keys(values).forEach(key => {
                if (typeof values[key] === 'string') {
                    values[key] = values[key].toUpperCase();
                }
            });

            const response = await axios.post(`${urlBase}/registros`, values);
            //console.log('Registro exitoso:', response.data);
            Swal.close(); // Cerrar el loading

            Swal.fire({
                title: '¡Registro exitoso!',
                text: `Folio: ${response.data.folio_relacionado || 'No disponible'} \n Anotalo para futuras referencias.`,
                icon: 'success',
                confirmButtonText: infoBeneficiario.permanencia ? 'Continuar a permanencia' : 'Continuar al paso 2',
                confirmButtonColor: '#3085d6'
            }).then((result) => {
                if (result.isConfirmed) {
                    putRegistro(response.data.data.id);
                    putStatusBeneficiario(values.estado_beneficiario);

                     

                    const encryptedId = CryptoJS.AES.encrypt(
                        JSON.stringify(response.data.data.id), 
                        pass
                    )
                    .toString()
                    .replace(/\+/g, 'p1L2u3S')
                    .replace(/\//g, 'bXaJN0921')
                    .replace(/=/g, 'e1Q2u3A4l');

                    if (infoBeneficiario.permanencia) {

                        // Lógica para enviar a permanencia
                        //console.log('Redirigiendo a permanencia...');
                    
                        // navigate(`../Permanencia/${response.data.data.id}`);
                        navigate(`../PDFs/${encryptedId}`);


                    } else {
                        onStepComplete();
                    }
                }
            });

            resetForm();
        } catch (error) {
            //console.error('Error al crear el registro:', error);
            Swal.close(); // Cerrar el loading
            switch (error.response?.status) {
                case 400:
                    Swal.fire({
                        title: "Información incompleta",
                        text: "Por favor, revise e intente nuevamente.",
                        icon: "info",
                        confirmButtonText: "Aceptar",
                    });
                    break;
                case 422:
                    if (
                        error.response.data.errors.curp[0] ===
                        "The curp has already been taken."
                    ) {
                        Swal.fire({
                            title: "Ya existe un registro con esta CURP.",
                            text: "Si aún no has terminado tu registro, por favor, vuelve a hacer el proceso de registro.",
                            icon: "error",
                            showCancelButton: true,
                            showConfirmButton: false,

                            cancelButtonText: "Ir al inicio",
                            cancelButtonColor: "#d33",
                        }).then(result => {
                            if (result.dismiss === Swal.DismissReason.cancel) {
                                navigate("/");
                            }
                        });
                    }
                    break;
                default:
                    Swal.fire({
                        title: "Información incompleta",
                        text: "Por favor, revise e intente nuevamente.",
                        icon: "info",
                        confirmButtonText: "Aceptar",
                    });
                    break;
            }

        }
    };
    // Renderizado del campo
    const renderField = (field, formikProps) => {
        const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formikProps;

        switch (field.type) {
            case 'select':
                return (
                    <div>
                        <select
                            id={field.name}
                            name={field.name}
                            onChange={(e) => {
                                handleChange(e);
                                if (field.name === 'ct_municipio') {
                                    handleMunicipioChange(e, setFieldValue);
                                }
                                if (field.name === 'codigo_postal_id') {
                                   handeCodigoPostalChange(e, setFieldValue);
                                }
                            }}
                            onBlur={handleBlur}
                            value={values[field.name]}
                            className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${field.habilitado === false ? 'bg-gray-200' : ''}`}
                            disabled={field.habilitado === false}                            
                        >
                            <option value="">Seleccione una opción</option>
                            {field.options?.map(option => (
                                <option
                                    key={`${field.name}-${option[field.optionId || 'id']}-${Math.random().toString(36).substr(2, 9)}`}
                                    value={option[field.optionId || 'id']}
                                >
                                    {option[field.optionLabel || 'descripcion']}
                                </option>
                            ))}
                        </select>
                        {touched[field.name] && errors[field.name] && (
                            <div className="text-red-600 text-sm">{errors[field.name]}</div>
                        )}
                    </div>
                );
            default:
                return (
                    <div>
                        <input
                            id={field.name}
                            name={field.name}
                            type={field.type || "text"}
                            onChange={(e) => {
                                handleChange(e);
                                if (field.name === 'curp') {
                                    handleCurpChange(e, setFieldValue);
                                    setFieldValue('curp', curp, false);
                                    document.getElementById('curp').setAttribute('disabled', 'disabled');
                                }
                            }}
                            onBlur={handleBlur}
                            value={values[field.name]}
                            className={`mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${field.habilitado === false ? 'bg-gray-200' : ''}`}
                            disabled={field.habilitado === false}
                        />
                        {touched[field.name] && errors[field.name] && (
                            <div className="text-red-600 text-sm">{errors[field.name]}</div>
                        )}
                    </div>
                );
        }
    };


    // PASO 5: Renderizar el formulario
    if (loading || !formConfig) {
        return <div className="p-10 text-center">Cargando formulario...</div>;
    }

    return (
        <div className="p-2 shadow">
            <h2 className="text-left text-2xl font-bold">
                {infoPrograma.programa_id === 1 ? 'ALIMENTACIÓN PARA EL BIENESTAR' : 'OTRO'}
            </h2>
            <h1 className="text-center text-2xl font-bold my-5">
                SOLICITUD DE {infoBeneficiario.permanencia ? 'PERMANENCIA AL PROGRAMA' : 'REGISTRO'}
            </h1>
            {infoBeneficiario.permanencia}
            <Formik
                initialValues={formConfig.initialValues}
                validationSchema={formConfig.validationSchema}
                onSubmit={handleSubmit}
            >
                {(formikProps) => (
                    <form onSubmit={formikProps.handleSubmit}>
                        {formConfig.fields.map((section, idx) => (
                            <div key={idx} className="mb-8">
                                <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-gray-200">
                                    {section.section}
                                </h2>
                                <div className="grid grid-cols-12 gap-4">
                                    {section.fields.map(field => (
                                        <div key={field.name} className={`col-span-12 md:col-span-${field.cols}`}>
                                            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
                                                {field.label}
                                            </label>
                                            {renderField(field, formikProps)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="col-span-12">
                            <button
                                type="submit"
                                className="mt-4 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
                                disabled={formikProps.isSubmitting}
                            >
                                {formikProps.isSubmitting ? 'Guardando...' : 'Guardar y continuar'}
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

