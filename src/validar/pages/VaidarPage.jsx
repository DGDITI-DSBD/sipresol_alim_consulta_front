import React, { useEffect, useState, useRef } from "react";
import { Header } from "../../router/components/Header";
import Swal from "sweetalert2";
import { Button, Typography } from "@material-tailwind/react";
import {
   fetchCalendarios,
   fetchApoyos,
} from "../../store/public/programaSlice";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
   cleaningEditData,
   getEditData,
   setFolio,
   storeData,
   setId,
} from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { REACT_APP_SITE_KEY, urlBase } from "../../api";
import ReCAPTCHA from "react-google-recaptcha";
import LogoGlobal from "../../images/logo-bienestar-juntos-sin-lineas.png";
import PDFProv from "../../pdf/avisoprivab.pdf";
import { Modal } from "flowbite-react";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";
import { EmptyList } from "../../ui/components/EmptyList";
import { Loading } from "../../ui/components";
import { Errortype } from "../../ui/components/errorType";

import CryptoJS from "crypto-js";
import { pass } from "../../api";

export const VaidarPage = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const { apoyos, calendarios } = useSelector(state => state.programa);
   const handleOpen = () => setOpen();
   const handleOpen1 = () => setOpen1();
   const [curp, setCurp] = useState();
   const [calendario, setCalendario] = useState();
   const [apoyo, setApoyo] = useState();
   const [programa, setPrograma] = useState();

   const [open, setOpen] = useState(false); // Modal 1: Datos Personales
   const [open1, setOpen1] = useState(false); // Modal 2: Seguimiento

   const [isValidLength, setIsValidLength] = useState(false);
   const [isValidFormat, setIsValidFormat] = useState(false);
   const [isValidAge, setIsValidAge] = useState(false);
   const [isValidCalendar, setIsValidCalendar] = useState(false);
   const [showCaptcha, setShowCaptcha] = useState(false);
   const [isVerifying, setIsVerifying] = useState(false);
   const [emptyList, setEmptyList] = useState(false);
   const { data } = useSelector(state => state.edit);
   const { register, handleSubmit, reset } = useForm();

   const recaptchaRef = useRef(null);
   const [captchaToken, setCaptchaToken] = useState("");

   const token = 1;
   const [ENTI, setENTI] = useState([]);
   const [Beneficiaria, setBeneficiaria] = useState([]);
   const [Formulario, setFormulario] = useState([]);

   const [cat, setCat] = useState({});
   const [cat2, setCat2] = useState({});
   const { isSaving, status } = useSelector(state => state.validacion);

   // Variables de validación
   const [nameProgs, setNameProgs] = useState();
   // Construcción y descontrucción
   const [primalLetter, setPrimalLetter] = useState();
   const [primalBirthDate, setPrimalBirthDate] = useState();
   const [primalGender, setPrimarGender] = useState();
   const [primalEntNac, setPrimalEntNac] = useState();
   //MAMB990504HMCRLR03

   const [apoyosFill, setApoyosFilled] = useState([]);
   const [calendarioFill, setcalendarioFilled] = useState([]);
   const [programasFill, setprogramasFilled] = useState([]);

   const [infoCiudadano, setInfoCiudadano] = useState([]);
   const [infoBeneficiario, setInfoBeneficiario] = useState([]);
   const [registroId, setRegistroId] = useState(null);

   const [isContinue, setContinue] = useState(false);
   const [varsProgs, setVarsProgs] = useState([]);

   const { anio, edad_maxima, edad_minima, programa_id, programa_nombre, pointer } =
      location.state || {};

   //   useEffect(() => {

   //     setprogramasFilled(location.state);

   // }, [location])

   // console.log(programasFill);

   useEffect(() => {
      dispatch(fetchCalendarios());
      dispatch(fetchApoyos());
   }, []);

   const close = () => {
      setOpen(false);
   };
   const close1 = () => {
      setOpen1(false);
   };

   useEffect(() => {
      if (apoyos.items.length <= 0 && calendarios.items.length <= 0) {
         setEmptyList(true);
      } else {
         setEmptyList(false);
      }

    
   }, [calendarios, apoyos]);

  

