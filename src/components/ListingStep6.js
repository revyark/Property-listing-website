
import React, { useState } from 'react';
import './ListingStep6.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';
const PhotoUploadForm = () => {
    const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/listings/step7');
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      alert(`File "${selectedFile.name}" uploaded successfully.`);
      // Add actual upload logic here
    } else {
      alert("Please select a file to upload.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="photo-upload-form">
      <h3>Upload Photos</h3>
      <hr />
      <div className="upload-box">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-btn" onClick={handleUpload}>Upload</button>
      </div>
      <p className="image-note">(Width 640px and Height 360px)</p>

      <div className="button-group">
        <button className="btn back">Back</button>
        <button className="btn next" onClick={handleContinue}>Next</button>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default PhotoUploadForm;
