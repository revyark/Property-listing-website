
import React,{useEffect,useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import './ListingStep4.css';
import Navbar from './DashboardNavbar';
import Footer from './footer';
const LocationForm = () => {
  const location=useLocation();
  const {mode='create',allSteps:rawSteps=[],listingId=null}=location.state || {};
  const allSteps=Array.isArray(rawSteps)?rawSteps:[];
  const step4Data=allSteps.find(step=>step.step4)?.step4 || {};
  console.log('mode:',mode);
  console.log('Steps:',step4Data);
  console.log(listingId)
  const [formData,setFormData]=useState({
        country: step4Data.country||'',
        addr_line1: step4Data.addr_line1||'',
        addr_line2: step4Data.addr_line2||'',
        city: step4Data.city||'',
        region: step4Data.region||'',
        zip: step4Data.zip||'',
    })
  const navigate = useNavigate();
  const [error,setError]=useState('');
  const handleChange=(e)=>{
    if (mode === 'view') return;
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  const handleContinue = async(e) => {
    e.preventDefault();
    if (mode === 'view'){
      navigate('/dashboard/listings/step5',{
        state:{
          mode,
          allSteps,
          listingId
        }
      });
      return;
    }
    setError('');
    const token = localStorage.getItem("access_token");
    const url=mode==='edit'
      ? `http://localhost:5000/api/dashboard/address/update`
      : 'http://localhost:5000/api/dashboard/address';
    const method ='POST';
    let requestBody = { ...formData };
    if (mode === 'edit') {
      requestBody = { ...requestBody, 'property_id': listingId }; // Add property_id for edit mode
    }

    try{
      const response = await fetch(url, {
        method,
        headers:{
          'Content-Type':'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include', 
        body:JSON.stringify(requestBody),
      });
      const data=await response.json();
      if (response.ok){
        console.log(data);
        navigate('/dashboard/listings/step5',{
          state:{
            mode: mode === 'edit' ? 'edit' :'create',
            allSteps: allSteps,
            listingId: data.listingId || listingId
          }
        });
      } else{
        setError(data.error || 'Failed to submit');
      }
    } catch(err){
      setError('Network Error')
    }
  };
  const handleBack=(e)=>{
    if (mode === 'create'){
      navigate('/dashboard/listings/step3')
    } else{
      navigate(-1);
    }
  }
  return (
    <>
    <Navbar/>
    <div className="location-container">
      <h2>Location</h2>

      <p className="map-helper">You can move the pointer to set the correct map position</p>

      <form className="location-form" onSubmit={handleContinue}>
        <div className="form-group">
          <label htmlFor="country">Country <span className="required">*</span></label>
            <select id="country" name="country" onChange={handleChange}  value={formData.country} disabled={mode ==='view'}>
    <option value="">Select a country</option>
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Andorra">Andorra</option>
    <option value="Angola">Angola</option>
    <option value="Argentina">Argentina</option>
    <option value="Armenia">Armenia</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Azerbaijan">Azerbaijan</option>
    <option value="Bahamas">Bahamas</option>
    <option value="Bahrain">Bahrain</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Barbados">Barbados</option>
    <option value="Belarus">Belarus</option>
    <option value="Belgium">Belgium</option>
    <option value="Belize">Belize</option>
    <option value="Benin">Benin</option>
    <option value="Bhutan">Bhutan</option>
    <option value="Bolivia">Bolivia</option>
    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
    <option value="Botswana">Botswana</option>
    <option value="Brazil">Brazil</option>
    <option value="Brunei">Brunei</option>
    <option value="Bulgaria">Bulgaria</option>
    <option value="Burkina Faso">Burkina Faso</option>
    <option value="Burundi">Burundi</option>
    <option value="Cambodia">Cambodia</option>
    <option value="Cameroon">Cameroon</option>
    <option value="Canada">Canada</option>
    <option value="Cape Verde">Cape Verde</option>
    <option value="Central African Republic">Central African Republic</option>
    <option value="Chad">Chad</option>
    <option value="Chile">Chile</option>
    <option value="China">China</option>
    <option value="Colombia">Colombia</option>
    <option value="Comoros">Comoros</option>
    <option value="Congo (Brazzaville)">Congo (Brazzaville)</option>
    <option value="Congo (Kinshasa)">Congo (Kinshasa)</option>
    <option value="Costa Rica">Costa Rica</option>
    <option value="Croatia">Croatia</option>
    <option value="Cuba">Cuba</option>
    <option value="Cyprus">Cyprus</option>
    <option value="Czech Republic">Czech Republic</option>
    <option value="Denmark">Denmark</option>
    <option value="Djibouti">Djibouti</option>
    <option value="Dominica">Dominica</option>
    <option value="Dominican Republic">Dominican Republic</option>
    <option value="Ecuador">Ecuador</option>
    <option value="Egypt">Egypt</option>
    <option value="El Salvador">El Salvador</option>
    <option value="Equatorial Guinea">Equatorial Guinea</option>
    <option value="Eritrea">Eritrea</option>
    <option value="Estonia">Estonia</option>
    <option value="Eswatini">Eswatini</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Fiji">Fiji</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Gabon">Gabon</option>
    <option value="Gambia">Gambia</option>
    <option value="Georgia">Georgia</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="Grenada">Grenada</option>
    <option value="Guatemala">Guatemala</option>
    <option value="Guinea">Guinea</option>
    <option value="Guinea-Bissau">Guinea-Bissau</option>
    <option value="Guyana">Guyana</option>
    <option value="Haiti">Haiti</option>
    <option value="Honduras">Honduras</option>
    <option value="Hungary">Hungary</option>
    <option value="Iceland">Iceland</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Israel">Israel</option>
    <option value="Italy">Italy</option>
    <option value="Jamaica">Jamaica</option>
    <option value="Japan">Japan</option>
    <option value="Jordan">Jordan</option>
    <option value="Kazakhstan">Kazakhstan</option>
    <option value="Kenya">Kenya</option>
    <option value="Kiribati">Kiribati</option>
    <option value="Korea, North">Korea, North</option>
    <option value="Korea, South">Korea, South</option>
    <option value="Kuwait">Kuwait</option>
    <option value="Kyrgyzstan">Kyrgyzstan</option>
    <option value="Laos">Laos</option>
    <option value="Latvia">Latvia</option>
    <option value="Lebanon">Lebanon</option>
    <option value="Lesotho">Lesotho</option>
    <option value="Liberia">Liberia</option>
    <option value="Libya">Libya</option>
    <option value="Liechtenstein">Liechtenstein</option>
    <option value="Lithuania">Lithuania</option>
    <option value="Luxembourg">Luxembourg</option>
    <option value="Madagascar">Madagascar</option>
    <option value="Malawi">Malawi</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Maldives">Maldives</option>
    <option value="Mali">Mali</option>
    <option value="Malta">Malta</option>
    <option value="Marshall Islands">Marshall Islands</option>
    <option value="Mauritania">Mauritania</option>
    <option value="Mauritius">Mauritius</option>
    <option value="Mexico">Mexico</option>
    <option value="Micronesia">Micronesia</option>
    <option value="Moldova">Moldova</option>
    <option value="Monaco">Monaco</option>
    <option value="Mongolia">Mongolia</option>
    <option value="Montenegro">Montenegro</option>
    <option value="Morocco">Morocco</option>
    <option value="Mozambique">Mozambique</option>
    <option value="Myanmar">Myanmar</option>
    <option value="Namibia">Namibia</option>
    <option value="Nauru">Nauru</option>
    <option value="Nepal">Nepal</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nicaragua">Nicaragua</option>
    <option value="Niger">Niger</option>
    <option value="Nigeria">Nigeria</option>
    <option value="North Macedonia">North Macedonia</option>
    <option value="Norway">Norway</option>
    <option value="Oman">Oman</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Palau">Palau</option>
    <option value="Panama">Panama</option>
    <option value="Papua New Guinea">Papua New Guinea</option>
    <option value="Paraguay">Paraguay</option>
    <option value="Peru">Peru</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Qatar">Qatar</option>
    <option value="Romania">Romania</option>
    <option value="Russia">Russia</option>
    <option value="Rwanda">Rwanda</option>
    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
    <option value="Saint Lucia">Saint Lucia</option>
    <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
    <option value="Samoa">Samoa</option>
    <option value="San Marino">San Marino</option>
    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Senegal">Senegal</option>
    <option value="Serbia">Serbia</option>
    <option value="Seychelles">Seychelles</option>
    <option value="Sierra Leone">Sierra Leone</option>
    <option value="Singapore">Singapore</option>
    <option value="Slovakia">Slovakia</option>
    <option value="Slovenia">Slovenia</option>
    <option value="Solomon Islands">Solomon Islands</option>
    <option value="Somalia">Somalia</option>
    <option value="South Africa">South Africa</option>
    <option value="South Sudan">South Sudan</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sudan">Sudan</option>
    <option value="Suriname">Suriname</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Syria">Syria</option>
    <option value="Taiwan">Taiwan</option>
    <option value="Tajikistan">Tajikistan</option>
    <option value="Tanzania">Tanzania</option>
    <option value="Thailand">Thailand</option>
    <option value="Timor-Leste">Timor-Leste</option>
    <option value="Togo">Togo</option>
    <option value="Tonga">Tonga</option>
    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
    <option value="Tunisia">Tunisia</option>
    <option value="Turkey">Turkey</option>
    <option value="Turkmenistan">Turkmenistan</option>
    <option value="Tuvalu">Tuvalu</option>
    <option value="Uganda">Uganda</option>
    <option value="Ukraine">Ukraine</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="Uruguay">Uruguay</option>
    <option value="Uzbekistan">Uzbekistan</option>
    <option value="Vanuatu">Vanuatu</option>
    <option value="Vatican City">Vatican City</option>
    <option value="Venezuela">Venezuela</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Yemen">Yemen</option>
    <option value="Zambia">Zambia</option>
    <option value="Zimbabwe">Zimbabwe</option>
    <option value="Other">Other</option>
  </select>
</div>

        <div className="form-group">
          <label htmlFor="address1">Address Line 1 <span className="required">*</span></label>
          <input name="addr_line1" type="text" id="address1" placeholder="House name/number + street/road" onChange={handleChange} value={formData.addr_line1} readOnly={mode === 'view'}/>
        </div>

        <div className="form-group">
          <label htmlFor="address2">Address Line 2</label>
          <input name="addr_line2" type="text" id="address2" placeholder="Apt, suite, building access code" onChange={handleChange} value={formData.addr_line2} readOnly={mode === 'view'}/>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">City / Town / District <span className="required">*</span></label>
            <input name="city" type="text" id="city" onChange={handleChange} value={formData.city} readOnly={mode === 'view'}/>
          </div>

          <div className="form-group">
            <label htmlFor="zip">ZIP / Postal Code</label>
            <input name="zip" type="text" id="zip" onChange={handleChange} value={formData.zip} readOnly={mode === 'view'}/>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="state">State / Province / County / Region</label>
          <input name="region" type="text" id="state" onChange={handleChange} value={formData.region} readOnly={mode === 'view'}/>
        </div>

        <div className="button-group">
          <button type="button" className="back-button" onClick={handleBack}>Back</button>
          <button type="submit" className="next-button">
          {mode === 'edit' ? 'Update': mode === 'view' ? 'Next': 'Next'}
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default LocationForm;
