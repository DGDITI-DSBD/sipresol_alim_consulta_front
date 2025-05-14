import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Controller, useForm } from "react-hook-form";
import { CustomSelect, DatepickerSingle, SearchBar, SkeletonCL } from '../../ui/components';
import { Card } from "flowbite-react";
// import useWindowSize from "../../useWindowSize";
import { cleanData, getData, storeData, sendingInfo, responseInfo } from "../../store";
import Swal from "sweetalert2";
import { HiOutlineDocumentSearch  , HiIdentification, HiOutlineCheckCircle, HiOutlineClock, HiOutlineHand, HiOutlineCheck, HiUserRemove } from "react-icons/hi";
import { HiSortAscending,  HiSortDescending,  HiRefresh, HiShieldExclamation, 
  HiCheckCircle, HiChevronLeft, HiOutlineChat, HiMinusCircle, HiBadgeCheck    } from "react-icons/hi";
import { HiOutlineDocumentPlus,HiDocumentPlus, HiBuildingOffice2, HiOutlineBuildingOffice2 , HiMiniDocumentMinus, HiOutlineDocumentMinus, HiMiniXCircle,
  HiExclamationTriangle, HiHandThumbDown, HiHandThumbUp, HiOutlineXCircle, HiOutlineHandThumbUp } from "react-icons/hi2";
import { MenuItem, Typography } from "@material-tailwind/react";
import { Button, Modal } from "flowbite-react";
import { urlBase } from "../../api";
import useWindowSize from "../../hooks/useWindowSize";
//import { useRef} from "react";


