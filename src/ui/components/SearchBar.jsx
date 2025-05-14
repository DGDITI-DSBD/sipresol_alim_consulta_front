import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { findData, getData } from '../../store';

export const SearchBar = ( data ) => {

    const dispatch = useDispatch();

    const { token } = useSelector( state => state.auth );
    const { currentPage } = useSelector( state => state.consultas );


    const handleCheckEmpty = ( event ) => {
        if( event.target.value === '' ) dispatch( getData( currentPage, data.normalPath, token ) );
    }
    
    
    const searchData = (event) => {
        if( event.key === 'Enter' ){
            if ( event.target.value !== '' ) {
                dispatch( findData( event.target.value, data.searchPath ,token ) );
                // console.log( data.path );
            } else {
                dispatch( getData( currentPage, data.normalPath, token ) );
            }
        }
    }


  return (
    <>
        <div className="flex justify-between items-center pb-4">
            <div className={`btn ${data.showButton ? 'hidden' : ''} dropdown relative`}>
                <div className={`btn ${data.showButton ? 'hidden' : ''} flex items-center w-80`}>
                    <Link to='../registrar' type="button" className={`btn ${data.showButton ? 'hidden' : ''} w-32 sm:w-full text-colorPrimario hover:text-white border-2 border-colorPrimario hover:bg-colorPrimario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center text-xl mr-2 mb-2`}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>&nbsp;Nuevo
                    </Link>
                </div>
            </div>
            <div className="relative">
                <div className={`relative z-0 ${data.showButton ? 'mt-2 mr-10' : 'mb-6' } w-full group`}>
                    <input onKeyUp={ searchData } onChange={ handleCheckEmpty } type="text" name="table-search" id="table-search" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-colorPrimario peer" placeholder=" " required=""/>
                    <label htmlFor="table-search" className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-colorPrimario peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Buscar
                    </label>
                </div>
            </div>
        </div>
    </>
  )
}
