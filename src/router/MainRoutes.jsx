import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom"
import { DashboardRoutes } from "../dashboard";
import { CatalogoRoutes } from "../catalogos"
import Sidebar from "../ui/components/Sidebar";
import Header from "../ui/components/Header";
import { getCatalogos } from "../store";
import { CertificadoRoutes } from "../certificados";



export const MainRoutes = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { token } = useSelector( state => state.auth );
    const dispatch = useDispatch();
    dispatch( getCatalogos( token ) );

  return (
    <>
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <Routes>
                    <Route path="/dashboard/*" element={ <DashboardRoutes /> } />
                    <Route path="/catalogo/*" element={ <CatalogoRoutes /> } />
                    <Route path="/certificado/*" element={ <CertificadoRoutes /> } />
                    <Route path="/*" element={ <Navigate to={"dashboard"} /> } />
                </Routes>
            </div>
        </div>
    </>
  )
}
