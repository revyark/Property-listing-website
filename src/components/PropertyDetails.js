import React from "react";
import { useParams } from "react-router-dom";
import card1 from "./images/card1.png";
import "./PropertyDetails.css";
const PropertyDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Property Details for ID: {id.title}</h2>
      <div>
        <img src={card1} className="c1"/>
      </div>
      <div className="mainct">
        <div className="ct1">
            <p>
            <h1>Hotel Paris Rivoli</h1>
             Paris , Île-de-France , France<br/>New Alamein </p>
        </div>
        <div className="ct2">
            <p>Choose Dates</p>
            <p><input type="text" placeholder="check in"/><br/><br/>
            <input type="text" placeholder="guests"/></p>
        </div>
        <div className="ct3">
            16 beds
        </div>
        <div className="ct3">
            8 bathrooms
        </div>
         <div className="ct5">
            <p>
            <h1>About this listing</h1>
            <p>Situated in the famous Marais district surrounded by boutiques, monuments and museums, the Hotel Paris Rivoli offers three-star accommodations in the most desirable part of Paris.</p>
            </p>
        </div>
        <div className="ct4" style={{wordspacing:'30px'}}>
            <p>
                0 Nights 0<hr/>
                Service Fee	0<hr/>
                Additional Guest fee	0<hr/>
                Security Fee	0<hr/>
                Cleaning Fee	0<hr/>
                I.V.A Tax	0<hr/>
                Accommodation Tax	0<hr/>
                Discount	0<hr/>
                Total	0<hr/>
            </p>
        </div>
       
      </div>
    </div>
  );
};

export default PropertyDetails;
