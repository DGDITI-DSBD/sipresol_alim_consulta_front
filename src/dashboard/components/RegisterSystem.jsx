import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { cleanData, storeData } from "../../store";


export const RegisterSystem = () => {
    const { token } = useSelector( state => state.auth );
    const { isSaving, status, dataValidate } = useSelector( state => state.validacion );
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const {register, control, formState: { errors }, handleSubmit } = useForm({
      defaultValues:{
      }
    });
      
      const onSubmit = ( data ) => {
          dispatch( storeData( '/store-system', data, token ) );
          // console.log(data);
      }
  
      if ( status === 'saved' ) {
        Swal.fire({
          title: 'Se ha agregado el registro',
          text: 'con nombre ' + dataValidate?.payload.name,
          icon: 'success',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonColor: '#175286',
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
          text: 'NOMBRE: ' + dataValidate?.payload.name,
          icon: 'warning',
          allowOutsideClick: false,
          showCancelButton: false,
          confirmButtonColor: '#175286',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
              dispatch( cleanData() );
          }
        });
      }
  
    const loading = true;
  
    return (
      <>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <h2 className="text-xl font-extrabold text-slate-500 pb-8">Registrar un sistema</h2>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 mb-6 w-full group">
              <input type="text" id="nombre" className={`block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 appearance-none dark:text-gray focus:outline-none focus:ring-0 ${!errors.nombre?.message ? 'border-gray-500 focus:border-green-600' : 'border-red-400 focus:border-red-400'} peer`} placeholder=" " autoComplete="on" 
                {...register( "nombre", { required: "Este campo es necesario"} )}
              />
              <label htmlFor="nombre" className={`peer-focus:font-medium absolute text-lg duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${!errors.nombre?.message ? 'text-gray-400 peer-focus:text-green-600' : 'text-red-400 peer-focus:text-red-400'} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
                Sistema
              </label>
              <div className="w-full text-red-400 text-sm pb-2">
                { errors.nombre?.message }
              </div>
            </div>
          </div>
          <button disabled={ isSaving } type="submit" className={`text-green-700 hover:text-white border-2 ${ !isSaving ? 'border-green-800 hover:bg-green-800' : 'border-gray-400 hover:bg-gray-400 bg-gray-400 text-white' } focus:ring-2 focus:outline-none focus:ring-green-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>Guardar</button>
          <Link to='../lista' type="button" className="text-rose-700 hover:text-white border-2 border-rose-700 hover:bg-rose-800 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 dark:border-rose-500 dark:text-gray-500 dark:hover:text-white dark:hover:bg-rose-600 dark:focus:ring-red-800 w-28 sm:w-80 mt-12">Cancelar</Link>
        </form>
      </>
    )
}
