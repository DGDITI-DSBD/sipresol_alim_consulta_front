import React from 'react';

import config from '../config/index.json';

export const About = () => {
  const { company, about } = config;
  const { logo, name: companyName } = company;
  const { socialMedia, sections } = about;

  return (
    <div
      id="about"
      className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 py-12"
    >
      <div className="flex flex-col items-center justify-center">
        <div>
          <img src={logo} alt={companyName} className="w-33 h-33" />
        </div>
        {/* <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4 h-12">
          {sections.map((section, index) => (
            <a
              key={`${section.name}-${index}`}
              href={section.href}
              className="hover:text-primary text-base cursor-pointer leading-4 text-gray-800"
            >
              {section.name}
            </a>
          ))}
        </div> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xl font-extrabold text-[#8a2036] lg:mx-auto">
              Ingenieria del Software, Unidad de Tecnologías de la Información y Comunicaciones
          </p>
          <p className="text-center text-lg font-normal text-gray-600 lg:mx-auto">
              Av. Independencia 1009, Reforma y FFCC Nacionales, 50070 Toluca de Lerdo, Méx.
          </p>
          <p className="mb-5 text-center text-lg font-normal text-gray-600 lg:mx-auto">
              Toluca, Estado de México.
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a className="text-center text-xl font-extrabold text-[#8a2036] lg:mx-auto" href="https://salud.edomex.gob.mx/isem/" target='_blank'>salud.edomex.gob.mx/isem</a>
        </div>
      </div>
    </div>
  );
};
// export default About;
