
import { putPassword } from "../../api";
import { addData, cleanData, failData, savingData } from "../public";


export const changePassword = ( data, id, token ) => {

    return async( dispatch ) => {

        dispatch( savingData() );

        const result = await putPassword( data.password, id, token );

        if ( result.ok ) {
            if( result.success ){
                return dispatch( addData( result.data ) );
            }
            else {
                return dispatch( failData( result.data ) );
            }
        } 
        
        dispatch( cleanData() );

    }

}