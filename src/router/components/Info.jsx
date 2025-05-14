import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';

import config from '../config/index.json';
import Divider from './Divider';


export const Info = () => {
  const { info } = config;
  const [ firstItem, secondItem ] = info.items;
  const size = useWindowSize();

  return (
    <section className={`bg-background py-8`} id="info">
      <div className={`container max-w-5xl mx-auto`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-slate-700`}
        > Información adicional
        </h1>
        {/* <Divider /> */}
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-2`}>
            <h3
              className={`text-3xl text-slate-700 font-bold leading-none mb-4`}
            >
              {firstItem?.title}
            </h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-insid text-justify">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-7 h-7 me-4 ml-4 text-colorPrimario flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description.number1}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-7 h-7 me-4 ml-4 text-colorPrimario flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description.number2}
              </li>
            </ul>
          </div>
          <div className={`${size.width <= 400 ? "w-5/6 sm:w-1/2 p-3 ml-3" : "w-full sm:w-1/2 p-6"}`}>
            <img
              className={`${size.width <= 400 ? "h-6/6" : "h-6/6"} shadow-2xl`}
              src={firstItem?.img}
              alt={firstItem?.title}
              // style={{objectFit: "none"}}
            />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
        <div className={`${size.width <= 400 ? "w-5/6 sm:w-1/2 p-3 ml-3" : "w-full sm:w-1/2 p-6"}`}>
            <img
              className={`${size.width <= 400 ? "h-full" : "h-full"} shadow-2xl pt-8`}
              src={secondItem?.img}
              alt={secondItem?.title}
            />
          </div>
          <div className={`${size.width <= 400 ? "w-5/6 sm:w-1/2 p-3 mt-8 ml-3" : "w-6/6 sm:w-1/2 p-6 mt-4"}`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl text-[#CA2525] font-bold leading-none mb-4`}
              >
                {secondItem?.title}
              </h3>
              {/* <p className={`text-gray-600`}>{secondItem?.description}</p>
              <p className={`text-gray-600 mt-4`}>{secondItem?.secondDescription}</p> */}
              <ul className="max-w-md space-y-1 text-gray-500 list-insid text-justify">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-7 h-7 me-4 ml-4 text-colorPrimario flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {secondItem?.description.number1}
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-7 h-7 me-4 ml-4 text-colorPrimario flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {secondItem?.description.number2}
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-7 h-7 me-4 ml-4 text-colorPrimario flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {secondItem?.description.number3}
                   </div>
              </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
