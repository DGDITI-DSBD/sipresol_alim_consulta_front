import React from 'react';

import config from '../config/index.json';

export const Pricing = () => {
  const { pricing } = config;
  const { items, title } = pricing;
  const [firstPlan, secondPlan, thirdPlan] = items;

  return (
    <section className={`bg-background py-8`} id="pricing">
      <div className={`container mx-auto px-2 pt-4 pb-12 text-slate-600`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-[#8a2036]`}
        >
          {title}
        </h1>
        <div className={`w-full mb-4`}>
          <div
            className={`h-1 mx-auto bg-[#8a2036] w-64 opacity-25 my-0 py-0 rounded-t`}
          ></div>
        </div>
        <div
          className={`flex flex-col sm:flex-row justify-center pt-12 my-12 sm:my-4`}
        >
          <div
            className={`flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-primary mt-4 shadow-2xl`}
          >
            <div
              className={`flex bg-background text-slate-600 rounded-t rounded-b-none overflow-hidden shadow`}
            >
              <div className={`p-8 text-3xl font-bold text-center border-b-4`}><br></br>
                {firstPlan?.name}<br></br>
              </div>
              {/* <ul className={`w-full text-center text-sm`}>
                {thirdPlan?.features.map((feature) => (
                  <li
                    className={`border-b py-4`}
                    key={`${thirdPlan?.name}-${feature}`}
                  >
                    {feature}
                  </li>
                ))}
              </ul> */}
            </div>
            <div
              className={`flex-none mt-1 bg-background rounded-b rounded-t-none overflow-hidden shadow p-4`}
            >
              {/* <div
                className={`w-full pt-6 text-2xl text-slate-600 font-bold text-center`}
              >
                <span className={`text-base`}> {thirdPlan?.priceDetails}</span>
              </div> */}
              <ul className={`w-full text-justify text-base font-bold`}>
                {/* {secondPlan?.features.map((feature) => ( */}
                  <li className={` py-1 px-4`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*A través de la liga electrónica: <a href='https://www.secogem.gob.mx/SAM/sit_atn_mex.asp' className='text-blue-500' target='_blank'>https://www.secogem.gob.mx/SAM/sit_atn_mex.asp</a></small>
                    </span>
                  </li>
                  <li className={` py-1 px-4`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;*Al correo institucional del Área de Quejas del Órgano Interno del Control: isem.ciquejas@edomex.gob.mx.</small>
                    </span>
                  </li>
                  <li className={` py-1 px-4`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;*Al correo institucional del Área de Quejas del Órgano Interno del Control: isem.ciquejas@edomex.gob.mx. </small>
                    </span>
                  </li>
                  <li className={` py-1 px-4`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;*Al correo electrónico de la Fiscalía General de Justicia especializada en el Combate a la 
Corrupción oficialiaFG@fiscaliaedomex.gob.mx o al teléfono: 800 702 87 70. </small>
                    </span>
                  </li>
                  
                {/* {secondPlan?.features.map((feature) => ( */}
                  {/* <li className={` py-0 px-8`}>
                    <span className={`text-lg`}><br></br><br></br>{firstPlan?.priceDetails}</span>
                  </li> */}
                
                {/* ))} */}
              </ul>
            </div>
          </div>
          <div
            className={`flex flex-col w-5/6 lg:w-1/3 mx-auto lg:mx-0 rounded-lg bg-background mt-4 sm:-mt-6 shadow-2xl z-10`}
          >
            <div
              className={`flex-1 bg-background rounded-t rounded-b-none overflow-hidden shadow`}
            >
              <div className={`w-full p-8 text-3xl font-bold text-center`}>
                {secondPlan?.name}
              </div>
              <div
                className={`h-1 w-full bg-[#8a2036] my-0 py-0 rounded-t`}
              ></div>
              <ul className={`w-full text-base text-justify`}>
                {/* {secondPlan?.features.map((feature) => ( */}
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Relleno sanitario o basureros:
                      <small className='font-normal'>&nbsp;sólo controlamos la salud ocupacional (El daño generado a la salud de los trabajadores del establecimiento).</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Drenaje:
                      <small className='font-normal'>&nbsp;ejercemos control en cuanto a la salud ocupacional (El daño generado a la salud de los trabajadores del establecimiento)..</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Puestos ambulantes:
                      <small className='font-normal'>&nbsp;controlamos únicamente el comercio de alimentos y bebidas (fijos), para que se desarrolle en las condiciones higiénicas sanitarias idóneas. La competencia en su control corresponde a las autoridades municipales (por tener a su cargo los permisos de funcionamiento en la vía pública).</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Casas habitación:
                      <small className='font-normal'>&nbsp;la Coordinación de Regulación Sanitaria sólo puede acceder a una casa habitación por necesidades técnicas de los programas específicos de prevención y control de enfermedades transmisibles (cólera, influenza, tuberculosis, rabia, paludismo, lepra, covid, etc.).</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Veterinarias:
                      <small className='font-normal'>&nbsp;la Coordinación de Regulación Sanitaria sólo controla la salud ocupacional (cuando de manera accesoria genera daño en los trabajadores), o bien para garantizar el bienestar animal (en cuanto al uso de insumos o medicamentos, perfiles académicos de los responsables sanitarios, aviso de funcionamiento, etc.)..</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Atención Medica:
                      <small className='font-normal'>&nbsp;Solo controlamos las condiciones higiénico sanitarias, así como la infraestructura y el equipamiento del establecimiento.</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Criaderos de animales (aves,cerdos,abejas):
                      <small className='font-normal'>&nbsp;se brinda saneamiento básico, cuando se encuentren ubicados en zonas urbanas.</small>
                    </span>
                  </li>
                {/* ))} */}
              </ul>
              
            </div>
            <div
              className={`flex-none mt-2 bg-background rounded-b rounded-t-none overflow-hidden shadow p-6`}
            >
              <div className={`w-full pt-2 text-4xl font-bold text-center`}>
                {/* <span className={`text-base`}> {secondPlan?.priceDetails}</span> */}
                  {/* <a href="tel:+527222173900">{secondPlan?.tel}</a> */}
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col w-5/6 lg:w-1/4 mx-auto lg:mx-0 rounded-none lg:rounded-l-lg bg-primary mt-4 shadow-2xl`}
          >
            <div
              className={`flex bg-background text-slate-600 rounded-t rounded-b-none overflow-hidden shadow`}
            >
              <div className={`p-8 text-3xl font-bold text-center border-b-4`}>
                {thirdPlan?.name}
              </div>
              {/* <ul className={`w-full text-center text-sm`}>
                {thirdPlan?.features.map((feature) => (
                  <li
                    className={`border-b py-4`}
                    key={`${thirdPlan?.name}-${feature}`}
                  >
                    {feature}
                  </li>
                ))}
              </ul> */}
            </div>
            <div
              className={`flex-none mt-2 bg-background rounded-b rounded-t-none overflow-hidden shadow p-6`}
            >
              {/* <div
                className={`w-full pt-6 text-2xl text-slate-600 font-bold text-center`}
              >
                <span className={`text-base`}> {thirdPlan?.priceDetails}</span>
              </div> */}
              {/* <ul className={`w-full text-base font-bold text-justify`}>
                {secondPlan?.features.map((feature) => (
                  <li className={` py-0 px-8`}>
                    <span className={`text-md`}>* {secondPlan?.priceDetails}</span>
                  </li>
                  <li className={` py-0 px-8 mt-2`}>
                    <span className={`text-md`}>* {secondPlan?.priceDetails1}</span>
                  </li>
                  <li className={` py-0 px-8 mt-2`}>
                    <span className={`text-md`}>* {secondPlan?.priceDetails2}</span>
                  </li>
                  <li className={` py-0 px-8 mt-2`}>
                    <span className={`text-md`}>* {secondPlan?.priceDetails3}</span>
                  </li>
                  <li className={` py-0 px-8 mt-2`}>
                    <span className={`text-md`}>* {secondPlan?.priceDetails4}</span>
                  </li>
                ))}
              </ul> */}
              <ul className={`w-full text-base text-justify`}>
                {/* {secondPlan?.features.map((feature) => ( */}
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Datos del solicitante:
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Nombre completo</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Teléfono</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Dirección</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Correo electrónico</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>Datos del establecimiento:
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Nombre</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Dirección</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Municipio</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Horarios de atención</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>
                      <small className='font-normal'>&nbsp;&nbsp;&nbsp;*Motivo de la queja o denuncia</small>
                    </span>
                  </li>
                  <li className={` py-1 px-8`}>
                    <span className={`text-md font-bold`}>En ningún caso se dará trámite a denuncia anónima.
                    </span>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
