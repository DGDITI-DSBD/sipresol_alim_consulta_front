import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import AuthImage from '../../images/background-orange.jpg';
// import AuthDecoration from '../../images/logo-colibri.png';
import Ondas from '../../images/ondas3.svg';
import LogoEdoMex from '../../images/logos_edomex3.png';
import LogoIsem from '../../images/escudo-edomex.png';
// import Cintillo from '../../images/cintillo.svg';
import { checkingAutentication } from '../../store/auth/';
import Swal from 'sweetalert2';
import { Button } from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';


const backgroundLogin = {
  backgroundImage: 'url(' + Ondas + ')',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%'
}

export const LoginPage = () => {
  const navigate = useNavigate();

  const Principal = () => {
    navigate('../CURP');

  }

  const { status, fallo } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm({
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

  const isAuthenticated = useMemo(() => status === 'checking', [status]);

  const onSubmit = (data) => {

    dispatch(checkingAutentication(data));

  };

  return (
    <main className="bg-gradient-to-r from-red-900 from-1% via-colorPrimario via-95% to-colorPrimario to-90%" >
      <div style={backgroundLogin}>




        <div className=" grid grid-cols-12">

          {/* Image */}
          <div className="hidden md:block col-span-6 top-0 bottom-0 left-0  h-svh" aria-hidden="true">
            <img className="object-cover object-center w-full h-svh" src={AuthImage} alt="Authentication" />
            {/* <img className="absolute top-10 right-0 mr-12 hidden lg:block" src={LogoEdoMex} width="200" height="330" alt="Authentication decoration" /> */}
            <img className="absolute top-10 left-0 mr-12 hidden lg:block" src={LogoIsem} width="200" height="330" alt="Authentication decoration" />
            {/* <img className="absolute top-10 right-0 mr-12 hidden lg:block" src={AuthDecoration} width="300" height="330" alt="Authentication decoration" /> */}
          </div>

          {/* Content */}
          <div className="md:col-span-6 col-span-12 h-svh">
            <div className="min-h-screen h-full flex flex-col after:flex-1">

              {/* Header */}
              <div className="flex-1 mt-6">
                <div className='flex items-center justify-center'>
                  {/* <img className="w-80 h-32 " width="200" height="330" src={LogoIsem} alt="ISEM"/> */}
                  <img className="" src={LogoEdoMex} width="200" height="330" alt="Authentication decoration" />
                </div>
              </div>

              <div className="max-w-sm mx-auto px-4 py-8 pt-12">
                <div className='p-5'>
                  {/* <Link
                  to={'../../router/AppRouter.jsx'}>
                  Regresar
                  </Link> */}

                </div>

                <h1 className="text-3xl font-bold mb-8 text-center text-white">Bienvenido al Sistema</h1>


                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-4">
                    <div>
                      <div className="relative z-0 mb-6 w-full group">
                        <input type="text" id="email" className={`block py-2.5 px-0 w-full text-lg text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.email?.message ? 'focus:border-colorSecundario' : 'focus:border-red-400'} peer`} placeholder=" " autoComplete="on"
                          {...register("email", {
                            required: "Este campo es necesario",
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
                          {errors.email?.message}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="relative z-0 mb-6 w-full group">
                        <input type="password" id="password" className={`block py-2.5 px-0 w-full text-lg text-gray-100 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.password?.message ? 'focus:border-colorSecundario' : 'focus:border-red-400'} peer`} placeholder=" " autoComplete="on"
                          {...register("password", {
                            required: "Este campo es necesario",
                            minLength: {
                              value: 8,
                              message: "Tu contraseña debe tener al menos 8 caracteres"
                            }
                          }
                          )}
                        />
                        <label htmlFor="password" className={`peer-focus:font-medium absolute text-lg text-gray-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.password?.message ? 'peer-focus:text-colorSecundario' : 'peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                          Contraseña
                        </label>
                        <div className="w-full text-red-400 text-sm pb-2">
                          {errors.password?.message}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center md:justify-between justify-center mt-16">
                    <div className="mr-1">
                      {/* <NavLink className="text-sm underline hover:no-underline text-gray-300" to="/auth/reset-password">¿Olvisate tu contraseña?</NavLink> */}
                      <Button
                        title='Menu Principal'
                        className="bg-colorPrimario text-colorSecundario hover:text-white border-2 hover:border-colorSecundario border-colorSecundario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg text-center w-full p-4"
                        onClick={Principal}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-house-fill w-8 h-8" viewBox="0 0 16 16">
                          <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                          <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293z" />
                        </svg>
                      </Button>
                    </div>
                    <button
                      // disabled={ isAuthenticated } 
                      type='submit'
                      className=" text-colorSecundario hover:text-white border-2 hover:border-colorSecundario border-colorSecundario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg text-center w-full p-4"
                    >Ingresar</button>

                  </div>

                </form>
                {/* Footer */}
              </div>


            </div>
          </div>






        </div>
      </div>

    </main>
  );
}

