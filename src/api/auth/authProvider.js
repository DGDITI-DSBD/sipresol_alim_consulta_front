import { baseApi } from "../baseApi";


export const authProvider = async ( email, password ) => {

        try {
            
            const resp = await baseApi.post( '/login', {
                email: email,
                password: password,
            });

            const { token, user } = resp.data;
            localStorage.setItem( 'token', token );
            
   

            return {
                ok: true,
                token: token,
                name: user.name,
                email: user.email,
                first_time: user.first_time,
                profile: user.profile,
                id: user.id,
            }

        } catch (error) {
            return {
                ok: false, 
                error: error.response.data
            }
        }

}

export const onCheckAuthProvider = async () => {

    try {

        const resp = await baseApi.get('check', {
            headers: { 'token': localStorage.getItem('token') },
        });
       
        return resp.data;

    } catch (error) {
        return {
            ok: false, 
            error: error.response.data
        }
    }

}
