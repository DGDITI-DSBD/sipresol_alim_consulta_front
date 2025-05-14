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
// import { Checkbox, Label } from "flowbite-react";
import useWindowSize from "../../hooks/useWindowSize";
import MapaPage from './MapaPage';

export const Regist = () => {

  const { isSaving, status, dataValidate } = useSelector(state => state.validacion);
  const { lat, lng } = useSelector(state => state.coord);
  const token = 1;
  const [advisoryid, setadvisoryid] = useState(0);
  const [municId, setMunicId] = useState(0);
  const size = useWindowSize();
  const dispatch = useDispatch();
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedValuec, setSelectedValuec] = useState(null);
  const [selectedValuecc, setSelectedValuecc] = useState({ value: null, label: null, cp: null, munici: null, desMunic: 'toluca', colonia: 'toluca' });
  const [selectedValuem, setSelectedValuem] = useState(null);
  const [selectedValuemm, setSelectedValuemm] = useState(null);
  const [selectedValueme, setSelectedValueme] = useState(null);
  const [selectedValuel, setSelectedValuel] = useState(null);
  const [waiting, setWaiting] = useState(0);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [validCurp, setValidCurp] = useState(null);
  const [giro, setGiro] = useState(null);
  const [failCurp, setFailCurp] = useState(false);
  const [anonimo, setAnonimo] = useState('');
  const [showUsuario, setShowUsuario] = useState(true);
  const [loadLocal, setLoadLocal] = useState({value: 0, label: "Selecciona"});

  function onChange(value) {
    setCaptchaValue(value);
  }

  const handleChange = (e) => {
    //console.log(e.target.id);
    let isChecked = e.target.checked;
    e.target.id == 'anonimoCheck' ? setAnonimo(isChecked) : null;

  }

  useEffect(() => {
    axios.get(`${urlBase}/get-cat-giros`, { headers: { 'token': token } })
      .then(res => {
        // console.log(res)
        setGiro(res.data);
      });
  }, [token]);

  useEffect(() => {
    // console.log(gobiernofed, "cambie");
    anonimo ? setShowUsuario(false) : setShowUsuario(true);
  }, [anonimo]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      fontSize: 14,
      backgroundColor: state.isSelected ? 'pink' : 'white', // Change background color for selected options
      border: state.isFocused ? 'border-red-600' : 'border-grey-300',
    }),
    control: (styles) => ({
      ...styles,
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
    if (inputValue.length >= 4) {
      return fetch(`${urlBase}/get-cat-municipios/${inputValue}`, {
        headers: { 'token': token },
      }).then(res => res.json());
    } else {
      return null;
    }
  };

  const loadLocalidades = async () => {
    // if (inputValue.length >= 4) {
      const res = await fetch(`${urlBase}/get-cat-localidades/${selectedValuem.value}`, {
      headers: { 'token': token },
    });
    return await res.json();
    // } else {
    //   return null;
    // }
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

  const { register, control, setValue, formState: { errors }, handleSubmit } = useForm({
    defaultValues: {
    }
  });

  const [advisorydetails, setadvisorydetails] = useState({
    apellidoMaterno: "",
    nombre: "",
    apellidoPaterno: "",
    sexo: "",
    fechaNacimientoAxu: "",
  });


  const handleDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Remover caracteres no numéricos
    if (input.length > 8) input = input.slice(0, 8); // Limitar a 8 dígitos

    let formattedInput = input;
    if (input.length >= 5) {
      formattedInput = `${input.slice(0, 4)}-${input.slice(4, 6)}-${input.slice(6, 8)}`;
    } else if (input.length >= 3) {
      formattedInput = `${input.slice(0, 4)}-${input.slice(4, 6)}`;
    }

    setValue('fechaNacimiento', formattedInput);
  };

  function buscaCurp(e) {
    // console.log(e.target.value);
    if (e.target.value.match("^([a-z,A-Z]{4})([0-9]{6})([a-z,A-Z]{6})([0-9,a-z,A-Z]{2})$") != null) {
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
            console.log(response);
            try {
              setFailCurp(false);
              const respdata = response.data;
              setWaiting(0);
              // console.log(respdata?.consulta?.response[0].apellidoMaterno);
              if (respdata?.consulta?.response[0]?.apellidoMaterno) {
                setadvisorydetails(...respdata.consulta.response);
                setadvisoryid(2);
              } else {
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
            } catch (error) {
              setWaiting(0);
              setFailCurp(true);
              console.error("no pude hacerlo");
            }
          });
      }
    } else {
      setValidCurp(false);
    }
  }

  const onDownload = ( ) =>{
    // console.log('Descargar');
        const pdfUrl = "1.pdf";
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = "Aviso de protección a la información.pdf"; // specify the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
  }

  const onSubmit = (data) => {
    // console.log(data)
    // console.log(lat, lng)
    if (!anonimo) {
      data.municipio = selectedValuem.value;
      // data.localidad = selectedValuel.value;
      if (failCurp) {
        data.fecha_nacimiento = data.fechaNacimiento;
        data.nombre_usuario = data.nombreUsuario.toUpperCase();
      } else {
        data.fecha_nacimiento = advisorydetails.fechaNacimientoAxu;
        data.nombre_usuario = advisorydetails?.nombre + " " + advisorydetails?.apellidoPaterno + " " + advisorydetails?.apellidoMaterno;
      }
    } else {
      data.fecha_nacimiento = '1969-12-31';
      data.nombre_usuario = 'ANÓNIMO';
      data.curp = 'ANÓNIMO';
    }
    data.municipio_establecimiento = selectedValueme.value;
    data.medio_denuncia = 8;
    data.solicitante = 6666666;
    data.colonia = selectedValuec?.colonia;
    data.coloniae = selectedValuecc?.colonia;
    data.cp = selectedValuec.cp;
    data.cpe = selectedValuecc.cp;
    data.lat = lat;
    data.lng = lng;
    data.coordenadas = lat + ',' + lng
    // console.log(anonimo, 'anonimo');
    // console.log(data, 'Soy el envio');
    setFailCurp(false);
    dispatch(storeData('/store-public-denuncia', data, token));
    // setMunicId(1);
  }


  if (status === 'saved') {
    // console.log(dataValidate);
    Swal.fire({
      html: '<p style="font-weight: 600;font-size: larger;">Solicitud Aceptada</p><br>' +
        '<p style="font-weight: bolder;">Folio:</p><p style="font-size: medium;">' + dataValidate?.payload.folio + '</p>' +
        '<br><small style="font-weight: 500;">En breve recibira mas información vía correo electrónico</small>',
      icon: 'success',
      allowOutsideClick: false,
      showDenyButton: true,
      confirmButtonColor: '#CA2525',
      denyButtonColor: '#2559CA',
      confirmButtonText: 'Aceptar',
      denyButtonText: `Copiar folio`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(cleanData());
        //navigate("../principal");
        setMunicId(0);
        window.location.reload();
      } else if (result.isDenied) {
        navigator.clipboard.writeText(dataValidate?.payload.folio);
        Swal.fire({
          title: 'Folio copiado',
          confirmButtonText: 'Aceptar',
          icon: 'success',
          confirmButtonColor: '#25CA7D',
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(cleanData());
            //navigate("../principal");
            setMunicId(0);
            window.location.reload();
          }
        });
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
        // dispatch( cleanData() );
        // navigate("../catalogo/usuario");
      }
    });
  }

  return (
    <div className={`bg-white pb-12 `} id="regist">
      {/* <form onSubmit={handleSubmit}>  */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="h-full bg-white items-center">
          <div className={`${size.width <= 400 ? "pl-4 pr-4" : "pl-16 pr-16"} `}>
            <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 shadow-2xl">
              <div className="w-full">
                {waiting == 1 ?
                  <div id="loading_modal_su" style={{ display: "block" }}>
                    <div className="fixed top-0 left-0 z-50 w-screen h-screen flex items-center justify-center" style={{ background: "rgba(0, 0, 0, 0.3)" }} >
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
                  </div> : null}

                <div className="block rounded-lg bg-white shadow-lg">
                  <div className="w-full">
                    {/* <!-- Left column container--> */}

                    <div className="flex rounded-b-lg lg:w-full lg:rounded-r-lg lg:rounded-bl-none">

                      <div className="relative lg:inset-y-0 lg:right-0 lg:w-full" style={{ height: size.width <= 1280 ? "2800px" : "1500px" }}>
                        {/* <img alt="logo" className="" src={"../src/images/exhibition3.jpg"} style={{height: "-webkit-fill-available", objectFit: "cover"}} /> */}
                        <img alt="logo" className="" src={"https://ddsisem.edomex.gob.mx/sigeco/img/sidesa/Designer9.jpeg"} style={{ objectFit: "cover", width: "100%", height: "-webkit-fill-available" }} />
                        {/* <img alt="logo" className="absolute top-10 hidden lg:block" src={"https://ddsisem.edomex.gob.mx/sicur/images/logoedomex_plasta.svg"} style={{width: "-webkit-fill-available", height: "70px"}} /> */}

                        <div className="absolute left-0 top-0 px-4 md:px-0 w-full">
                      <div className="md:mx-3 md:p-1 w-full grid grid-cols-12 gap-6 justify-items-center">
                        <div className="text-left col-span-12 md:col-span-12 mb-2 mt-2">
                          <a className="text-zinc-600 text-xl md:text-2xl font-bold justify-center flex text-center  rounded-lg opacity-90 bg-white  w-full px-6 pb-2 pt-2.5 leading-normal  focus:outline-none focus:ring-0 ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#D4D4D8" className="bi bi-bank" viewBox="0 0 16 16">
                              <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z" />
                            </svg>
                            <span className="ml-4">Registra tu queja o denuncia</span>

                          <span type="button" data-title="Aviso de protección a la información" className="ml-5 text-purple-400 hover:text-white border-2 cursor-pointer border-purple-400 hover:bg-purple-600 focus:ring-2 focus:outline-none focus:ring-purple-200 font-extralight rounded-lg text-xs px-1 py-1 text-center mr-2 mb-2"
                                                onClick={() => { onDownload() }}>
                                            <svg  xmlns="http://www.w3.org/2000/svg" width="8px"  height="8px"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="w-4 h-4 icon icon-tabler icons-tabler-outline icon-tabler-restore"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3.06 13a9 9 0 1 0 .49 -4.087" /><path d="M3 4.001v5h5" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
                                        </span>
                          </a>
                        </div>
                        <div className="col-span-12 xl:col-span-6 w-11/12">
                        <div className={`bg-white opacity-90 shadow-2xl p-8 rounded-lg grid grid-cols-12 gap-4 animate__animated animate__bounceInUp`}>
                          <div className='twelver col-span-12 pt-0 md:pt-4'>
                            <h1 className={`col-span-12 `}
                            >Datos del Usuario</h1>
                          </div>

                          {/* <div className="flex items-center gap-2 p-3 col-span-12 -mt-4">
                    <Checkbox id="anonimoCheck"
                    onChange={e => handleChange(e)}
                    className="h-4 w-4 rounded border border-red-500 bg-gray-100 focus:ring-2 focus:ring-red-500 dark:border-red-500 dark:bg-gray-100  dark:focus:ring-red-500 text-red-500"
                    style={{width: "28px", height: "28px", color: "#EF4444"}} />
                    <Label htmlFor="anonimoCheck" style={{color: "#1f2937"}}>
                      Queja o denuncia anónima
                    </Label>
                  </div> */}
                          {showUsuario ?
                            <>
                          
                          <div className={`relative z-0 w-full group col-span-12 md:col-span-12  self-center`}>
                            <input
                              type="text"
                              id="curp"
                              // required
                              className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.curp?.message
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
                              className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.curp?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              CURP
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {validCurp == false ? "Formano invalido" : ""}

                            </div>
                          </div>

                          {/* {advisorydetails?.nombre != "" ? */}
                          {advisorydetails?.nombre != "" ?
                            <div className="col-span-12 md:col-span-12 pl-2 pr-2 bg-white shadow-2xl rounded-lg pb-2 -mt-1">
                              <a className=" col-span-12 flex flex-col rounded-lg  bg-white hover:bg-zinc-50/50 active:border-purple-200 md:col-span-12">
                                <div className="flex p-4 md:pb-0">
                                  <div className="flex flex-col items-center pt-1 pl-1 pr-6 pb-2">
                                    {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image"/> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-zinc-300 w-16 h-16 bi bi-person-circle" viewBox="0 0 16 16">
                                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                      <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>

                                  </div>
                                  <div className='text-left grid grid-cols-12 gap-0'>

                                    <div className={`col-span-12 md:col-span-12`} style={{ overflowWrap: "break-word" }}>
                                      <span className="text-base text-gray-950 font-semibold ">
                                        Nombre:&nbsp;&nbsp;
                                        <small className="text-base text-gray-500 font-normal ">
                                          {advisorydetails?.nombre + " " + advisorydetails?.apellidoPaterno + " " + advisorydetails?.apellidoMaterno}
                                        </small>
                                      </span>
                                    </div>

                                    <div className={`col-span-12 md:col-span-6`} style={{ overflowWrap: "break-word" }}>
                                      <span className="text-base text-gray-950 font-semibold ">
                                        Edad:&nbsp;&nbsp;
                                        <small className="text-base text-gray-500 font-normal ">
                                          {getAge(advisorydetails.fechaNacimientoAxu)} años
                                        </small>
                                      </span>
                                    </div>

                                    <div className={`col-span-12 md:col-span-6`} style={{ overflowWrap: "break-word" }}>
                                      <span className="text-base text-gray-950 font-semibold ">
                                        Sexo:&nbsp;&nbsp;
                                        <small className="text-base text-gray-500 font-normal ">
                                          {advisorydetails.sexo == "H" ? "Masculino" : advisorydetails.sexo == "M" ? "Femenino" : ""}
                                        </small>
                                      </span>
                                    </div>

                                    <div className={`col-span-12 md:col-span-12`} style={{ overflowWrap: "break-word" }}>
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
                            : <div className="col-span-8"></div>
                          }

                          {failCurp ?
                            <>
                              <div className={`-mt-2 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                                <input
                                  type="text"
                                  id="nombreUsuario"
                                  className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.nombreUsuario?.message
                                    ? "border-gray-500 focus:border-[#CA2525]"
                                    : "border-red-400 focus:border-red-400"
                                    } peer`}
                                  placeholder=" "
                                  autoComplete="on"
                                  {...register("nombreUsuario",)}
                                />
                                <label
                                  htmlFor="nombreUsuario"
                                  className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.nombreUsuario?.message
                                    ? "text-gray-600 peer-focus:text-[#CA2525]"
                                    : "text-red-400 peer-focus:text-red-400"
                                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                  Nombre completo
                                </label>
                                <div className="w-full text-red-400 text-sm pb-2">
                                  {errors.nombreUsuario?.message}
                                </div>
                              </div>

                              <div className={`-mt-2 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                                <input
                                  type="text"
                                  id="fechaNacimiento"
                                  className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.fechaNacimiento?.message
                                    ? "border-gray-500 focus:border-[#CA2525]"
                                    : "border-red-400 focus:border-red-400"
                                    } peer`}
                                    // onChange={handleDateChange}
                                    maxLength="10"
                                  autoComplete="on"
                                  {...register("fechaNacimiento", {
                                    required: "Este campo es obligatorio",
                                    pattern: {
                                        value: /^\d{4}-\d{2}-\d{2}$/,
                                        message: "El formato debe ser AAAA-MM-DD"
                                    },
                                    onChange: handleDateChange
                                })}
                                />
                                <label
                                  htmlFor="fechaNacimiento"
                                  className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.fechaNacimiento?.message
                                    ? "text-gray-600 peer-focus:text-[#CA2525]"
                                    : "text-red-400 peer-focus:text-red-400"
                                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                >
                                  Fecha de Nacimiento (AAAA-MM-DD)
                                </label>
                                <div className="w-full text-red-400 text-sm pb-2">
                                  {errors.fechaNacimiento?.message}
                                </div>
                              </div>
                            </>
                            : null}

                          {/* <div className={`mt-0 mb-2 relative z-0 w-full group col-span-12 md:col-span-2`} >
                            <input
                              type="number"
                              id="cp"
                              maxLength={5}
                              max={99999}
                              className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.telefono?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="on"
                              // required
                              {...register("cp")}
                            />
                            <label
                              htmlFor="cp"
                              className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.cp?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Código Postal
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.cp?.message}
                            </div>
                          </div> */}

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

                          {/* <div className={`mt-0 mb-2 relative w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-6"}`}>
                            <label htmlFor="localidad" className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.descripcion_cnis?.message ? 'text-gray-600 peer-focus:text-[#CA2525]' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                              Localidad
                            </label>
                            <Controller
                              name="localidad"
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
                                  // name='localidad'
                                  value={selectedValuel}
                                  getOptionLabel={e => e.label}
                                  getOptionValue={e => e.value}
                                  loadOptions={loadLocalidades}
                                  onInputChange={handleInputChange}
                                  onChange={handleChangeSelectl}
                                />
                              }
                            />
                          </div> */}

                          

                          <div className={`mt-2 relative z-0 w-full group col-span-12 md:col-span-6`}>
                            <input type="text" id="direccion"
                              className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.direccion?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="off"
                              {...register("direccion")}
                            />
                            <label
                              htmlFor="direccion"
                              className={`peer-focus:font-medium absolute text-lg md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.direccion?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Dirección  (Calle y Número)
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.direccion?.message}
                            </div>
                          </div>



                          <div className={`mt-2 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                            <input
                              type="number"
                              id="telefono"
                              className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.telefono?.message
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
                              className={`peer-focus:font-medium absolute text-lg md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.telefono?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Teléfono
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.telefono?.message}
                            </div>
                          </div>
                          </>
                            : null}
                          

                          <div className={`-mt-1 mb-4 relative z-0 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} >
                            <input
                              type="text"
                              id="correo"
                              className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.correo?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="on"
                              {...register("correo", {
                                required: "Es necesario que proporcione un correo electrónico",
                                pattern: {
                                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                  message: "Correo no valido (ejemplo@ejemplo.com)"
                                }
                              })}
                            />
                            <label
                              htmlFor="correo"
                              className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.correo?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
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
                        </div>

                        <div className="col-span-12 xl:col-span-6 w-11/12">
                        <div className={`bg-white opacity-90 shadow-2xl pl-8 pr-8 pt-8 rounded-lg grid grid-cols-12 gap-4 animate__animated animate__bounceInUp pb-4`}>
                          <div className='twelver col-span-12 pt-0 md:pt-1'>
                            <h1 className={`col-span-12 text-pretty`} style={{textWrap: "pretty"}}>
                              Datos del Establecimiento</h1>
                          </div>

                          <div className={`mt-3 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
                            <input
                              type="text"
                              id="nombre_establecimiento"
                              className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.nombre_establecimiento?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              placeholder=" "
                              autoComplete="on"
                              {...register("nombre_establecimiento",)}
                            />
                            <label
                              htmlFor="nombre_establecimiento"
                              className={`peer-focus:font-medium absolute text-xs md:text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.nombre_establecimiento?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Nombre del Establecimiento
                            </label>
                            <div className="w-full text-red-400 text-sm pb-2">
                              {errors.nombre_establecimiento?.message}
                            </div>
                          </div>

                          <div className={`mt-3 mb-2 relative w-full group col-span-12 md:col-span-6 `} >
                            <label
                              htmlFor="giro"
                              className={`peer-focus:font-medium w-max absolute text-base duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.giro?.message
                                ? "text-gray-600 peer-focus:text-colorPrimario"
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

                          <div className={`mt-0 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`}>
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
                          </div>

                          <div className={`-mt-1 mb-2 relative z-0 w-full group col-span-12 md:col-span-6`} >
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
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
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
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Referencia (Entre que calles se encuentra)
                            </label>
                          </div>

                          <div className={`mt-4 mb-1 relative z-0 w-full group col-span-12 md:col-span-12`}>
                            <textarea id="denuncia" rows="5"
                              className={`block py-2 px-2 w-full text-sm text-gray-900 bg-zinc-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 ${!errors.denuncia?.message
                                ? "border-gray-500 focus:border-[#CA2525]"
                                : "border-red-400 focus:border-red-400"
                                } peer`}
                              autoComplete="off"
                              {...register("denuncia")}
                            ></textarea>
                            <label
                              htmlFor="denuncia"
                              className={`peer-focus:font-medium absolute text-xl md:text-xl duration-300 transform -translate-y-6 scale-75 top-0 ml-2 peer-focus:ml-0 -z-10 origin-[0] peer-focus:left-0 ${!errors.denuncia?.message
                                ? "text-gray-600 peer-focus:text-[#CA2525]"
                                : "text-red-400 peer-focus:text-red-400"
                                } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                            >
                              Motivo de la queja o denuncia
                            </label>
                          </div>

                        


                        </div>
                        </div>

                        {/* <div className="col-span-12 xl:col-span-12 w-full pr-6">
                        <div className="mt-4 mb-1 relative z-0 w-full group col-span-12 md:col-span-12">
                          <MapaPage colonia = {selectedValuecc?.colonia} municipio= {selectedValuecc?.desMunic} ></MapaPage>
                        </div>
                        </div> */}

                        <div className={` mt-10 mb-6 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-12"} `} style={{ textAlignLast: "center" }} >
                          <ReCAPTCHA onChange={onChange} className='-mt-8 mb-4' style={{ textAlign: "-webkit-center" }}
                            sitekey="6Lec_9QpAAAAAAjF7iX2vy1T-mklshZhAybHMmqM"    //produccion
                          />
                        </div>

                        {/* <!--Submit button--> */}
                        {/* captchaValue */}
                        {captchaValue ?
                          <div className="mb-1 pb-1 pt-0 text-center col-span-12 ">
                            <button disabled={isSaving} type="submit"
                              className="cursor-pointer inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              style={{
                                background:
                                  "linear-gradient(to right,  #8a2036, #CA2525)",
                              }}
                            >{isSaving ?
                              <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                              </svg>
                              : "Enviar solicitud"}
                            </button>
                          </div>
                          : null}

                  

                      </div>

                    </div>
                    {/* termina div */}

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

export default Regist;
