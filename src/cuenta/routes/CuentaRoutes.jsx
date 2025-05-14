import { Routes, Route, Navigate } from "react-router-dom"
import { PasswordPage } from "../pages/PasswordPage"


export const CuentaRoutes = () => {
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="bg-white p-4">
          <div className="flex justify-between items-center pb-4">
            <h1 className="felx pb-8 text-5xl font-extrabold text-colorPrimario">Cambiar<small className="ml-2 font-semibold text-gray-500">contraseña</small></h1> 
          </div>
          <div className="p-4">
            <Routes>
              <Route path="pass" element={ <PasswordPage />} />

              <Route path="/*" element= { <Navigate to={"pass"}/> } />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
