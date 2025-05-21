import React, { useState, useEffect } from 'react';
import Compromiso from './Compromiso';

import Permanencia from './Permanencia';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // importación
import LogoEdoMex from '../../images/logos_edomex3.png';
import LogoIsem from '../../images/logos_edomex2.png';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG';
import CryptoJS from "crypto-js";

const VistaPDFS = () => {
    const { registroId } = useParams();
    const [activeTab, setActiveTab] = useState("compromiso");


useEffect(() => {
  const showSpinner = (mensaje) => {
    const spinner = Swal.getHtmlContainer().querySelector('#spinner-container');
    const spinnerText = Swal.getHtmlContainer().querySelector('#spinner-text');
    if (spinner) spinner.style.display = 'block';
    if (spinnerText) spinnerText.textContent = mensaje;
  };

  const hideSpinner = () => {
    const spinner = Swal.getHtmlContainer().querySelector('#spinner-container');
    if (spinner) spinner.style.display = 'none';
  };

  const updateStatusMessage = (id, mensaje) => {
    const statusContainer = Swal.getHtmlContainer().querySelector('#status-container');
    if (statusContainer && !document.getElementById(id)) {
      const msg = document.createElement('p');
      msg.textContent = mensaje;
      msg.style.color = 'green';
      msg.style.marginTop = '10px';
      msg.id = id;
      statusContainer.appendChild(msg);
    }
  };

  const setActiveTabWithDelay = async (tab, mensaje, btnRef) => {
    showSpinner(mensaje);
    setActiveTab(tab); // Tu lógica de generación/descarga
    await new Promise((resolve) => setTimeout(resolve, 2000));
    hideSpinner();

    if (tab === "permanencia") {
      updateStatusMessage("msgPermanencia", "✅ Se realizo la solicitud de descarga de el archivo, de Permanencia con exito.");
    } else if (tab === "compromiso") {
      updateStatusMessage("msgCompromiso", "✅ Se realizo la solicitud de descarga, de  el archivo de Compromiso con exito.");
    }

    if (btnRef) {
      btnRef.disabled = true;
      btnRef.style.opacity = "0.6";
      btnRef.style.cursor = "not-allowed";
    }
  };

  const showFirstSwal = () => {
    Swal.fire({
      title: 'Atención',
      html: `
        <div style="font-size: 1.1rem; color: #333;">
          <p>Para poder descargar tu solicitud de Permanencia y Carta Compromiso da click en los siguientes botones:</p>
          <div id="spinner-container" style="margin: 10px 0; display: none; text-align: center;">
            <div class="loader"></div>
            <p id="spinner-text" style="margin-top: 5px;">Generando archivo...</p>
          </div>

          <div style="margin-top: 1.5rem; text-align: center;">
            <button id="btnCompromiso" style="margin: 8px; padding: 10px 20px; background-color: #9F2241; color: white; border: none; border-radius: 5px;">Generar PDF Compromiso</button>
            <button id="btnPermanencia" style="margin: 8px; padding: 10px 20px; background-color: #9F2241; color: white; border: none; border-radius: 5px;">Generar PDF Permanencia</button>           
            <br />
            <button id="btnCerrar" style="margin-top: 15px; padding: 10px 20px; background-color: #555; color: white; border: none; border-radius: 5px;">Cerrar</button>
          </div>

          <div id="status-container" style="margin-top: 20px; text-align: center;"></div>
        </div>
      `,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        const btnPermanencia = Swal.getHtmlContainer().querySelector('#btnPermanencia');
        const btnCompromiso = Swal.getHtmlContainer().querySelector('#btnCompromiso');
        const btnCerrar = Swal.getHtmlContainer().querySelector('#btnCerrar');

        btnPermanencia.addEventListener('click', () => {
          setActiveTabWithDelay("permanencia", "Generando archivo de Permanencia...", btnPermanencia);
        });

        btnCompromiso.addEventListener('click', () => {
          setActiveTabWithDelay("compromiso", "Generando archivo de Compromiso...", btnCompromiso);
        });

        btnCerrar.addEventListener('click', () => {
          Swal.close();
          Swal.fire({
            title: '¡Listo!',
            html: `
              <p>¿Haz descargado los archivos de Permanencia y Compromiso en PDF?.</p> 
              <div style="text-align: center;">
                <button id="btnCerrarFinal" style="margin: 8px; padding: 10px 20px; background-color: #9F2241; color: white; border: none; border-radius: 5px;">SI</button>
                <button id="btnRegresar" style="margin: 8px; padding: 10px 20px; background-color: #555; color: white; border: none; border-radius: 5px;">NO</button>
              </div>
            `,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              const btnCerrarFinal = Swal.getHtmlContainer().querySelector('#btnCerrarFinal');
              const btnRegresar = Swal.getHtmlContainer().querySelector('#btnRegresar');

              btnCerrarFinal.addEventListener('click', () => {
                Swal.close();
              });

              btnRegresar.addEventListener('click', () => {
                Swal.close();
                showFirstSwal();
              });
            }
          });
        });

        // Spinner CSS (solo una vez)
        const styleId = 'swal-spinner-style';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.innerHTML = `
            .loader {
              border: 6px solid #f3f3f3;
              border-top: 6px solid #9F2241;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              animation: spin 1s linear infinite;
              margin: 0 auto;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `;
          document.head.appendChild(style);
        }
      }
    });
  };

  showFirstSwal();
}, []);




    return (
        <div className="p-4">
            {/* Encabezado con logos y textos */}
            <div className="w-full flex justify-center items-center gap-8 mb-4 px-4 bg-[#977e5b]">
                <img src={LogoEdoMex} alt="Logo Edomex" className="h-24" />

                <div className="text-center text-white text-sm md:text-base leading-tight">
                    <p className="font-semibold">Secretaría de Bienestar</p>
                    <p>Dirección General de Bienestar Social y Fortalecimiento Familiar</p>
                </div>

                <img src={LogoIsem} alt="Logo ISEM" className="h-24" />
            </div>

           <div className="flex gap-4 mb-4 justify-center">
  <button
    onClick={() => setActiveTab("compromiso")}
    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
  >
    Generar PDF Compromiso
  </button>
  <button
    onClick={() => setActiveTab("permanencia")} // Aquí agregamos el manejador onClick
    className="mt-6 bg-colorPrimario hover:bg-colorSecundario text-white py-2 px-4 rounded"
  >
    Generar PDF Permanencia
  </button>
</div>



            <div>
                {activeTab === "compromiso" && <Compromiso registroId={registroId} />}
                {activeTab === "permanencia" && <Permanencia registroId={registroId} />}
            </div>
        </div>
    );
};

export default VistaPDFS;
