import { baseApi } from "../baseApi";



export const getAllData = async ( currentPage, path, token ) => {

    try {
        const resp = await baseApi.get(`${ path }?page=${ currentPage }`, {
            headers: { 'token': token },
        });
       
        const { message, success, data } = resp.data;
        return {
            ok: true,
            message: message,
            success: success,
            data: data,
        };
    } catch (error) {
        return {
            ok: false, 
            error: error.response.data
        }
    }

}

export const getAllDataAux = async ( currentPage, path, token ) => {

    try {
        const resp = await baseApi.get(`${ path }?page=${ currentPage }`, {
            headers: { 'token': token },
        });
      
        const { message, success, data } = resp.data;
        return {
            ok: true,
            message: message,
            success: success,
            data: data,
        };
    } catch (error) {
        return {
            ok: false, 
            error: error.response.data
        }
    }

}


export const getSearchData = async ( busqueda, path, token ) => {

    try {
        const resp = await baseApi.get(`${ path }/${ busqueda }`, {
            headers: { 'token': token },
        });

        const { message, success, data } = resp.data;
        return {
            ok: true,
            message: message,
            success: success,
            data: data,
        };
    } catch (error) {
        return {
            ok: false, 
            error: error.response.data
        }
    }
}


export const getEditFields = async ( path, id, token ) => {

    try {
        const resp = await baseApi.get(`${ path }/${ id }`, {
            headers: { 'token': token },
        });

        const { message, success, data } = resp.data;
        return {
            ok: true,
            message: message,
            success: success,
            data: data,
        };
    } catch (error) {
        return {
            ok: false, 
            error: error.response.data
        }
    }

}


export const saveData = async ( path, data, token ) => {

    try {

        const resp = await baseApi.post( `${ path }`, {
            data: data,
        }, {
            headers: { 'token': token },
        });

       

        const { message, dataResponse, success  } = resp.data;

        return {
            ok: true,
            success: success,
            dataResponse: dataResponse,
            message: message,
        }

    } catch (error) {
        return {
            ok: false, 
            error: error.response.data
        }
    }

}


export const updateData = async ( path, data, id, token ) => {

    try {

        const resp = await baseApi.put( `${ path }/${ id }`, {
            data: data,
        }, {
            headers: { 'token': token },
        });

      

        const { message, dataResponse, success  } = resp.data;

        return {
            ok: true,
            success: success,
            dataResponse: dataResponse,
            message: message,
        }

    } catch (error) {
        return {
            ok: false, 
            error: error.response.data
        }
    }

}




export const getAllCatalogos = async ( token ) => {

    try {

        const resp = await baseApi.get('/catalogos'
            ,{
            headers: { 'token': token },
            }
        );
     

        const { dominios,
                estadocivil, 
                docoficiales,
                municipios
             } = resp.data;

        return {
            ok: true,
            dominios: dominios,
            estadocivil: estadocivil,
            docoficiales: docoficiales,
            municipios: municipios
        }
        
    } catch (error) {
        return {
            ok: false, 
            error: error
        }
    }
}




