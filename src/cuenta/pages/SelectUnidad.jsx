import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { changePassword, cleanData, logout } from "../../store";
import { CustomSelect } from "../../ui/components";
import { useEffect, useState } from "react";



export const SelectUnidad = () => {

  const { id, token, unidades } = useSelector( state => state.auth );
  const { isSaving, status, dataValidate } = useSelector( state => state.validacion );
  const [ switchPage, setSwitchPage ] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {register, control, formState: { errors }, handleSubmit } = useForm({
    defaultValues:{
    }
  });
    
  const handleChange = value => {

    localStorage.setItem("unidadTrabajo", (value.value));
    localStorage.setItem("desUnidadTrabajo", (value.label));
  }

  // useEffect(() => {
  //   switchPage ? 
  //   Navigate(`./principal/`)
  //   // window.location.reload()
  //   : Swal.fire({
  //     title: 'Error',
  //     text: 'Intente nuevamente por favor',
  //     icon: 'warning',
  //     allowOutsideClick: false,
  //     showCancelButton: false,
  //     confirmButtonColor: '#8a2036',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Aceptar'
  //   })
  // }, [switchPage]);

  const handleChangePage = value => {
    const saved = localStorage.getItem("unidadTrabajo");
    saved != "" 
    ?
    navigate(`../principal/`)
    : 
    // setSwitchPage(false)
    Swal.fire({
      title: 'Error',
      text: 'Intente nuevamente por favor',
      icon: 'warning',
      allowOutsideClick: false,
      showCancelButton: false,
      confirmButtonColor: '#8a2036',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    })
     ;
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
        <div className="p-8 bg-white" >
            <h2 className="text-3xl font-extrabold text-slate-600 pb-1">Selecciona la unidad donde estaras trabajando</h2>
              <h2 className="text-xl font-extrabold text-slate-400 pb-8">Los certificados que realices  saldran asociados a la unidad que selecciones</h2>
            <div className="grid md:grid-cols-2 md:gap-6">
            <div className={`mt-4 mb-4 relative w-full group col-span-2`} >
                  <label
                    htmlFor="unidadTrabajo"
                    className={`peer-focus:font-medium absolute text-lg duration-300 transform mt-3 -translate-y-6 scale-75 origin-[0] peer-focus:left-0 ${
                      !errors.unidadTrabajo?.message
                        ? "text-gray-400 peer-focus:text-colorPrimario"
                        : "text-red-400 peer-focus:text-red-400"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}
                  >
                    Unidades a las que se encuentra adscrito
                  </label>
                  <Controller
                    name="unidadTrabajo"
                    control={control}
                    render={({ field: { onChange, value, ref } }) => (
                      <CustomSelect
                        options={unidades}
                        isMulti={false}
                        onChange={(e) => {
                          onChange(e.value);
                          handleChange(e);
                      }}
                      />
                    )}
                  />
                  <div className="w-full text-red-400 text-sm pb-2">
                    {errors.unidadTrabajo?.message}
                  </div>
                </div>
                
            </div>
            <button disabled={ isSaving } 
            onClick={e => handleChangePage(e)} 
            className={`text-colorPrimario hover:text-white border-2 ${ !isSaving ? 'border-colorPrimario hover:bg-colorPrimario' : 'border-gray-400 hover:bg-gray-400' } focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12`}>Guardar</button>
            {/* <Link to='../../dashboard' type="button" className="text-colorTerciario hover:text-white border-2 border-colorTerciario hover:bg-colorTerciario focus:ring-2 focus:outline-none focus:ring-colorSecundario font-medium rounded-lg  px-5 py-2.5 text-center mr-2 mb-2 w-28 sm:w-80 mt-12">Cancelar</Link> */}
        </div>
    </>
  )
}
