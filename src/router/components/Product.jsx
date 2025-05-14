import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';

import config from '../config/index.json';
import Divider from './Divider';


export const Product = () => {
  const { product } = config;
  const [firstItem, secondItem, thirdItem, fourthItem] = product.items;
  const size = useWindowSize();

  return (
    <section className={`bg-background py-8`} id="product">
      <div className={`lg:px-36 px-10 max-w-11xl mx-auto`}>
        {/* <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-primary`}
        >
          {product.title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-primary' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1> */}
        {/* <Divider /> */}
        <div className={`flex flex-wrap`}>
          <div className={`w-full grid grid-cols-12 text-center`}>
            <div className='col-span-12 xl:col-span-3'>
            <h3 className={`text-3xl text-slate-700 font-bold leading-none mb-4`}> {firstItem?.title} </h3>
            <div className={`w-full grid grid-cols-12`}>
            <div className='col-span-12 md:col-span-6'>
            <ul className="max-w-md space-y-1 text-gray-500 list-insid text-justify pr-4">
              <li className="flex items-center text-justify pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number1}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number2}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   Cosméticos productos de perfumería y belleza
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number4}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number5}
              </li>
              </ul>
              </div>
              <div className='col-span-12 md:col-span-6'>
              <ul className="max-w-md space-y-1 text-gray-500 list-insid text-justify">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number6}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number7}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number8}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {firstItem?.description1.number9}
              </li>
            </ul>
            </div>
            </div>
            </div>
            <div className='col-span-12 xl:col-span-3 justify-self-center'>
            <h3 className={`text-3xl text-slate-700 font-bold leading-none mb-4 mt-4`}>{secondItem?.title}</h3>
            <ul className="max-w-md space-y-1 text-gray-500 list-insid text-justify">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {secondItem?.description.number1}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {secondItem?.description.number2}
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {secondItem?.description.number3}
              </li>
            </ul>
          </div>

          <div className='col-span-12 xl:col-span-3 justify-self-center'>
              <h3 className={`text-3xl text-slate-700 font-bold leading-none mb-4`}> {thirdItem?.title} </h3>
              
              <ul className="max-w-md space-y-1 text-gray-500 list-insid text-justify">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {thirdItem?.description.number1}
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {thirdItem?.description.number2}
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      Laboratorio de análisis clínicos
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                    Spa / Medicina alternativa
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                    Bancos de Sangre / servicios de transfusión
                   </div>
              </li>
              </ul>
              </div>
              <div className='col-span-12 xl:col-span-3 justify-self-center'>
              <h3 className={`text-3xl text-slate-700 font-bold leading-none mb-4 mt-4`} >{fourthItem?.title}</h3>
              <ul className="max-w-md space-y-1 text-gray-500 list-insid text-justify">
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      Plaguicidas / Nutrientes vegetales
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {fourthItem?.description.number2}
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {fourthItem?.description.number3}
                   </div>
              </li>
              <li className="flex items-center pt-3 pb-3">
                  <svg className="w-4 h-4 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   <div>
                      {fourthItem?.description.number4}
                   </div>
              </li>
              </ul>
            
          </div>

          </div>

          {/* aqui */}

          
         
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
        
          
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
                  <svg className="w-4 h-4 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {thirdItem?.description1}
              </li>
              <li className="flex items-center">
                  <svg className="w-4 h-4 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {thirdItem?.description2}
              </li>
              <li className="flex items-center">
                  <svg className="w-4 h-4 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                   {thirdItem?.description3}
              </li>
              <li className="flex items-center">
                  <svg className="w-4 h-4 me-2 text-[#E7D873] flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
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

export default Product;
