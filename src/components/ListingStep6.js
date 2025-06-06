
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

 const handleUpload = async () => {
  if (!selectedFile) {
    alert("Please select a file to upload.");
    return;
  }

  const token = localStorage.getItem("access_token");
  const formData = new FormData();
  formData.append("photo", selectedFile);

  try {
    const response = await fetch("http://localhost:5000/api/dashboard/photo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      credentials: 'include', // important to maintain session (for session['prop_id'])
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      alert("File uploaded successfully!");
      console.log(data);
    } else {
      alert("Upload failed: " + data.error);
      console.error(data);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    alert("Network error during file upload.");
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
