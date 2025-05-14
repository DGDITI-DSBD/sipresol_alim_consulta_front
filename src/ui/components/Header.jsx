import React, { useState } from 'react';
import UserMenu from './DropdownProfile';
import LogoEdoMex from '../../images/edomex.png'
import { useSelector } from 'react-redux';
import AuthImage from '../../images/auth-image.jpg';

function Header({
  sidebarOpen,
  setSidebarOpen
}) {

  const hours = new Date().getHours();
  let greetings = '';

  if ( hours >= 6 && hours <= 11 ) {
    greetings = 'Buenos días';
  } else if ( hours >= 11 && hours <= 18 ) {
    greetings = 'Buenas tardes';
  } else {
    greetings = 'Buenas noches';
  }

  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const { name, email, profile } = useSelector( state => state.auth );


  return (
    <header className="sticky top-0 bg-transparent  border-slate-200 z-30 pl-2 pr-2 ">

          <section className="flex relative pt-1 bg-white/80 shadow-2xl rounded-xl  md:block ">
          <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          <img className='w-full absolute top-0 left-0 z-0 h-10 hidden md:block' 
           src="https://ddsisem.edomex.gob.mx/sigeco/img/sidesa/curved8.jpg" 
          // src={AuthImage}
          style={{ objectFit: "cover"}} 
          alt="cover-image" />
          <div className="w-full ml-0 md:ml-6 px-1 md:px-2">
              <div className="flex md:flex items-center justify-between  relative z-10">
                <div className='flex'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png" alt="user-avatar-image" 
                  // style={{height: "100px"}}
                  style={{objectFit: "cover"}}
                  className="bg-white h-16 w-16 md:h-20 md:w-20 border-4 border-solid border-white rounded-full"/>
                  <div className="ml-4 mt-1  flex flex-col sm:flex-row max-sm:gap-2 items-center justify-between mb-2">
                  <div className="block">
                      
                      {/* <p className="font-normal leading-7 ml-1 text-lg text-gray-600"> { email } </p> */}
                      <p className="font-normal mt-4 md:mt-1 text-xs md:text-lg -ml-3 md:ml-1 leading-7 text-slate-950 md:text-slate-950 lg:text-zinc-50"> { greetings } { " " }👋</p>
                      <h3 className="font-manrope mt-2 hidden md:block font-semibold text-base text-slate-750 mb-1 md:text-2xl">{ name  }</h3>
                  </div>
                    
                  </div>
                </div>
                <div className="flex items-center space-x-3 md:mt-8 mr-3 md:mr-10">
                  {/* <hr className="mt-2 w-px h-6 bg-slate-200 mx-3" /> */}
                    <UserMenu align="right" />
                </div>
              </div>
              
          </div>
          </section>

      {/* <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          <div className="flex">
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <img className="h-9 xs:h-10 sm:h-16" src={ LogoEdoMex } alt="EdoMex"/>
          </div>
          <div className="flex items-center space-x-3">
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            <UserMenu align="right" />
          </div>
        </div>
      </div> */}
    </header>
  );
}



export default Header;