import React, { useState, useEffect } from 'react';
import '../Styles/home.css';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';
import defaultImage from '../Styles/unknown2.jpg';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [uid, setUid] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [displayImage, setDisplayImage] = useState(defaultImage);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setUid(id);
  }, [id]);

  const handleSubmit = async () => {
    if (!userName || !name || !bio || !profilePic) {
      toast.warning("All fields are required");
      return;
    }

    const data = {
      userName,
      name,
      bio,
      uid,
    };

    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('userData', JSON.stringify(data));

    try {
      const check = await fetch(`http://localhost:8080/userName/${userName}`);

      if (check.ok) {
        const response = await fetch('http://localhost:8080/enter', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const resBody = await response.json();
          navigate(`/Profile/${resBody._id}`);
          toast.success('Profile created successfully...');
        } else {
          toast.error('An error occurred, try again...');
        }
      } else {
        toast.warning('UserName already in use, try another...');
      }
    } catch (err) {
      toast.error('An error occurred, try again...');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setDisplayImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="home-container">
      <h1 className="setup">Let's set up your account</h1>
      <div className="form-container">
        <FaInstagram size={50} className="instagramLogo" />
        <div className="input-container">
          <input
            type="text"
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="Bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
          <label htmlFor="profilePicInput" className="profile-pic-label">
            <img src={displayImage} alt="Selected" className="profile-pic" />
            <FaInstagram size={20} className="profile-pic-icon" />
          </label>
          <input
            id="profilePicInput"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button className="next-button" onClick={handleSubmit}>
            Next
            <IoIosArrowForward size={20} className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
