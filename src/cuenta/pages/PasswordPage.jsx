import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { changePassword, cleanData, logout } from "../../store";



export const PasswordPage = () => {

    const { id, token } = useSelector( state => state.auth );
  const { isSaving, status, dataValidate } = useSelector( state => state.validacion );

  const dispatch = useDispatch();

  const {register, control, formState: { errors }, handleSubmit } = useForm({
    defaultValues:{
    }
  });
    
    const onSubmit = ( data ) => {
        dispatch( changePassword( data, id, token ) );
     
    }

    if ( status === 'saved' ) {
      Swal.fire({
        title: 'Has cambiado tu contraseña',
        // text: 'con nombre ' + dataValidate?.payload.descripcion,
        icon: 'success',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonColor: '#8a2036',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch( cleanData() );
            dispatch( logout() );
        }
      });
    }

  return (
    <>
        <form className="p-8 bg-white" onSubmit={ handleSubmit(onSubmit) }>
            <h2 className="text-xl font-extrabold text-slate-500 pb-8">Ingresa tu nueva contraseña</h2>
            <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                    <input type="password" id="password" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.password?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" " autoComplete="on" 
                        {...register( "password", { required: "Este campo es necesario", 
                                                    minLength: {
                                                        value: 8,
                                                        message: "Tu contraseña debe tener al menos 8 caracteres"
                                                    } }
                        )}
                    />
                    <label htmlFor="password" className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.password?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                        Contraseña
                    </label>
                    <div className="w-full text-red-400 text-sm pb-2">
                        { errors.password?.message }
                    </div>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="password" id="repeat" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.repeat?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" "
                        {...register("repeat", 
                            { required: "Este campo es necesario", 
                                validate: (value) => {
                                // const { password } = getValues();
                                if (password.value === value) return password;
                                    else return "Tu contraseña debe ser igual";
                                }}
                        )}  
                    />
                    <label htmlFor="repeat" className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.repeat?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                        Repetir contraseña
                    </label>
                    <div className="w-full text-red-400 text-sm pb-2">
                        { errors.repeat?.message }
                    </div>
                </div>
            </div>
            <button disabled={ isSaving } type="submit" className={`text-colorPrimario hover:text-white border-2 ${ !isSaving ? 'border-colorPrimario hover:bg-colorPrimario' : 'border-gray-400 hover:bg-gray-400' } focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>Guardar</button>
            <Link to='../../dashboard' type="button" className="text-colorTerciario hover:text-white border-2 border-colorTerciario hover:bg-colorTerciario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12">Cancelar</Link>
        </form>
    </>
  )
}