useEffect(()=>{
 
},[calendarios, apoyos])

   useEffect(() => {
      if (typeof apoyos != "undefined" || apoyos > 0) {
         //const fill = apoyos.filter(item.programa_id = getProgs);
         const fill = apoyos.items.filter(
            item => item.programa_id === programa_id
         );
         
         setApoyosFilled(fill);
      }
   }, [apoyos]);

   useEffect(() => {
      if (typeof calendarios != "undefined" || calendarios > 0) {
         const fill = calendarios.items.filter(
            item => item.programa_id === programa_id
         );
         setcalendarioFilled(fill);
        
      }
   }, [calendarios]);

   const handleCurpChange = e => {
      const value = e.target.value.toUpperCase();
      setCurp(value);
  
      if (onCheckLength(value) && validarRegexCurp(value)) {
         const { birthDate, age } = calcularFechaNacimientoYEdad(value);
         if (!onCheckAgesPrograma(age)) {
            Swal.fire({
               icon: "warning",
               title: "Edad no permitida",
               text: "Verifique las reglas de aceptación para este proceso de registro",
               confirmButtonColor: "#8a2036",
            });
         } else {
            if (!onCheckCalendario(value)) {
               Swal.fire({
                  icon: "warning",
                  title: "Periodo de registro",
                  text: "Verifica las fechas de la convocatoria del programa para que tu registro sea válido",
                  confirmButtonColor: "#8a2036",
               });
            }
         }
      } else {
         if (onCheckLength(value) && value.charAt(10) === "H") {
            Swal.fire({
               icon: "warning",
               title: "Verificar CURP",
               text: "El programa es exclusivo para mujeres",
               confirmButtonColor: "#8a2036",
            });
         }
      }
   };

   const onCheckLength = info => {
      if (info.length === 18) {
         setIsValidLength(true);
         return true;
      } else {
         setIsValidLength(false);
         return false;
      }
   };

   const onCheckAgesPrograma = age => {
      if (age >= edad_minima && age <= edad_maxima) {
         setIsValidAge(true);
         return true;
      } else {
         setIsValidAge(false);
         return false;
      }
   };

   const onCheckCalendario = info => {
      if (validarCalendarioPorInicialCurp(info) != null) {
         if (validarCalendarioPorInicialCurp(info)) {
            //console.log("entra true");
            setIsValidCalendar(true);
            return true;
         } else {
            setIsValidCalendar(false);
            return false;
         }
      } else {
         setIsValidCalendar(false);
         return false;
      }
   };

