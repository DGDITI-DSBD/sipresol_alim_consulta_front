import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { useParams, useNavigate  } from 'react-router-dom';
import QRCode from 'qrcode';
import LogoEdoMex from '../../images/logos_edomex3.png';
import LogoIsem from '../../images/logos_edomex2.png';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG'
import { urlBase, urlBaseFront , pass} from '../../api';
import CryptoJS from "crypto-js";

// const pass = 'claveSuperSecreta123!'; 



export const Compromiso = () => {


 const { registroId } = useParams(); 
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const navigate = useNavigate();

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

                
              // const response = await fetch(`${urlBase}/respuestas/registro/${registroId}`);
              // const result = await response.json();

        


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
      const templatePath = '/assets/COMPROMISO_ACTIVIDADES_COMUNITARIAS.pdf';
      const response = await fetch(templatePath);
      if (!response.ok) throw new Error('Error al cargar la plantilla PDF');

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
    link.download = 'FORMATO_COMPROMISO.pdf';
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



      {/* Contenido del visor */}
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
        {loading ? (
          <p className="text-gray-600 text-center">Generando y descargando  ...</p>
        ) : pdfUrl ? (
          <>
           <div className="text-center">
  <p className="text-green-600 mb-2">PDF generado con éxito</p>
  <p className="text-green-600 mb-4">Revisa tu archivo en descargas</p>

  {/* Botón para imprimir */}
  <button
    onClick={() => window.frames[0]?.print()}
    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded mx-auto block"
  >
    Imprimir 
  </button>

  {/* Botón para descargar nuevamente */}
  <a
    href={pdfUrl}
    download="FORMATO_COMPROMISO.pdf"
    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded mx-auto block"
  >
    Descargar 
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

{/* <button
  onClick={handleRedirect}
  className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded mx-auto block"
>
  Formatos
</button> */}

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

export default Compromiso