export const CertificadoList = () => {
  const { isSaving, status } = useSelector( state => state.validacion );
  const { jurisdicciones, dictamenes, resultados, medidas } = useSelector( state => state.catalogos );
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(null);
  const [pantalla, setPantalla] = useState([]);
  const { token, profile } = useSelector((state) => state.auth);
  const { loading, currentPage, consulta } = useSelector(    (state) => state.consultas  );
  const size = useWindowSize();
  const [options, setOptions] = useState(8);
  const [opcion, setOpcion] = useState('');
  const [order, setOrder] = useState(1);
  const [regcita, setRegcita] = useState(false);
  const [regNuevaCita, setRegNuevaCita] = useState(false);
  const sendCita = (e) => {    setRegcita(e);  };
  const sendOption = (e) => {  setOptions(e);  };
  const sendOrder = (e) => {  setOrder(e);  }
  const [horaFormat, setHoraFormat] = useState(null);
  const [activeUser, setActiveUser] = useState(0);
  const [municId, setMunicId] = useState(0);
  const [changeCita, setChangeCita] = useState(0);
  const [allData, setData] = useState(null); 
  const [citaHora, setCitaHora] = useState(null); 
  const [hours, setHours] = useState(null); 
  const [unidad, setUnidad] = useState(0);
  const [medico, setMedico] = useState(0);
  const [loadingCurp, setLoadingCurp] = useState('esperando');
  const [value, setValue] = useState({ startDate: null }); 
  const [citaId, setCitaId] = useState(null); 
  const [cambio, setCambio] = useState(null); 
  const [reject, setReject] = useState(null); 
  const [sedit, setSedit] = useState(null); 
  const [openModal, setOpenModal] = useState(true);
  const [openModalD, setOpenModalD] = useState(true);
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [listadoWidth, setListadoWidth] = useState('40%');
  const [cardWidth, setCardWidth] = useState('60%');
  const [visita, setVisita] = useState('');
  const [orden, setOrden] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [openModalA, setOpenModalA] = useState(false);
  const [openModalP, setOpenModalP] = useState(false);
  const [turnado, setTurnado] = useState(false);
  const [dictamen, setDictamen] = useState(false);
  const [resultado, setResultado] = useState(false);
  const [reprogramada, setReprogramada] = useState(false);
  const [medida_seguridad, setMedida_seguridad] = useState(false);
  const [showUno, setShowUno] = useState(false);
  const [showDos, setShowDos] = useState(false);

  const yesNo = [
    { value: 1, label: 'SI'},
    { value: 2, label: 'NO'}
  ]
      

  useEffect(() => {
    size.width <= 1200 ? setListadoWidth("100%") : setListadoWidth("40%");
    size.width <= 1200 ? setCardWidth("0%") : setCardWidth("60%");
  }, [size.width]);

  function onCloseModal() {
    setOpenModal(false);
    setEmail('');
  }

  function onCloseModalD() {
    setOpenModalD(false);
    setDictamen('');
    setOrden('');
    setVisita('');
    setResultado('');
    setReprogramada('');
    setMedida_seguridad('');
  }

  function onCloseModalA() {
    setOpenModalA(false);
  }

  function onCloseModalP() {
    setOpenModalP(false);
  }
  
  const handleValueChange = (newValue) => {
      // console.log("newValue:", newValue); 
      setValue(newValue); 
  }

  const onChangeShow = (valor) => {
    if (valor === 1) {
      setShowUno(true);
      setShowDos(false);
      setDictamen(null);
      setMedida_seguridad(null);
    } else if (valor === 2) {
      setShowUno(false);
      setShowDos(true);
      setReprogramada(false);
    } else {
      setShowUno(false);
      setShowDos(false);
      setDictamen(null);
      setReprogramada(null);
      setMedida_seguridad(null);
    }

  }

  const checkHour = (event) => {
    const currentHour = new Date(event);
    let horas = currentHour.getHours();
    let minutos = currentHour.getMinutes();
    let horaFormateada = (horas < 10 ? "0" : "") + horas + ":" + (minutos < 10 ? "0" : "") + minutos;
    //console.log(horaFormateada);
    setHoraFormat(horaFormateada);
  }

  const sendCurp = async (cid) => {
    // await fetch('http://10.40.140.134:8008/api/v1/get-curp', {
     // await fetch('https://cdp.edomex.gob.mx/certificadosdiscapacidad-backend/api/v1/get-curp', {
      await fetch('https://ddsisem.edomex.gob.mx/certificadosdiscapacidad-backend/api/v1/get-curp', {
     
      method: 'POST',
      body: JSON.stringify({
         data: {curp: cid}
      }),
      headers: {
         'Content-type': 'application/json;',
      },
   }).then(response => response.json())
   .then(jsondata => {
       //  setMensaje(jsondata.success);
       //  let alink = document.createElement('a');
       //  alink.href = 'data:application/pdf;base64,'+jsondata.pdf; 
       //  alink.download = 'Certificado_Discapacidad.pdf'; 
       //  alink.click(); 

       if (jsondata.pdf) {
         var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
         var isChrome =
           navigator.userAgent.toLowerCase().indexOf("CriOS") > -1 ||
           navigator.vendor.toLowerCase().indexOf("google") > -1;
         var iOSVersion = [];
         if (iOS) {
           iOSVersion = navigator.userAgent
             .match(/OS [\d_]+/i)[0]
             .substr(3)
             .split("_")
             .map((n) => parseInt(n));
         }
         var attachmentData = jsondata.pdf;
         var attachmentName = "Certificado_Discapacidad.pdf";
         var contentType = "application/pdf";
     
     var binary = atob(attachmentData.replace(/\s/g, ""));
     var len = binary.length;
     var buffer = new ArrayBuffer(len);
     var view = new Uint8Array(buffer);
     for (var i = 0; i < len; i++) {
       view[i] = binary.charCodeAt(i);
     }
     var linkElement = document.createElement("a");
     try {
       var hrefUrl = "";
       var blob = "";
       if (iOS && !isChrome && iOSVersion[0] <= 12) {
         blob = "data:application/pdf;base64," + jsondata.pdf;
         hrefUrl = blob;
       } else {
         if (iOS && !isChrome) {
           contentType = "application/octet-stream";
         }
         blob = new Blob([view], { type: contentType });
         hrefUrl = window.URL.createObjectURL(blob);
       }
       linkElement.setAttribute("href", hrefUrl);
       linkElement.setAttribute("target", "_blank");
       if ((iOS && (iOSVersion[0] > 12 || isChrome)) || !iOS) {
         linkElement.setAttribute("download", attachmentName);
       }
       var clickEvent = new MouseEvent("click", {
         view: window,
         bubbles: true,
         cancelable: false
       });
       linkElement.dispatchEvent(clickEvent);
     
     
        } catch (ex) {}
       }

      //  setActiveStep(2);
       dispatch( responseInfo() );
   })
};

const handleClickDownload =  (message) => {
    // event.preventDefault();
    //console.log(message);
    sendCurp(message);
    dispatch( sendingInfo() );
  };

  useEffect(() => {
    dispatch(
      getData(
        currentPage,
        "/get-denuncias/" + options + "/" + order,
        token
      )
    );
  }, [token, options, order, municId, changeCita]);

    const handleReturn = () => {
      setListadoWidth("100%");
      setCardWidth("0%");
    }

  useEffect(() => {
    // console.log(value);
        // fetch(`http://10.40.140.134:8008/api/v1/get-hours/${unidad}/${value.startDate}/${medico}`)
        //  fetch(`https://ddsisem.edomex.gob.mx/btdis-backend/api/v1/get-hours/${unidad}/${value.startDate}/${medico}`)
        //  .then((response) => response.json())
        //  .then((actualData) => handleInputChangeHours(actualData)
        // );
         }, [medico]);

         const sendOptionHour = (e) => { setCitaHora(e.hora); setCitaId(e.id);  };

         const handleInputChangeHours = value => {
          const availableHours = [];
          if(Object?.keys(value.data).length != 0) {
            value.data.map((fal, i) => {
              availableHours.push(
                <MenuItem onClick={(e) => sendOptionHour(fal) } className="flex items-center gap-4 py-2 pl-2 pr-8">
                    <div className="flex flex-col gap-1">
                      <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                        <HiOutlineClock className="w-7 h-7" ></HiOutlineClock>
                          {fal.hora}
                      </Typography>
                    </div>
                </MenuItem>
              );
            });
        } else {
          availableHours.push( 
          <MenuItem className="flex items-center gap-4 py-2 pl-2 pr-8">
              <div className="flex flex-col gap-1">
                <Typography className="flex items-center gap-1 text-sm font-medium text-blue-gray-500">
                  <HiOutlineClock className="w-7 h-7" ></HiOutlineClock>
                    Sin horarios disponibles
                </Typography>
              </div>
          </MenuItem>);
        }
          setHours(availableHours);
          //setHours(value.hours)
        };  

  const {register, control, formState: { errors }, handleSubmit, reset } = useForm({
    defaultValues:{
    }
  });

  const handleChange = (e) => {  
    setLoadingCurp('esperando');
    setChangeCita(0);
    setHidden(e); onCloseModal(); onCloseModalA(); onCloseModalD(); setPantalla(e); sendCita(false); 
    setActiveUser(e.id); setRegNuevaCita(false); setCambio(null); setOpcion(''); setReject(null); onCloseModalD();
    if(size.width <= 1200)
      { 
        setCardWidth("100%"); setListadoWidth("0%")
      }
  
  };
  
  const handleClick = async (cid) => {
    setLoadingCurp('enviando');
    setCambio(0);
        await fetch(`${urlBase}/confirm-cita`, {
       //   await fetch('https://ddsisem.edomex.gob.mx/btdis-backend/api/v1/confirm-cita', {
          method: 'POST',
          data: {cita_id: cid},
          body: JSON.stringify({
             cita_id: cid,
             solicitante: pantalla?.id
          }),
          headers: {
             'Content-type': 'application/json; charset=UTF-8',
             token: token
          },
       })
          .then((response) => response.json())
          .then((data) => {
          setLoadingCurp('recibido');
          setChangeCita(1);
          setCambio(1);
          })
          .catch((err) => {
             // console.log(err.message);
          });
    };

    const handleClickAtencion = (cid) => {
      setOpenModalA(true);
    }

    const handleClickProcedente = (cid) => {
      setOpenModalP(true);
    }

    const handleClickEditar = async (cid, cc, ct) => {
      setLoadingCurp('enviando');
      setSedit(0);
            await fetch(`${urlBase}/update-sol`, {
           // await fetch('https://ddsisem.edomex.gob.mx/btdis-backend/api/v1/update-sol', {
            method: 'POST',
            data: {cita_id: cid, correo: email, telefono: telefono},
            body: JSON.stringify({
               cita_id: cid,
               solicitante: pantalla?.id,
               correo: email,
               telefono: telefono
            }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
               token: token
            },
         })
            .then((response) => response.json())
            .then((data) => {
            setLoadingCurp('recibido');
            setChangeCita(1);
            setCambio(2);
            setSedit(1);

                    Swal.fire({
                      title: "Datos Actualizados",
                      position: "top-end",
                      icon: "success",
                      showConfirmButton: false,
                      timer: 1500,
                      didOpen: () => {
                        dispatch( cleanData() );
                        setMunicId(1);
                        setRegNuevaCita(false);
                        setHidden(null);
                        setCitaHora(null);
                        setChangeCita(0);
                        onCloseModal();
                      },
                    }).then((result) => {

                    });
           
                  
           

            })
            .catch((err) => {
               // console.log(err.message);
            });

      };

      const handleClickDatosAtencion = async (cid, cc, ct, cv, cd, cr, cre, cms) => {
        if(cid != "" && cc != "" && ct && cv != "" && cd != ""){
        setLoadingCurp('enviando');
        setSedit(0);
               await fetch(`${urlBase}/store-verificacion`, {
              // await fetch('https://ddsisem.edomex.gob.mx/btdis-backend/api/v1/update-diag', {
              method: 'POST',
              data: {denuncia: cid, visita: visita, orden: orden, dictamen: cv, resultado: cr, reprogramada: cre, medida_seguridad:cms },
              body: JSON.stringify({
                data: {
                  denuncia: cid,
                  visita: visita,
                  orden: orden,
                  dictamen: cv,
                  resultado: cr,
                  reprogramada: cre,
                  medida_seguridad: cms,
                  descripcion: cd,
                }
              }),
              headers: {
                 'Content-type': 'application/json; charset=UTF-8',
                 token: token
              },
           })
              .then((response) => response.json())
              .then((data) => {
              setLoadingCurp('recibido');
              setChangeCita(1);
              setCambio(2);
              setSedit(1);
                      Swal.fire({
                        title: "Datos Actualizados",
                        position: "top-end",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        didOpen: () => {
                          dispatch( cleanData() );
                          setMunicId(1);
                          setRegNuevaCita(false);
                          setHidden(null);
                          setCitaHora(null);
                          setChangeCita(0);
                          onCloseModalA();
                        },
                      }).then((result) => {
  
                      });
             
                    
             
  
              })
              .catch((err) => {
                 // console.log(err.message);
              });
            }else{
              Swal.fire({
                title: "Datos Obligatorios",
                position: "top-end",
                icon: "warning",
                showConfirmButton: false,
                timer: 1500,
                didOpen: () => {
                  // dispatch( cleanData() );
                  // setMunicId(1);
                  // setRegNuevaCita(false);
                  // setHidden(null);
                  // setCitaHora(null);
                  // setChangeCita(0);
                  // onCloseModalA();
                },
              });
            }
  
        };

        // const handleClickDiagnostico = async (cid, cc, ct) => {
        //   setLoadingCurp('enviando');
        //   setSedit(0);
        //          await fetch('http://10.40.140.134:8008/api/v1/store-verificacion', {
        //         // await fetch('https://ddsisem.edomex.gob.mx/btdis-backend/api/v1/update-diag', {
        //         method: 'POST',
        //         data: {cita_id: cid, diagnostico: diagnostico, descripcion: descripcion},
        //         body: JSON.stringify({
        //            cita_id: cid,
        //            solicitante: pantalla?.id,
        //            diagnostico: diagnostico,
        //            descripcion: descripcion
        //         }),
        //         headers: {
        //            'Content-type': 'application/json; charset=UTF-8',
        //            token: token
        //         },
        //      })
        //         .then((response) => response.json())
        //         .then((data) => {
        //         setLoadingCurp('recibido');
        //         setChangeCita(1);
        //         setCambio(2);
        //         setSedit(1);
    
        //                 Swal.fire({
        //                   title: "Datos Actualizados",
        //                   position: "top-end",
        //                   icon: "success",
        //                   showConfirmButton: false,
        //                   timer: 1500,
        //                   didOpen: () => {
        //                     dispatch( cleanData() );
        //                     setMunicId(1);
        //                     setRegNuevaCita(false);
        //                     setHidden(null);
        //                     setCitaHora(null);
        //                     setChangeCita(0);
        //                     onCloseModalD();
        //                   },
        //                 }).then((result) => {
    
        //                 });
               
                      
               
    
        //         })
        //         .catch((err) => {
        //            // console.log(err.message);
        //         });
    
        //   };

    const handleClickRechazar = async (cid, opt) => {
      setOpcion(opt);
      setLoadingCurp('enviando');
      setReject(0);
           //await fetch('http://10.40.140.134:8008/api/v1/reject-solicitud', {
           await fetch(`${urlBase}/reject-solicitud`, {
            method: 'POST',
            data: {cita_id: cid},
            body: JSON.stringify({
               cita_id: cid,
               solicitante: pantalla?.id, 
               opc: opt,
               turnado: turnado
            }),
            headers: {
               'Content-type': 'application/json; charset=UTF-8',
               token: token
            },
         })
            .then((response) => response.json())
            .then((data) => {
            setLoadingCurp('recibido');
            setChangeCita(1);
            setCambio(2);
            setReject(1);
            setOpenModalP(false);
            setTurnado(0);
            //setReject(null);
            // setOpcion('');
            })
            .catch((err) => {
               // console.log(err.message);
            });
      };
  

  

  

  if ( status === 'saved') {
    Swal.fire({
      title: '¡Su cita fue registrada con éxito!',
      // text: 'con nombre ' + dataValidate?.payload.email,
      icon: 'success',
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonColor: '#8a2036',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
          dispatch( cleanData() );
          //navigate("../principal");
          setMunicId(1);
          setRegNuevaCita(false);
          setActiveUser(activeUser);
          setHidden(null);
          setCitaHora(null);
          setChangeCita(0);
          // window.location.reload();
      }
    });
  } else if ( status === 'fail' ) {
    Swal.fire({
      title: 'Ese registro ya existe',
      // text: 'NOMBRE: ' + dataValidate?.payload.email,
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonColor: '#8a2036',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
          // dispatch( cleanData() );
          // navigate("../catalogo/usuario");
      }
    });
  }

  useEffect(() => {
    if (regNuevaCita) {
        reset({
            unidad: '',
            fecha: '',
            hora: '',
            cita: '',
        });
    }
},[regNuevaCita]);

  const getFallas = (falla) => {
    const result = [];
    if (falla != null) {
      falla.map((fal, i) => {
        //  console.log(fal)
        result.push(
          <div
            className={`max-w m-3  bg-white border ${activeUser == fal.id ? "border-colorSecundario shadow-xl" : "border-gray-200"} rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
            onClick={(e) => handleChange(fal)}
            style={{ cursor: "pointer" }}
          >
            <div className="pt-4 pl-4 pr-4 pb-2">
            <div className="flex" style={{ width: "-webkit-fill-available" }}>
              <div
                className="grid max-w-full"
                style={{ width: "-webkit-fill-available" }}
              >
                <div
                  className="block md:flex"
                  style={{ justifyContent: "space-between" }}
                >
                  <h5
                    className={`flex text-xs md:text-base font-extrabold text-gray-900 dark:text-white`}
                    style={{alignItems: "self-center"}}
                  >
                    <HiOutlineDocumentSearch   className={`${ fal?.sexo ==  'Masculino' ? 'text-slate-500' : "text-slate-500" } 
                    w-5 h-5 mr-1 `} />
                    <span className="">
                    &nbsp;
                    {fal?.nombre}&nbsp;&nbsp;
                    </span>
                    {fal?.status == 0 ? (
                      <HiOutlineDocumentPlus className="w-5 h-5  text-yellow-300" />
                    ) : null}{" "}
                    {/* 0: En espera */}
                    {fal?.status == 1 ? (
                      <HiOutlineXCircle className="w-5 h-5  text-red-500" />
                    ) : null}{" "}
                    {/* 1: En valoracion */}
                    {fal?.status == 2 ? (
                      <HiOutlineDocumentMinus className="w-5 h-5  text-red-500" />
                    ) : null}{" "}
                    {/* 2: En cirugia */}
                    {fal?.status == 3 ? (
                      <HiBuildingOffice2 className="w-5 h-5  text-blue-500" />
                    ) : null}{" "}
                     {/* 4: En cirugia */}
                     {fal?.status == 4 ? (
                      <HiOutlineHandThumbUp  className="w-5 h-5  text-emerald-500" />
                    ) : null}{" "}
                    {/* 3: Concluido */}
                    {fal?.status == 5 ? (
                      <HiOutlineExclamationTriangle className="w-5 h-5  text-orange-500" />
                    ) : null}{" "}
                    {/* 5: Rechazado */}
                    {fal?.status == 6 ? (
                      <HiOutlineHandThumbDown className="w-5 h-5  text-red-500" />
                    ) : null}{" "}
                    {/* 5: Rechazado */}
                    {fal?.status == 7 || fal?.status == 8 ? (
                      <HiUserRemove className="w-5 h-5  text-red-600" />
                    ) : null}{" "}
                    {/* 5: Rechazado */}
                     
                    {/* <small className="ml-4 mt-1 font-semibold text-gray-500" style={{alignSelf: "end"}}> {fal?.curp} </small> */}
                  </h5>
                  <div className="items-center justify-left space-y-1 sm:flex sm:space-x-4 sm:space-y-0">
                    <p className="mb-1 text-xs text-gray-500 dark:text-gray-200 sm:text-xs">
                      {/* {fal?.fecha} */}
                      {new Date(fal?.fecha).toLocaleDateString("es-es", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-500  ">
                  {fal?.nombre_establecimiento}, {fal?.giro}, {fal?.municipio_establecimiento}
                </p>
                <p className="text-xs md:text-sm text-gray-500 ">
                  {fal?.folio}
                </p>
              </div>
            </div>
            </div>
                <div className={`${fal?.caducidad == 0 ? "" : (
                  fal?.caducidad == 1 ? "bg-yellow-200" : (
                    fal?.caducidad == 2 ? "bg-red-500" : ("")
                  )
                )} px-5 py-1 text-xs font-medium  rounded-b-lg`}>
                </div>
          </div>
        );
      });
    }
    return result;
  };

  // const onSubmit = ( data ) => {
  //     data.citaunidad = unidad;
  //     data.medico = medico;
  //     // data.citahora = citaHora;
  //     data.horaInicial = horaFormat;
  //     data.citafecha = value.startDate;
  //     dispatch( storeData( '/store-cita', data, token ) );
  // }



  return (
    <>
      <div>
        
        <div 
        className={`${ size.width <= 1200 ? '-mt-2' : 'flex'}` }
        style={{ justifyContent: "space-between" }}>
        
          
          <div className={`${ size.width <= 1200 ? 'w-full -mt-2' : 'flex w-full mt-2'} justify-between h-10 ` }>
            { listadoWidth == '100%' || listadoWidth == '40%' ?
            <div className={`${ size.width <= 1200 ? 'justify-between' : 'justify-between flex'}`} >
              <div className="ml-4 mr-4 -mt-4">
                  <SearchBar className="mr-16 mb-0" searchPath="/get-search-sol" normalPath="/get-solicitante/0/6/1" showButton={true}/>
              </div>
              <div className={`${ size.width <= 1200 ? '-mt-4' : ''} flex`} style={{justifyContent: "space-between"}}>
          <Dropdown className="w-12 ml-4" label="Ordenar por" color="gray">
            <Dropdown.Item onClick={(e) => sendOrder(1)} icon={HiSortAscending}>
              Fecha reciente
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => sendOrder(2)}
              icon={HiSortDescending}
            >
              Fecha ultimos
            </Dropdown.Item>
            {/* <Dropdown.Item icon={HiCurrencyDollar}>Salario</Dropdown.Item> */}
          </Dropdown>
          <Dropdown label="Filtrar" color="gray">
            <Dropdown.Item onClick={(e) => sendOption(0)} icon={HiDocumentPlus }>
              Nuevo Registro
            </Dropdown.Item>
           <Dropdown.Item onClick={(e) => sendOption(3)} icon={HiBuildingOffice2}>
              En Operación Sanitaria
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(1)} icon={HiMiniXCircle}>
              No Procedentes
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(2)} icon={HiMiniDocumentMinus}>
              Falta de Datos
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(4)} icon={HiHandThumbUp}>
              Atendido
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(5)} icon={HiExclamationTriangle}>
              Por Vencer
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(6)} icon={HiHandThumbDown}>
              Vencidos
            </Dropdown.Item>
             {/* <Dropdown.Item onClick={(e) => sendOption(3)} icon={HiBuildingOffice2}>
              Concluido
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(5)} icon={HiShieldExclamation}>
              Con derechohabiencia
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(6)} icon={HiCheckCircle}>
              Aprovados
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => sendOption(7)} icon={HiUserRemove}>
              No procedentes
            </Dropdown.Item>*/}
            <Dropdown.Item onClick={(e) => sendOption(8)} icon={HiRefresh}>
              Todas
            </Dropdown.Item> 
          </Dropdown>
          </div>
          </div> : <div className="-mt-16"></div> }


          </div>
        </div>
        <div
          className={`${ size.width <= 1200 ? 'mt-16' : 'mt-2'}` }
          style={{ display: "flex", flexDirection: "row", height: "720px" }}
        >
          
          <div
            className="contenedor bg-transparent"
            style={{ width: listadoWidth, overflowY: "scroll" }}
          >
            { loading == true ? 
            <SkeletonCL></SkeletonCL>
          :  getFallas(consulta) }
          </div>

          <div
            className="contenedor"
            style={{ width: cardWidth, overflowY: "scroll" }}
          >
            {hidden != null ? (
              <Card className="max-w ml-2 mb-5 mr-2 shadow-2xl">
                { size.width <= 1200 ?
                <div className="-mt-3 cursor-pointer" onClick={handleReturn}  > <HiChevronLeft className="w-5 h-5" ></HiChevronLeft ></div> : null }
                <div className="flex justify-end px-4">
                  {/* <Dropdown inline label="">
        <Dropdown.Item icon={HiViewGrid}>Postular</Dropdown.Item>
            <Dropdown.Item icon={HiCog}>Guardar</Dropdown.Item>
            <Dropdown.Item icon={HiCurrencyDollar}>Denunciar</Dropdown.Item>
            <Dropdown.Item icon={HiCurrencyDollar}>Ocultar</Dropdown.Item>
        </Dropdown> */}
                </div>
                <div className="text-center items-center -mt-6">
                  <div className={`text-left items-left ${ size.width <= 1200 ? '' : 'flex'}` }>
                      <div style={{textAlign: size.width <= 1200 ? '-webkit-center' : 'left'}} >
                    <img
                      className="w-20 h-20 mb-1 rounded-full shadow-lg"
                      src={`${ pantalla?.sexo == 'Masculino' ?
                        "https://cdn.pixabay.com/photo/2015/01/08/18/30/man-593372_1280.jpg" : "https://cdn.pixabay.com/photo/2015/11/28/21/44/business-1067978_1280.jpg" }
                        `}
                      alt="enterprise"
                      style={{ objectFit: "cover" }}
                    />
                    </div>
                    <div className="pl-4 grid grid-cols-12 h-36 md:h-16 mt-3" style={{textAlign: size.width <= 1200 ? "-webkit-center" : "left"}}>
                      <h5 className={`col-span-12 text-xl font-medium text-gray-900 dark:text-white ${size.width <= 1200 ? "" : "flex"}`}>
                        {pantalla?.nombre}{" "}
                        

                    {/* <div className="ml-4 h-8">
                        <button onClick={() => setOpenModal(true)}
                         className="cursor-pointer inline-block w-full rounded-2xl px-6 pb-0.5 pt-0.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                         style={{
                           background:
                           "linear-gradient(to right,  #8a2036, #CA2525)",
                         }}
                        >Editar
                          </button>
                      </div>  */}

                          <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                            <Modal.Header />
                            <Modal.Body>
                              <div className="space-y-6">
                                <h3 className="text-center text-xl font-medium text-slate-500 dark:text-white">Actualiza los datos del paciente</h3>
                                
                                <div className={`relative z-0 mb-3 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-12"}`}>
                                    <input
                                      type="text"
                                      id="email"
                                      className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                                        !errors.email?.message
                                          ? "border-gray-500 focus:border-colorPrimario"
                                          : "border-red-400 focus:border-red-400"
                                      } peer`}
                                      placeholder = { pantalla?.correo != "" ? pantalla?.correo : "" }
                                      value = {email}
                                      onChange={(event) => setEmail(event.target.value)}
                                      autoComplete="off"
                                    />
                                    <label
                                      htmlFor="email"
                                      className={`${pantalla?.correo != "" ? "peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] focus:left-0 text-gray-400 peer-focus:text-colorPrimario placeholder-shown:scale-100 placeholder-shown:translate-y-0 peer-focus:scale-75 focus:-translate-y-6" :
                                        "block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-gray-500 focus:border-colorPrimario peer" } `} >
                                          Correo Electrónico
                                    </label>
                                </div>

                                  <div className={`relative z-0 mb-3 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-12"}`}>
                                    <input
                                      type="text"
                                      id="telefono"
                                      className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 
                                        border-gray-500 focus:border-colorPrimario peer`}
                                      placeholder = { pantalla?.telefono != "" ? pantalla?.telefono : "" }
                                      value = {telefono}
                                      onChange={(event) => setTelefono(event.target.value)}
                                       autoComplete="off"
                                    />
                                    <label
                                      htmlFor="telefono"
                                      className={`${pantalla?.telefono != "" ? "peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] focus:left-0 text-gray-400 peer-focus:text-colorPrimario placeholder-shown:scale-100 placeholder-shown:translate-y-0 peer-focus:scale-75 focus:-translate-y-6" :
                                      "block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 border-gray-500 focus:border-colorPrimario peer" } `} >
                                        Teléfono
                                    </label>
                                </div>
                                
                                <div className="w-full" style={{textAlign: "-webkit-center"}}>
                                  <Button onClick={ () => handleClickEditar(pantalla?.id, email, telefono)} >
                                    {
                                    sedit == null ?
                                        "Actualizar" : (sedit == 0 ?  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                        </svg> : "Datos Actualizados" )
                                  }
                                  </Button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal>


                          {/* <Modal show={openModalD} size="7xl" onClose={onCloseModalD} popup>
                            <Modal.Header />
                            <Modal.Body>
                              <div className="">
                              <h3 className="text-center text-2xl font-semibold text-colorPrimario  dark:text-white">Antes de continuar ingresa el diagnóstico del paciente</h3>
                                <h3 className="text-center text-lg font-semibold text-slate-500 dark:text-white -pt-4">Datos necesarios para continuar</h3>
                                
                                <div className={`relative z-0 mb-3 w-full group mt-8 ${size.width <= 1200 ? "col-span-12" : "col-span-12"}`}>
                                    <input
                                      type="text"
                                      id="diagnostico"
                                      className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${
                                        !errors.diagnostico?.message
                                          ? "border-gray-500 focus:border-colorPrimario"
                                          : "border-red-400 focus:border-red-400"
                                      } peer`}
                                      placeholder = " "
                                      value = {diagnostico}
                                      onChange={(event) => setDiagnostico(event.target.value)}
                                      autoComplete="off"
                                    />
                                    <label
                                      htmlFor="curp"
                                      className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                                        !errors.diagnostico?.message
                                          ? "text-gray-400 peer-focus:text-colorPrimario"
                                          : "text-red-400 peer-focus:text-red-400"
                                      } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                    >Diagnóstico
                                    </label>
                                </div>

                                  <div className={`relative z-0 mb-3 w-full group mt-12 ${size.width <= 1200 ? "col-span-12" : "col-span-12"}`}>
                                    <input
                                      type="text"
                                      id="descripcion"
                                      className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 
                                        border-gray-500 focus:border-colorPrimario peer`}
                                      placeholder = " "
                                      value = {descripcion}
                                      onChange={(event) => setDescripcion(event.target.value)}
                                       autoComplete="off"
                                    />
                                   <label
                                      htmlFor="curp"
                                      className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                                        !errors.descripcion?.message
                                          ? "text-gray-400 peer-focus:text-colorPrimario"
                                          : "text-red-400 peer-focus:text-red-400"
                                      } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                    >Descripción
                                    </label>
                                </div>
                                
                                <div className="w-full" style={{textAlign: "-webkit-center"}}>
                                  <Button 
                                  onClick={ () => handleClickVerificacion(pantalla?.id, diagnostico, descripcion)} 
                                  outline 
                                  gradientDuoTone="purpleToPink" >
                                    {
                                    sedit == null ?
                                        "Actualizar" : (sedit == 0 ?  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                        </svg> : "Datos Actualizados" )
                                  }
                                  </Button>
                                </div>
                              </div>
                            </Modal.Body>
                          </Modal> */}

                      </h5>
                      {pantalla?.status == 0 && (loadingCurp != 'recibido') ? (
                        <div className="flex col-span-12 -mt-4" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiOutlineDocumentPlus className="w-7 h-7  text-yellow-300" />
                          &nbsp;&nbsp;
                          <span className="text-sm font-semibold text-yellow-300">
                            Nuevo Registro
                          </span>
                        </div>
                      ) : null}{" "}
                      {/* 0: En espera */}
                      {(pantalla?.status == 1 || (loadingCurp == 'recibido' && cambio == 1) || pantalla?.confirmacion == 1) 
                      && opcion != 'cirugia' ? (
                        <div className="flex mb-2 col-span-12" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiOutlineXCircle className="w-7 h-7  text-red-500" />
                          &nbsp;&nbsp;
                          <span className="text-sm font-semibold text-red-500">
                            No Procedente
                          </span>
                        </div>
                      ) : null}{" "}
                      {/* 1: En valoracion */}
                      {pantalla?.status == 2 || (loadingCurp == 'recibido' && cambio == 2 && opcion == 'cirugia') ? (
                        <div className="flex mb-2 col-span-12" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiOutlineDocumentMinus className="w-7 h-7  text-red-500" />
                          &nbsp;&nbsp;
                          <span className="text-sm font-semibold text-red-500">
                          Falta de Datos
                          </span>
                        </div>
                      ) : null}{" "}
                      {/* 2: En cirugia */}
                      {pantalla?.status == 3 ? (
                        <div className="flex col-span-12 items-center" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiBuildingOffice2 className="w-7 h-7  text-blue-500" />
                          &nbsp;&nbsp;
                          <div className="grid">
                            <span className="text-sm font-semibold text-blue-500">
                              En Operación Sanitaria
                            </span>
                            { pantalla?.juris != null ?
                            <small className="">
                              Turnado a:&nbsp;&nbsp; {pantalla?.juris}
                            </small>
                            : null }
                          </div>
                        </div>
                      ) : null}{" "}
                      {/* 3: Concluido */}
                      {pantalla?.status == 4 || (loadingCurp == 'recibido' && cambio == 2 && opcion == 'reject') ? (
                        <div className="flex mb-2 col-span-12" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiOutlineHandThumbUp  className="w-7 h-7  text-emerald-600" />
                          &nbsp;&nbsp;
                          <div className="grid">
                            <span className="text-sm font-semibold text-emerald-600">
                              Atendido
                            </span>
                            { pantalla?.juris != null ?
                            <small className="">
                              Resuelto por:&nbsp;&nbsp; {pantalla?.juris}
                            </small>
                            : null }
                          </div>
                        </div>
                      ) : null}{" "}
                      {/* 3: Concluido */}
                      {pantalla?.status == 5 || (loadingCurp == 'recibido' && cambio == 2 && opcion == 'reject') ? (
                        <div className="flex mb-2 col-span-12" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiShieldExclamation className="w-5 h-5  text-orange-500" />
                          &nbsp;&nbsp;
                          <span className="text-sm font-semibold text-orange-500">
                           Por vencer
                          </span>
                        </div>
                      ) : null}{" "}
                      {/* 5: Rechazado */}
                      {/* {console.log(pantalla?.status == 6 , (loadingCurp == 'recibido' && opcion == 'accept'))} */}
                      {pantalla?.status == 6 && cambio == 2 || (loadingCurp == 'recibido' && opcion == 'accept') ? (
                        <div className="flex mb-2 col-span-12" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiOutlineHandThumbDown  className="w-7 h-7  text-red-500" />
                          &nbsp;&nbsp;
                          <span className="text-sm font-semibold text-red-500">
                            Vencido
                          </span>
                        </div>
                      ) : null}{" "}
                      {/* 6: Solicitud Aprovada */}
                      {pantalla?.status == 7 || pantalla?.status == 8 ? (
                        <div className="flex mb-2 col-span-12" style={{justifyContent: size.width <= 1200 ? "center" : "left"}}>
                          <HiUserRemove className="w-5 h-5  text-red-600" />
                          &nbsp;&nbsp;
                          <span className="text-sm font-semibold text-red-600">
                            No procedente
                          </span>
                        </div>
                      ) : null}{" "}
                      {/* 7: REchazado medico */}
                      
                      {/* <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                          Folio de solicitud:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            { pantalla?.folio }
                          </small>
                        </span>
                      </div>   */}
                    
                    </div>
                  </div>
                </div>

                <hr className="h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 col-span-12 ml-6 mr-6" />

             
                <div className="pl-4 grid grid-cols-12" style={{justifyContent: "left"}}>
                <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <p className="text-base text-zinc-500 font-semibold text-center ">
                          Datos de Usuario
                        </p>
                    </div>
                    <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <p className="text-base text-zinc-500 font-semibold text-center ">
                            Datos del Establecimiento
                        </p>
                    </div>
                    <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                          Municipio:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.municipio_usuario}
                          </small>
                        </span>
                    </div>
                    <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                            Nombre:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.nombre_establecimiento}
                          </small>
                        </span>
                    </div>
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                          Localidad:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.localidad}
                          </small>
                        </span>
                      </div>
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                            Giro:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.giro}
                          </small>
                        </span>
                    </div>
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                          Dirección:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.direccion} C.P. {pantalla?.cp}
                          </small>
                        </span>
                      </div>
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                            Dirección:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.direccion_establecimiento}
                          </small>
                        </span>
                    </div>
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                        Correo Electrónico:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.correo}
                          </small>
                        </span>
                      </div>  
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                            Municipio:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.municipio_establecimiento}
                          </small>
                        </span>
                    </div>
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                            Teléfono:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.telefono}
                          </small>
                        </span>
                  </div>
                  {pantalla?.ubicacion != null ?
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-6"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                            Ubicación:&nbsp;&nbsp;
                            <a href={`https://www.google.com/maps?q=${pantalla?.ubicacion}`} 
                            target="_blank"
                            className="text-sm text-blue-500 font-normal ">
                            Aquí
                          </a>
                        </span>
                      </div>
                      : null
                    }
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-12"} mt-2 mb-2 `} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                            Denuncia:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {pantalla?.denuncia}
                          </small>
                        </span>
                      </div>
                      <div className={`${size.width <= 1200 ? "col-span-12" : "col-span-12"}`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold ">
                          Fecha de la solicitud:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal ">
                            {new Date(pantalla?.fecha).toLocaleDateString(
                              "es-es",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </small>
                        </span>
                      </div>       
                </div>
             

          {/* profile != 3 */}
            <div className="pl-4 grid grid-cols-12 gap-6 mt-6" style={{justifyContent: "left"}}>
              <div  className={`${ size.width <= 1200 ? '-mt-2' : 'flex'} grid grid-cols-12 col-span-12 gap-6 ${pantalla?.clave ? "justify-between" : "justify-around"} ml-3 mr-6`} style={{textAlignLast: "center"}} >
                
              <div id="toast-default" 
              onClick={ () => handleClickRechazar(pantalla?.id, 'SolNok')}
              className={`${reject == null && pantalla?.status == "" && profile == 3 ? "" : "hidden"} cursor-pointer col-span-12 md:col-span-4 flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow-2xl dark:text-gray-400 dark:bg-gray-800`} role="alert"
              style={{justifyContent: "space-around"}}>

                { reject == null && pantalla?.status == "" ?
                  <div className="flex  h-12 rounded-lg">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-clipboard-x" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                    </svg>
                    </div>
                      <div className={`cursor-pointer ml-4 mt-4 mb-4 grid relative z-0 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-4"}`}>
                          <label htmlFor="habilidad" className={`cursor-pointer text-sm text-gray-950 font-semibold`}>No Procedente</label>
                            <span>{pantalla?.habilidad}</span>
                      </div>
                    </div>
                        : (reject == 0 ?  <svg aria-hidden="true" role="status" className="inline w-8 h-8 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#10B981"/>
                          </svg> : "" )
                      }
                </div>

                <div id="toast-default" 
              onClick={ () => handleClickRechazar(pantalla?.id, 'SolEmp')}
              className={`${reject == null && pantalla?.status == "" && profile == 3 ? "" : "hidden"} cursor-pointer col-span-12 md:col-span-4 flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow-2xl dark:text-gray-400 dark:bg-gray-800`} role="alert"
              style={{justifyContent: "space-around"}}>

                { reject == null && pantalla?.status == "" ?
                  <div className="flex  h-12 rounded-lg">
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-amber-300 text- bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-clipboard2" viewBox="0 0 16 16">
                    <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1z"/>
                    <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5"/>
                    </svg>
                    </div>
                      <div className={`cursor-pointer ml-4 mt-4 mb-4 grid relative z-0 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-4"}`}>
                          <label htmlFor="habilidad" className={`cursor-pointer text-sm text-gray-950 font-semibold`}>Falta de Datos</label>
                            <span>{pantalla?.habilidad}</span>
                      </div>
                    </div>
                        : (reject == 0 ?  <svg aria-hidden="true" role="status" className="inline w-8 h-8 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#10B981"/>
                          </svg> : "" )
                      }
                </div>

                <div id="toast-default" 
              // onClick={ () => handleClickRechazar(pantalla?.id, 'SolOk')}
              onClick={ () => handleClickProcedente(pantalla?.id)}
              className={`${reject == null && pantalla?.status == "" && profile == 3 ? "" : "hidden"} cursor-pointer col-span-12 md:col-span-4 flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow-2xl dark:text-gray-400 dark:bg-gray-800`} role="alert"
              style={{justifyContent: "space-around"}}>
                 { reject == null && pantalla?.status == "" ?
                <div className="flex  h-12 rounded-lg">
                <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-emerald-500 bg-emerald-100 rounded-lg dark:bg-emerald-800 dark:text-emerald-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                    </svg>
                  </div>
                    <div className={`cursor-pointer ml-4 mt-4 mb-4 grid relative z-0 w-full group ${size.width <= 1200 ? "col-span-12" : "col-span-4"}`}>
                        <label htmlFor="habilidad" className={`cursor-pointer text-sm text-gray-950 font-semibold`}>Procedente</label>
                          <span>{pantalla?.habilidad}</span>
                    </div>
                  </div>
                    : (reject == 0 ?  <svg aria-hidden="true" role="status" className="inline w-8 h-8 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#F05252"/>
                      </svg> : "" )
                  }
                </div>

                <div id="toast-default" 
                    onClick={ () => handleClickAtencion(pantalla?.id)}
                    className={ `${reject == null && pantalla?.status == 3 && profile != 3 &&  pantalla?.dictamen == null ? "" : "hidden"} cursor-pointer col-span-12 md:col-span-12 flex items-center w-full p-4 text-gray-500 bg-white rounded-lg shadow-2xl dark:text-gray-400 dark:bg-gray-800`} role="alert"
                    style={{justifyContent: "space-around"}}>

                    { reject == null && pantalla?.status == 3 && profile != 3 &&  pantalla?.dictamen == null ?
                    <div className="flex  h-12 rounded-lg">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 text-zinc-400 bg-zinc-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-pc-display-horizontal" viewBox="0 0 16 16">
                    <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v7A1.5 1.5 0 0 0 1.5 10H6v1H1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5v-1h4.5A1.5 1.5 0 0 0 16 8.5v-7A1.5 1.5 0 0 0 14.5 0zm0 1h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5M12 12.5a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0m2 0a.5.5 0 1 1 1 0 .5.5 0 0 1-1 0M1.5 12h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M1 14.25a.25.25 0 0 1 .25-.25h5.5a.25.25 0 1 1 0 .5h-5.5a.25.25 0 0 1-.25-.25"/>
                    </svg>
                        </div>
                        <div className={`cursor-pointer ml-4 mt-4 mb-4 grid relative z-0 w-full group col-span-12 md:col-span-4`}>
                            <label htmlFor="habilidad" className={`cursor-pointer text-sm text-gray-950 font-semibold`}>
                              Ingresar Datos de Atención</label>
                        </div>
                        </div>
                        : (reject == 0 ?  <svg aria-hidden="true" role="status" className="inline w-8 h-8 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#10B981"/>
                          </svg> : "" )
                      }
                    </div>

                    

                    { pantalla?.resultado != null ? 
                    <>
                    <hr className="-mt-4 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50 col-span-12 ml-6 mr-6" />
                    <div className="pl-4 col-span-12 grid grid-cols-12" style={{justifyContent: "left"}}>
                    <div className={`col-span-12 md:col-span-12 mb-4`} style={{overflowWrap: "break-word"}}>
                            <p className="text-base text-zinc-500 font-semibold text-center ">
                              Datos de Atención
                            </p>
                        </div>
                        <div className={`col-span-12 md:col-span-4`} style={{overflowWrap: "break-word"}}>
                        <span className="text-sm text-gray-950 font-semibold block">
                          Fecha de Visita:&nbsp;&nbsp;
                          <small className="text-sm text-gray-500 font-normal block">
                            {new Date(pantalla?.visita).toLocaleDateString(
                              "es-es",
                              {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </small>
                        </span>
                      </div>       

                        <div className={`col-span-12 md:col-span-4`} style={{overflowWrap: "break-word"}}>
                            <span className="text-sm text-gray-950 font-semibold block">
                                Orden:&nbsp;&nbsp;
                              <small className="text-sm text-gray-500 font-normal block">
                                {pantalla?.orden}
                              </small>
                            </span>
                        </div>

                        <div className={`col-span-12 md:col-span-4`} style={{overflowWrap: "break-word"}}>
                            <span className="text-sm text-gray-950 font-semibold block">
                                Resultado de la Visita:&nbsp;&nbsp;
                              <small className="text-sm text-gray-500 font-normal block">
                                {pantalla?.resultado}
                              </small>
                            </span>
                        </div>

                        <div className={`col-span-12 md:col-span-12 mt-4`} style={{overflowWrap: "break-word"}}>
                            <span className="text-sm text-gray-950 font-semibold block">
                                Descripción del Resultado:&nbsp;&nbsp;
                              <small className="text-sm text-gray-500 font-normal block">
                                {pantalla?.descripcion}
                              </small>
                            </span>
                        </div>
                          
                      </div>
                          </>
                          : null
                        }


                 </div>
               </div>


                
               
                        
                    
                
                   
                   
                      
                
              
              </Card>
            ) : null}
          </div>
        </div>
      </div>
      <>
                    <Modal show={openModalA} size="7xl" onClose={onCloseModalA} popup>
                            <Modal.Header />
                            <Modal.Body>
                              <div className="">
                              <div className='twelve col-span-12 pt-0 md:pt-1'>
                                  <h1 className={`col-span-12 after:mr-6`}
                                  >Datos de Atención</h1> 
                              </div>    
                                <h3 className="-mt-2"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "500",
                                  textTransform: "uppercase",
                                  letterSpacing: "4px",
                                  lineHeight: "3em",
                                  paddingLeft: "0.25em",
                                  color: "rgba(0, 0, 0, 0.4)",
                                }}
                                >Datos necesarios para continuar</h3>
                                
                                <div className="grid md:grid-cols-12 md:gap-6 mt-10">
                                <div className={`mb-3 w-full group col-span-12 md:col-span-6`}>
                                    <label htmlFor="fecha_adquisicion" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.visita?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                                        Fecha de Visita
                                    </label>
                                    <Controller
                                        name="visita"
                                        control={control}
                                        // rules={{ required: 'Este campo es necesario' }}
                                        render={({ field }) => 
                                            <DatepickerSingle {...field}
                                            value = {visita}
                                            onChange={(event) => setVisita(event)}
                                            />
                                        } 
                                    />
                                    <div className="w-full text-red-400 text-sm pb-2">
                                        { errors.visita?.message }
                                    </div>
                                </div>

                                  <div className={`relative z-0 mb-3 w-full group  col-span-12 md:col-span-6`}>
                                    <input
                                      type="text"
                                      id="orden"
                                      className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 
                                        border-gray-500 focus:border-colorPrimario peer`}
                                      placeholder = " "
                                      value = {orden}
                                      onChange={(event) => setOrden(event.target.value)}
                                      autoComplete="off"
                                    />
                                   <label
                                      htmlFor="curp"
                                      className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${
                                        !errors.orden?.message
                                          ? "text-gray-400 peer-focus:text-colorPrimario"
                                          : "text-red-400 peer-focus:text-red-400"
                                      } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                    >No. de Orden de Visita de Verificación
                                    </label>
                                </div>

                                <div className={`mb-3 w-full group col-span-12 md:col-span-6`}>
                                  <label htmlFor="resultado" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.resultado?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                                      Resultado de la Visita
                                  </label>
                                  <Controller
                                        name="resultado"
                                        control={control}
                                        rules={{ required: 'Este campo es necesario' }}
                                        render={({ field: { onChange, value, ref } }) => 
                                          <CustomSelect 
                                                ref={ ref }
                                                reverseMenu={true}
                                                options={ resultados }
                                                isMulti={false} 
                                                // placeholder={clasificadoObj[2]?.label}
                                                onChange={(e) => {
                                                  onChange(e.value);
                                                  setResultado(e.value);
                                                  onChangeShow(e.value);
                                              }}
                                            />}
                                    />
                                  <div className="w-full text-red-400 text-sm pb-2">
                                
                                    { errors.resultado?.message }</div>
                                </div>
                                { showUno ? <>
                                <div className={`mb-3 w-full group col-span-12 md:col-span-6`}>
                                  <label htmlFor="reprogramada" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.reprogramada?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                                      Reprogramada
                                  </label>
                                  <Controller
                                        name="reprogramada"
                                        control={control}
                                        rules={{ required: 'Este campo es necesario' }}
                                        render={({ field: { onChange, value, ref } }) => 
                                          <CustomSelect 
                                                ref={ ref }
                                                // reverseMenu={true}
                                                options={ yesNo }
                                                isMulti={false} 
                                                // placeholder={clasificadoObj[2]?.label}
                                                onChange={(e) => {
                                                  onChange(e.value);
                                                  setReprogramada(e.value);
                                              }}
                                            />}
                                    />
                                  <div className="w-full text-red-400 text-sm pb-2">
                                    { errors.reprogramada?.message }</div>
                                  </div>
                                  </> : null }
                                
                                  { showDos ? <>
                                  <div className={`mb-3 w-full group col-span-12 md:col-span-3`}>
                                  <label htmlFor="medida_seguridad" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.medida_seguridad?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                                      Medida de Seguridad
                                  </label>
                                  <Controller
                                        name="medida_seguridad"
                                        control={control}
                                        rules={{ required: 'Este campo es necesario' }}
                                        render={({ field: { onChange, value, ref } }) => 
                                          <CustomSelect 
                                                ref={ ref }
                                                // reverseMenu={true}
                                                options={ medidas }
                                                isMulti={false} 
                                                // placeholder={clasificadoObj[2]?.label}
                                                onChange={(e) => {
                                                  onChange(e.value);
                                                  setMedida_seguridad(e.value);
                                              }}
                                            />}
                                    />
                                  <div className="w-full text-red-400 text-sm pb-2">
                                    { errors.medida_seguridad?.message }</div>
                                  </div>
                                  
                                  <div className={`mb-3 w-full group col-span-12 md:col-span-3`}>
                                  <label htmlFor="dictamen" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.dictamen?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                                      Dictaminación
                                  </label>
                                  <Controller
                                        name="dictamen"
                                        control={control}
                                        rules={{ required: 'Este campo es necesario' }}
                                        render={({ field: { onChange, value, ref } }) => 
                                          <CustomSelect 
                                                ref={ ref }
                                                // reverseMenu={true}
                                                options={ dictamenes }
                                                isMulti={false} 
                                                // placeholder={clasificadoObj[2]?.label}
                                                onChange={(e) => {
                                                  onChange(e.value);
                                                  setDictamen(e.value);
                                              }}
                                            />}
                                    />
                                  <div className="w-full text-red-400 text-sm pb-2">
                                    { errors.dictamen?.message }</div>
                                  </div>
                                  
                                  </> : null }

                                <div className={`mt-2 mb-1 relative z-0 w-full group col-span-12 md:col-span-12`}>
                                  <textarea id="descripcion" rows="5"
                                    className={`block py-2 px-2 w-full text-sm text-gray-900 bg-zinc-50 rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 ${
                                      !errors.descripcion?.message
                                        ? "border-gray-500 focus:border-[#CA2525]"
                                        : "border-red-400 focus:border-red-400"
                                    } peer`}
                                    autoComplete="off"
                                    {...register("descripcion")}
                                    value = {descripcion}
                                    onChange={(event) => setDescripcion(event.target.value)}
                                  ></textarea>
                                  <label
                                  htmlFor="descripcion"
                                  className={`peer-focus:font-medium absolute text-xl md:text-xl duration-300 transform -translate-y-6 scale-75 top-0 ml-2 peer-focus:ml-0 -z-10 origin-[0] peer-focus:left-0 ${
                                    !errors.descripcion?.message
                                      ? "text-gray-400 peer-focus:text-[#CA2525]"
                                      : "text-red-400 peer-focus:text-red-400"
                                  } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                                  >
                                    Descripción del Resultado
                                  </label>
                                </div>

                                </div>

                              <div className="text-center">
                                <div className="mt-8 ">
                                <button 
                                  onClick={ () => handleClickDatosAtencion(pantalla?.id, orden, visita, dictamen, descripcion, resultado, reprogramada, medida_seguridad)} 
                                    className="w-40 h-8 cursor-pointer inline-block rounded-2xl px-3  text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                    style={{
                                      background:
                                      "linear-gradient(to right,  #8a2036, #CA2525)",
                                    }}
                                    >
                                       {
                                    sedit == null ?
                                        "Actualizar" : (sedit == 0 ?  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                        </svg> : "Datos Actualizados" )
                                  }
                                    </button>
                                    </div>
                                  </div>
                              </div>
                            </Modal.Body>
                          </Modal>
      </>

      <>
                    <Modal show={openModalP} size="7xl" onClose={onCloseModalP} popup>
                            <Modal.Header />
                            <Modal.Body>
                              <div className="">
                              <div className='twelve col-span-12 pt-0 md:pt-1'>
                                  <h1 className={`col-span-12 after:mr-6`}
                                  >Turnar Denuncia</h1> 
                              </div>    
                                <h3 className="-mt-2"
                                style={{
                                  fontSize: "13px",
                                  fontWeight: "500",
                                  textTransform: "uppercase",
                                  letterSpacing: "4px",
                                  lineHeight: "3em",
                                  paddingLeft: "0.25em",
                                  color: "rgba(0, 0, 0, 0.4)",
                                }}
                                >Datos necesarios para continuar</h3>
                                
                                <div className="grid md:grid-cols-12 md:gap-6 mt-10">
                               
                                <div className={`mb-3 w-full group col-span-12 md:col-span-12`}>
                                  <label htmlFor="turnar" className={`peer-focus:font-medium text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.turnar?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                                      Turnar a:
                                  </label>
                                  <Controller
                                        name="turnar"
                                        control={control}
                                        rules={{ required: 'Este campo es necesario' }}
                                        render={({ field: { onChange, value, ref } }) => 
                                            <CustomSelect 
                                                ref={ ref }
                                                options={ jurisdicciones }
                                                isMulti={false}
                                                reverseMenu={true}
                                                // placeholder={clasificadoObj[2]?.label}
                                                onChange={(e) => {
                                                  onChange(e.value);
                                                  setTurnado(e.value);
                                              }}
                                            />}
                                    />
                                  <div className="w-full text-red-400 text-sm pb-2">
                                    { errors.turnar?.message }</div>
                                </div>

                               

                                </div>

                              <div className="text-center">
                                <div className="mt-8 ">
                                <button 
                                  // onClick={ () => handleClickProcedente(pantalla?.id, diagnostico, descripcion)} 
                                    onClick={ () => handleClickRechazar(pantalla?.id, 'SolOk')}
                                    className="w-40 h-8 cursor-pointer inline-block rounded-2xl px-3  text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                    style={{
                                      background:
                                      "linear-gradient(to right,  #8a2036, #CA2525)",
                                    }}
                                    >
                                       {
                                    sedit == null ?
                                        "Actualizar" : (sedit == 0 ?  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                                        </svg> : "Datos Actualizados" )
                                  }
                                    </button>
                                    </div>
                                  </div>
                              </div>
                            </Modal.Body>
                          </Modal>
      </>

    </>
  );
};
