import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { CustomSelect } from "../../../ui/components";
import { cleanData, storeData } from "../../../store";


export const UsuarioForm = () => {

    const { token } = useSelector( state => state.auth );
    const { perfiles, jurisdicciones } = useSelector( state => state.catalogos );
    const { isSaving, status, dataValidate } = useSelector( state => state.validacion );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, control, formState: { errors }, handleSubmit } = useForm({
        defaultValues:{
            password: '12345678',
            repeat: '12345678'
        }
    });
    
    const onSubmit = ( data ) => {
        // const newUsuario = storeUsuario( data );
        // dispatch( storeUsuario( data, token ) );
        dispatch( storeData( '/store-user', data, token ) );
      
    }

    if ( status === 'saved' ) {
      Swal.fire({
        title: 'Se ha agregado el registro',
        // text: 'con nombre ' + dataValidate?.payload.email,
        icon: 'success',
        allowOutsideClick: false,
        showCancelButton: false,
        confirmButtonColor: '#8a2036',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if (result.isConfirmed) {
            dispatch( cleanData() );
            navigate("../principal");
        }
      });
    } else if ( status === 'fail' ) {
      Swal.fire({
        title: 'Ese registro ya existe',
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
            navigate("../catalogo/usuario");
        }
      });
    }

  return (
    <>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <h2 className="text-xl font-extrabold text-slate-500 pb-8">Registrar datos del usuario</h2>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input type="text" id="name" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.name?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" " autoComplete="on" 
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
            <input type="text" id="email" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.email?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" "
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
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-6 w-full group">
            <label htmlFor="perfil" className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${!errors.perfil?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              Perfil
            </label>
            <Controller
              name="perfil"
              control={control}
              defaultValue={perfiles}
              rules={{ required: 'Este campo es necesario' }}
              render={({ field }) => 
              <CustomSelect 
                {...field}
                defaultValue={perfiles}
                options={perfiles}
                isMulti={false} 
              />}
            />
            <div className="w-full text-red-400 text-sm pb-2">
              { errors.perfil?.message }
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 mb-6 w-full group">
            <input type="password" id="password" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.password?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" " autoComplete="on" 
              {...register( "password", { required: "Este campo es necesario"} )}
            />
            <label htmlFor="password" className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.password?.message ? 'text-gray-400 peer-focus:text-colorPrimario' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              Contraseña
            </label>
            <div className="w-full text-red-400 text-sm pb-2">
              { errors.password?.message }
            </div>
          </div>
          <div className="relative z-0 mb-6 w-full group">
            <input type="password" id="repeat" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 ${!errors.repeat?.message ? 'border-gray-500 focus:border-colorPrimario' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" "
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
        <Link to='../lista' type="button" className="text-colorTerciario hover:text-white border-2 border-colorTerciario hover:bg-colorTerciario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12">Cancelar</Link>
      </form>
    </>
  )
}
