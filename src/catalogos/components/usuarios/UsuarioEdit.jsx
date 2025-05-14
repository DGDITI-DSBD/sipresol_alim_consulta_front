import { useEffect } from "react";
import CryptoJS from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { CustomSelect } from "../../../ui/components";
import { pass } from "../../../api";
import { cleanData, getEditData, putData } from "../../../store";
import Swal from "sweetalert2";

export const UsuarioEdit = () => {

  const { token } = useSelector( state => state.auth );
  const { perfiles, jurisdicciones } = useSelector( state => state.catalogos );
  const { loading, data } = useSelector( state => state.edit );
  const { isSaving, status } = useSelector( state => state.validacion );


    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const decrypUrl = params.id.replace(/p1L2u3S/g, '+' ).replace(/bXaJN0921/g, '/').replace(/e1Q2u3A4l/g, '=')
    const bytes = CryptoJS.AES.decrypt(decrypUrl, pass);
    const usuarioId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const {register, control, formState: { errors }, handleSubmit, reset } = useForm();

    const statusActivado = [
      { value: 0, label: 'DESACTIVADO' },
      { value: 1, label: 'ACTIVO' }
    ];

    useEffect(() => {
      dispatch( getEditData( '/get-fields-users', usuarioId, token ) );
    }, [token]);


    useEffect(() => {
      if (data?.payload) {
        reset({
            name: data.payload.name,
            email: data.payload.email,
            perfil: { value: data.payload.profile_value, label: data.payload.profile_label },
            jurisdiccion: { value: data.payload.juris_value, label: data.payload.juris_label },
            status: { value: data.payload.status, label: (data.payload.status === 1) ? 'ACTIVO' : 'DESACTIVADO' }
        });
      }
    }, [data])

    const onSubmit = ( data ) => {
   
      dispatch( putData( 'update-user', data, usuarioId, token ) )
      // dispatch( putUser( data, usuarioId, token ) );
    }

    if ( status === 'saved' ) {
      Swal.fire({
        title: 'Se ha actualizado el usuario',
        // text: 'con correo ' + newUser?.payload.email,
        icon: 'success',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonColor: '#8a2036',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch( cleanData() );
            navigate("../list");
        }
      });
    } else if ( status === 'fail' ) {
      Swal.fire({
        title: 'Ese correo ya existe en otro usuario',
        // text: 'NOMBRE: ' + dataValidate?.payload.email,
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonColor: '#8a2036',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch( cleanData() );
            // navigate("../catalogo/usuario");
        }
      });
    }

  return (
    <>
      { loading ? 
        <>
          <div className={`flex items-center justify-center`}>
            <div role="status" className={`relative opacity-100 -translate-x-1/2 -translate-y-1/2 mt-36`}>
              <svg aria-hidden="true" className="w-28 h-28 mr-2 text-gray-400 animate-spin fill-colorPrimario" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </> : 
        <>
          <form onSubmit={ handleSubmit(onSubmit) }>
            <h2 className="text-xl font-extrabold text-slate-500 pb-4">Editar datos de usuario</h2>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 mb-6 w-full group">
                <input type="text" id="name" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.name?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" " autoComplete="on" 
                  {...register( "name", { required: "Este campo es necesario"} )}
                />
                <label htmlFor="name" className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.name?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                  Nombre de usuario
                </label>
                <div className="w-full text-red-400 text-sm pb-2">
                  { errors.name?.message }
                </div>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input type="text" id="email" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.email?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" "
                  {...register("email", 
                    { required: "Este campo es necesario", 
                      pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        message: "Correo no valido (ejemplo@ejemplo.com)"
                      }
                    }
                  )}
                />
                <label htmlFor="email" className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.email?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                  Correo Electrónico
                </label>
                <div className="w-full text-red-400 text-sm pb-2">
                  { errors.email?.message }
                </div>
              </div>
              {/* <div className="mb-6 w-full group">
                <label htmlFor="jurisdiccion" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.jurisdiccion?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                  Jurisdicción
                </label>
                <Controller
                  name="jurisdiccion"
                  control={control}
                  rules={{ required: 'Este campo es necesario' }}
                  render={({ field }) => 
                    <CustomSelect
                      {...field}
                      options={jurisdicciones}
                      isMulti={false} 
                    />
                  }
                />
                <div className="w-full text-red-400 text-sm pb-2">
                  { errors.jurisdiccion?.message }
                </div>
              </div> */}
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-6 w-full group">
                <label htmlFor="perfil" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.perfil?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                  Perfil
                </label>
                <Controller
                  name="perfil"
                  control={control}
                  rules={{ required: 'Este campo es necesario' }}
                  render={({ field }) => 
                    <CustomSelect 
                      {...field}
                      options={perfiles}
                      isMulti={false} 
                    />
                  }
                />
                <div className="w-full text-red-400 text-sm pb-2">
                  { errors.perfil?.message }
                </div>
              </div>
              <div className="mb-6 w-full group">
                <label htmlFor="status" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.status?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                  Status
                </label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: 'Este campo es necesario' }}
                  render={({ field }) => 
                    <CustomSelect
                      {...field}
                      options={ statusActivado }
                      isMulti={false} 
                    />
                  }
                />
                <div className="w-full text-red-400 text-sm pb-2">
                  { errors.status?.message }
                </div>
              </div>
            </div>
            <button disabled={ isSaving } type="submit" className={`text-colorPrimario hover:text-white border-2 ${ !isSaving ? 'border-colorPrimario hover:bg-colorPrimario' : 'border-gray-400 hover:bg-gray-400' } focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>Guardar</button>
            <Link to='../lista' type="button" className="text-colorTerciario hover:text-white border-2 border-colorTerciario hover:bg-colorTerciario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12">Cancelar</Link>
          </form>
        </>
      }
    </>
  )
}
