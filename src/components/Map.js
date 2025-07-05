import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const GoogleMapComp = ({ latitude = 20.5937, longitude = 78.9629 }) => {
  const containerStyle = {
    width: "1100px",
    height: "400px",
    margin:"100px",
  };

  const center = {
    lat: latitude ||28.6139  ,
    lng: longitude||77.209  ,
  };

  return (
    <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
        {/* Example Marker */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComp;