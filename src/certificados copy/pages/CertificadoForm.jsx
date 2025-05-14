import React, { useEffect, useState } from "react";
import { cleanData, storeData } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import AsyncSelect from 'react-select/async';
import Swal from "sweetalert2";
import { CustomSelect, CustomSelectLanding } from "../../ui/components";
import { urlBase } from "../../api";
import ReCAPTCHA from "react-google-recaptcha";
import { Checkbox, Label } from "flowbite-react";
import useWindowSize from "../../hooks/useWindowSize";
import { Link } from 'react-router-dom';


export const CertificadoForm = () => {
 
  const { isSaving, status, dataValidate } = useSelector( state => state.validacion );
  const { medios } = useSelector( state => state.catalogos );
  const { id } = useSelector( state => state.auth );
  const token = 1;
  const [advisoryid, setadvisoryid] = useState(0);
  const [municId, setMunicId] = useState(0);
  const size = useWindowSize();
  const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedValuem, setSelectedValuem] = useState(null);
  const [selectedValueme, setSelectedValueme] = useState(null);
  const [selectedValuel, setSelectedValuel] = useState(null);
  const [waiting, setWaiting] = useState(0);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [failCurp, setFailCurp] = useState(false);
  const [validCurp, setValidCurp] = useState(null); 
  const [giro, setGiro] = useState(null); 
  const [selectedValuec, setSelectedValuec] = useState(null);
  const [selectedValuecc, setSelectedValuecc] = useState({ value: null, label: null, cp: null, munici: null, desMunic: 'toluca', colonia: 'toluca' });
  const [loadLocal, setLoadLocal] = useState({value: 0, label: "Selecciona"});
  
  function onChange(value) {
    setCaptchaValue(value);
}

  useEffect(() => {
    axios.get(`${urlBase}/get-cat-giros`, { headers: { 'token': token } } )
      .then(res => {
        // console.log(res)
          setGiro(res.data);
      });
  }, [token]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      backgroundColor: state.isSelected ? 'pink' : 'white', // Change background color for selected options
      border: state.isFocused ? 'border-red-600' : 'border-grey-300',
    }),
    control: (styles ) => ({ ...styles, 
                          borderWidth: '0px',
                          borderBottomWidth: '2px',
                          width: '100%',
                          letterSpacing: '0.01em',
                          backgroundColor: 'transparent',
                          appearance: 'none',
                          // outline: isFocused ? '2px solid transparent' : '',
                          // borderColor: isFocused ? 'border-[#CA2525]' : 'border-gray-500',
                          // borderColor: state.isFocused ? 'border-red-600' : 'border-grey-300',
                          // outlineOffset: isFocused ? '2px' : '',
                        }),
  };

  const loadCodigosPostales = (inputValue) => {
    if (inputValue.length >= 5) {
      return fetch(`${urlBase}/get-cat-codigos-postales/${inputValue}`, {
        headers: { 'token': token },
      }).then(res => res.json());
    } else {
      return null;
    }
  };
   
  const loadMunicipios = (inputValue) => {
    if(inputValue.length >= 4)
    {
        return fetch(`${ urlBase }/get-cat-municipios/${inputValue}`,{
        headers: { 'token': token },
      }).then(res => res.json());
    }else{
      return null;
    }
  };

  const loadLocalidades = (inputValue) => {
    if(inputValue.length >= 4)
    {
        return fetch(`${ urlBase }/get-cat-localidades/${selectedValuem.value}/${inputValue}`,{
        headers: { 'token': token },
      }).then(res => res.json());
    }else{
      return null;
    }
  };

  // const [value, setValue] = useState({ 
  //   startDate: new Date(), 
  //   endDate: new Date().setMonth(11) 
  //   }); 
    

  const handleInputChange = value => {
    // setValue(value);
  };

  const handleChangeSelectc = async (value) => {
    setSelectedValuec({ value: value.value, label: value.label, cp: value.cp, munici: value.munic, desMunic: value.desmunic, colonia: value.colonia });
    setSelectedValuem({ value: value.munic, label: value.desmunic });

    const res = await fetch(`${urlBase}/get-cat-localidades/${value.munic}`, {
      headers: { 'token': token },
    }).then(res => res.json());
    
    setLoadLocal(res)
  }

  const handleChangeSelectcc = value => {
    setSelectedValuecc({ value: value.value, label: value.label, cp: value.cp, munici: value.munic, desMunic: value.desmunic, colonia: value.colonia });
    setSelectedValueme({ value: value.munic, label: value.desmunic });
  }

  const handleChangeSelectm = value => {
    setSelectedValuem({ value: value.value, label: value.label });
  }

  const handleChangeSelectme = value => {
    setSelectedValueme({ value: value.value, label: value.label });
  }

  const handleChangeSelectl = value => {
    setSelectedValuel({ value: value.value, label: value.label });
  }

