import React, {useEffect, useState} from 'react';
import CryptoJS from "crypto-js";
import { urlBase } from '../../api';
import { useParams } from "react-router-dom";
import { pass } from '../../api';
import axios from 'axios';




export const Personalinfo = () => {

    

    const params = useParams();

    
    // const decrypUrl = params.id.replace(/p1L2u3S/g, '+' ).replace(/bXaJN0921/g, '/').replace(/e1Q2u3A4l/g, '=')
    // const bytes = CryptoJS.AES.decrypt(decrypUrl, pass);
    // const folio = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    const handleExampleData = async (info) => {

      

    }

    return (
        <>


        <div className={`bg-white w-full`} >

        </div>

            
        </>
    );


}