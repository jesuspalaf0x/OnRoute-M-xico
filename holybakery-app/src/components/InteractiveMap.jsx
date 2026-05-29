import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '100%'
};

const defaultCenter = {
  lat: 20.2114, // Tulum coords
  lng: -87.4654
};

export default function InteractiveMap({ pin, onPinChange, readOnly }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyCa0KLqz3D9t42MEAYcEEzgDPo6n-uYja4'
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleClick = (e) => {
    if (!readOnly && onPinChange) {
      onPinChange({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  const handleDragEnd = (e) => {
    if (!readOnly && onPinChange) {
      onPinChange({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
    }
  };

  const center = pin || defaultCenter;

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={handleClick}
      options={{
        disableDefaultUI: true,
        mapTypeId: 'satellite',
        gestureHandling: readOnly ? 'greedy' : 'auto'
      }}
    >
      {pin && (
        <Marker
          position={pin}
          draggable={!readOnly}
          onDragEnd={handleDragEnd}
        />
      )}
    </GoogleMap>
  ) : <></>;
}
