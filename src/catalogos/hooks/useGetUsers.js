import { useEffect, useState } from "react"
import { getAllUsers } from "../../api/catalogos/usuarioProviders";


export const useGetUsers = () => {

    const [catUrl, setCatUrl] = useState();

    useEffect( () => {

            // aqui se ropio hay que checar que onda
        async function fetchData() {
     
            const result = await getAllUsers();
       
     
            const { usuarios } = result;
      
            setCatUrl( usuarios );
             
            return;
            

        }

    fetchData();

    }, []);
    
    return catUrl;

}