import { Button } from '@material-tailwind/react';
import React from 'react'


// const fondo ={
//     backgroundImage : 'url('+ banner +')',
// }



export const Banner = () => {
    return (
        <div>
            <div className="w-full md:col col-span-12">

                {/* style={{ backgroundImage: 'url(' + banner + ')' }} */}
                <div className="h-auto max-w-full"  >
                    <div className="max-w-screen-lg mx-auto p-5">
                        <div className="col-12">
                            <video controls  >
                                <source
                                    src="https://docs.material-tailwind.com/demo.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>
                    </div>
                </div>

                <div className="max-w-screen-2xl mx-auto p-4">
                    <div className="col-sm-12 ">
                        <p className="text text-lg text-justify">
                            Programa de Desarrollo Social Mujeres con Bienestar: programa social que tiene como propósito contribuir a elevar el ingreso económico de las mujeres de 18 a 64 años de edad que habitan en el Estado de México, que se encuentren en condición de pobreza y carencia por acceso a la seguridad social, mediante el otorgamiento de transferencias monetarias y servicios para el bienestar.
                        </p>
                        <p className="text text-lg text-justify">
                            Objetivo del programa: contribuir a elevar el ingreso económico de las mujeres de 18 a 64 años de edad que habitan en el Estado de México, que se encuentren en condición de pobreza y carencia por acceso a la seguridad social, mediante el otorgamiento de transferencias monetarias y servicios para el bienestar. Recibirán un apoyo monetario, de manera bimestral, por la cantidad de $2,500.00
                        </p>
                    </div>
                </div>

                <div className="max-w-fit mx-auto">
                    <div className="col-sm-12 ">
                        {/* <Button
                            variant="text"
                            className="flex items-center bg-red-900 
                        hover:bg-white hover:text-red-900 hover:border-red-900"
                            onClick={irCliente}>
                            Comenzar {" "}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-chevron-double-right w-5 h-5 " viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                                <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </Button> */}
                    </div>
                </div>

            </div>
        </div>
    )
};

