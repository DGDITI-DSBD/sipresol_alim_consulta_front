import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import useWindowSize from '../../hooks/useWindowSize';
import alimentacion_bienestar from '../../images/canasta_alimentario_p1.JPEG'
import { fetchProgramas } from '../../store/public/programaSlice';
import { LoadingPage } from '../../ui/components';
import canasta from '../../images/canasta.JPEG';
import { Banner, BannerCollapseButton } from "flowbite-react";
import { HiX } from "react-icons/hi";
import { MdAnnouncement } from "react-icons/md";


export const MainHero = () => {

  const dispatch = useDispatch();
  


  const {programas} = useSelector(state => state.programa);

  const [texting, setTexting] = useState([])

    useEffect(() => {
      dispatch(fetchProgramas());
    }, []);

    useEffect(() => {
      if(programas.items.length > 0) {
        setTexting(programas.items);
        
      }
    }, [programas])




  const TEXTOS = {
    tituloPrincipal: 'Mujeres con',
    tituloDestacado: 'Bienestar',
    descripcionPrograma: 'Programa de Desarrollo Social Mujeres con Bienestar: programa social que tiene como propósito contribuir a elevar el ingreso económico de las mujeres de 18 a 64 años de edad que habitan en el Estado de México, que se encuentren en condición de pobreza y carencia por acceso a la seguridad social, mediante el otorgamiento de transferencias monetarias y servicios para el bienestar.',
    objetivoPrograma: 'Objetivo del programa: contribuir a elevar el ingreso económico de las mujeres de 18 a 64 años de edad que habitan en el Estado de México, que se encuentren en condición de pobreza y carencia por acceso a la seguridad social, mediante el otorgamiento de transferencias monetarias y servicios para el bienestar. Recibirán un apoyo monetario, de manera bimestral, por la cantidad de $2,500.00',
    titulo1:'Sistema de Preregistro',
    subtitulo1:'Preregistro',
    vertiente1:'Alimentación para el Bienestar',
    objetivoNuevo:'Gestionar eficientemente los recursos y actividades de los programas sociales, con el fin de mejorar la calidad de vida de las poblaciones vulnerables, promoviendo la inclusión, la equidad y el desarrollo sostenible, asegurando la efectividad de las intervenciones y garantizando la transparencia y la rendición de cuentas en su ejecución.'
    ,objetivoNuevo1:'Estas acciones indican un enfoque integral en la optimización de sistemas, en el desarrollo de nuevos proyectos para fortalecer el bienestar social, y en la mejora de la infraestructura tecnológica dentro de las instituciones gubernamentales. También resalta el constante trabajo en el análisis y gestión de datos, que es fundamental para la transparencia y eficiencia en la implementación de programas sociales'
  };
  
  const  stylesBanner = {
      backgroundImage: 'linear-gradient(to right, rgba(0, 0, 36, 0.09), rgba(28, 20, 39, 0.28), rgba(28, 20, 39, 0.58)), url(' + alimentacion_bienestar + ')',
      backgroundPosition: 'center',
      backgroundColor: '#d9d9d9',
      boxShadow: '0rem 0rem 0rem 0.05rem #666666',
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover',
      overflow: 'hidden',
      width: '100%',
      height: '100%'
  
    }
  
    
  
    const navigate = useNavigate();

    const irCliente = () => {
      navigate('../validar');
    }
 
    const size = useNavigate();
  return (
    <>

    { programas.loading ? (<LoadingPage />) : 
    <div>
    {/* <Banner>
            <div className="flex w-full justify-between border-b border-gray-200 bg-colorSecundario p-4 dark:border-gray-600 dark:bg-gray-700">
              <div className="mx-auto flex items-center">
                <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill=""  class="icon icon-tabler icons-tabler-filled icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z" /></svg>
                  <span className="[&_p]:inline text-black text-md">
                    Si concluiste tu registro y olvidaste descargar tus documentos, da click&nbsp;
                    <Link type = "button" to = "/validar/CURP" class="inline-flex items-center px-4 py-2 text-sm md:text-lg font-medium text-center text-colorPrimario bg-transparent rounded-lg hover:underline" state = {{ 'anio': '2025', 'programa_id':'1', 'programa_nombre': 'Alimentación para el Bienestar', 'edad_minima':'50', 'edad_maxima':'64', 'pointer':'docs'}}>aquí</Link>
                  </span>
                </p>
              </div>
              <BannerCollapseButton color="gray" className="border-0 bg-transparent text-gray-500 dark:text-gray-400">
                <HiX className="h-4 w-4" />
              </BannerCollapseButton>
            </div>
          </Banner> */}
    <div style={stylesBanner} class = "h-screen min-h-screen p-4 border-2 border-b-colorPrimario border-l-colorSecundario border-r-colorSecundario border-t-colorSecundario content-center">
    
      
      {/* Contenedor principal con grid responsivo */}
      <div className="grid md:grid-cols-1 w-min-full justify-items-center md:justify-items-end md:pr-[200px]">
        {/* Columna izquierda - Contenido */}
        <div className="w-min-screen">
          {/* Título con diseño mejorado */}
          <h1 className="grid space-y-4 max-w-3x1 text-3xl font-extrabold text-white sm:text-2xl md:text-3xl text-center">
            <span className="block text-[3rem]">
              {/* {TEXTOS.tituloPrincipal} */}
              </span>
          </h1>

      <div class = "md:flex md:flex-wrap md:justify-center content:center overflow-x-auto py-4 space-x-4 ">

        {Array.isArray(texting) && texting.length > 0 ? (
          
          texting.map((programa) => {
            return (
            <div key = {programa.id} class="flex-shrink-0 md-72 md:w-auto p-2 md:p-8 md:max-w-auto bg-transparent md:bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 content-center">
            <div class="flex justify-end px-4 pt-4">
            </div>
            <div class="flex flex-col items-center pb-10">
                {/* <img class="w-54 h-54 mb-3 rounded-full shadow-lg" src={canasta} alt="Bonnie image"/> */}
                <h5 class="mb-1 text-lg md:text-4xl text-center font-medium text-white md:text-gray-900 md:dark:text-white">{programa.nombre_del_programa}</h5>
                <span class="text-lg md:text-2xl text-center text-white md:text-gray-500 md:dark:text-gray-400">{programa.anio}</span>
                <div class="flex mt-4 md:mt-6">
                    <Link type = "button" to = "/validar/CURP" class="inline-flex items-center px-4 py-2 text-sm md:text-lg font-medium text-center text-white bg-colorSecundario rounded-lg hover:bg-colorPrimario" state = {{ 'anio': programa.anio, 'programa_id':programa.id, 'programa_nombre': programa.nombre_del_programa, 'edad_minima':programa.edad_min, 'edad_maxima':programa.edad_max, 'pointer':'apert'}}>Comenzar</Link>
                    
                </div>
            </div>
          </div>
            )
          })
      
        ) : (

          <p class = "text-white text-2xl">Conexión inestable.Porfavor, verifica tu conexión a internet</p>

          )}

      </div>
      

          
         

    </div>

      
      </div>
          
      </div>
    </div>
    }
      </>
  );

};

export default MainHero;
