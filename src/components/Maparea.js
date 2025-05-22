import React from 'react'
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 28.6139, // Example: New Delhi
  lng: 77.2090
};

export default function MapView() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyAQHXJoP5wm_m7NkR-bmclprlIctSF54n4">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}