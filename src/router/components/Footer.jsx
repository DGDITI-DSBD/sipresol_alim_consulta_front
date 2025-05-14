import React from 'react'
import Colibri from '../../images/colibri.png'
import ColibriC from '../../images/colibri-cafe.png'


export const Footer = () => {
    return (
        <div>
            <footer class="text-white shadow-xl bg-colorPrimario">
                <div class="w-full max-w-screen-2xl mx-auto md:py-5">
                    <div class="sm:flex sm:items-center sm:justify-between">
                        <a href="#" class="flex justify-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                            <img src={ColibriC} class="h-8" alt="Flowbite Logo" />
                            <span class="text-2xl font-semibold dark:text-white">| Gobierno del Estado de México</span>
                        </a>
                        <ul class="flex flex-wrap items-center justify-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                            <li>
                                {/* <a href="#" class="hover:underline me-4 md:me-6 text-white">Acerca de</a> */}
                            </li>
                            <li>
                                {/* <a href="#" class="hover:underline me-4 md:me-6 text-white">Politica de Privacidad</a> */}
                            </li>
                        </ul>
                    </div>
                    <hr class="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 " />
                    <span class="block text-sm text-white sm:text-center dark:text-gray-400 text-center">© 2025 - <a href="https://flowbite.com/" class="hover:underline">Dirección General de Desarrollo Institucional y Tecnologías de la Información</a></span>
                </div>
            </footer>

        </div>
    )
};


