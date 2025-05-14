import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../store";
import { Link } from "react-router-dom";
import { PaginationPublic, SearchBar } from "../../ui/components";
import CryptoJS from "crypto-js";
import { pass } from "../../api";
import { SearchFiltter } from "../../ui/components/SearchFiltter";


export const ListSystem = () => {
  
    const dispatch = useDispatch();

  const { token, profile } = useSelector( state => state.auth );
  const { loading, currentPage, path, consulta, from, to, lastPage, total, links } = useSelector( state => state.consultas );
  
  useEffect(() => {
      dispatch( getData( currentPage, '/get-system', token ) );
  }, [token]);


  return (
    <>
      {/* <SearchBar searchPath="/get-search-actividades" normalPath="/get-actividades" /> */}
      <SearchFiltter showButton={ (profile === 1) ? false : true } showFiltter={false} searchPath="/get-search-actividades" normalPath="/get-system" />
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-center text-gray-700">
                <thead className="text-base text-white uppercase bg-green-700">
                    <tr>
                        <th scope="col" className="py-2 px-4 whitespace-nowrap hidden">
                            Opciones
                        </th>
                        <th scope="col" className={`${ profile !== 1 ? 'hidden' : ''} py-2 px-4`}>
                            Usuario
                        </th>
                        <th scope="col" className="py-2 px-4">
                            Sistema
                        </th>
                        <th scope="col" className="py-2 px-4">
                            api-key
                        </th>
                        <th scope="col" className="py-2 px-4 whitespace-nowrap">
                            url
                        </th>
                    </tr>
                </thead>
                <tbody className={`${ loading ? 'hidden' : '' } text-xs`}>
                    { consulta?.map( ( { id, key, name, user }, i ) => {
                        return <>
                        <tr key={i} className="bg-gray-50 border-b hover:bg-green-100 border-green-700">
                            <th scope="row" className="hidden items-center py-1 px-4 space-x-3 whitespace-nowrap">
                            {/* <th scope="row" className="flex items-center py-1 px-4 space-x-3 whitespace-nowrap"> */}
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <Link type="button" title="Editar" className="text-fuchsia-400 hover:text-white border-2 border-fuchsia-400 hover:bg-fuchsia-600 focus:ring-2 focus:outline-none focus:ring-fuchsia-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2"
                                                to={`../editar/${ CryptoJS.AES.encrypt( JSON.stringify( id ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 icon icon-tabler icon-tabler-pencil" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
                                                <path d="M13.5 6.5l4 4"></path>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </th>
                            <td className={`${ profile !== 1 ? 'hidden' : ''} py-1 px-4`}>{ user }</td>
                            <td className="py-1 px-4">{ name }</td>
                            <td className="py-1 px-4">{ key }</td>
                            <td className="py-1 px-4 whitespace-nowrap">https://ddsisem.edomex.gob.mx/servicioscurp/api/v1/get-curp/{ key }/ -- TU CURP --</td>
                        </tr>
                        </>
                    })}
                </tbody>
            </table>
            <div className={`${loading ? 'w- h-32' : ''} flex items-center justify-center mt-9`}>
                <div role="status" className={`${ loading ? '' : 'hidden' } absolute opacity-100 -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 p-96`}>
                    <svg aria-hidden="true" className="w-28 h-28 mr-2 text-gray-400 animate-spin fill-green-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </div>
        <br></br>
        { ( links ) ?  <PaginationPublic path={path} from={from} to={to} currentPage={currentPage} lastPage={lastPage} total={total} links={links} /> : null }
    </>
  )

}
