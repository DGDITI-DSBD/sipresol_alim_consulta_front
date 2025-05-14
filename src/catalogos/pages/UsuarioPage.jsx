import { Navigate, NavLink, Route, Routes } from "react-router-dom"
import { UsuarioEdit, UsuarioForm, UsuarioList } from "../components"


export const UsuarioPage = () => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="bg-white p-4">
          <div className="flex justify-between items-center pb-4">
          <h1 className="felx pb-8 text-5xl font-extrabold text-colorPrimario">Administración de<small className="ml-2 font-semibold text-gray-500">usuarios</small></h1> 
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                  <li className="inline-flex items-center">
                    <NavLink
                      end
                      to="/catalogo/usuario/lista"
                      className={({ isActive }) =>
                      'block transition duration-150 truncate ' + (isActive ? 'text-colorPrimario' : 'text-slate-400 hover:text-slate-600')}>
                        <span className="ml-2 inline-flex items-center text-sm font-medium">
                          Lista de usuarios
                        </span>
                    </NavLink>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                      <NavLink
                        end
                        to="/catalogo/usuario/registrar"
                        className={({ isActive }) =>
                        'block transition duration-150 truncate ' + (isActive ? 'text-colorPrimario' : 'text-slate-400 hover:text-slate-600')}>
                          <span className="ml-2 inline-flex items-center text-sm font-medium">
                            Registrar usuario
                          </span>
                      </NavLink>
                    </div>
                  </li>
                </ol>
              </nav>
          </div>
          <div className="p-4">
            <Routes>
              <Route path="registrar" element={ <UsuarioForm />} />
              <Route path="lista" element={ <UsuarioList />} />
              <Route path="editar/:id" element={ <UsuarioEdit />} />

              <Route path="/*" element= { <Navigate to={"lista"}/> } />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
