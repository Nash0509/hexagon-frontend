import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaImage, FaTimes, FaHome, FaConnectdevelop, FaPlusCircle, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../Styles/editprofile.css';

const EditProfile = () => {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [p, setP] = useState(null);
    const [name, setName] = useState('');
    const [dis, setDis] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const { id } = useParams();

    function handleImage(e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
        }
    }

    function handleIcon() {
        fileInputRef.current.click();
    }

    async function handlePost() {
        try {
            const data = {
                userName: caption,
                name: name,
                dis: dis,
            };

            const formData = new FormData();
            formData.append('profilePic', p);
            formData.append('userData', JSON.stringify(data));

            const result = await fetch(`https://hexagon-backend.onrender.com/updateUser/${id}`, {
                method: 'PUT',
                body: formData
            });

            if (result.ok) {
                toast.success("Profile updated successfully!");
                navigate(`/signup/${id}`);
            } else {
                toast.warning("Failed to update profile. Please try again.");
            }
        } catch (err) {
            console.log("Error from catch : " + err.message);
        }
    }

    function handleCross() {
        setImage(null);
        fileInputRef.current.value = '';
    }

    function handlePicture(e) {
        const fi = e.target.files[0];
        setP(fi);
    }

    useEffect(() => {
        console.log(p);
    }, [p]);

    return (
        <div className='container'>
            <nav className="sidebar">
                <FaConnectdevelop size={50} className="logo" />
                <Link to={`/allposts/${id}`} className="nav-link">
                    <FaHome size={30} />
                </Link>
                <Link to={`/notification/${id}`} className="nav-link">
                    <FaHeart size={30} />
                </Link>
                <Link to={`/createpost/${id}`} className="nav-link">
                    <FaPlusCircle size={30} />
                </Link>
                <Link to={`/profile/${id}`} className="nav-link">
                    <FaUser size={30} />
                </Link>
                <Link to={`/test/${id}`} className="nav-link">
                    <FaSignOutAlt size={30} />
                </Link>
            </nav>
            <div className="content">
                <h2>Edit Profile</h2>
                <div className="form-container">
                    <input type="text" placeholder='Username' value={caption} onChange={(e) => setCaption(e.target.value)} />
                    <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="text" placeholder='Bio' value={dis} onChange={(e) => setDis(e.target.value)} />
                    <label htmlFor="fileInput" className="file-input-label">
                        <FaImage size={30} />
                        <span className="file-input-text">Choose Image</span>
                    </label>
                    <input type="file" id="fileInput" onChange={(e) => {
                        handleImage(e);
                        handlePicture(e);
                    }} style={{ display: 'none' }} ref={fileInputRef} />
                    {image && <div className="image-preview">
                        <img src={image} alt="Preview" />
                        <FaTimes className='cross' size={20} onClick={handleCross} />
                    </div>}
                    <button className="save-button" onClick={handlePost}>SAVE</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
