import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';

import { useParams, useNavigate  } from 'react-router-dom';
import QRCode from 'qrcode';
import LogoEdoMex from '../../images/logos_edomex3.png';
import LogoIsem from '../../images/logos_edomex2.png';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG'

import { urlBase, urlBaseFront } from '../../api';




export const Comprobante = () => {

 
    const { registroId } = useParams(); 
       const [loading, setLoading] = useState(false);
       const [data, setData] = useState(null);
       const [pdfUrl, setPdfUrl] = useState(null);
       const navigate = useNavigate();
   
       const handleRedirect = () => {
         navigate(`../alimentacion_bienestar/2`); // id
       };
       


  useEffect(() => {
    const fetchDataAndGeneratePDF = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/respuestas/registro/2');
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
  }, []);

  const generatePDF = async (data, registro) => {
    if (!data || !Array.isArray(data) || !registro) {
      console.error('Datos no cargados o incompletos. Inténtalo de nuevo.');
      return;
    }
    setLoading(true);
    try {
      const templatePath = '/assets/COMPROB_RECEP.pdf';
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
        'nombres': (registro.nombres || '').toString().toUpperCase(),
        'ape_paterno': (registro.primer_ap || '').toString().toUpperCase(),
        'ape_materno': (registro.segundo_ap || '').toString().toUpperCase(),

        'municipio': (registro.municipio || '').toString().toUpperCase(),
        
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
    link.download = 'Archivo.pdf';
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
    download="fub-pdf.pdf"
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

<button
  onClick={handleRedirect}
  className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded mx-auto block"
>
  Formatos
</button>

      </div>
    </div>
  );
};

export default Comprobante