useEffect(() => {
   const verifyCurp = async () => {
    if(captchaToken) {
      try {
         const token = captchaToken;
         const curpResponse = await fetchCurpData(curp, token);
         if (curpResponse.existe) {
            if(curpResponse.existeResultado===false){
              Swal.fire({
                backdrop: "static",
                title: "Ya existe un registro con este CURP",
                text: "¿Desea continuar con el registro?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí",
                cancelButtonText: "No",
              }).then(result => {
                if (result.isConfirmed) {
                   setOpen(true);
                   setRegistroId(curpResponse.registro_id);
                } else {
                   setIsVerifying(false);
                   setShowCaptcha(true);
                   setOpen(false);
                }
            });
          }else{
            setRegistroId(curpResponse.registro_id);
            return showWarningMessage(curpResponse.message, curpResponse.registro_id);
          }
        }else{
          setIsVerifying(false);
          setShowCaptcha(false);
          setOpen(true);
        }
          
        

        await validatePadronHistorico(curp);
        await validatePadronActivo(curp);
      } catch (error) {
         //console.error("Error al procesar la verificación:", error);
         setIsVerifying(false);
         setShowCaptcha(true);
         setOpen(false);
      } finally {
         setIsVerifying(false);
      }
   };
  }


   if (isVerifying) {
      verifyCurp();
   }
}, [captchaToken]);


   const handleCaptchaChange = async token => {
      if (!token) {
         return showCaptchaError();
      } else {
         setCaptchaToken(token);
         setShowCaptcha(false);
         setIsVerifying(true);
      }
   };

   const showCaptchaError = () => {
      return Swal.fire({
         backdrop: "static",
         title: "Captcha Invalido",
         text: "Vuelva a verificar de nuevo el Captcha",
         icon: "warning",
         showConfirmButton: true,
         confirmButtonText: "Entendido",
      }).then(result => {
         if (result.isConfirmed) {
            setShowCaptcha(true);
            setIsVerifying(false);
            setOpen(false);
         }
      });
   };

   const fetchCurpData = async (curp, token) => {
      const response = await axios.post(`${urlBase}/registros/curp`, {
         curp: curp,
         captchaToken: token,
      });
      const { status, data } = response;


      if (status === 500 || status === 422) {
         handleErrorResponse(status, data.message);
      }

      return data;
   };

   const validatePadronHistorico = async curp => {
      try {
         const response = await axios.get(
            `${urlBase}/registros/padron-historico/${curp.toUpperCase()}`
         );
         const { status, data, existe } = response.data;

         if (status === 500) {
            handleErrorResponse(status);
         } else {
            const localInfo = formatPadronHistoricoData(data, existe);
            setInfoCiudadano(localInfo);
            //setOpen(true);
         }
      } catch (error) {
         //console.error("Error al validar padrón histórico:", error);
      }
   };

   const validatePadronActivo = async curp => {
      try {
         const response = await axios.get(
            `${urlBase}/registros/padron-activo/${curp.toUpperCase()}`
         );
         const { status, data, existe } = response.data;

         if (status === 500) {
            handleErrorResponse(status);
         } else {
            const infoBeneficiario = formatPadronActivoData(data, existe);
            setInfoBeneficiario(infoBeneficiario);
            //setOpen(true);
         }
      } catch (error) {
         //console.error("Error al validar padrón activo:", error);
      }
   };

   const handleErrorResponse = (status, message = "") => {
      const errorMessages = {
         500: "Algo no salió como se esperaba. Vuelva a intentarlo más tarde.",
         422: `Datos inconsistentes: ${message}`,
      };

      Swal.fire({
         backdrop: "static",
         title: errorMessages[status] || "Error desconocido",
         icon: "warning",
         showConfirmButton: true,
         confirmButtonText: "Entendido",
         allowOutsideClick: false,
      }).then(result => {
         if (result?.isConfirmed) {
            setIsVerifying(false);
            setShowCaptcha(true);
            setOpen(false);
         }
      });
   };

   const showWarningMessage = (message, registro_id) => {
      return Swal.fire({
         backdrop: "static",
         title: message,
         icon: "info",
         text: "Por favor, espere nuevas instrucciones de los canales oficiales.",
         showConfirmButton: false,
         confirmButtonText: "Aceptar",
         showCancelButton: true,
         cancelButtonText: "Descargar formatos",
         cancelButtonColor: "#8a2036",
      }).then(result => {
         if (result?.isConfirmed) {
         setIsVerifying(false);
         setOpen(false);
         navigate("/");
         } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate(`../alimentacion_bienestar/${ CryptoJS.AES.encrypt( JSON.stringify( registro_id ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`);
         }
      });
   };

   const formatPadronHistoricoData = (data, existe) => [
      {
         curp: curp,
         programa: programa_id,
         apoyo_id: apoyo,
         calendario_id: calendario,
         primer_apellido: data?.primer_ap,
         segundo_apellido: data?.segundo_ap,
         nombres: data?.nombres,
         cve_municipio: data?.cve_municipio,
         municipio: data?.municipio,
         padronStatus: existe ? "SI" : "NO",
      },
   ];

   const formatPadronActivoData = (data, existe) => [
      {
         folio_relacionado: data?.folio_relacionado,
         primer_apellido: data?.primer_ap,
         segundo_apellido: data?.segundo_ap,
         nombres: data?.nombres,
         curp: data?.curp,
         permanencia: !!existe,
         cve_municipio: data?.cve_municipio,
      },
   ];

   const onSubmit = async () => {
      setShowCaptcha(true);
      setContinue(true);
   };

   const formatDate = dateStr => {
      if (!dateStr) return "";

      // Maneja diferentes formatos de entrada
      let dateObj;
      if (typeof dateStr === "string") {
         // Si viene como string en formato DD/MM/YYYY
         const [day, month, year] = dateStr.split("/").map(Number);
         dateObj = new Date(year, month - 1, day); // Meses en JS son 0-based

         // Si la fecha es inválida después del parsing
         if (isNaN(dateObj.getTime())) {
            return ""; // o puedes lanzar un error aquí según necesites
         }
      } else {
         // Si ya es un objeto Date
         dateObj = dateStr;
      }

      // Formatea la fecha al estilo YYYY-MM-DD
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
   };

   const calcularFechaNacimientoYEdad = curp => {
      if (curp.length !== 18) return null;

      const year = parseInt(curp.substring(4, 6), 10);
      const month = parseInt(curp.substring(6, 8), 10) - 1; // Meses en JS son 0-based
      const day = parseInt(curp.substring(8, 10), 10);

      // Determinar el siglo
      const century = isNaN(parseInt(curp.charAt(16), 10)) ? 2000 : 1900;
      const birthDate = new Date(century + year, month, day);

      // Calcular la edad
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
         age--;
      }

      return { birthDate, age };
   };

   const validarRegexCurp = curp => {
      const regex = new RegExp(
         /^[A-Z][AEIOUX][A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[M][A-Z]{5}[0-9A-F][0-9]$/
      );
      if (regex.test(curp)) {
         setIsValidFormat(true);
      } else {
         setIsValidFormat(false);
      }
      return regex.test(curp);
   };


  const validarCalendarioPorInicialCurp = (curp) => {

 
    const inicialCurp = curp.charAt(0).toUpperCase();
    const fechaActual = new Date();

    

    // Find calendar entries where current date falls within range
 
    const calendarioActivo = calendarioFill.filter(item => {
      if (!item.fecha_inicio || !item.fecha_fin) return false;
      // Add 'T00:00:00' to ensure date is interpreted in local timezone without day adjustment
      const fechaInicio = new Date(item.fecha_inicio.split('T')[0] + 'T00:00:00');
      const fechaFin = new Date(item.fecha_fin.split('T')[0] + 'T00:00:00');

         // Set hours to 0 for date-only comparison if needed
         fechaFin.setHours(23, 59, 59, 999); // Include the entire end day

    

         return fechaActual >= fechaInicio && fechaActual <= fechaFin;
      });

  

      // From active calendar entries, find one that includes the initial letter
      const calendarioValido = calendarioActivo.find(item => {
         if (!item.letras) return false;

      // Split the letters string and check if it includes the initial
      const letrasArray = item.letras.split(',').map(letra => letra.trim().toUpperCase());
     

         return letrasArray.includes(inicialCurp);
      });

      if(calendarioValido) {
        setCalendario(calendarioValido.id);
      }
      return calendarioValido || null;
   };

  return (
    <>
      {apoyos.loading && calendarios.loading ? (
        <Loading />
      ) : emptyList ? (
        <EmptyList />
      ) : apoyos.error || calendarios.error ? (
        <Errortype />
      ) : (
        <main className="flex justify-center bg-gradient-to-r from-red-900 from-50%  to-colorPrimario to-100% backdrop-invert backdrop-opacity-20">
          <div className="md:w-[750px] w-full h-screen md:h-screen content-center">
            <div className="flex-1 mt-6 p-10">
              <div className="flex items-center justify-center">
                <img
                  className=""
                  src={LogoGlobal}
                  width="600"
                  height="900"
                  alt="Authentication decoration"
                />
              </div>
            </div>

            <div className="px-2">
              <h1 className="text-3xl font-bold mb-5 text-center text-white w-full">
               {pointer != 'docs' ? 
                programa_nombre + "-" + anio
                : 'Busqueda de formatos' }
              </h1>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex mb-6 md:w-full group justify-center">
                  <input
                    type="text"
                    disabled={showCaptcha ? true : false}
                    className={`text-center block w-full md:w-3/5 text-sm text-black-900 border-black-300 appearance-none dark:text-black dark:border-black-600
                ${
                  !isValidLength || !isValidFormat
                    ? "border-red-500"
                    : "border-gray-300"
                }
                focus:outline-none focus:ring-0 focus:border-blue-600 rounded-lg`}
                    placeholder="Digita los 18 caracteres de tu CURP"
                    {...register("curp")}
                    maxLength={18}
                    onChange={handleCurpChange}
                  />
                </div>

                <div className="flex items-center justify-center mt-16">
                  {showCaptcha && (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={REACT_APP_SITE_KEY}
                      onChange={token => handleCaptchaChange(token)}
                    />
                  )}

                  {isVerifying && (
                    <Button
                      className="mt-4 bg-colorPrimario hover:bg-colorSecundario animate-pulse"
                      disabled
                      loading={true}
                    >
                      Verificando
                    </Button>
                  )}

                  {!showCaptcha && !isVerifying && (
                    <Button
                      disabled={
                        isValidLength &&
                        isValidFormat &&
                        isValidAge &&
                        isValidCalendar
                          ? false
                          : true
                      }
                      type="submit"
                      className={`bg-colorSecundario text-white hover:bg-colorPrimario border border-colorSecundario hover:border-colorSecundario w-2/4 rounded-lg p-2
              ${
                isValidLength &&
                isValidFormat &&
                isValidAge &&
                isValidCalendar
                  ? "border-colorPrimario hover:bg-colorPrimario"
                  : "opacity-50 cursor-not-allowed"
              }`}
                    >
                      Verificar
                    </Button>
                  )}
                </div>
              </form>
            </div>

            <div className="flex justify-center p-12 rounded-xl shadow-xl">
              <footer className="flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-8 text-center">
                <Typography
                  color="white"
                  className="flex justify-center"
                >
                  &copy; 2025 Derechos Reservados <br></br>
                  Dirección General de Desarrollo Institucional y
                  Tecnologias de la Información
                </Typography>
              </footer>
            </div>
          </div>
        </main>
      )}

      <Modal dismissible={false} show={open}>
        <Modal.Header>Aviso de privacidad</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="grid grid-rows-12 mb-6">
              <div className="row-span-10 flex md:justify-center bg-dark">
                <object
                  data={PDFProv}
                  width="100%"
                  height="600px"
                  type="application/pdf"
                ></object>
              </div>
              <div className="flex row-span-2 justify-start">
                <div className="flex items-center"></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex flex-col items-start">
          <div className="flex items-center mb-4">
            <input
              id="checkbox"
              type="checkbox"
              onChange={e => {
                const onChecked = e.target.checked;
                if (onChecked) {
                  setContinue(false);
                } else {
                  setContinue(true);
                }
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-colorSecundario dark:focus:ring-colorSecundario dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="checkbox"
              className="ms-2 text-xs text-justify font-medium text-gray-900 dark:text-gray-300"
            >
              <strong>Acepto los términos de privacidad: </strong>
              Al comprobar tu identidad, decides confiar en los procesos
              de seguridad que mantiene la{" "}
              <strong>
                Dirección General de Bienestar Social y Fortalecimiento
                Familiar
              </strong>
            </label>
          </div>
          <div className="w-full">
            <Button
              className={`${
                isContinue
                  ? "cursor-not-allowed text-white bg-red-900 dark:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  : "text-white border border-colorPrimario bg-colorPrimario focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              }`}
              disabled={isContinue}
              onClick={() => {
                navigate("../Formulario", {
                  state: { infoCiudadano, infoBeneficiario, registroId },
                });
              }}
            >
              Continuar
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
