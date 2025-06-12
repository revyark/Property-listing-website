import React, { useState, useEffect } from 'react';
import './ListingStep6.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './DashboardNavbar';
import Footer from './footer';

const PhotoUploadForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode = 'create', allSteps: rawSteps = [], listingId = null } = location.state || {};
  const allSteps = Array.isArray(rawSteps) ? rawSteps : [];

  const step6Data = allSteps.find(step => step.step6)?.step6 || {};
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(step6Data.photo_url || '');

  useEffect(() => {
    if (step6Data.photo_url) {
      const comp_photo_url=`http://localhost:5000/${step6Data.photo_url}`;
      setPhotoUrl(comp_photo_url);
      console.log(step6Data)
    }
  }, [step6Data]);
  const handleFileChange = (e) => {
    if (mode === 'view') return;
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || mode === 'view') {
      alert("Please select a file to upload.");
      return;
    }

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("photo", selectedFile);

    const url=mode==='edit'
    ? `http://localhost:5000/api/dashboard/photo/update`
    : 'http://localhost:5000/api/dashboard/photo'
    let requestBody = formData;
    if (mode === 'edit') {
      formData.append('property_id', listingId); // ✅ Correct way to add to FormData
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        credentials: 'include',
        body: requestBody,
      });

      const data = await response.json();

      if (response.ok) {
        alert("File uploaded successfully!");
        const now_photo_url=`http://localhost:5000/${data.photo_url}`;
        setPhotoUrl(now_photo_url); // Display photo after upload
      } else {
        alert("Upload failed: " + data.error);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Network error during file upload.");
    }
  };

  const handleContinue = () => {
    navigate('/dashboard/listings/step7', {
      state: { mode, allSteps, listingId }
    });
  };

  const handleBack = () => {
    if (mode === 'create'){
      navigate('/dashboard/listings/step7')
    } else{
      navigate(-1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="photo-upload-form">
        <h3>Upload Photos</h3>
        <hr className="line-comp" />

        <div className="upload-box">
          <input type="file" onChange={handleFileChange} disabled={mode === 'view'} />
          <button className="upload-btn" onClick={handleUpload} disabled={mode === 'view'}>
            Upload
          </button>
        </div>

        <p className="image-note">(Recommended: Width 640px and Height 360px)</p>

        {photoUrl && (
          <div className="photo-preview">
            <img src={photoUrl} alt="Uploaded Preview" width="320" height="180" />
            <p className="image-note">(Preview of uploaded photo)</p>
          </div>
        )}

        <div className="button-group">
          <button className="btn back" onClick={handleBack}>Back</button>
          <button className="btn next" onClick={handleContinue}>
            {mode === 'edit' ? 'Update' : 'Next'}
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PhotoUploadForm;
