import { getAllCatalogos, getAllData, getAllDataAux, getEditFields, getSearchData, saveData, updateData } from "../../api";
import { cleanConsultasAux, gettingConsultasAux } from "./auxPublicSlice";
import { setCatalogos } from "./catalogosSlice";
import { cleaningEditData, gettingEditData } from "./editSlice";
import { cleanConsultas, gettingConsultas } from "./publicSlice"
import { addData, cleanData, failData, savingData } from "./validacionSlice";


export const getData = (currentPage, path, token) => {

    return async( dispatch ) => {

        dispatch( cleanConsultas() );
        
        const consulta = await getAllData( currentPage, path, token );
        
        if ( consulta.ok ) return dispatch( gettingConsultas( consulta.data ) );
        
        dispatch( cleanConsultas() );
        // console.log(consulta);

    }

}

export const getDataAux = (currentPage, path, token) => {

    return async( dispatch ) => {

        dispatch( cleanConsultasAux() );
        
        const consultaAux = await getAllDataAux( currentPage, path, token );
        
        if ( consultaAux.ok ) return dispatch( gettingConsultasAux( consultaAux.data ) );
        
        dispatch( cleanConsultasAux() );
        // console.log(consultaAux);

    }

}


export const findData = ( busqueda, path, token ) => {

    return async ( dispatch ) => {

        dispatch( cleanConsultas() );

        const consulta = await getSearchData( busqueda, path, token );
        
        if ( consulta.ok ) return dispatch( gettingConsultas( consulta.data ) );
        
        dispatch( cleanConsultas() );

    }

}


export const getEditData = ( path, id, token ) => {

    return async ( dispatch ) => {

        dispatch( cleaningEditData() );

        const consulta = await getEditFields( path, id, token );

        if ( consulta.ok ) return dispatch( gettingEditData( consulta.data ) );

        dispatch( cleaningEditData() );

    }

}


export const storeData = ( path, data, token ) => {

    return async ( dispatch ) => {

        dispatch( cleanData() );

        dispatch( savingData() );

        const saveResponse = await saveData( path, data, token );

        if( saveResponse.ok ){

            if( saveResponse.success )
                return dispatch( addData( saveResponse.dataResponse ) )
            else 
                return dispatch( failData( saveResponse.dataResponse ) )
        }

        console.log( saveResponse );

        dispatch( cleanData() );

    }

}


export const putData = ( path, data, id, token ) => {

    return async ( dispatch ) => {

        dispatch( cleanData() );

        dispatch( savingData() );

        const updateResponse = await updateData( path, data, id, token );

        if( updateResponse.ok ){

            if( updateResponse.success )
                return dispatch( addData( updateResponse.dataResponse ) )
            else 
                return dispatch( failData( updateResponse.dataResponse ) )
        }

        // console.log( saveResponse );

        dispatch( cleanData() );

    }

}

// TRAER CATALOGOS CON TOKEN 
export const getCatalogos = ( token ) => {

    return async( dispatch ) => {

        const catalogos = await getAllCatalogos( token );

        dispatch( setCatalogos( catalogos ) );


    }


}

// TRAER CATALOGOS SIN TOKEN 
// export const getCatalogos = () => {
//     return async( dispatch ) => {
//         const catalogos = await getAllCatalogos();
//         dispatch( setCatalogos( catalogos ) );
//     }
// }


