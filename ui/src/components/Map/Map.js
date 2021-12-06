//再写一个一模一样的这个放在Files
//点击可以上传坐标至firebase
import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import MapGL, {
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import Geocoder from 'react-map-gl-geocoder'
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'

import Pins from './pins';
import MapPopup from './MapPopup';

import {get, child, update, set} from "firebase/database";
import {dbRef, database} from '../firebase'

const TOKEN =
    'pk.eyJ1IjoiY2hlbno4NyIsImEiOiJja3VoYjB1ODgyZDJzMm5rNm90NzRjenp4In0.kTrjt38_JFTjLindaWKt8w';


const geolocateStyle = {
    top: 0,
    left: 0,
    padding: '10px'
};

const fullscreenControlStyle = {
    top: 36,
    left: 0,
    padding: '10px'
};

const navStyle = {
    top: 72,
    left: 0,
    padding: '10px'
};

const scaleControlStyle = {
    bottom: 36,
    left: 0,
    padding: '10px'
};

export default function Map() {

    const [mapData, setMapData] = useState(null)


    const [viewport, setViewport] = useState({
        latitude: 43.85195,
        longitude: -79.26603,
        zoom: 9,
        bearing: 0,
        pitch: 0
    });
    const [popupInfo, setPopupInfo] = useState(null);

    const mapRef = useRef();

    useEffect(()=>{
        get(child(dbRef, 'courtInfo/')).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val(), 'mapData')
                setMapData(snapshot.val());
            } else {
                console.log('nop data')
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [])
    return (
        <>
            <MapGL
                ref={mapRef}
                {...viewport}
                width="100%"
                height="100%"
                mapStyle="mapbox://styles/mapbox/dark-v9"
                onViewportChange={setViewport}
                mapboxApiAccessToken={TOKEN}

            >
                <Geocoder
                    mapRef={mapRef}
                    onViewportChange={setViewport}
                    mapboxApiAccessToken={TOKEN}
                    position="top-right"
                />
                {mapData && <Pins data={mapData}  onClick={setPopupInfo}/>}


                {popupInfo && (
                    <Popup
                        tipSize={8}
                        anchor="top"
                        longitude={popupInfo.longitude}
                        latitude={popupInfo.latitude}
                        closeOnClick={false}
                        onClose={setPopupInfo}
                    >
                        <MapPopup info={popupInfo} />
                    </Popup>
                )}

                <GeolocateControl style={geolocateStyle} />
                <FullscreenControl style={fullscreenControlStyle} />
                <NavigationControl style={navStyle} />
                <ScaleControl style={scaleControlStyle} />
            </MapGL>

        </>
    );
}