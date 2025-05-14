import { baseApi } from "../api";


export const getAllCatalogos = async () => {

    try {

        const programas      = await baseApi.get(`/programas`);
        const apoyos         = await baseApi.get(`/apoyos`);
        const calendarios    = await baseApi.get(`/calendarios`);

        const catalogos = {catProgramas:programas?.data.data, catApoyos:apoyos?.data.data, catCalendarios:calendarios?.data.data};

  

        return {
            success:true,
            message:'Catalogos',
            data:catalogos
        }

    } catch (error) {

        return {
            success: false,
            message: 'Error' + error,
            data: []
        }
        
    }

}