import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { useParams, useNavigate  } from 'react-router-dom';
import QRCode from 'qrcode';
import LogoEdoMex from '../../images/logos_edomex3.png';
import LogoIsem from '../../images/logos_edomex2.png';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG'
import { urlBase, urlBaseFront, pass } from '../../api';
import CryptoJS from "crypto-js";


export const Permanencia = () => {


    const { registroId } = useParams(); 
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const navigate = useNavigate();
    const [pdfUrlCompromiso, setPdfUrlCompromiso] = useState(null);
    const [pdfUrlPermanencia, setPdfUrlPermanencia] = useState(null);


    // const handleRedirect = () => {
    //   navigate(`../alimentacion_bienestar/2`); // id
    // };

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
          await generatePDF(result.respuestas, result.registro);
        } else {
          console.error('La propiedad "respuestas" no es un arreglo:', result.respuestas);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchDataAndGeneratePDF();
  }, [registroId]);


const generatePDF = async (data, registro) => {
  if (!data || !Array.isArray(data) || !registro) {
    console.error('Datos no cargados o incompletos. Inténtalo de nuevo.');
    return;
  }

  setLoading(true);
  try {
    const compromisoUrl = await generateAndDownloadPDF('/assets/COMPROMISO_ACTIVIDADES_COMUNITARIAS.pdf', 'FORMATO_COMPROMISO_'+registro.curp+'.pdf', data, registro);
    const permanenciaUrl = await generateAndDownloadPDF('/assets/PERMANENCIA.pdf', 'PERMANENCIA_'+registro.curp+'.pdf', data, registro);
    
    setPdfUrlCompromiso(compromisoUrl);
    setPdfUrlPermanencia(permanenciaUrl);
  } catch (error) {
    console.error('Error al generar los PDFs:', error);
  } finally {
    setLoading(false);
  }
};



// Función para generar un solo PDF
const generateAndDownloadPDF = async (templatePath, fileName, data, registro) => {
  const response = await fetch(templatePath);
  if (!response.ok) throw new Error(`Error al cargar la plantilla: ${templatePath}`);

  const existingPdfBytes = await response.arrayBuffer();
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const form = pdfDoc.getForm();




      // Concatenar el nombre completo
    const nombreCompleto = [registro.nombres, registro.primer_ap, registro.segundo_ap]
      .filter(Boolean)
      .join(' ');



      const fieldMapping = {
        // Registro info
        'folio': (registro.folio_relacionado || '').toString().toUpperCase(),       
        'municipio': (registro.municipio || '').toString().toUpperCase(),  
        'Nombre_completo': (nombreCompleto || '').toString().toUpperCase(),

       
      };
      
  

      Object.entries(fieldMapping).forEach(([key, value]) => {
        if (form.getTextField(key)) {
          form.getTextField(key).setText(value.toString());
        }
      });






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



  // Bloquear los campos
  form.getFields().forEach(field => field.enableReadOnly());

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return url; // <-- devuelve la URL para el visor
};

return (
  <div className="flex flex-col items-center justify-start min-h-screen p-4 bg-[#9F2241]">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-6xl">
      {loading ? (
        <p className="text-gray-600 text-center">Generando y descargando ...</p>
      ) : pdfUrlCompromiso && pdfUrlPermanencia ? (
        <>
          <div className="text-center mb-6">
            <p className="text-green-600 text-lg font-semibold">Archivos PDF generados con éxito</p>
            <p className="text-green-600">Revisa tu carpeta de descargas o visualiza los documentos aquí:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* COMPROMISO */}
            <div>
              <h3 className="text-center font-semibold mb-2">Formato Compromiso</h3>
              <iframe
                src={pdfUrlCompromiso}
                title="PDF Compromiso"
                width="100%"
                height="500px"
                className="border"
              />
              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={() => window.open(pdfUrlCompromiso, '_blank')?.print()}
                  className="bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
                >
                  Imprimir
                </button>
                <a
                  href={pdfUrlCompromiso}
                  download="FORMATO_COMPROMISO.pdf"
                  className="bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
                >
                  Descargar
                </a>
              </div>
            </div>

            {/* PERMANENCIA */}
            <div>
              <h3 className="text-center font-semibold mb-2">Formato Permanencia</h3>
              <iframe
                src={pdfUrlPermanencia}
                title="PDF Permanencia"
                width="100%"
                height="500px"
                className="border"
              />
              <div className="flex justify-center gap-4 mt-3">
                <button
                  onClick={() => window.open(pdfUrlPermanencia, '_blank')?.print()}
                  className="bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
                >
                  Imprimir
                </button>
                <a
                  href={pdfUrlPermanencia}
                  download="PERMANENCIA.pdf"
                  className="bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
                >
                  Descargar
                </a>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p className="text-gray-600 text-center">------</p>
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


export default Permanencia