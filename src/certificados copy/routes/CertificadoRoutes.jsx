import { Navigate, NavLink, Route, Routes } from "react-router-dom"
import { CertificadoForm, CertificadoList } from "../pages"


export const CertificadoRoutes = () => {
  return (
    <>
      <div className="px-2 py-2 w-full  mx-auto shadow-2xl">
        <div className="bg-white p-4">
          <div className="grid md:flex justify-between items-center pb-1">
          <h1 className="felx pb-2 text-2xl font-extrabold text-colorPrimario">Administración de<small className="ml-2 font-semibold text-gray-500">Denuncias</small></h1> 
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <NavLink
                      end
                      to="/certificado/lista"
                      className={({ isActive }) =>
                      'block transition duration-150 truncate ' + (isActive ? 'text-colorPrimario' : 'text-slate-400 hover:text-slate-600')}>
                        <span className="ml-2 inline-flex items-center text-sm font-medium">
                          Lista de Denuncias
                        </span>
                    </NavLink>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                      <NavLink
                        end
                        to="/certificado/registrar"
                        className={({ isActive }) =>
                        'block transition duration-150 truncate ' + (isActive ? 'text-colorPrimario' : 'text-slate-400 hover:text-slate-600')}>
                          <span className="ml-2 inline-flex items-center text-sm font-medium">
                            Registrar Denuncia
                          </span>
                      </NavLink>
                    </div>
                  </li>
                </ol>
              </nav>
          </div>
          <div className="pr-1 pl-1 pb-1 pt-1">
            <Routes>
              <Route path="lista" element={ <CertificadoList />} />
              <Route path="registrar" element={ <CertificadoForm />} />

              <Route path="/*" element= { <Navigate to={"lista"}/> } />
            </Routes>
          </div>
        </div>
      </div>
    </>

  )
}
