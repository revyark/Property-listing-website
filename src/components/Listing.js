import React from 'react'
import './Listing.css'

export default function Listing() {
  return (
    <div className="mainctnr">
        <h1>Start your listing journey</h1>
        <p>From here on you can start your listing journey</p>
        <div className="formlisting">
            <form>
                <div className="formfield">
                    <label htmlFor="hometype">Home Type</label>
                    <select id="hometype" className="sel1">
                        <option value="Apartments">Apartments</option>
                        <option value="Compounds">Compounds</option>
                        <option value="Cabins">Cabins</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Open Terrace">Open Terrace</option>
                    </select>
                </div>
                <div className="formfield">
                    <label htmlFor="coastalarea">Coastal Area</label>
                    <select id="coastalarea" className="sel1">
                        <option value="North-Coast">North-Coast</option>
                        <option value="South-Coast">South-Coast</option>
                        <option value="South-Sinai">South-Sinai</option>
                    </select>
                </div>
                <div className="formfield">
                    <label htmlFor="compound">Compound Name</label>
                    <select id="compound" className="sel1">
                        <option value="Apartments">Apartments</option>
                        <option value="Compounds">Compounds</option>
                        <option value="Cabins">Cabins</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Open Terrace">Open Terrace</option>
                        <option value="Apartments">Apartments</option>
                        <option value="Compounds">Compounds</option>
                        <option value="Cabins">Cabins</option>
                        <option value="Townhouse">Townhouse</option>
                        <option value="Open Terrace">Open Terrace</option>
                    </select>
                </div>
                <div className="formfield">
                    <label htmlFor="accomodates">Accomodates</label>
                    <select id="accomodates" className="sel1">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div className="formfield">
                    <label htmlFor="roomtype">Room Type</label>
                    <select id="roomtype" className="sel1">
                        <option value="Private room">Private room</option>
                        <option value="Shared room">Shared room</option>
                    </select>
                </div>
                <div className="formfield">
                   <label htmlFor="city">City</label>
                   <input id="city" type="text"  />
                </div>

                <button className="list-btn">Continue</button>
            </form>
        </div>
    </div>
  )
}