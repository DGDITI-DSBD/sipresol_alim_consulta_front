import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onCheckAuthProvider } from "../api/auth/authProvider";
import { login, logout } from "../store/auth";


export const useCheckAuth = () => {
  
    const dispatch = useDispatch();
    const { status, token } = useSelector( state => state.auth );

    useEffect( () => {

            // aqui se ropio hay que checar que onda
            async function fetchData() {
            const result = await onCheckAuthProvider();
            // console.log(result, "soy el useChekAuth");
        
            if( result.status !== 'Authorization' ) return dispatch( logout( result?.fallo ) );
        
            // const catalogos = await onCheckAuthProvider();
            // console.log(catalogos, 'hola');
            const { token, user } = result;

            const { id, name, email, profile, first_time } = user;

            // console.log(user);

            // aqui 

            return dispatch( login({ id, name, email, profile, first_time, token }) );

        }

        fetchData();
    
    }, [token]);

  return status;

}
