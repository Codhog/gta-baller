

import * as React from 'react';
import ReactMapGL, {Popup} from 'react-map-gl';

export default function Map() {
    const [viewport, setViewport] = React.useState({
        longitude: -122.45,
        latitude: 37.78,
        zoom: 14
    });
    const [showPopup, togglePopup] = React.useState(false);

    return (
        <ReactMapGL {...viewport} width="100vw" height="100vh" onViewportChange={setViewport}>
            {showPopup && <Popup
                latitude={37.78}
                longitude={-122.41}
                closeButton={true}
                closeOnClick={false}
                onClose={() => togglePopup(false)}
                anchor="top" >
                <div>You are here</div>
            </Popup>}
        </ReactMapGL>
    );
}
