import React, { useState } from "react";
import { useParams } from "react-router-dom";
import card1 from "./images/card1.png";
import "./PropertyDetails.css";
import user from "./images/user.jpg";
import p5 from "./images/p5.jpg";
import { DateRange } from 'react-date-range';
import { enUS } from 'date-fns/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const PropertyDetails = () => {
  const { id } = useParams();

  const [modalOpen, setModalOpen] = useState(null);

  const openModal = (section) => {
    setModalOpen(section);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  const theSpaceItems = [
    "2 Kitchens",
    "16 beds",
    "8 bathrooms",
    "Parking",
    "Free Wifi",
    "Air conditioning",
  ];

  const popularAmenities = [
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
  ];

  const safetyFeatures = [
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
  ];
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
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Property Details for ID: {id.title}</h2>
      <div>
        <img src={card1} className="c1" />
      </div>
      <div className="mainct">
        <div className="ct1">
          <h2>Hotel Paris Rivoli</h2>
          <div className="location">
            <span>📍 Paris , Île-de-France , France</span>
          </div>
          <div className="category">
            <span>
              {" "}
              New Alamein <span title="Info">ℹ️</span>
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
        <div className="ct3">🛏 16 beds</div>
        <div className="ct3">🛁 8 bathrooms</div>
        <div className="ct5">
          <p className="p1">
            <h1>
              About this listing
            </h1>
            <p className="p1">
              Situated in the famous Marais district surrounded by boutiques,
              monuments and museums, the Hotel Paris Rivoli offers three-star
              accommodations in the most desirable part of Paris.
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
                  <td>2 Kitchen</td>
                  <td>🛏 16 beds</td>
                  <td>🛁 8 bathrooms</td>
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
                  <td>Parking</td>
                  <td>🛏 Free Wifi</td>
                  <td>🛁 Air conditioning</td>
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
                  <td>First Aid Box</td>
                  <td>🛏 Safety Guard</td>
                  <td>🛁 Smoke Detector</td>
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
        <img src={user} alt="Snehil Deo" className="host-image" />
        <div className="host-details">
          <div><strong>Snehil Deo</strong> Web</div>
          <div>Member since February 2025</div>
        </div>
      </div>

      <div className="host-footer">
        <div className="host-language">Language: English, Arabic</div>
        <div className="host-contact">📱 Contact Host</div>
      </div>

      <div className="host-image-banner">
        <img src={p5} alt="City View" />
      </div>
    </div>
    </div>
    </div>

        <div className="ct4" >
          <table>
            <tbody>
              <tr>
                <td>0 Nights</td>
                <td>0 ℹ️</td>
              </tr>
              <tr>
                <td>Service Fee</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Additional Guest fee</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Security Fee</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Cleaning Fee</td>
                <td>0</td>
              </tr>
              <tr>
                <td>I.V.A Tax</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Accommodation Tax</td>
                <td>0</td>
              </tr>
              <tr>
                <td>Discount</td>
                <td>0</td>
              </tr>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>0</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <button className="instant-book">⚡ Instant Book</button>
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

  );
};

export default PropertyDetails