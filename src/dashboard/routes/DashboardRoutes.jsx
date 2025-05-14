import { Navigate, Route, Routes } from "react-router-dom"
import { PrincipalPage } from "../pages"
import { PasswordPage } from "../../cuenta"
import { SelectUnidad } from "../../cuenta/pages/SelectUnidad"

export const DashboardRoutes = () => {

  return (
    <>
      <div className="p-4">
        <Routes>
          <Route path="principal" element={ <PrincipalPage /> } />
          <Route path="reset-password/:a" element={ <PasswordPage /> } />
          <Route path="select-unidad/:a" element={ <SelectUnidad /> } />
          <Route path="/*" element= { <Navigate to={"principal"}/> } />
        </Routes>
      </div>
    </>
  )

}
