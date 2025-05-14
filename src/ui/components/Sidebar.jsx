import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import LogoIsem from '../../images/logo-bienestar_blank.png';
import { startLogout } from '../../store/auth';
// import { onLogout } from '../functions/onLogout';

function Sidebar({
  sidebarOpen,
  setSidebarOpen
}) {

  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpe(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector('body').classList.add('sidebar-expanded');
    } else {
      document.querySelector('body').classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);


  const { profile } = useSelector( state => state.auth );
  const { firstTime } = useSelector( state => state.auth );

  const dispatch = useDispatch();
  const onLogout = () => {
  

    // console.log('Salir');
    return dispatch( startLogout() );
    
  }

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-fuchsia-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 md:w-20  sm:sidebar-expanded:!w-64 lg:sidebar-expanded:!w-64 sm:!w-20  shrink-0 bg-gradient-to-tl from-colorPrimario to-red-800 p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 sm:pt-5">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/" className="block">
            <img className="w-48 sm:ml-0 ml-4" src={LogoIsem} alt="Bienestar"/>
          </NavLink>
        </div>

        {/* Links */}
        { firstTime == 1 ?
          <div className="space-y-8">
            {/* Pages group */}
            <div>
              <h3 className="text-xs uppercase text-slate-200 font-semibold pl-3">
				<span className="hidden lg:block lg:sidebar-expanded:hidden sm:hidden text-center w-6" aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block sm:block">MENÚ</span>
              </h3>
              <ul className="mt-3">
                {/* Dashboard */}
                <SidebarLinkGroup bloqueo={ false } activecondition={pathname === '/' || pathname.includes('dashboard')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block truncate transition duration-150 ${
                            pathname === '/' || pathname.includes('dashboard') ? 'text-slate-100 hover:text-white' : 'text-slate-300 hover:text-slate-100'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                <circle
                                  className={`fill-current ${pathname.includes('dashboard') ? 'text-fuchsia-300' : 'text-slate-400'}`}
                                  cx="18.5"
                                  cy="5.5"
                                  r="4.5"
                                />
                                <circle
                                  className={`fill-current ${pathname.includes('dashboard') ? 'text-fuchsia-500' : 'text-slate-600'}`}
                                  cx="5.5"
                                  cy="5.5"
                                  r="4.5"
                                />
                                <circle
                                  className={`fill-current ${pathname.includes('dashboard') ? 'text-fuchsia-500' : 'text-slate-600'}`}
                                  cx="18.5"
                                  cy="18.5"
                                  r="4.5"
                                />
                                <circle
                                  className={`fill-current ${pathname.includes('dashboard') ? 'text-fuchsia-300' : 'text-slate-400'}`}
                                  cx="5.5"
                                  cy="18.5"
                                  r="4.5"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                Dashboard
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-100 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block sm:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/main/dashboard/principal"
                                className={({ isActive }) =>
                                  'block transition duration-150 truncate ' + (isActive ? 'text-white' : 'text-slate-200 hover:text-white')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Principal
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* Catálogos */}
                <SidebarLinkGroup bloqueo={ (profile === 1) ? false : true } activecondition={pathname === '/' || pathname.includes('catalogo')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block truncate transition duration-150 ${
                            pathname === '/' || pathname.includes('catalogo') ? 'text-slate-100 hover:text-white' : 'text-slate-300 hover:text-slate-100'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                <path
                                  className={`fill-current ${
                                    pathname === '/' || pathname.includes('catalogo') ? 'text-fuchsia-500' : 'text-slate-400'
                                  }`}
                                  d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname === '/' || pathname.includes('catalogo') ? 'text-fuchsia-600' : 'text-slate-600'
                                  }`}
                                  d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                                />
                                <path
                                  className={`fill-current ${
                                    pathname === '/' || pathname.includes('catalogo') ? 'text-fuchsia-200' : 'text-slate-400'
                                  }`}
                                  d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                                />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                Catálogos
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-100 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block sm:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/main/catalogo/usuario/lista"
                                className={
                                  'block transition duration-150 truncate ' + ((pathname.includes('/catalogo/usuario/')) ? 'text-white' : 'text-slate-300 hover:text-white')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Usuarios
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
                {/* Certificados */}
                <SidebarLinkGroup bloqueo={ (profile === 1 || profile === 2 || profile === 3 || profile === 4) ? false : true } activecondition={pathname === '/' || pathname.includes('certificado')}>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block truncate transition duration-150 ${
                            pathname === '/' || pathname.includes('certificado') ? 'text-slate-100 hover:text-white' : 'text-slate-300 hover:text-slate-100'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48"><title>new-construction</title><g>
                              <path fill={`${pathname.includes('certificado') ? '#9258AD' : '#B8B1BB'}`} d="M46,47H25a1,1,0,0,1-1-1V2a1,1,0,0,1,1-1,1.018,1.018,0,0,1,.274.038l21,6A1,1,0,0,1,47,8V46A1,1,0,0,1,46,47Z"></path>
                                {/* <path fill={"#58bfca"} d="M46,47H25a1,1,0,0,1-1-1V2a1,1,0,0,1,1-1,1.018,1.018,0,0,1,.274.038l21,6A1,1,0,0,1,47,8V46A1,1,0,0,1,46,47Z"></path> */}
                                {/* className={`fill-current ${pathname.includes('dashboard') ? 'text-red-300' : 'text-slate-400'}`} */}
                                <rect fill={`${pathname.includes('certificado') ? '#9E51C2' : '#837D87'}`} x="1" y="25" width="17.824" height="22" rx="1"></rect>
                                <path fill={`${pathname.includes('certificado') ? '#EEC9FF' : '#D8D1DB'}`} d="M42,5.817V42a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V6.388Z"></path>
                                <path fill={`${pathname.includes('certificado') ? '#EEC9FF' : '#D8D1DB'}`} d="M37,4.388V42a1,1,0,0,0,1,1h0a1,1,0,0,0,1-1V4.96Z"></path>
                                <path fill={`${pathname.includes('certificado') ? '#EEC9FF' : '#D8D1DB'}`} d="M33,43h0a1,1,0,0,0,1-1V3.531l-2-.572V42A1,1,0,0,0,33,43Z"></path>
                                <path fill={`${pathname.includes('certificado') ? '#EEC9FF' : '#D8D1DB'}`} d="M28,43h0a1,1,0,0,0,1-1V2.1l-2-.571V42A1,1,0,0,0,28,43Z"></path>
                                <path fill={`${pathname.includes('certificado') ? '#622D7B' : '#363636'}`} d="M28,17H10a1,1,0,0,0-1,1V46a1,1,0,0,0,1,1H28a1,1,0,0,0,1-1V18A1,1,0,0,0,28,17Z"></path>
                                <rect fill={`${pathname.includes('certificado') ? '#E2A4FF' : '#EED9F9'}`} x="13" y="21" width="12" height="4" rx="0.926"></rect>
                                <rect fill={`${pathname.includes('certificado') ? '#E2A4FF' : '#EED9F9'}`} x="13" y="27" width="12" height="4" rx="0.828"></rect>
                                <rect fill={`${pathname.includes('certificado') ? '#E2A4FF' : '#EED9F9'}`} x="13" y="33" width="12" height="4" rx="0.926"></rect>
                                <path fill={`${pathname.includes('certificado') ? '#9E51C2' : '#837D87'}`} d="M20,40H18a1,1,0,0,0-1,1v6h4V41A1,1,0,0,0,20,40Z"></path></g>
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                Denuncias
                              </span>
                            </div>

                            <div className="flex shrink-0 ml-2">
                              <svg className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-100 ${open && 'rotate-180'}`} viewBox="0 0 12 12">
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block sm:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/main/certificado/registrar"
                                className={
                                  'block transition duration-150 truncate ' + ((pathname.includes('/certificado/registrar')) ? 'text-white' : 'text-slate-300 hover:text-white')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Registro
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/main/certificado/lista"
                                className={
                                  'block transition duration-150 truncate ' + ((pathname.includes('/certificado/lista')) ? 'text-white' : 'text-slate-300 hover:text-white')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Listado
                                </span>
                              </NavLink>
                            </li>
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              </ul>
            </div>
            {/* More group */}
            <div>
              <h3 className="text-xs uppercase text-slate-300 font-semibold pl-3">
                <span className="hidden lg:block lg:sidebar-expanded:hidden sm:hidden text-center w-6" aria-hidden="true">
                  •••
                </span>
                <span className="lg:hidden lg:sidebar-expanded:block sm:block">Más</span>
              </h3>
              <ul className="mt-3">
                {/* Authentication */}
                <SidebarLinkGroup>
                  {(handleClick, open) => {
                    return (
                      <React.Fragment>
                        <a
                          href="#0"
                          className={`block text-slate-200 truncate transition duration-150 ${open ? 'hover:text-slate-200' : 'hover:text-white'}`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                                <path className="fill-current text-slate-600" d="M8.07 16H10V8H8.07a8 8 0 110 8z" />
                                <path className="fill-current text-slate-400" d="M15 12L8 6v5H0v2h8v5z" />
                              </svg>
                              <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                Autenticación
                              </span>
                            </div>
                            {/* Icon */}
                            <div className="flex shrink-0 ml-2">
                              <svg
                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'rotate-180'}`}
                                viewBox="0 0 12 12"
                              >
                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                              </svg>
                            </div>
                          </div>
                        </a>
                        <div className="lg:hidden lg:sidebar-expanded:block sm:block">
                          <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                            {/* <li className="mb-1 last:mb-0">
                              <NavLink
                                end
                                to="/autenticacion"
                                className={
                                  'block transition duration-150 truncate ' + ((pathname.includes('/autenticacion')) ? 'text-slate-100' : 'text-slate-400 hover:text-slate-200')
                                }
                              >
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Contraseña
                                </span>
                              </NavLink>
                            </li> */}
                            <li className="mb-1 last:mb-0">
                              {/* <button onClick={ onLogout } className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate"> */}
                              <button onClick={ onLogout } className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Salir
                                </span>
                              </button>
                            </li>
                            {/* <li className="mb-1 last:mb-0">
                              <NavLink end to="/signup" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Sign up
                                </span>
                              </NavLink>
                            </li>
                            <li className="mb-1 last:mb-0">
                              <NavLink end to="/reset-password" className="block text-slate-400 hover:text-slate-200 transition duration-150 truncate">
                                <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 sm:opacity-100 duration-200">
                                  Reset Password
                                </span>
                              </NavLink>
                            </li> */}
                          </ul>
                        </div>
                      </React.Fragment>
                    );
                  }}
                </SidebarLinkGroup>
              </ul>
            </div>
          </div>
        : null }

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex sm:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
