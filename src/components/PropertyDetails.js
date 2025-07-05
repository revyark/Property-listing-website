import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import card1 from "./images/card1.png";
import "./PropertyDetails.css";
import user from "./images/user.jpg";
import p5 from "./images/p5.jpg";
import { DateRange } from 'react-date-range';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {useNavigate} from 'react-router-dom';
import GoogleMapComp from "./Map";
const PropertyDetails = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [modalOpen, setModalOpen] = useState(null);

  const openModal = (section) => {
    setModalOpen(section);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const [details,setDetails]=useState({
    'property_name': 'Hotel Paris Rivoli',
    'Summary':'Situated in the famous Marais district surrounded by boutiques monuments and museums, the Hotel Paris Rivoli offers three-staraccommodations in the most desirable part of Paris.',
    'property_type':'Apartment',
    'property_image':card1,
    'Accomodates':0,
    'city':'Paris',
    'country':'France',
    'region':'Ille du juis',
    'beds':0,
    'bathrooms':0,
    'kitchens':0,
    'bedrooms':0,
    'bed_type':'King',
    'host_fname':'Snehil',
    'host_lname':'Deo',
    'Member_since':'February 2025',
    'Profile_picture':user,
    'email':'',
    'phone':''
  })
  const [Languages,setLanguages]=useState([
    'English',
    'Arabic',
  ])
  const [theSpaceItems,setSpaceItems] =useState([
    "2 Kitchens",
    "16 beds",
    "8 bathrooms",
    "Parking",
    "Free Wifi",
    "Air conditioning",
  ]);

  const [popularAmenities,setPopularAmenities] = useState([
    "Kitchen",
    "Internet",
    "Gym",
    "Elevator in Building",
    "Indoor Fireplace",
    "Buzzer/Wireless Intercom",
    "Doorman",
    "Shampoo",
    "Wireless Internet",
    "Hot Tub",
    "Washer",
    "Pool",
    "Dryer",
    "Breakfast",
    "Free Parking on Premises",
    "Family/Kid Friendly",
    "Smoking Allowed",
    "Suitable for Events",
    "Pets Allowed",
    "Pets live on this property",
    "Wheelchair Accessible"
  ]);

  const [safetyFeatures,setSafetyFeatures] = useState([
    "First Aid Box",
    "Safety Guard",
    "Smoke Detector",
    "Fire Extinguisher",
    "Carbon Monoxide Detector",
    "Kitchen",
    "Internet",
    "Gym",
    "Elevator in Building",
    "Indoor Fireplace",
    "Buzzer/Wireless Intercom",
    "Doorman",
    "Shampoo",
    "Wireless Internet",
    "Hot Tub",
    "Washer",
    "Pool",
    "Dryer",
    "Breakfast",
    "Free Parking on Premises",
    "Family/Kid Friendly",
    "Smoking Allowed",
    "Suitable for Events",
    "Pets Allowed",
    "Pets live on this property",
    "Wheelchair Accessible"
  ]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const formatDisplay = () => {
    const start = dateRange[0].startDate.toLocaleDateString();
    const end = dateRange[0].endDate.toLocaleDateString();
    return `${start} - ${end}`;
  }
  const handleClick =()=>{
    navigate(`/booking_details/${id}`)
  }
  useEffect(()=>{
    const fetchDetails =async()=>{
      try{
        const response=await fetch('http://localhost:5000/api/dashboard/property/details',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',

          },
          credentials:'include',
          body:JSON.stringify({'prop_id':id})
        });
        const data=await response.json();
        if (response.ok){
          console.log(data);
           setDetails(data)
           setLanguages(data.Languages)
           setPopularAmenities(data.amenities)
           setSafetyFeatures(data.safety_features)
           setSpaceItems([`${data.kitchens} kitchens`,`${data.beds} beds`,`${data.bathrooms} bathrooms`,`${data.bed_type} bed type`,`${data.bedrooms} bedrooms`,`Accomodates ${data.Accomodates} people`])
          }
        else{
          console.error(data.error)
        }
        
      }catch(err){
        console.error(err);
      }
    };
    fetchDetails();
  },[])
  return (
    <>
    <div style={{ padding: "2rem" }}>
      <h2>Property Details for ID: {id.title}</h2>
      <div>
        <img src={details.property_image} className="c1" />
      </div>
      <div className="mainct">
        <div className="ct1">
          <h2>{details.property_name}</h2>
          <div className="location">
            <span>📍 {details.city} , {details.region} , {details.country}</span>
          </div>
          <div className="category">
            <span>
              {" "}
              {details.city} <span title="Info">ℹ️</span>
            </span>
          </div>
          <div className="favorite-icon">❤️</div>
        </div>
        < div className="ct2">
         <p className="p1">Choose Dates</p>
      <div className="calendar-wrapper">
        <input
          type="text"
          placeholder="Add dates"
          className="calendar-input"
          onClick={() => setShowCalendar(!showCalendar)}
          readOnly
          value={formatDisplay()}
        />
        {showCalendar && (
          <div className="calendar-dropdown">
            <DateRange
              locale={enUS}
              editableDateInputs={true}
              onChange={item => setDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </div>
        )}
      </div>
      <br />
      <input type="text" placeholder="guests" className="guest-input" />
        </div>
        <div className="ct3">🛏 Accomodates:{details.Accomodates}</div>
        <div className="ct3">🛁 Property type:{details.property_type}</div>
        <div className="ct5">
          <p className="p1">
            <h1>
              About this listing
            </h1>
            <p className="p1">
              {details.Summary}
            </p>

            <div className="heading-with-see-more">
              <h1>The Space</h1>
              <button
                className="see-more-btn"
                onClick={() => openModal("theSpace")}
                aria-label="See more The Space"
              >
                See More
              </button>
            </div>
            <table className="list-tb">
              <tbody>
                <tr>
                  <td>{theSpaceItems[0]}</td>
                  <td>🛏 {theSpaceItems[1]}</td>
                  <td>🛁 {theSpaceItems[2]}</td>
                </tr>
              </tbody>
            </table>
            <hr style={{ width: "670px", color: "#656161" }} />

            <div className="heading-with-see-more">
              <h1>Popular Amenities</h1>
              <button
                className="see-more-btn"
                onClick={() => openModal("popularAmenities")}
                aria-label="See more Popular Amenities"
              >
                See More
              </button>
            </div>
            <table className="list-tb">
              <tbody>
                <tr>
                  <td>{popularAmenities[0]}</td>
                  <td>🛏 {popularAmenities[1]}</td>
                  <td>🛁 {popularAmenities[2]}</td>
                </tr>
              </tbody>
            </table>
            <hr style={{ width: "670px", color: "#656161" }} />

            <div className="heading-with-see-more">
              <h1>Safety Features</h1>
              <button
                className="see-more-btn"
                onClick={() => openModal("safetyFeatures")}
                aria-label="See more Safety Features"
              >
                See More
              </button>
            </div>
            <table className="list-tb">
              <tbody>
                <tr>
                  <td>{safetyFeatures[0]}</td>
                  <td>🛏 {safetyFeatures[1]}</td>
                  <td>🛁 {safetyFeatures[2]}</td>
                </tr>
              </tbody>
            </table>
            <hr style={{ width: "670px", color: "#656161" }} />

            <h1>Reviews</h1>
            <p className="p1">No reviews yet</p>
            <hr style={{ width: "670px", color: "#656161" }} />
          </p>
           <div className="about-host-container">
      <h2>About the Host</h2>
     <div className="about-host-container">
      <div className="host-header">
        <h2>About the Host</h2>
        <div className="host-meta">
          <span>⭐ Reviews</span>
          <span>👤 Identity Verified</span>
        </div>
      </div>

      <div className="host-info">
        <img src={details.Profile_picture} alt="Snehil Deo" className="host-image" />
        <div className="host-details">
          <div><strong>{details.host_fname} {details.host_lname}</strong> Web</div>
          <div>Member since {details.Member_since}</div>
        </div>
      </div>

      <div className="host-footer">
        <div className="host-language">Language: {Languages.join(', ')}</div>
        <div className="host-contact">📱 Contact Host</div>
      </div>

      <div className="host-image-banner">
        <img src={details.property_image} alt="City View" />
      </div>
    </div>
    </div>
    </div>

        <div className="ct4" >
          <p>Standard fee for a night for one guest</p>
          <table>
            <tbody>
              <tr>
                <td>1 Nights</td>
                <td>{details.service_fee} ℹ️</td>
              </tr>
              <tr>
                <td>Service Fee</td>
                <td>{details.service_fee}</td>
              </tr>
              <tr>
                <td>Additional Guest fee</td>
                <td>{details.addnl_guest_fee}</td>
              </tr>
              <tr>
                <td>Security Fee</td>
                <td>{details.security_fee}</td>
              </tr>
              <tr>
                <td>Cleaning Fee</td>
                <td>{details.cleaning_fee}</td>
              </tr>
              <tr>
                <td>I.V.A Tax</td>
                <td>{details.iva_tax}</td>
              </tr>
              <tr>
                <td>Accommodation Tax</td>
                <td>{details.acc_tax}</td>
              </tr>
              <tr>
                <td>Discount(Weekly)</td>
                <td>{details.weekly_discount} %</td>
              </tr>
              <tr>
                <td>Discount(Monthly)</td>
                <td>{details.monthly_discount} %</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>{details.service_fee+details.security_fee+details.cleaning_fee+details.iva_tax+details.acc_tax}</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="instant-book" onClick={handleClick}>⚡ Instant Book</button>
          <p className="note">You’ll be able to review before paying.</p>
        </div>

        {modalOpen && (
          <div className="modal-overlay" onClick={closeModal} role="dialog" aria-modal="true">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal} aria-label="Close modal">
                &times;
              </button>
              <h2>
                {modalOpen === "theSpace"
                  ? "The Space"
                  : modalOpen === "popularAmenities"
                  ? "Popular Amenities"
                  : "Safety Features"}
              </h2>
              <hr className="modal-separator" />
              <ul>
                {(modalOpen === "theSpace"
                  ? theSpaceItems
                  : modalOpen === "popularAmenities"
                  ? popularAmenities
                  : safetyFeatures
                ).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
    <GoogleMapComp latitude={details.latitude} longitude={details.longitude} />
    </>
  );
};

export default PropertyDetails