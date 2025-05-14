import {setCatalogo, cleanCatalogos} from '../programa/catalogosSlice';
import { getAllCatalogos } from '../../../providers/catalogos';


export const catalogos = () => {

    return async (dispatch) => {

    
        dispatch(cleanCatalogos());

        const catalogos = await getAllCatalogos();

       

        const {success, message} = catalogos;
        

        if(success) return dispatch(setCatalogo(catalogos.data));


        
    }
}