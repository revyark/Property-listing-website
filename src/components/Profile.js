import React, { useEffect, useState } from 'react';
import './DashboardComponents.css';

export default function UserProfileForm() {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    Gender: '',
    Location: '',
    Dob: '',
    Self_Description: '',
    User_photo_url: '',
    Member_since: '',
    Languages: '',
    userType: 'guest',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/dashboard/userprofile/viewupdate', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          const normalized = {
        ...data,
        Languages: Array.isArray(data.Languages) ? data.Languages.join(', ') : '',
      };
      setFormData(normalized);
        } else {
          setError(data.error || 'Error loading profile.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Network error');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('photo', file);

    try {
      const res = await fetch('http://localhost:5000/api/dashboard/upload_user_photo', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataUpload,
      });

      const result = await res.json();
      if (res.ok && result.url) {
        setFormData(prev => ({ ...prev, User_photo_url: result.url }));
      } else {
        alert('Upload failed: ' + result.error);
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/api/dashboard/userprofile/viewupdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess('Profile updated successfully!');
      } else {
        setError(result.error || 'Failed to save changes.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    }

    setSaving(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-component">
      <h2>Edit Profile</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <label>First Name<span>*</span>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
        </label>

        <label>Last Name<span>*</span>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
        </label>

        <label>Email<span>*</span>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>Phone<span>*</span>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>I Am
          <select name="Gender" value={formData.Gender} onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>User Type
          <select name="userType" value={formData.userType} onChange={handleChange}>
            <option value="guest">Guest</option>
            <option value="host">Host</option>
          </select>
        </label>

        <label>Where You Live
          <input type="text" name="Location" value={formData.Location} onChange={handleChange} />
        </label>

        <label>Birth Date<span>*</span>
          <input type="date" name="Dob" value={formData.Dob} onChange={handleChange} required />
        </label>

        <label>Describe Yourself
          <textarea name="Self_Description" value={formData.Self_Description} onChange={handleChange} />
        </label>

        <label>Languages Spoken
          <input type="text" name="Languages" value={formData.Languages} onChange={handleChange} />
        </label>

        <label>Member Since
          <input type="date" name="Member_since" value={formData.Member_since} onChange={handleChange} />
        </label>

        <label>Profile Picture
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {formData.User_photo_url && (
              <img src={formData.User_photo_url} alt="Profile" width="100" height="100" style={{ objectFit: 'cover', borderRadius: '50%' }} />
            )}
            <input type="file" onChange={handleFileChange} />
          </div>
        </label>

        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
