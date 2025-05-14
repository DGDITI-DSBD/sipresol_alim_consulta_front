import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
// import { GeocodingControl } from "@maptiler/geocoding-control/react";
import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
import "@maptiler/geocoding-control/style.css";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import useWindowSize from '../../hooks/useWindowSize';
import { useDispatch, useSelector } from 'react-redux';
import { cleaningCoord, sendingCoord } from '../../store/public/CoordSlice';
import { GeocodingControl } from "@maptiler/geocoding-control/maptilersdk";

export const MapaPage = (props) => {
  
  let lat = 0;
  let lng = 0;
  const size = useWindowSize();
  const dispatch = useDispatch();
  const { token } = useSelector( state => state.auth );
  const [options, setOptions] = useState(0);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const toluca = { lng: -99.656597, lat: 19.091228 };
  const [zoom] = size <= 1000 ? (useState(1)) : (useState(8.5));
  const [waiting, setWaiting] = useState(0);
  const urlExternas = 'https://ddsisem.edomex.gob.mx/sistam-backend/api/v1';
  const [mapController, setMapController] = useState();
  maptilersdk.config.apiKey = 'hgRFrLTm6gbfZyNzhFrg';
  const markerHeight = 50, markerRadius = 10, linearOffset = 25;
    
  useEffect( () => {
    async function loadMap() 
    {
      map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [toluca.lng, toluca.lat],
      zoom: zoom,
      pitch: 45,
      hash: false,
      scaleControl: true,
      fullscreenControl: "top-left",
    });

    map.current.on('click', function (e) {
      if(lat == 0 && lng == 0)
      {
        let objCood = {lat: e.lngLat.lat, lng: e.lngLat.lng};
        dispatch( sendingCoord( objCood ) );
        
          const marker = new maptilersdk.Marker({
            draggable: true,
            color: "#000000",
          }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.current);
      
        if(marker._lngLat.lng != 0){lat = 1;lng = 1;}

        function onDragEnd() {
          var lngLat = marker.getLngLat();
          let objCood = {lat: lngLat.lat, lng: lngLat.lng};
          dispatch( sendingCoord( objCood ) );
          console.log('Longitude: ' + lngLat.lng + ' Latitude: ' + lngLat.lat)
      }
        marker.on('dragend', onDragEnd);
      }
  });

  const gc = new GeocodingControl({
    collapsed: true,
    country: 'mx',
    limit: 5
  });

  map.current.addControl(gc);

  map.current.on('styleimagemissing', function (e) {
    var id = e.id; // id of the missing image
    map.current.addImage(id, { width: 0, height: 0 });
  });

    const results = await maptilersdk.geocoding.forward(props.colonia + ', ' + props.municipio, { proximity: ['99.65696033173458','19.29247627489434'], country: ['mx'] });
    // console.log(results)
    if (results.features[0]) 
        map.current.fitBounds(results.features[0].bbox, {maxZoom: 15, padding: 20})

        setMapController(createMapLibreGlMapController(map.current, maptilersdk));
    }
    loadMap();
    }, [options, props.municipio, props.colonia]);

  return (

    <div className="bg-white rounded-lg shadow-2xl grid grid-cols-12 p-2 mt-0">
      <div className='twelver col-span-12 '>
        <h1 className='text-pretty' style={{textWrap: "pretty"}}>Ubica el establecimiento en el mapa</h1>
       </div>
        <div className="map-wrap col-span-12 md:col-span-10">
          <div className="geocoding">
          </div>
          <div ref={mapContainer} className="map" />
        </div>

        <div className='col-span-12 md:col-span-2 pl-4 pr-4'>
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Instrucciones:</h2>
            <ul className="max-w-md text-justify space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
                <li className='p-1'>
                    El mapa inicia en la colonia / codigo  postal digitada al inicio.
                </li>
                <li className='p-1'>
                    En caso de no coincidir puedes usar el buscador registrando el Municipio, Codigo Postal o Localidad del establecimiento.
                </li>
                <li className='p-1'>
                    Solo puedes elegir un punto en el mapa                
                </li>
                <li className='p-1'>
                    Puedes arrastrar el punto en cualquier dirección                    
                </li>
            </ul>
        </div>
    </div>
  );


}
export default MapaPage;