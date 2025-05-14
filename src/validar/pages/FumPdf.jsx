import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { useParams, useNavigate  } from 'react-router-dom';
import CryptoJS from "crypto-js";
import QRCode from 'qrcode';
import LogoEdoMex from '../../images/logos_edomex3.png';
import LogoIsem from '../../images/logos_edomex2.png';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG'

import { pass, urlBase, urlBaseFront } from '../../api';



export const FumPdf = () => {
  const { registroId } = useParams(); 
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const navigate = useNavigate();


  const handleRedirect = () => {
    navigate('/Iniciar-Sesion');
  };



  useEffect(() => {
    const fetchDataAndGeneratePDF = async () => {
      try {

        const decrypUrl = registroId.replace(/p1L2u3S/g, '+' ).replace(/bXaJN0921/g, '/').replace(/e1Q2u3A4l/g, '=')
        const bytes = CryptoJS.AES.decrypt(decrypUrl, pass);
        const folio = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        const response = await fetch(`${urlBase}/respuestas/registro/${folio}`);
        const result = await response.json();

    

       

        if (Array.isArray(result.respuestas)) {
          setData(result.respuestas);

          const qrBase64 = result.qr;
          await generatePDF(result.respuestas, result.registro, qrBase64); 
        } else {
          console.error('La propiedad "respuestas" no es un arreglo:', result.respuestas);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDataAndGeneratePDF();
  }, [registroId]);
  
  


  const generatePDF = async (data, registro, qrBase64) => {
    if (!data || !Array.isArray(data) || !registro) {
      console.error('Datos no cargados o incompletos. Inténtalo de nuevo.');
      return;
    }
    setLoading(true);
    try {
      const templatePath = '/assets/FUB_ALIMENTACION.pdf';
      const response = await fetch(templatePath);
      if (!response.ok) throw new Error('Error al cargar la plantilla PDF');

      const existingPdfBytes = await response.arrayBuffer();
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      
    // Generar el texto para el QR
    const qrText = `${urlBaseFront}/#/validar/registro/${registro.uuid}`;
    //const qrText = `${registro.folio_relacionado} `;
    const qrDataUrl = await QRCode.toDataURL(qrText);
    
    
// // Generar el texto para el QR (enlace a URL)
// const qrText = 'http://localhost:5173/#/inicio';
// const qrDataUrl = await QRCode.toDataURL(qrText);

// Insertar imagen QR encima del campo "qr"
const qrImageBytes = await fetch(qrDataUrl).then(res => res.arrayBuffer());
const qrImage = await pdfDoc.embedPng(qrImageBytes);
const pages = pdfDoc.getPages();
const firstPage = pages[0];

const qrField = form.getTextField('qr');
const widgets = qrField.acroField.getWidgets();
const rect = widgets[0].getRectangle();
const { x, y, width, height } = rect;

// Dibujar imagen QR encima del campo
firstPage.drawImage(qrImage, {
  x,
  y,
  width,
  height,
});

    



      const numExt = (registro.num_ext || '').toString();
      const num_int = (registro.num_int || '').toString();

      
      const entidadMap = {
  '01': 'AGUASCALIENTES',
  '02': 'BAJA CALIFORNIA',
  '03': 'BAJA CALIFORNIA SUR',
  '04': 'CAMPECHE',
  '05': 'COAHUILA DE ZARAGOZA',
  '06': 'COLIMA',
  '07': 'CHIAPAS',
  '08': 'CHIHUAHUA',
  '09': 'CIUDAD DE MÉXICO',
  '10': 'DURANGO',
  '11': 'GUANAJUATO',
  '12': 'GUERRERO',
  '13': 'HIDALGO',
  '14': 'JALISCO',
  '15': 'MÉXICO',
  '16': 'MICHOACÁN DE OCAMPO',
  '17': 'MORELOS',
  '18': 'NAYARIT',
  '19': 'NUEVO LEÓN',
  '20': 'OAXACA',
  '21': 'PUEBLA',
  '22': 'QUERÉTARO',
  '23': 'QUINTANA ROO',
  '24': 'SAN LUIS POTOSÍ',
  '25': 'SINALOA',
  '26': 'SONORA',
  '27': 'TABASCO',
  '28': 'TAMAULIPAS',
  '29': 'TLAXCALA',
  '30': 'VERACRUZ',
  '31': 'YUCATÁN',
  '32': 'ZACATECAS',
  '33': 'NACIDO EN EL EXTRANJERO'
};
      
      const entidadCodigo = (registro.ct_ent_nac || '').toString().padStart(2, '0');
      const Entidad_nac = entidadMap[entidadCodigo] || '';


      const fieldMapping = {
        // Registro info
        'alimentacion': 'X',

        'folio': (registro.folio_relacionado || '').toString().toUpperCase(),
        'nombres': (registro.nombres || '').toString().toUpperCase(),
        'ape_paterno': (registro.primer_ap || '').toString().toUpperCase(),
        'ape_materno': (registro.segundo_ap || '').toString().toUpperCase(),

        'Edad': (registro.edad || '').toString().toUpperCase(),

        'email': (registro.email || '').toString().toUpperCase(),
      
        'ent_fed': (registro.entidad_federativa || '').toString().toUpperCase(),
        'calle': (registro.calle || '').toString().toUpperCase(),
        'colonia': (registro.colonia || '').toString().toUpperCase(),
        'localidad': (registro.localidad || '').toString().toUpperCase(),
        'municipio': (registro.municipio || '').toString().toUpperCase(),
        'cp': (registro.codigo_postal || '').toString().toUpperCase(),
      
        'entre_calle': (registro.entre_calle || '').toString().toUpperCase(),
        'y_la calle': (registro.y_calle || '').toString().toUpperCase(),
        'otra_ref': (registro.otra_referencia || '').toString().toUpperCase(),

       'Entidad_nac': Entidad_nac,

       'Nombre_completo': `${registro.nombres || ''} ${registro.primer_ap || ''} ${registro.segundo_ap || ''}`.toUpperCase(),
       

        // respuesta 3.4 cual       
        'r3_4_cual': data.find(d => d.pregunta_id === 5)?.respuesta || '',

        // respuesta de otro de  3.5
        'r3_5_cual': data.find(d => d.pregunta_id === 7)?.respuesta || '',

        // respuesta de otro de  3.6
        'r3_6_otra': data.find(d => d.pregunta_id === 9)?.respuesta || '',

        // respuesta de otro de  3.11
        'r3_11_cual': data.find(d => d.pregunta_id === 17)?.respuesta || '',

        // campos  num_ext
        'num_ext_1': numExt.charAt(0) || '',
        'num_ext_2': numExt.charAt(1) || '',
        'num_ext_3': numExt.charAt(2) || '',
        'num_ext_4': numExt.charAt(3) || '',

        // Campos num_int 
       

        'num_int1': num_int.charAt(0) || '',
        'num_int2': num_int.charAt(1) || '',
        'num_int3': num_int.charAt(2) || '',
        'num_int4': num_int.charAt(3) || '',


       
      };


      
  

      Object.entries(fieldMapping).forEach(([key, value]) => {
        if (form.getTextField(key)) {
          form.getTextField(key).setText(value.toString());
        }
      });

      const tipoIdentificacionMap = {
        0: "NINGUNO",
        1: "OTRO",
        2: "CREDENCIAL INE",
        3: "LICENCIA DE MANEJO",
        4: "CARTILLA MILITAR",
        5: "CREDENCIAL INAPAM",
        6: "CREDENCIAL IMMS",
        7: "CREDENCIAL ISSSTE",
        8: "CREDENCIAL INSEN",
        9: "PASAPORTE",
        10: "RFC",
        11: "CURP",
        12: "ACTA DE NACIMIENTO"
      };

   // Obtener ID de identificación oficial
const tpId = registro.tp_id_oficial;
// Obtener descripción a partir del ID
const descripcionId = tipoIdentificacionMap[tpId] || '';

if (tpId === 2) {
  // Si es INE
  form.getCheckBox('r_1_10_1').check(); // Marcar INE

  // Limpiar campo "otro" ya que no aplica
  form.getTextField('r_1_10_otro').setText('');

  // Llenar campos INE_CVE_1 a INE_CVE_18
  if (registro.id_oficial) {
    const idChars = registro.id_oficial.substring(0, 18).split('');
    for (let i = 0; i < 18; i++) {
      const fieldName = `INE_CVE_${i + 1}`;
      const formField = form.getTextField(fieldName);
      if (formField) {
        formField.setText(idChars[i] || '');
      } else {
        console.warn(`Campo ${fieldName} no encontrado en el PDF`);
      }
    }
  }
} else {
  // Si no es INE
  form.getCheckBox('r_1_10_2').check(); // Marcar "otro"

  // Llenar campo "otro" con la descripción
  form.getTextField('r_1_10_otro').setText(descripcionId.toUpperCase());

  // Limpiar campos INE_CVE_1 a INE_CVE_18
  for (let i = 0; i < 18; i++) {
    const fieldName = `INE_CVE_${i + 1}`;
    const formField = form.getTextField(fieldName);
    if (formField) {
      formField.setText('');
    } else {
      console.warn(`Campo ${fieldName} no encontrado en el PDF`);
    }
  }
}


      



      // Descomponer la fecha en día, mes y año
const fechaSolicitud = registro.fecha_solicitud; // ejemplo: "2025-04-11"

if (fechaSolicitud) {
  const [año, mes, dia] = fechaSolicitud.split('-');

  const fechaFields = {
    'fecha_1': dia,
    'fecha_2': mes,
    'fecha_3': año,
  };

  Object.entries(fechaFields).forEach(([fieldName, value]) => {
    const field = form.getTextField(fieldName);
    if (field) {
      field.setText(value);
    } else {
      console.warn(`Campo ${fieldName} no encontrado en el PDF`);
    }
  });
}





      // Dividir y asignar el valor de ct_entidad_federativa a cve_fed1, cve_fed2, cve_fed3
const entidad = (registro.ct_entidad_federativa || '').toString().padStart(3, '0');  // Asegura 3 dígitos

const camposEntidad = ['Cve_fed_1', 'Cve_fed_2', 'Cve_fed_3'];

for (let i = 0; i < camposEntidad.length; i++) {
  const fieldName = camposEntidad[i];
  const formField = form.getTextField(fieldName);
  if (formField) {
    formField.setText(entidad.charAt(i));
  } else {
    console.warn(`Campo ${fieldName} no encontrado en el PDF`);
  }
}


// Dividir y asignar el valor de ct_localidad a Cve_loc1, Cve_loc2, Cve_loc3
const localidad = (registro.ct_localidad || '').toString().padStart(3, '0');  // Asegura 3 dígitos

const camposLocalidad = ['Cve_loc1', 'Cve_loc2', 'Cve_loc3'];

for (let i = 0; i < camposLocalidad.length; i++) {
  const fieldName = camposLocalidad[i];
  const formField = form.getTextField(fieldName);
  if (formField) {
    formField.setText(localidad.charAt(i));
  } else {
    console.warn(`Campo ${fieldName} no encontrado en el PDF`);
  }
}


// Dividir y asignar el valor de ct_municipio a Cve_mun1, Cve_mun2, Cve_mun3
const municipio = (registro.ct_municipio || '').toString().padStart(3, '0');

const camposMunicipio = ['Cve_mun1', 'Cve_mun2', 'Cve_mun3'];

for (let i = 0; i < camposMunicipio.length; i++) {
  const fieldName = camposMunicipio[i];
  const formField = form.getTextField(fieldName);
  if (formField) {
    formField.setText(municipio.charAt(i));
  } else {
    console.warn(`Campo ${fieldName} no encontrado en el PDF`);
  }
}


// Dividir y asignar el valor de ct_ent_nac a Cve_nac1, Cve_nac2, Cve_nac3
const entidadNacimiento = (registro.ct_ent_nac || '').toString().padStart(3, '0');

const camposNac = ['Cve_nac1', 'Cve_nac2', 'Cve_nac3'];

for (let i = 0; i < camposNac.length; i++) {
  const fieldName = camposNac[i];
  const formField = form.getTextField(fieldName);
  if (formField) {
    formField.setText(entidadNacimiento.charAt(i));
  } else {
    console.warn(`Campo ${fieldName} no encontrado en el PDF`);
  }
}






      
// Dividir y asignar la Fecha de Nacimiento en Nac_1 (día), Nac_2 (mes), Nac_3 (año)
if (registro.fecha_nacimiento) {
  const [year, month, day] = registro.fecha_nacimiento.split('-');

  const camposNacimiento = {
    'Nac_1': day,
    'Nac_2': month,
    'Nac_3': year,
  };

  Object.entries(camposNacimiento).forEach(([fieldName, value]) => {
    const formField = form.getTextField(fieldName);
    if (formField) {
      formField.setText(value);
    } else {
      console.warn(`Campo ${fieldName} no encontrado en el PDF`);
    }
  });
}







       // Seleccionar el checkbox según el género
if (registro.genero) {
  const fieldName = registro.genero === 'H' ? 'genero_H' : 'genero_M';
  const formField = form.getCheckBox(fieldName);

  if (formField) {
    formField.check(); // Marcar el checkbox
  } else {
    console.warn(`Campo ${fieldName} no encontrado en el PDF`);
  }
}




// Dividir el CURP en caracteres
if (registro.curp) {
  const curpChars = registro.curp.split('');
  for (let i = 0; i < curpChars.length; i++) {
    const fieldName = `curp${i + 1}`;
    const formField = form.getTextField(fieldName);
    if (formField) {
      formField.setText(curpChars[i]);
    } else {
      console.warn(`Campo ${fieldName} no encontrado en el PDF`);
    }
  }
}





// Mostrar el Teléfono (Cell_1 a Cell_10)
if (registro.telefono) {
  const phoneChars = registro.telefono.toString().split(''); // Convertir a array de caracteres
  for (let i = 0; i < phoneChars.length; i++) {
    const fieldName = `Tel_${i + 1}`;
    const formField = form.getTextField(fieldName);

    // Validar si el campo existe antes de asignar
    if (formField) {
      formField.setText(phoneChars[i]);
    } else {
      console.warn(`Campo ${fieldName} no encontrado en el PDF`);
    }
  }
}



// Mostrar el Teléfono (Cell_1 a Cell_10)
if (registro.celular) {
  const phoneChars = registro.celular.toString().split(''); // Convertir a array de caracteres
  for (let i = 0; i < phoneChars.length; i++) {
    const fieldName = `Cell_${i + 1}`;
    const formField = form.getTextField(fieldName);

    // Validar si el campo existe antes de asignar
    if (formField) {
      formField.setText(phoneChars[i]);
    } else {
      console.warn(`Campo ${fieldName} no encontrado en el PDF`);
    }
  }
}

// Seleccionar el checkbox según el estado civil
if (registro.ct_edo_civil) {
  let fieldName;

  // Determinar el campo a seleccionar según el valor
  switch (registro.ct_edo_civil) {
    case '1':
      fieldName = 'r9_1'; // Opción 1
      break;
    case '2':
      fieldName = 'r9_2'; // Opción 2
      break;
    default:
      console.warn('Valor de ct_edo_civil no reconocido:', registro.ct_edo_civil, '-> Se seleccionará opción por defecto r9_1');
      fieldName = 'r9_1'; // Valor por defecto
      break;
  }

  // Verificar y seleccionar el checkbox
  const formField = form.getCheckBox(fieldName);
  if (formField) {
    formField.check(); // Marcar el checkbox
  } else {
    console.warn(`Campo ${fieldName} no encontrado en el PDF`);
  }
}



// para los campos de  SI - no
const getRespuesta = (preguntaId) => data.find(d => d.pregunta_id === preguntaId)?.respuesta?.toString();
const checkSiNo = (preguntaId, checkboxSi, checkboxNo) => {
  const respuesta = getRespuesta(preguntaId);
  if (respuesta === 'true') {
    form.getCheckBox(checkboxSi)?.check();
  } else {
    form.getCheckBox(checkboxNo)?.check();
  }
};

// preguntas de opcion unica

const checkOpcionUnica = (preguntaId, mapping) => {
  const respuesta = getRespuesta(preguntaId);
  if (respuesta && mapping[respuesta]) {
    form.getCheckBox(mapping[respuesta])?.check();
  }
};

// para preguntas de selecciones multiple

const checkOpcionMultiple = (preguntaId, mapping) => {
  const respuestaArray = data.find(d => d.pregunta_id === preguntaId)?.respuesta || [];
  if (Array.isArray(respuestaArray)) {
    respuestaArray.forEach(respuesta => {
      if (mapping[respuesta]) {
        form.getCheckBox(mapping[respuesta])?.check();
      }
    });
  }
};



// PREGUNTAS

 // 3.1
 const pregunta1 = data.find(d => d.pregunta_id === 1)?.respuesta;
 const checkboxMapping = { 'Zona urbana': 'r3_1_1', 'Zona rural': 'r3_1_2' };
 if (pregunta1 && checkboxMapping[pregunta1]) {
   form.getCheckBox(checkboxMapping[pregunta1])?.check();
 }




  // 3.2
  checkSiNo(2, 'r_3_2_si', 'r_3_2_no');

  // 3.3
  checkOpcionUnica(3, { 'Ninguno': 'r_3_3_1', 
                        'De $1 a $500': 'r_3_3_2',
                        'De $501 a $1,000': 'r_3_3_3',
                        'De $1,001 a $1,500': 'r_3_3_4',
                        'De $1,501 a $2,000': 'r_3_3_5',
                        'Más de $2,000': 'r_3_3_6'});

  
  // 3.4
  checkSiNo(4, 'r3_4_si', 'r3_4_no');

  
     
  const fillCantidadPorOpcion = (preguntaId, mapping) => {
    const respuestaObj = data.find(d => d.pregunta_id === preguntaId)?.respuesta || {};
    
    Object.entries(respuestaObj).forEach(([key, value]) => {
      const fieldId = mapping[key];
      if (fieldId && form.getTextField(fieldId)) {
        form.getTextField(fieldId).setText(value.toString());
      }
    });
  };

  // 3.5 
  fillCantidadPorOpcion(6, {
    'Cónyuge': 'r3_5_1',
    'Nuera': 'r3_5_2',
    'Hijas(os)': 'r3_5_3',
    'Yerno': 'r3_5_4',
    'Padres': 'r3_5_5',
    'Suegra(o)': 'r3_5_6',
    'Hermanas(os)': 'r3_5_7',
    'Nietas(os)': 'r3_5_8',
    'Sobrinas(os)': 'r3_5_9',
    'Sin parentesco': 'r3_5_10',
    'Abuelas(os)': 'r3_5_11',
    'Otro': 'r3_5_12',
  });


   // 3.6
  checkOpcionUnica(8, { 
    'Propia': 'r3_6_1',
    'Rentada': 'r3_6_2',
    'Prestada': 'r3_6_3',
    'La estoy pagando': 'r3_6_4',
    'Otra': 'r3_6_5'});


    
   // 3.7
  checkOpcionUnica(10, { 
    'Dos': 'r3_7_1',
    'Tres': 'r3_7_2',
    'Más de cuatro': 'r3_7_3',
  });

     // 3.8
  checkOpcionUnica(11, { 
    'Dos': 'r3_8_1',
    'Tres': 'r3_8_2',
    'Más de cuatro': 'r3_8_3',
  });


   // 3.9  piso
   checkOpcionUnica(12, { 
    'Tierra': 'r3_9_p_1',
    'Cemento': 'r3_9_p_2',
    'Materiales de desecho': 'r3_9_p_3',
  });
  

   // 3.9  techo
   checkOpcionUnica(13, { 
    'Lámina': 'r3_9_t_1',
    'Cemento': 'r3_9_t_2',
    'Materiales de desecho': 'r3_9_t_3',
  });

   // 3.9  paredes
   checkOpcionUnica(14, { 
    'Lámina': 'r3_9_pa_1',
    'Cemento': 'r3_9_pa_2',
    'Materiales de desecho': 'r3_9_pa_3',
  });

   // 3.10  
   checkOpcionMultiple(15, {
    'Luz': 'r3_10_1',
    'Agua o Tarja': 'r3_10_2',
    'Drenaje': 'r3_10_3',
    'Gas': 'r3_10_4',
    
  });

   // 3.11  
   checkOpcionUnica(16, { 
    'Primaria': 'r3_11_1',
    'Secundaria': 'r3_11_2',
    'Preparatoria o bachillerato': 'r3_11_3',
    'Licenciatura': 'r3_11_4',
    'Postgrado': 'r3_11_5',
    'Otro': 'r3_11_6',
  });
  








  // 4- IDENTIFICACION DE LA CARENCIA POR ACCEDO A LA ALIMENTACIÓN DE LA SOLICIYANYTE
    checkSiNo(18, 'r_4_1_si', 'r_4_1_no');  
    checkSiNo(19, 'r4_2_si', 'r4_2_no');
    checkSiNo(20, 'r4_3_si', 'r4_3_no');
    checkSiNo(21, 'r4_4_si', 'r4_4_no');
    checkSiNo(22, 'r4_5_si', 'r4_5_no');
    checkSiNo(23, 'r4_6_si', 'r4_6_no');
    checkSiNo(24, 'r4_7_si', 'r4_7_no');
    checkSiNo(25, 'r4_8_si', 'r4_8_no');


  // CARACTERISTICAS ADICIONALES  DE LA SOLICITANTE
    checkSiNo(32, 'ra_si', 'ra_no');  
    checkSiNo(34, 'rb_si', 'rb_no');
    checkSiNo(36, 'rc_si', 'rc_no');
    checkSiNo(38, 'rd_si', 'rd_no');
    checkSiNo(39, 're_si', 're_no');
    checkSiNo(41, 'rf_si', 'rf_no');
    checkSiNo(43, 'rg_si', 'rg_no');
    checkSiNo(44, 'r_h_si', 'r_h_no');
    





    // Bloquear los campos para que no sean editables
    form.getFields().forEach((field) => field.enableReadOnly());

    // Guardar y crear el blob
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    setPdfUrl(url);

    // Opcional: descarga automática
    const link = document.createElement('a');
    link.href = url;
    link.download = 'FORMATO_FUB.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  } finally {
    setLoading(false);
  }
};

 return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-[#9F2241]">

      {/* Encabezado con logos y textos */}
      <div className="w-full flex justify-center items-center gap-8 mb-4 px-4">
        <img src={LogoEdoMex} alt="Logo Edomex" className="h-24" />

        <div className="text-center text-white text-sm md:text-base leading-tight">
          <p className="font-semibold">Secretaría de Bienestar</p>
          <p>Dirección General de Bienestar Social y Fortalecimiento Familiar</p>
        </div>

        <img src={LogoIsem} alt="Logo ISEM" className="h-24" />
      </div>

      {/* Imagen de canasta */}

      {/* <img
        src={alimentacion_bienestar}
        alt="Canasta Alimentaria"
        className="w-full max-w-4xl h-auto rounded-lg mb-6"
      /> */}

      {/* Contenido del visor */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
        {loading ? (
          <p className="text-gray-600 text-center">Generando y descargando  Formato Único de Bienestar (FUB) ...</p>
        ) : pdfUrl ? (
          <>
           <div className="text-center">
  <p className="text-green-600 mb-2">FUB generado con éxito</p>
  <p className="text-green-600 mb-4">Revisa tu archivo FUB en descargas</p>

  {/* Botón para imprimir */}
  <button
    onClick={() => window.frames[0]?.print()}
    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded mx-auto block"
  >
    Imprimir FUB
  </button>

  {/* Botón para descargar nuevamente */}
  <a
    href={pdfUrl}
    download="fub-pdf.pdf"
    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded mx-auto block"
  >
    Descargar FUB
  </a>
</div>


            <iframe
              src={pdfUrl}
              title="PDF Preview"
              width="100%"
              height="600px"
              className="border"
            />
          </>
        ) : (
          <p className="text-gray-600 text-center">Haz clic en el botón para generar el FUB</p>
        )}

        <button
          onClick={handleRedirect}
          className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded mx-auto block"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default FumPdf;