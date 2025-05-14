import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, Text, View, Document, StyleSheet, Image, PDFViewer } from '@react-pdf/renderer';

import Colibri from '../../images/colibri.png';
import Colibri2 from '../../images/logo-colibri.png';
import Escudo from '../../images/escudo-edomex.png';

export const Concentrado_mujeres = () => {
  const [datos, setDatos] = useState([]);
  
  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/respuestas/registro/1');
        const result = await response.json();
        if (result && result.registro) {
          setDatos([result.registro]); 
        }
      } catch (error) {
        console.error('Error al cargar los datos:', error);
      }
    };

    fetchDatos();
  }, []);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      marginTop: 4.5,
      marginBottom: 2.5,
    },
    titleContainer: {
      backgroundColor: '#8a2036',
      padding: 10,
      borderRadius: 8,
      marginVertical: 10,
      alignItems: 'center',
    },
    title: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <div>
      <nav className="bg-white shadow-xl">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center w-full p-2">
            <img src={Colibri} alt="Logo" width={30} height={30} className="mr-4" /> logos
          </div>
        </div>
      </nav>

      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="py-2 px-4 text-xs text-nowrap text-center">Opciones</th>
            <th className="py-2 px-4 text-xs text-nowrap text-center">No.</th>
            <th className="py-2 px-4 text-xs text-nowrap text-center">Folio</th>
            <th className="py-2 px-4 text-xs text-nowrap text-center">Nombres</th>
            <th className="py-2 px-4 text-xs text-nowrap text-center">Apellido Paterno</th>
            <th className="py-2 px-4 text-xs text-nowrap text-center">Apellido Materno</th>
            <th className="py-2 px-4 text-xs text-nowrap text-center">Estatus</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={index} className="bg-gray-50 border-b hover:bg-slate-200">
              <td className="py-2 px-4 text-center">
                <Link to={`../Fum-Pdf/${item.id}`} target="_blank" title="Ver PDF">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4zM4 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
                    <path d="M4.603 12.087a.8.8 0 0 1-.438-.42c-.195-.388-.13-.776.08-1.102.198-.307.526-.568.897-.787a7.7 7.7 0 0 1 1.482-.645 20 20 0 0 0 1.062-2.227 7.3 7.3 0 0 1-.43-1.295c-.086-.4-.119-.796-.046-1.136.075-.354.274-.672.65-.823.192-.077.4-.12.602-.077a.7.7 0 0 1 .477.365c.088.164.12.356.127.538.007.187-.012.395-.047.614-.084.51-.27 1.134-.52 1.794a11 11 0 0 0 .98 1.686 5.8 5.8 0 0 1 1.334.05c.364.065.734.195.96.465.12.144.193.32.2.518.007.192-.047.382-.138.563a1.04 1.04 0 0 1-.354.416.86.86 0 0 1-.51.138c-.331-.014-.654-.196-.933-.417a5.7 5.7 0 0 1-.911-.95 11.6 11.6 0 0 0-1.997.406 11.3 11.3 0 0 1-1.021 1.51c-.29.35-.608.655-.926.787a.8.8 0 0 1-.58.029" />
                  </svg>
                </Link>
              </td>
              <td className="py-2 px-4 text-center">{index + 1}</td>
              <td className="py-2 px-4 text-center">{(item.folio_relacionado || '').toUpperCase()}</td>
              <td className="py-2 px-4 text-center">{(item.nombres || '').toUpperCase()}</td>
              <td className="py-2 px-4 text-center">{(item.primer_ap || '').toUpperCase()}</td>
              <td className="py-2 px-4 text-center">{(item.segundo_ap || '').toUpperCase()}</td>
              <td className="py-2 px-4 text-center">Activo</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6">
        {/* Puedes colocar botones u otro contenido aquí si deseas */}
      </div>
    </div>
  );
};
