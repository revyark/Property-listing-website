import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const Modal = ({ show, onClose, content }) => {
  if (!show) return null;
  return (
    <div style={styles.modalBackdrop}>
      <div style={styles.modalContent}>
        <h2>Marker Info</h2>
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const GoogleMapCompListing = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // use REACT_APP_ prefix for env vars
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const markerData = [
    {
      id: 1,
      position: { lat: 28.6139, lng: 77.209 },
      info: "This is New Delhi",
    },
    {
      id: 2,
      position: { lat: 18.6139, lng: 77.209 },
      info: "This is a marker near Hyderabad",
    },
  ];

  if (!isLoaded) return <p>Loading Map...</p>; // don't render map until ready

  return (
    <div>
      <GoogleMap mapContainerStyle={containerStyle} center={markerData[0].position} zoom={5}>
        {markerData.map((marker) => (
          <Marker key={marker.id} position={marker.position} onClick={() => setSelectedMarker(marker)} />
        ))}
      </GoogleMap>

      <Modal show={selectedMarker !== null} onClose={() => setSelectedMarker(null)} content={selectedMarker?.info} />
    </div>
  );
};

const styles = {
  modalBackdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "300px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
};

export default GoogleMapCompListing;
