import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import AuthImage from '../../images/Designer1.jpeg';
import AuthDecoration from '../../images/logos_edomex_old.png';
import Ondas from '../../images/ondas3.svg';
import LogoEdoMex from '../../images/logoedomex_plasta.svg';
import LogoIsem from '../../images/logo_isem.svg';
import Cintillo from '../../images/cintillo.svg';
import { checkingAutentication } from '../../store/auth/';
import Swal from 'sweetalert2';


const backgroundLogin = {
    backgroundImage: 'url(' + Ondas + ')',
    backgroundRepeat: 'no-repeat', 
    backgroundSize: '50% 100%'
}

export const LoginPage = () => {

  const { status, fallo } = useSelector( state => state.auth );

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm( {
    defaultValues: {
      email: '',
      password: '',
    }
  });
  
  (fallo !== undefined && fallo !== 6) ?
    Swal.fire({
      title: '¡Hubo un problema al iniciar sesión!',
      text: (fallo === 1) ? 'Tu usuario o contraseña son incorrectos' : ((fallo === 2) ? 'Tu usuario o contraseña son incorrectos' : ((fallo === 3) ? 'El servidor no esta disponible' : ((fallo === 4) ? 'Tu sesión ha expirado' : 'Contactate con soporte técnico'))),
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonColor: '#8A2036',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      dispatch(logout());
    })
    : null;

  const isAuthenticated = useMemo( () => status === 'checking', [status] );

  const onSubmit = ( data ) => {

    dispatch( checkingAutentication( data ) );

  };

  return (
    <main className="bg-gradient-to-r from-colorPrimario from-1% via-slate-950 via-95% to-slate-950 to-90%" >
    <div style={backgroundLogin}>
    

      <div className="relative md:flex">

        {/* Content */}
        <div className="md:w-1/2">
          <div className="min-h-screen h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className='flex items-center justify-center'>
                <img className="w-48 h-48 sm:w-auto sm:h-full pt-14" src={LogoIsem} alt="ISEM"/>
              </div>
            </div>

            <div className="max-w-sm mx-auto px-4 py-8 pt-24">
              <h1 className="text-3xl font-bold mb-8 text-center text-white">Bienvenido al Sistema de Quejas y Denuncias Sanitarias</h1>
              {/* Form */}
              <form onSubmit={ handleSubmit(onSubmit) }>
                <div className="space-y-4">
                  <div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input type="text" id="email" className={`block py-2.5 px-0 w-full text-lg text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.email?.message ? 'focus:border-colorSecundario' : 'focus:border-red-400'} peer`} placeholder=" " autoComplete="on" 
                        {...register("email", { required: "Este campo es necesario", 
                                      // pattern: {
                                      //   value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                      //   message: "Correo no valido (ejemplo@ejemplo.com)"
                                      // }
                                    }
                        )}
                      />
                      <label htmlFor="email" className={`peer-focus:font-medium absolute text-lg text-gray-300 dark:text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.email?.message ? 'peer-focus:text-colorSecundario' : 'peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                        Usuario
                      </label>
                      <div className="w-full text-red-400 text-sm pb-2">
                        { errors.email?.message }
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative z-0 mb-6 w-full group">
                      <input type="password" id="password" className={`block py-2.5 px-0 w-full text-lg text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.password?.message ? 'focus:border-colorSecundario' : 'focus:border-red-400'} peer`} placeholder=" " autoComplete="on"
                        {...register("password", { required: "Este campo es necesario", 
                                      minLength: {
                                        value: 8,
                                        message: "Tu contraseña debe tener al menos 8 caracteres"
                                      } }
                        )}
                      />
                      <label htmlFor="password" className={`peer-focus:font-medium absolute text-lg text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.password?.message ? 'peer-focus:text-colorSecundario' : 'peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                        Contraseña
                      </label>
                      <div className="w-full text-red-400 text-sm pb-2">
                        { errors.password?.message }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-16">
                  <div className="mr-1">
                    {/* <NavLink className="text-sm underline hover:no-underline text-gray-300" to="/auth/reset-password">¿Olvisate tu contraseña?</NavLink> */}
                  </div>
                  <button 
                  // disabled={ isAuthenticated } 
                  type='submit' className="text-colorSecundario hover:text-white border-2 hover:border-colorSecundario border-colorSecundario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2  w-20 sm:w-48">Ingresar</button>
                </div>
              </form>
              {/* Footer */}
            </div>
            <img className="pt-28" src={Cintillo} alt="Cintillo"/>

          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
          <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024" alt="Authentication" />
          {/* <img className="absolute top-10 left-0 ml-8 hidden lg:block" src={LogoEdoMex} width="330" height="330" alt="Authentication decoration" /> */}
          <img className="absolute bottom-10 left-0  hidden lg:block" src={AuthDecoration} width="1000" height="330" alt="Authentication decoration" />
        </div>

      </div>
    </div>

    </main>
  );
}

