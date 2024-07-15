import React, { useState, useRef, useEffect } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaClipboardList,
  FaPlusCircle,
  FaHome,
  FaHeart,
  FaLock,
  FaConnectdevelop,
  FaSignOutAlt,
} from "react-icons/fa";
import "../Styles/create.css";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
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
      if (!caption.trim()) {
        toast.warning("Please provide a caption.");
        return;
      }

      const formData = new FormData();
      formData.append("postPic", file);
      formData.append("userData", JSON.stringify({ caption, uid: id }));

      const response = await fetch(
        "https://hexagon-backend.onrender.com/post",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Posted successfully!");
        navigate(`/profile/${id}`);
      } else {
        toast.error("Please enter all the fields...");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("An error occurred. Please try again later.");
    }
  }

  function handleCross() {
    setImage(null);
    setFile(null);
    fileInputRef.current.value = "";
  }

  function handlePicture(e) {
    const file = e.target.files[0];
    setFile(file);
    handleImage(e);
  }

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className="create-post-container">
      <nav className="sidebar">
        <FaConnectdevelop size={50} className="logo" />
        <Link to={`/allposts/${id}`} className="nav-link">
          <FaHome size={30} />
        </Link>
        <Link to={`/notification/${id}`} className="nav-link">
          <FaHeart size={30} />
        </Link>
        <Link to={`/createpost/${id}`} className="nav-link">
          <FaPlusCircle size={30} color="#0000ff" />
        </Link>
        <Link to={`/profile/${id}`} className="nav-link">
          <FaUser size={30} />
        </Link>
        <Link to={`/test/${id}`} className="nav-link">
          <FaSignOutAlt size={30} />
        </Link>
      </nav>
      <div className="create-post-content">
        <h2>Create Post</h2>
        <div className="post-form">
          <input
            type="text"
            placeholder="Caption"
            onChange={(e) => setCaption(e.target.value)}
          />
          <input
            type="file"
            onChange={handlePicture}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
          <div className="icon-group">
            <FaImage size={30} className="upload-icon" onClick={handleIcon} />
            {image && (
              <FaTimes size={20} className="cross-icon" onClick={handleCross} />
            )}
          </div>
          <div className="image-preview">
            {image && <img src={image} alt="Preview" />}
          </div>
          <button onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
