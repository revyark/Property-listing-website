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
            <h2>Hotel Paris Rivoli</h2>
            <div className="location">
               <span>📍 Paris , Île-de-France , France</span>
            </div>
            <div className="category">
               <span> New Alamein <span title="Info">ℹ️</span></span>
            </div>
            <div className="favorite-icon">❤️</div>
        </div>
        <div className="ct2">
            <p className="p1">Choose Dates</p>
            <p className="p1"><input type="text" placeholder="check in"/><br/><br/>
            <input type="text" placeholder="guests"/></p>
        </div>
        <div className="ct3">
            🛏 16 beds
        </div>
        <div className="ct3">
            🛁 8 bathrooms
        </div>
         <div className="ct5">
            <p className="p1">
            <h1>About this listing</h1>
            <p className="p1">Situated in the famous Marais district surrounded by boutiques, monuments and museums, the Hotel Paris Rivoli offers three-star accommodations in the most desirable part of Paris.</p>
            <h1>The Space</h1>
            <table className="list-tb"><tr><td>2 Kitchen</td><td>🛏 16 beds</td><td>🛁 8 bathrooms</td></tr></table><hr style={{width:'670px',color:'#656161'}}/>
            <h1>The Space</h1>
            <table className="list-tb"><tr><td>Parking</td><td>🛏 Free Wifi</td><td>🛁 Air conditioning</td></tr></table><hr style={{width:'670px',color:'#656161'}}/>
            <h1>Safety Features</h1>
            <table className="list-tb"><tr><td>First Aid Box</td><td>🛏 Safety Guard</td><td>🛁 Smoke Detector</td></tr></table><hr style={{width:'670px',color:'#656161'}}/>
            <h1>Reviews</h1>
            <p className="p1">No reviews yet</p><hr style={{width:'670px',color:'#656161'}}/>
            </p>
            
        </div>
        
        <div className="ct4" style={{wordspacing:'30px'}}>
           <table>
          <tbody>
            <tr><td>0 Nights</td><td>0 ℹ️</td></tr>
            <tr><td>Service Fee</td><td>0</td></tr>
            <tr><td>Additional Guest fee</td><td>0</td></tr>
            <tr><td>Security Fee</td><td>0</td></tr>
            <tr><td>Cleaning Fee</td><td>0</td></tr>
            <tr><td>I.V.A Tax</td><td>0</td></tr>
            <tr><td>Accommodation Tax</td><td>0</td></tr>
            <tr><td>Discount</td><td>0</td></tr>
            <tr><td><strong>Total</strong></td><td><strong>0</strong></td></tr>
          </tbody>
        </table>
        <button className="instant-book">⚡ Instant Book</button>
        <p className="note">You’ll be able to review before paying.</p>
      </div>
        </div>
      </div>

  );
};

export default PropertyDetails;
