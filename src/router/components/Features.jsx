import React from 'react';
import useWindowSize from '../../hooks/useWindowSize';

import config from '../config/index.json';


export const Features = () => {
  const { features } = config;
  const { title, subtitle, description, 
          items: featuresList, description1, description2, description3, description4, description5,
          exclusion: exclusionList } = features;
          const size = useWindowSize();
  return (
    <div className={`py-8 bg-white`} id="features">
      <div className={`${size.width <= 400 ? "max-w-7xl px-4 sm:px-6 lg:px-8 w-11/12" : "max-w-9xl mx-auto px-4 sm:px-6 lg:px-8"}`}>
        {/* <div className="lg:text-center">
          <h2
            className={`text-base text-primary font-semibold tracking-wide uppercase`}
          >
            {title}
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-700 sm:text-4xl">
            {subtitle}
          </p>
          <p className="mt-16 max-w-2xl text-2xl text-colorPrimario lg:mx-auto">
            {description}
          </p>

          <div className="mt-10 mb-10">
          <dl className="space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-1 md:gap-y-2">
              
          <p className="mt-1 max-w-2xl text-xl text-slate-950 lg:mx-auto">
            * {description1}
          </p>
          <p className="mt-1 max-w-2xl text-xl  text-slate-950 lg:mx-auto">
            * {description2}
          </p>
          <p className="mt-1 max-w-2xl text-xl  text-slate-950 lg:mx-auto">
            * {description3}
          </p>
          <p className="mt-1 max-w-2xl text-xl  text-slate-950 lg:mx-auto">
            * {description4}
          </p>
          
          </dl>
          </div>

        </div> */}


        <p className="mt-12 mb-12 text-center text-4xl font-extrabold text-slate-700 lg:mx-auto">
            {description5}
        </p>


        <div className="grid md:grid justify-around md:justify-between mt-14 mb-9">
        <div className="flex justify-center items-center">
          <img alt="logo" className="h-36 md:w-70 w-auto sm:h-64" src={"https://ddsisem.edomex.gob.mx/sigeco/img/sidesa/denunciaoook.png"}
          style={{ WebkitFilter: "drop-shadow(5px 5px 5px #222)",
                   filter: "drop-shadow(5px 5px 5px #222)"}} />
        </div>
          <div className=" mt-6 w-full space-y-10 md:space-y-0 md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-6">
          
            {featuresList.map((feature) => (
              <div key={feature.name} className="relative">
                <div className='grid justify-center'>
                  <div className={`flex items-center justify-center h-12 w-12 rounded-md bg-background text-tertiary border-green-500 border-4`}>
                  <svg className="ml-2 mt-0 w-6 h-6 me-2 text-green-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                      </svg>
                  </div>
                  <div className='-ml-2 mt-1 flex mb-3 self-center'>
                      <p className="w-full text-xl font-semibold text-slate-950">
                        {feature.name}
                      </p>
                    </div>
                 
                </div>
                <div>
                      
                    
                </div>
                <p className="pl-6 pr-6 pt-2 text-base font-normal text-slate-950 text-center" 
                // style={{display: "ruby-text"}}
                >
                      {feature.description}
                </p>
                
              </div>
            ))}
          </div>
        </div>



       

        {/* <p className="mt-12 mb-5 text-center text-4xl font-extrabold text-[#C96E7C] lg:mx-auto">
            {description}
        </p>


        <div className="mt-10 mb-24">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-6">
          
            {exclusionList.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className='flex'>
                  <svg className="ml-8 mt-1 w-3.5 h-3.5 me-2 text-pink-500 flex-shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                   </svg>
                  <dd className="mr-8 ml-3 text-base font-semibold text-slate-950">
                  {feature.description}
                </dd>
                </div>
                </dt>
                
              </div>
            ))}
          </dl>
        </div> */}
      </div>
    </div>
  );
};

export default Features;
