import React from 'react'
import { useParams } from 'react-router-dom'
import { FaHome, FaConnectdevelop, FaPlusCircle, FaHeart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../Styles/test.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Test = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    function handleYes() {
        navigate('/login');
        document.cookie = 'name=hexagon;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        localStorage.removeItem('logId');
        toast.success("Logged out successfully!");
    }

    function handleNo() {
        window.history.back();
    }

    return (
        <div className="container">
            <nav className="sidebar">
                <FaConnectdevelop size={50} className="logo" />
                <Link to={`/allposts/${id}`} className="nav-link">
                    <FaHome size={30}/>
                </Link>
                <Link to={`/notification/${id}`} className="nav-link">
                    <FaHeart size={30}/>
                </Link>
                <Link to={`/createpost/${id}`} className="nav-link">
                    <FaPlusCircle size={30}/>
                </Link>
                <Link to={`/profile/${id}`} className="nav-link">
                    <FaUser size={30}/>
                </Link>
                <Link to={`/profile/${id}`} className="nav-link">
                    <FaSignOutAlt size={30} color='blue'/>
                </Link>
            </nav>
            <div className="content">
                <h2>Do you really want to logout?</h2>
                <div className="button-group">
                    <button onClick={handleYes} className="btn-yes">Yes</button>
                    <button onClick={handleNo} className="btn-no">No</button>
                </div>
            </div>
        </div>
    );
}

export default Test;
