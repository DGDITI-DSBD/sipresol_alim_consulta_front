import React from 'react'
import Colibri from '../../images/colibri.png'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanData } from '../../store';



const StateBar = () => {

    const folio = useSelector(state => state.validacion.folio);
    const curp = useSelector(state => state.validacion.curp);
    const id = useSelector(state => state.validacion.id);
    const dispatch = useDispatch(); // Agregar el dispatch

        
    

    const navigate = useNavigate();

        // agregar validacion para limpiar y quitar datos del formulario cuando se cierre la sesion 
    const closeSession = () => {

        Swal.fire({
            title: '¿Estas segura que quieres salir?',
            text:'Si sales del registro, se perderan los datos ingresados que no han sido guardados,de lo contrario, si has guarda los datos, estos se mantendran en el sistema para su posterior consulta.',
            icon: 'warning',
            width: '40rem',
            showDenyButton: true,
            confirmButtonText: 'Si, salir',
            confirmButtonColor: '#BC955B',
            denyButtonText: 'Cancelar',
            denyButtonColor: '#8a2036',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cleanData());
               
                Swal.fire({
                    title: 'Registro Concluido',
                    text: 'Gracias por tu registro, tu información registrada la podras consultar en las fechas publicadas en la pagina de Gobierno del Estado de México.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'green',

                })
                    .then(function () {

                        navigate('../validar/CURP');
                    });
            }
            else if (result.isDenied) {
                Swal.fire({
                    title: 'Peticion Cancelada',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'red'
                })

            }
        })

    }


    return (
        <>
            <nav className="bg-white shadow-xl">
                {/* <div className="container mx-auto flex flex-col">
            <label className='w-full text-wrap text-center p-4 font-bold text-red-600'>ESTE SISTEMA ESTÁ EN PRUEBAS</label>
            </div> */}
                <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row justify-between items-center">

                    <div className="flex items-center justify-center w-full p-2 sm:w-auto sm:flex-row">
                        <img
                            src={Colibri}
                            alt="Logo"
                            width={30}
                            height={30}
                            className="mr-4"
                        />
                      
                    </div>
                    <h1 className='text-wrap w-full sm:w-auto text-center text-bold'>Secretaría de Bienestar</h1>
                    <label className='w-full text-center p-4 sm:w-auto sm:text-left text-bold'>Dirección de Bienestar Social y Fortalecimiento Familiar</label>
                </div>
            </nav>
        </>
    )
}

export default StateBar
