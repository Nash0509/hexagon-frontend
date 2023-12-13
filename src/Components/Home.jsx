import React from 'react';
import '../Styles/home.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
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
    console.log(id);
    setUid(id);
  }, []);

  async function handleSubmit() {
    console.log(profilePic);

    const data = {
      userName: userName,
      name: name,
      bio: bio,
      uid: uid,
    };

    const formData = new FormData();
    formData.append('profilePic', profilePic);
    formData.append('userData', JSON.stringify(data));

    const check = await fetch(`https://hexagon-h6fl.onrender.com/userName/${userName}`);

    if (check.ok) {
      try {
        const response = await fetch('https://hexagon-h6fl.onrender.com/enter', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const resBody = await response.json();
          console.log(resBody);
          navigate(`/signup/${resBody._id}`);
          toast.success('Info submitted successfully!');
        } else {
          toast.error('An error occurred, try again...');
        }
      } catch (err) {
        console.log('An error occurred...');
        toast.error('An error occurred, try again...');
      }
    } else {
      toast.warning('UserName already in use, try another...');
    }
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setProfilePic(file);

    // Display the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setDisplayImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className='Anfo0'>
      <h1 className='setup'>Let's set up your account</h1>
      <div className='Anfo1'>
        <div>
          <FaInstagram size={50} className='Anfo2' />
        </div>
        <div className='Anfo'>
          <input type='text' placeholder='User Name' onChange={(e) => setUserName(e.target.value)} /><br />
          <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} /><br />
          <input type='text' placeholder='Bio' onChange={(e) => setBio(e.target.value)} /><br />
          <label htmlFor='profilePicInput' className='profile-pic-label'>
            <img src={displayImage} alt='Selected' className='profile-pic' />
            <FaInstagram size={20} style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </label>
          <input id='profilePicInput' type='file' onChange={handleFileChange} style={{ display: 'none' }} /><br />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button style={{ display: 'flex', alignItems: 'center' }} onClick={handleSubmit}>
              Next
              <IoIosArrowForward size={20} style={{ marginLeft: '5px' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
