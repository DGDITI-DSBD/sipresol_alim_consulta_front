import React, { useState, useEffect } from 'react';
import Colibri from '../../images/colibri-cafe.png'
import { useNavigate } from 'react-router-dom';

// import { Menu, X } from 'lucide-react';

export const Header = () => {
  const navigate = useNavigate();
  const irLogin = () => {
    navigate('../Iniciar-Sesion');
}
  const [isOpen, setIsOpen] = useState(false);

  // Manejo del estado móvil
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  
  return (
    <>

<nav className="bg-colorPrimario dark:bg-gray-900 w-full border-b border-gray-200 dark:border-gray-600 p-4" >
      <div className="w-full md:max-w-screen md:flex md:items-center justify-items-center md:justify-between inline-block md:mx-auto md:px-4">
        {/* Logo y título */}
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src={Colibri}
            alt="Logo Colibri Bienestar"
            className=" hidden md:inline-block mr-4 w-12 h-14 object-contain"
          />
          <span className="font-extrabold text-white text-xl md:text-2xl transition-colors duration-300 hover:text-gray-200">
            Secretaría de Bienestar
          </span>
        </div>
      
        
          <ul className="flex flex-col justify-center p-4 md:p-0 mt-4 font-medium border border-0 text-white text-center md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <label className='w-full text-center p-4'>Dirección General de Bienestar Social y Fortalecimiento Familiar</label>
            </li>
          </ul>
      

        
      </div>
    </nav>
      

  
    </>
   
  );
};

