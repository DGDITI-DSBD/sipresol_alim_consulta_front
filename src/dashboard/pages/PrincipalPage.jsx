import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import WelcomeBanner from "../../ui/components/WelcomeBanner";
import CryptoJS from "crypto-js";
import { pass } from '../../api';



export const PrincipalPage = () => {

  const { firstTime, unidades, id } = useSelector( state => state.auth );
  const navigate = useNavigate();

  useEffect(() => {
    if( firstTime == 0 ) {
      navigate(`../reset-password/${ CryptoJS.AES.encrypt( JSON.stringify( id ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`);
    }
  }, [firstTime]);
  
  // const saved = localStorage.getItem("unidadTrabajo");
  // // console.log(saved)
  // useEffect(() => {
  //   if( firstTime == 1 && unidades.length >= 1 && (saved == "" || saved === null) ) {
  //     navigate(`../select-unidad/${ CryptoJS.AES.encrypt( JSON.stringify( id ),pass ).toString().replace(/\+/g,'p1L2u3S').replace(/\//g,'bXaJN0921').replace(/=/g,'e1Q2u3A4l') }`);
  //   }
  // }, [unidades]);

    return (
      <>
         <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <WelcomeBanner />
          <div className="grid grid-cols-12 gap-6">
            
          </div>
        </div>
      </>
  );

}
