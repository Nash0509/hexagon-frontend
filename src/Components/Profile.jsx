import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "../Styles/user.css";
import {
  FaUser,
  FaClipboardList,
  FaPlusCircle,
  FaHome,
  FaHeart,
  FaEdit,
  FaUserFriends,
  FaComment,
  FaThumbsUp,
  FaConnectdevelop,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SquareLoader } from "react-spinners";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [bio, setbio] = useState("");
  const [url, setUrl] = useState(null);
  const [five, setFive] = useState([]);
  const [posty, setPosty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState("");
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [caption, setCaption] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [fivePic, setFivePic] = useState([]);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(`http://localhost:8080/display/${id}`)
        .then((res) => res.json())
        .then(async (data) => {
          setName(data.name);
          setUserName(data.userName);
          setbio(data.dis);
          await fetch(`http://localhost:8080/profilePic/${data.key}`) 
          .then(res => res.json())
          .then(res => {
            setUrl(
              res.url
            )
          });
          setUid(data.uid);
          setLoading(false);
        });
    } catch (err) {
      console.log("An error occurred: " + err.message);
      toast.error("An error occurred, try again...");
    }
  }, [id]);

  useEffect(() => {
    try {
      fetch(`https://hexagon-backend.onrender.com/getFive/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log(":::::::::::::::::::::::");
          console.log(res);
          setFive(res);
          res.forEach(user => {
            fetch(`http://localhost:8080/profilePic/${user.key}`)
            .then(res => res.json())
            .then(res => {
                  setFivePic(prev => [...prev, res.url]);
            })
          })
        });
    } catch (err) {
      console.log("An error occurred: " + err.message);
      toast.error("An error occurred, try again...");
    }
  }, [id]);

  useEffect(() => {
    fetch(`https://hexagon-backend.onrender.com/getPosts/${id}`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setPosty(res);
      })
      .catch((err) => {
        toast.error(
          "There was an error fetching the posts, please refresh the page and try again..."
        );
        console.log(err.message);
      });
  }, [id]);

  function handleProView(adhar) {
    navigate(`/signup/${adhar}`);
  }

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const res = await fetch(
          `https://hexagon-backend.onrender.com/following/${id}`
        );
        const data = await res.json();
        setFollowing(data.length);
        console.log(data.length + " == " + data);
      } catch (err) {
        console.log(err.message);
      }
    }

    async function fetchFollowers() {
      try {
        const res = await fetch(
          `https://hexagon-backend.onrender.com/noOfFollowers/${id}`
        );
        const data = await res.json();
        console.log("Hello : " + data);
        setFollowers(data.length);
        console.log(data.length + " == " + data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchFollowing();
    fetchFollowers();
  }, [id]);

  function handleOverlay(url) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("enlarged-image").src = url;
  }

  function handleLeave() {
    document.getElementById("overlay").style.display = "none";
  }

  useEffect(() => {
    async function getComments() {
      await fetch(`https://hexagon-backend.onrender.com/getNoComment/${id}`)
        .then((res) => {
          if (res.ok) {
            console.log("Comments fetched...");
          }
          return res.json();
        })
        .then((res) => {
          console.log(res + " Count " + res.length);
          setCommentCount(res);
          console.log(" Mochi : " + res[0].comments);
        })

        .catch((err) => console.log("Din't got!"));
    }

    getComments();
  }, []);

  useEffect(() => {
    async function getLikes() {
      await fetch(`https://hexagon-backend.onrender.com/likes/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log("Like count fetched...");
          setLikeCount(res.length);
        })
        .catch((err) => {
          console.log(
            "An error occured while fetching the likes count : " + err.message
          );
        });
    }
    getLikes();
    console.log(
      "Measures here! : " + window.innerHeight + "Width : " + window.innerWidth
    );
  }, []);

  return (
    <div className="qwerty">
      {loading === true ? <div className="loader"><SquareLoader size={100} color="blue"/></div>: (
        <div className="qwerty1">
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
                    <FaUser size={30} color="blue"/>
                </Link>
                <Link to={`/test/${id}`} className="nav-link">
                    <FaSignOutAlt size={30} />
                </Link>
            </nav>
          <div className="pura">
            <div className="pic">
              {url ? (
                <img src={url} className="profileImage" alt="profile" />
              ) : (
                <FaUser size={140} color="gray" />
              )}
            </div>

            <div className="proInfo proInfo1">
              <div className="userNam">
                {userName} &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className="edit"
                  onClick={() => navigate(`/editProfile/${id}`)}
                >
                  <FaEdit /> Edit
                </button>{" "}
                &nbsp;&nbsp;&nbsp;
              </div>
              <div className="extra">
                <p>
                  <span>{posty.length} POSTS</span> &nbsp;&nbsp;&nbsp;{" "}
                  <span>{followers} FOLLOWERS</span> &nbsp;&nbsp;&nbsp;
                  <span>{following} FOLLOWING</span>
                </p>
              </div>
              <p className="namWala">{name}</p>
              <p className="bioWala">{bio}</p>
            </div>

            <div className="moreUsers">
              <h3
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "sans-serif",
                  marginBottom: "1rem",
                  marginTop : "0.5rem"
                }}
              >
                Suggestions
              </h3>
              {five.map((friend, index) => (
                <Link to={`/viewProfile/${friend._id}/${id}`} key={friend._id}>
                  <div className="suggestions" onClick={() => handleProView(adhar)}>
                    <img
                      src={fivePic[index]}
                      alt="images"
                      className="fivePic"
                    />
                    <p>
                      <span className="friendName">{friend.name} &nbsp;{" "}</span>
                      <button onClick={() => handleProView(adhar)} className="myButton">
                        View <FaUserFriends />
                      </button>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="posts">
            <h1 className="mainPost">
              <FaClipboardList /> POSTS
            </h1>
            <div className="post1 post2">
              <div className="post post3">
                {posty.length === 0 ? (
                  <div className="noposts">...</div>
                ) : (
                  posty.map((pic, index) => (
                    <div key={index}>
                      <img
                        src={`https://hexagon-backend.onrender.com/profile-pic/${pic.post}`}
                        alt={`post-${index}`}
                        className="pot"
                        title="Click on the image to see the details..."
                        onClick={() => {
                          handleOverlay(
                            `https://hexagon-backend.onrender.com/profile-pic/${pic.post}`
                          );
                          setCaption(pic.caption);
                          setCreatedAt(pic.createdAt);
                        }}
                      />
                    </div>
                  ))
                )}
              </div>
              //overlay...
              <div className="overlay" id="overlay" onClick={handleLeave}>
                <div className="text" id="text">
                  <div className="imageWala">
                    <img
                      id="enlarged-image"
                      alt="enlarged"
                      className="overlayImage"
                    />
                  </div>
                  <p>
                    <span>{likeCount}</span>&nbsp;
                    <FaThumbsUp size={30} />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span>{commentCount.length}</span>
                    &nbsp;
                    <FaComment size={30} />
                  </p>
                  <div className="timeK">
                    <h6>
                      <span
                        style={{ fontSize: "20px", color: "rgb(50,50,50)" }}
                      >
                        Caption :
                      </span>
                      &nbsp;&nbsp; {caption}
                    </h6>
                  </div>
                  <div className="createdAt">
                    <h6>
                      <span
                        style={{ fontSize: "20px", color: "rgb(50,50,50)" }}
                      >
                        CreatedAt :
                      </span>
                      &nbsp; {new Date(createdAt).toLocaleDateString("en-IN")}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
