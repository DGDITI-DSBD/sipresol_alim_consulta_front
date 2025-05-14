import Ondas from '../../images/ondas3.svg';
import LogoBienestar from '../../images/logo-bienestar_blank.png';
import useWindowSize from '../../hooks/useWindowSize';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export const EmptyList = () => {


  const backgroundLogin = {
    backgroundImage: 'url(' + Ondas + ')',
    backgroundRepeat: 'no-repeat', 
    backgroundSize: '100% 100%'
}

  const size = useWindowSize(); 

return (
    <main className="bg-gradient-to-r from-red-900 from-1% via-colorPrimario via-95% to-colorPrimario to-90%" >
        <div style={backgroundLogin}>    
            <div className="relative md:flex h-screen w-screen">
                <div className="flex-1 pt-40">
                    <div className='flex items-center justify-center pb-14'>
                        <img className="w-48 h-48" src={LogoBienestar} style={{height: `${size.width < 800 ? "50px" : "100px"}`, width: `${size.width < 800 ? "200px" : "450px"}`}} alt="ave"/>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className = "flex grid grid-row-4 items-center justify-items-center gap-4">
                            {/* <DotLottieReact
                              src="https://lottie.host/61bd3bb4-aae2-4689-9b66-6d63a980d6e4/UwAWjZ4fnY.lottie"
                              
                              loop
                              autoplay
                            /> */}
                            <p class="font-[Montserrat] text-lg text-white text-center" >Los operadores del programa no han aperturado los datos necesarios.</p> 
                            <p class="font-[Montserrat] text-lg text-white text-center text-bold" >Espere a las indicaciones de la dependencia ejecutora.</p> 
                            <Link to = "/" type = "button" class = "inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-colorSecundario rounded-lg">Regresar a inicio</Link>
                        </div>

                       
{/*                        
                        <img className="w-24 h-24 sm:w-auto sm:h-full"
                        style={{width: `${size.width < 500 ? "100px" : "100px"}`, height: `${size.width < 500 ? "100px" : "100px"}`}}
                        src={Loading} alt="Loading"/> */}
                    </div>
                </div>
            </div>
        </div>
    </main>
  );


}
