import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';

import config from '../config/index.json';
import Divider from './Divider';


export const SecondProduct = () => {
  const { product } = config;
  const [firstItem, secondItem, thirdItem, fourthItem] = product.items;
  const size = useWindowSize();

  return (
    <section className={`bg-background py-8`} id="product">
      <div className={`lg:px-40 px-16 max-w-9xl mx-auto`}>
        <h1 className={`w-full my-2 text-5xl pb-8 font-bold leading-tight text-center text-colorPrimario`}>
          ¿Qué se necesita para dar gestión a tu queja?
        </h1>
            <span className={'w-full mt-8 my-2 text-lg text-slate-600  leading-tight text-center'} >
            Con base en la Ley Federal de Transparencia y Acceso a la información Pública Gubernamental, los datos personales del denunciante que sean recibidos, se consideran información confidencial, por lo que <b>no se dan a conocer al denunciado</b> bajo ninguna circunstancia.

            Por ello, con fundamento en el artículo 60 de la Ley General de Salud y el 6° del Reglamento de Control Sanitario de Productos y Servicios, la acción popular para denunciar ante las autoridades sanitarias todo hecho, acto u omisión que represente un riesgo o provoque un daño a la salud de la población, podrá ejercitarse por cualquier persona, bastando para darle curso el señalamiento de los datos que permitan localizar la causa del riesgo, motivo por el cual te solicitamos proporciones la siguiente información para dar gestión a tu queja:

            </span>
          
        
        {/* <Divider /> */}
        <div className={`flex flex-wrap mt-16`}>
          <div className={`w-full grid grid-cols-12`}>
            <div className='col-span-12 xl:col-span-6 justify-self-center'>
            <h3 className={`text-3xl text-[#000000] font-bold leading-none mb-4`}> Datos del usuario </h3>
            <div className={`w-full grid grid-cols-12`}>
            <div className='col-span-12 md:col-span-6'>
            <ul className="max-w-md space-y-1 text-gray-500 list-insid">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Nombre
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Teléfono 
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Dirección
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Correo electrónico
              </li>
             
              </ul>
              </div>
              
            </div>
            </div>
            <div className='col-span-12 md:col-span-6 xl:col-span-6  md:justify-self-center justify-self-left w-full sm:ml-20'>
            <h3 className={`text-3xl text-[#000000] font-bold leading-none mb-4 mt-4`}>Datos del establecimiento</h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-insid">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Nombre 
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Dirección 
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Municipio 
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Horarios de atención 
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-3.5 h-3.5 me-2 text-[#d24d68] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Motivo de la queja o denuncia
              </li>
            </ul>
          </div>

          </div>

          {/* aqui */}

          
         
        </div>
        <div className={`flex flex-wrap mt-8 flex-col-reverse sm:flex-row`}>
        En ningún caso se dará trámite a denuncia anónima.
          
        </div>
        {/* <div className={`flex flex-wrap`}>
          <div className={`${size.width <= 400 ? "w-5/6 sm:w-1/2 p-3 mt-8 ml-3" : "w-6/6 sm:w-1/2 p-6 mt-4"}`}>
            <h3
              className={`text-3xl text-[#E7D873] font-bold leading-none mb-4`}
            >
              {thirdItem?.title}
            </h3>
            
            <br></br>
            <ul className="max-w-md space-y-1 text-gray-500 list-insid">
            <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {thirdItem?.description1}
              </li>
              <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {thirdItem?.description2}
              </li>
              <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {thirdItem?.description3}
              </li>
              <li className="flex items-center">
                  <svg className="w-3.5 h-3.5 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {thirdItem?.description4}
              </li>
            </ul>
          </div>
          <div className={`${size.width <= 400 ? "w-5/6 sm:w-1/2 p-3 ml-3" : "w-full sm:w-1/2 p-6"}`}>
            <img
              className={`${size.width <= 400 ? "h-6/6" : "h-6/6"}`}
              src={thirdItem?.img}
              alt={thirdItem?.title}
            />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SecondProduct;