function getAge(dateString) {
  let dateStringConv = dateString.split("/");
  var today = new Date();
  var birthDate = new Date(
    dateStringConv[2] + "/" + dateStringConv[1] + "/" + dateStringConv[0]
  );
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  age = isNaN(age) ? "" : age;
  return age;
}

const {register, control, formState: { errors }, handleSubmit } = useForm({
  defaultValues:{
  }
});

const [advisorydetails, setadvisorydetails] = useState({
  apellidoMaterno: "",
  nombre: "",
  apellidoPaterno: "",
  sexo: "",
  fechaNacimientoAxu: "",
});

function buscaCurp(e) {
  // console.log(e.target.value);
  if(e.target.value.match("^([a-z,A-Z]{4})([0-9]{6})([a-z,A-Z]{6})([0-9,a-z,A-Z]{2})$") != null)
    {  
        if (e.target.value.length == 18) {
          setValidCurp(true);
          setadvisoryid(1);
          setWaiting(1);
          // console.log("do validate");
          axios
            .get(
              "https://ddsisem.edomex.gob.mx/servicioscurp/api/v1/get-curp/7cd5c8e2ecdb25ea6bde7062b7abdefee5c611fed0c7f6307910b649275cb61c/" +
                e.target.value
            )
            .then((response) => {
              try {
              
                const respdata = response.data;
                setWaiting(0);
                // console.log(respdata?.consulta?.response[0].apellidoMaterno);
                if(respdata?.consulta?.response[0]?.apellidoMaterno)
                {
                  setadvisorydetails(...respdata.consulta.response);
                  setadvisoryid(2);
                }else{
                  setadvisoryid(2);
                  Swal.fire({
                    title: respdata.consulta[0]?.descripcion,
                    text: "Por favor, intentelo mas tarde",
                    icon: "warning",
                    allowOutsideClick: false,
                    showCancelButton: false,
                    confirmButtonColor: "#8A2036",
                    // cancelButtonColor: "#d33",
                    confirmButtonText: "Aceptar",
                  });
                }
              }catch(error){
                console.error(error);
              }
            });
        }
      }else{
        setValidCurp(false);
      }
}

// const onDownload = ( ) =>{
//   // console.log('Descargar');
//       const pdfUrl = "manual.pdf";
//       const link = document.createElement("a");
//       link.href = pdfUrl;
//       link.download = "Manual de registro.pdf"; // specify the filename
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
// }

const onSubmit = ( data ) => {
        data.municipio = selectedValuem.value;
        // data.localidad = selectedValuel.value;
        data.municipio_establecimiento = selectedValueme.value;
        data.fecha_nacimiento = advisorydetails.fechaNacimientoAxu;
        data.nombre_usuario = advisorydetails?.nombre + " " + advisorydetails?.apellidoPaterno + " " + advisorydetails?.apellidoMaterno;
        data.colonia = selectedValuec?.colonia;
        data.coloniae = selectedValuecc?.colonia;
        data.cp = selectedValuec.cp;
        data.cpe = selectedValuecc.cp;
        // data.lat = lat;
        // data.lng = lng;
        // data.coordenadas = lat + ',' + lng
        // data.medio_denuncia = 8;
        data.solicitante = id;
        console.log(data, 'Soy el envio');
        dispatch( storeData( '/store-public-denuncia', data, token ) );
        // setMunicId(1);
}


