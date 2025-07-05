import './img-div.css';
import React from 'react';
import pt1 from './images/pt1.jpg';
import {createBrowserRouter,Link} from 'react-router-dom';
export default function Imgdiv() {
  const f=0;
  return (
    <>
    <div className="d1" style={{backgroundImage: `url(${pt1})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
        <div className="d2">
        <h3>Your digital partner for hassle-free Renting — <span className="s1">STAYBOOKER</span></h3>
        <p>With live-support, quick signup, and highly-rated guests, hosting on STAYBOOKER can feel like a vacation.</p>
           <button className="b1"><Link to={`/login/${f}`} className="img-div-property">List Your property</Link></button>
           <table>
            <tr className="tr1">
              <th className="tr1">
                3K+
              </th>
              <th className="tr1">
                5K+
              </th>
              <th className="tr1">
                2K+
              </th>
            </tr>
            <tr>
              <td className="tr2">Home Listings</td>
              <td className="tr2">Monthly Searches</td>
              <td className="tr2">Owners advertise monthly</td>
            </tr>
           </table>
        </div>
    </div>
    </>
  )
}
