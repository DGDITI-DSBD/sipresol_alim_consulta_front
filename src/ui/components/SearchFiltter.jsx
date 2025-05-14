import { Link } from "react-router-dom";
import { CustomSelect } from "./CustomSelect";


export const SearchFiltter = ( data ) => {

  const filtter = [
    { value: 0, label: 'SIN FILTRO' },
    { value: 1, label: 'CURP CORRECTA' },
    { value: 2, label: 'CURP INEXISTENTE' },
    { value: 3, label: 'NO TIENE 18 CARACTERES' },
  ];

  const onChangeFiltter = ( event ) => {
    console.log(event);
        // if( event.value === 1 ) {
        //     setShowFarmacias(true);
        // } else {
        //     setShowFarmacias(false);
        //     // checar el reset de solo un campo 
        //     // reset({});
        // }
  }

  return (
    <>
      <div className="flex justify-between items-center pb-4">
            <div className="dropdown relative">
                <div className="flex items-center w-80">
                    <Link to='../registrar' type="button" className={`btn ${data.showButton ? '' : 'hidden'} w-32 sm:w-full text-green-700 hover:text-white border-2 border-green-700 hover:bg-green-700 focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center text-xl mr-2 mb-2`}>
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>&nbsp;Nuevo
                    </Link>
                </div>
            </div>
            <div className="relative">
                {/* <div className="relative z-0 mb-6 w-full group">
                    <input onKeyUp={ searchData } onChange={ handleCheckEmpty } type="text" name="table-search" id="table-search" className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " required=""/>
                    <label htmlFor="table-search" className="peer-focus:font-medium absolute text-lg text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-sky-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Buscar
                    </label>
                </div> */}
                <div className={`mb-2 w-64 group ${data.showFiltter ? '' : 'hidden'}`}>
                    <label htmlFor="filtter" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 text-gray-400 peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                        Filtrar
                    </label>
                    <CustomSelect
                        // ref={ ref }
                        placeholder="Selecciona una opción"
                        onChange={(e) => {
                            // onChange(e.value);
                            onChangeFiltter(e);
                        }}
                        options={ filtter }
                        // defaultValue={yesNo[1]}
                        // value={yesNo.value}
                        isMulti={false} 
                    />
                </div>
            </div>
        </div>
    </>
  )
}