if ( status === 'saved') {
  // console.log(dataValidate);
  Swal.fire({
    text: 'En breve recibira mas información vía correo electrónico',
    title: 'Solicitud Aceptada',
    icon: 'success',
    allowOutsideClick: false,
    showCancelButton: false,
    confirmButtonColor: '#CA2525',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar'
  }).then((result) => {
    if (result.isConfirmed) {
        dispatch( cleanData() );
        //navigate("../principal");
        setMunicId(0);
        window.location.reload();
    }
  });
} else if ( status === 'fail' ) {
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
        // dispatch( cleanData() );
        // navigate("../catalogo/usuario");
    }
  });
}

  return (
    <div className={`bg-white pb-12 `} id="regist">
{/* <form onSubmit={handleSubmit}>  */}
<form onSubmit={ handleSubmit(onSubmit) }>
<section className="h-full bg-white items-center">
      <div className={`${size.width <= 400 ? "pl-4 pr-4" : ""} `}>
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 shadow-2xl">
          <div className="w-full">
      { waiting == 1 ? 
          <div id = "loading_modal_su" style={{display: "block"}}>
              <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style= {{background: "rgba(0, 0, 0, 0.3)"}} >
                <div className="bg-white border py-2 px-5 rounded-lg flex items-center flex-col">
                  <div className="loader-dots block relative w-20 h-5 mt-2">
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#6f3544]"></div>
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#a22d36]"></div>
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#d43c57]"></div>
                    <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-[#dca8b9]"></div>
                  </div>
                  <div className="text-gray-500 text-xs font-medium mt-2 text-center">
                    Buscando datos...
                  </div>
                </div>
                </div>
              </div> : null }

            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-full">
                  <div className="md:mx-3 md:p-1">
                  <div className="text-left col-span-12 md:col-span-12 ">
                            <a className="text-zinc-600 text-xl md:text-2xl font-bold justify-center flex text-center  rounded-lg bg-white  w-full px-6 pb-2 pt-2.5 leading-normal  focus:outline-none focus:ring-0 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#D4D4D8" className="bi bi-bank" viewBox="0 0 16 16">
                                    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
                                  </svg>
                                  <span className="ml-4">Registra tu queja o denuncia</span>
                                  
                            </a>
                          </div>
                    <div className={`grid grid-cols-12 gap-4 animate__animated animate__bounceInUp`}>
                        <div className='twelve col-span-12 pt-0 md:pt-4'>
                            <h1 className={`col-span-12 `}
                            >Datos del Usuario</h1> 
                        </div>                        

                      <div className={`relative z-0 w-full group col-span-12 md:col-span-4 -mt-8 self-center`}>
                            <input
                              type="text"
                              id="curp"
                              // required
                              className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                                !errors.curp?.message
                                  ? "border-gray-500 focus:border-[#CA2525]"
                                  : "border-red-400 focus:border-red-400"
                              } peer`}
                              placeholder=" "
                              autoComplete="on"
                              maxLength={18}
                              {...register(`curp`)}
                              onKeyUp={(e) => buscaCurp(e)}
                              onChange={(event) => {
                                event.target.value = event.target.value.toUpperCase();
                                event.target.value = event.target.value.normalize('NFD').replace(/\p{Diacritic}/gu, ''); // Old method: .replace(/[\u0300-\u036f]/g, "");
                              }}
                            />
                            <label
                              htmlFor="curp"
                              className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                                !errors.curp?.message
                                  ? "text-gray-400 peer-focus:text-[#CA2525]"
                                  : "text-red-400 peer-focus:text-red-400"
                              } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              CURP
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {validCurp == false ? "Formano invalido" : ""}
                              
                            </div>
                          </div>

            { advisorydetails?.nombre != "" ?
              <div className="col-span-12 md:col-span-8 pl-2 pr-2 bg-white shadow-2xl rounded-lg pb-2 -mt-10">
                    <a className=" col-span-12 flex flex-col rounded-lg  bg-white hover:bg-zinc-50/50 active:border-purple-200 md:col-span-12">
                      <div className="flex p-4 md:pb-0">
                      <div className="flex flex-col items-center pt-1 pl-1 pr-6 pb-2">
                        {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-zinc-300 w-16 h-16 bi bi-person-circle" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                          <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                        </svg>

                        </div>
                        <div className='text-left grid grid-cols-12 gap-0'>

                            <div className={`col-span-12 md:col-span-12`} style={{overflowWrap: "break-word"}}>
                                <span className="text-base text-gray-950 font-semibold ">
                                  Nombre:&nbsp;&nbsp;
                                  <small className="text-base text-gray-500 font-normal ">
                                      {advisorydetails?.nombre + " " + advisorydetails?.apellidoPaterno + " " + advisorydetails?.apellidoMaterno }
                                  </small>
                                </span>
                            </div>

                            <div className={`col-span-12 md:col-span-6`} style={{overflowWrap: "break-word"}}>
                                <span className="text-base text-gray-950 font-semibold ">
                                  Edad:&nbsp;&nbsp;
                                  <small className="text-base text-gray-500 font-normal ">
                                       {getAge(advisorydetails.fechaNacimientoAxu)} años
                                  </small>
                                </span>
                            </div>

                            <div className={`col-span-12 md:col-span-6`} style={{overflowWrap: "break-word"}}>
                                <span className="text-base text-gray-950 font-semibold ">
                                  Sexo:&nbsp;&nbsp;
                                  <small className="text-base text-gray-500 font-normal ">
                                  {advisorydetails.sexo == "H" ? "Masculino" : advisorydetails.sexo == "M" ? "Femenino" : ""}
                                  </small>
                                </span>
                            </div>

                            <div className={`col-span-12 md:col-span-12`} style={{overflowWrap: "break-word"}}>
                                <span className="text-base text-gray-950 font-semibold ">
                                  Fecha de Nacimiento:&nbsp;&nbsp;
                                  <small className="text-base text-gray-500 font-normal ">
                                  {advisorydetails.fechaNacimientoAxu}
                                  </small>
                                </span>
                            </div>

                         </div>
                      </div>
                    </a>
                </div>
                : <div className="col-span-6"></div>
            }

<div className={`mt-4 mb-2 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-6"}`}>
                            <label htmlFor="cp" className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.descripcion_cnis?.message ? 'text-gray-600 peer-focus:text-[#CA2525]' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                              Código Postal
                            </label>
                            <Controller
                              name="cp"
                              control={control}
                              // rules={{ required: 'Este campo es necesario' }}
                              // render={({ field }) => 
                              render={({ field: { onChange, value, ref } }) =>
                                <AsyncSelect
                                  className='mt-4'
                                  styles={customStyles}
                                  cacheOptions
                                  defaultOptions
                                  placeholder={selectedLabel}
                                  // name='municipio'
                                  value={selectedValuec}
                                  getOptionLabel={e => e.label}
                                  getOptionValue={e => e.value}
                                  loadOptions={loadCodigosPostales}
                                  onInputChange={handleInputChange}
                                  onChange={handleChangeSelectc}
                                />
                              }
                            />
                          </div>

                          <div className={`mt-4 mb-2 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-6"}`}>
                            <label htmlFor="municipio" className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.descripcion_cnis?.message ? 'text-gray-600 peer-focus:text-[#CA2525]' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                              Municipio
                            </label>
                            <Controller
                              name="municipio"
                              control={control}
                              disabled={true}
                              // rules={{ required: 'Este campo es necesario' }}
                              // render={({ field }) => 
                              render={({ field: { onChange, value, ref } }) =>
                                <AsyncSelect
                                  className='mt-4'
                                  
                                  styles={customStyles}
                                  cacheOptions
                                  defaultOptions
                                  placeholder={selectedLabel}
                                  // name='municipio'
                                  value={selectedValuem}
                                  getOptionLabel={e => e.label}
                                  getOptionValue={e => e.value}
                                  loadOptions={loadMunicipios}
                                  onInputChange={handleInputChange}
                                  onChange={handleChangeSelectm}
                                />
                              }
                            />
                          </div>

                          <div className={`mt-2 relative z-0 w-full group col-span-12 md:col-span-6`}>
                            <input type="text" id="colonia"
                              className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.colonia?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="off"
                              value={selectedValuec?.colonia}
                              {...register("colonia")}
                            />
                            <label
                              htmlFor="colonia"
                              className={`peer-focus:font-medium absolute text-lg md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.colonia?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Colonia
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.colonia?.message}
                            </div>
                          </div>

                          <div className={`mt-1  relative w-full group col-span-12 md:col-span-6 `} >
                            <label
                              htmlFor="localidad"
                              className={`peer-focus:font-medium w-max absolute text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.giro?.message
                                ? "text-gray-600 peer-focus:text-colorPrimario"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Localidad
                            </label>
                            <Controller
                              name="localidad"
                              control={control}
                              render={({ field: { onChange, value, ref } }) => (
                                <CustomSelect
                                  options={loadLocal}
                                  isMulti={false}
                                  onChange={(e) => {
                                    onChange(e.value);
                                    // cambiaSeguridad(e.value);
                                  }}
                                />
                              )}
                            />
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.derechohabiencia?.message}
                            </div>
                          </div>

                

                <div className={`-mt-1 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                  <input
                    type="number"
                    id="telefono"
                    className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.telefono?.message
                        ? "border-gray-500 focus:border-[#CA2525]"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    // required
                    maxLength={10}
                    autoComplete="on"
                    {...register("telefono")}
                  />
                  <label
                    htmlFor="telefono"
                    className={`peer-focus:font-medium absolute text-lg md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.telefono?.message
                        ? "text-gray-400 peer-focus:text-[#CA2525]"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Teléfono
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.telefono?.message}
                  </div>
                </div>

                <div className={`-mt-1 mb-4 relative z-0 w-full group ${ size.width <= 1200 ? "col-span-12" : "col-span-6"}`} >
                  <input
                    type="text"
                    id="correo"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.correo?.message
                        ? "border-gray-500 focus:border-[#CA2525]"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("correo", {
                                      pattern: {
                                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                        message: "Correo no valido (ejemplo@ejemplo.com)"
                                      } })}
                  />
                  <label
                    htmlFor="correo"
                    className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.correo?.message
                        ? "text-gray-400 peer-focus:text-[#CA2525]"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Correo Electrónico
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.correo?.message}
                  </div>
                </div>

                </div>

                <div className={`grid grid-cols-12 gap-4 animate__animated animate__bounceInUp`}>
                        <div className='twelve col-span-12 pt-0 md:pt-1'>
                            <h1 className={`col-span-12 `}
                            >Datos del Establecimiento</h1> 
                        </div>                        

                <div className={`mt-0 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                  <input
                    type="text"
                    id="nombre_establecimiento"
                    className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                      !errors.nombre_establecimiento?.message
                        ? "border-gray-500 focus:border-[#CA2525]"
                        : "border-red-400 focus:border-red-400"
                    } peer`}
                    placeholder=" "
                    autoComplete="on"
                    {...register("nombre_establecimiento", )}
                  />
                  <label
                    htmlFor="nombre_establecimiento"
                    className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.nombre_establecimiento?.message
                        ? "text-gray-400 peer-focus:text-[#CA2525]"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Nombre del Establecimiento
                  </label>
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.nombre_establecimiento?.message}
                  </div>
                </div>

                <div className={`mt-0 mb-2 relative w-full group col-span-12 md:col-span-6 `} >
                  <label
                    htmlFor="giro"
                    className={`peer-focus:font-medium w-max absolute text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${
                      !errors.giro?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Giro del Establecimiento(Bar, Fabrica, etc.)
                  </label>
                  <Controller
                    name="giro"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <CustomSelect
                        options={giro}
                        isMulti={false}
                        onChange={(e) => {
                          onChange(e.value);
                          // cambiaSeguridad(e.value);
                      }}
                      />
                    )}
                  />
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.derechohabiencia?.message}
                  </div>
                </div>

                <div className={`mt-0 mb-2 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-3"}`}>
                            <label htmlFor="cpe" className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.cpe?.message ? 'text-gray-600 peer-focus:text-[#CA2525]' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                              Código Postal
                            </label>
                            <Controller
                              name="cpe"
                              control={control}
                              // rules={{ required: 'Este campo es necesario' }}
                              // render={({ field }) => 
                              render={({ field: { onChange, value, ref } }) =>
                                <AsyncSelect
                                  className='mt-4'
                                  styles={customStyles}
                                  cacheOptions
                                  defaultOptions
                                  placeholder={selectedLabel}
                                  // name='municipio'
                                  value={selectedValuecc}
                                  getOptionLabel={e => e.label}
                                  getOptionValue={e => e.value}
                                  loadOptions={loadCodigosPostales}
                                  onInputChange={handleInputChange}
                                  onChange={handleChangeSelectcc}
                                />
                              }
                            />
                          </div>

                          <div className={`mt-2 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-4"}`}>
                            <label htmlFor="municipio_establecimiento" className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.descripcion_cnis?.message ? 'text-gray-600 peer-focus:text-[#CA2525]' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                              Municipio
                            </label>
                            <Controller
                              name="municipio_establecimiento"
                              control={control}
                              // rules={{ required: 'Este campo es necesario' }}
                              // render={({ field }) => 
                              render={({ field: { onChange, value, ref } }) =>
                                <AsyncSelect
                                  className='mt-2'
                                  styles={customStyles}
                                  cacheOptions
                                  defaultOptions
                                  placeholder={selectedLabel}
                                  // name='municipio'
                                  value={selectedValueme}
                                  getOptionLabel={e => e.label}
                                  getOptionValue={e => e.value}
                                  loadOptions={loadMunicipios}
                                  onInputChange={handleInputChange}
                                  onChange={handleChangeSelectme}
                                />
                              }
                            />
                          </div>

                          <div className={`mt-2 relative z-0 w-full group col-span-12 md:col-span-5`}>
                            <input type="text" id="coloniae"
                              className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.coloniae?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="off"
                              value={selectedValuecc?.colonia}
                              {...register("coloniae")}
                            />
                            <label
                              htmlFor="coloniae"
                              className={`peer-focus:font-medium absolute text-lg md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.coloniae?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Colonia
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.coloniae?.message}
                            </div>
                          </div>

                          {/* <div className={`mt-0 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`}>
                            <input type="text" id="direccion_establecimiento"
                              className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.direccion_establecimiento?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="off"
                              {...register("direccion_establecimiento")}
                            />
                            <label
                              htmlFor="direccion_establecimiento"
                              className={`peer-focus:font-medium w-max absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.direccion_establecimiento?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Dirección del Establecimiento (Calle, Número)
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.direccion_establecimiento?.message}
                            </div>
                          </div> */}
                          <div className={`mt-0 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                            <input
                              type="text"
                              id="direccion_establecimiento"
                              className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.direccion_establecimiento?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="on"
                              {...register("direccion_establecimiento",)}
                            />
                            <label
                              htmlFor="direccion_establecimiento"
                              className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.direccion_establecimiento?.message
                                ? "text-gray-400 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Dirección del Establecimiento (Calle, Número)
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.direccion_establecimiento?.message}
                            </div>
                          </div>
                          <div className={`mt-0 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                            <input
                              type="text"
                              id="horario_atencion"
                              className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.horario_atencion?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="on"
                              {...register("horario_atencion",)}
                            />
                            <label
                              htmlFor="horario_atencion"
                              className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.horario_atencion?.message
                                ? "text-gray-400 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Horarios de atención del establecimiento
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.horario_atencion?.message}
                            </div>
                          </div>
                          <div className={`mt-2 mb-1 relative z-0 w-full group col-span-12 md:col-span-12`}>
                            <textarea id="referencia" rows="2"
                              className={`block py-2 px-2 w-full text-sm text-gray-900 bg-zinc-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 ${!errors.referencia?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              autoComplete="off"
                            
                              {...register("referencia")}
                            ></textarea>
                            <label
                              htmlFor="referencia"
                              className={`peer-focus:font-medium absolute text-xl md:text-xl duration-300 transform -translate-y-6 scale-75 top-0 ml-2 peer-focus:ml-0 -z-10 origin-[0] peer-focus:left-0 ${!errors.referencia?.message
                                ? "text-gray-400 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Referencia (Entre que calles se encuentra)
                            </label>
                          </div>


                  <div className={`mt-2 mb-1 relative z-0 w-full group col-span-12 md:col-span-12`}>
                     <textarea id="denuncia" rows="5"
                      className={`block py-2 px-2 w-full text-sm text-gray-900 bg-zinc-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 ${
                        !errors.denuncia?.message
                          ? "border-gray-500 focus:border-[#CA2525]"
                          : "border-red-400 focus:border-red-400"
                      } peer`}
                      autoComplete="off"
                      {...register("denuncia")}
                    ></textarea>
                    <label
                    htmlFor="denuncia"
                    className={`peer-focus:font-medium absolute text-xl md:text-xl duration-300 transform -translate-y-6 scale-75 top-0 ml-2 peer-focus:ml-0 -z-10 origin-[0] peer-focus:left-0 ${
                      !errors.denuncia?.message
                        ? "text-gray-400 peer-focus:text-[#CA2525]"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                    >
                      Motivo de la queja o denuncia
                    </label>
                  </div>


                </div>
                      {/* <div className={` mt-10 mb-6 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-12"} `} style={{textAlignLast: "center"}} >
                          <ReCAPTCHA onChange={onChange} className='-mt-8 mb-4' style={{textAlign: "-webkit-center"}}
                              sitekey="6Lec_9QpAAAAAAjF7iX2vy1T-mklshZhAybHMmqM"    //produccion
                          />
                      </div>  */}

                        {/* <!--Submit button--> */}
                <div className={`grid grid-cols-12 gap-4 pt-4 animate__animated animate__bounceInUp`}>
                        <div className='twelve col-span-12 pt-0 md:pt-1'>
                            <h1 className={`col-span-12 `}
                            >Medio por el que el denunciante se contacto</h1>
                        </div>

                        <div className={`mt-0 mb-2 relative w-full group col-span-12 md:col-span-6 `} >
                  <label
                    htmlFor="medio_denuncia"
                    className={`peer-focus:font-medium w-max absolute text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${
                      !errors.medio_denuncia?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Medio de la denuncia
                  </label>
                  <Controller
                    name="medio_denuncia"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <CustomSelect
                        options={medios}
                        isMulti={false}
                        onChange={(e) => {
                          onChange(e.value);
                          // cambiaSeguridad(e.value);
                      }}
                      />
                    )}
                  />
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.medio_denuncia?.message}
                  </div>
                </div>

                </div>
                  <div className='flex md:grid-cols-12 md:gap-6 -mt-8'>
                      <button disabled={ isSaving } type="submit" className={`${size.width <= 1200 ? "col-span-6" : "col-span-3"} text-colorPrimario hover:text-white border-2 ${ !isSaving ? 'border-colorPrimario hover:bg-colorPrimario' : 'border-gray-400 hover:bg-gray-400' } focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>Guardar</button>
                      <Link to='../principal' type="button" className={`${size.width <= 1200 ? "col-span-6" : "col-span-3"} text-colorTerciario hover:text-white border-2 border-colorTerciario hover:bg-colorTerciario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>Cancelar</Link>
                  </div>
                  </div>
                </div> 
                

               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </form>

    </div>
  );
};


