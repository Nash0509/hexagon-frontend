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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

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
  const [postUrls, setPostUrls] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  //mat-dialog
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [showLikes, setShowLikes] = useState(false);
  const [showComments, setShoeCommments] = useState(false);

  const handleClickOpen = (url) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

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
            .then((res) => res.json())
            .then((res) => {
              setUrl(res.url);
            });
          setUid(data.uid);
          setLoading(false);
        });
    } catch (err) {
      toast.error("An error occurred, try again...");
    }
  }, [id]);

  useEffect(() => {
    try {
      fetch(
        `http://localhost:8080/isFollowing/${localStorage.getItem(
          "logId"
        )}/${id}`
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.status === true) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        })
        .catch((err) =>
          toast.error(
            "There was a problem while fetching the following status..."
          )
        );
    } catch (e) {
      toast.error("There was a problem while fetching the following status...");
    }
  }, [id]);

  useEffect(() => {
    try {
      fetch(`http://localhost:8080/getFive/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setFive(res);
          res.forEach((user) => {
            fetch(`http://localhost:8080/profilePic/${user.key}`)
              .then((res) => res.json())
              .then((res) => {
                setFivePic((prev) => [...prev, res.url]);
              });
          });
        });
    } catch (err) {
      toast.error("An error occurred, try again...");
    }
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:8080/getPosts/${id}`)
      .then((response) => response.json())
      .then((res) => {
        setPosty(res);
        res.forEach((post) => {
          fetch(`http://localhost:8080/profilePic/${post.post}`)
            .then((res) => res.json())
            .then((res) => {
              if (res.success) {
                setPostUrls((prev) => [...prev, res.url]);
              } else {
                toast.error(
                  "There was an error while fetching the profile pics of the users..."
                );
              }
            });
        });
      })
      .catch((err) => {
        toast.error(
          "There was an error fetching the posts, please refresh the page and try again..."
        );
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
      } catch (err) {
        toast.error("There was a problem while following...");
      }
    }

    async function fetchFollowers() {
      try {
        const res = await fetch(
          `https://hexagon-backend.onrender.com/noOfFollowers/${id}`
        );
        const data = await res.json();
        setFollowers(data.length);
      } catch (err) {
        toast.error(
          "There was a problem while fetching the no of the followers..."
        );
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
          return res.json();
        })
        .then((res) => {
          setCommentCount(res);
        })

        .catch((err) =>
          toast.error("There was an error while fetching the comments...")
        );
    }

    getComments();
  }, []);

  useEffect(() => {
    async function getLikes() {
      await fetch(`https://hexagon-backend.onrender.com/likes/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setLikeCount(res.length);
        })
        .catch((err) => {
          toast.error("There was an error while fetching the likes...");
        });
    }
    getLikes();
  }, []);

  function handleBackProfile() {
    if (id != localStorage.getItem("logId")) {
      window.location.href = `/profile/${localStorage.getItem("logId")}`;
    }
  }

  function handleFollow(username) {
    fetch(
      `http://localhost:8080/follow/${localStorage.getItem("logId")}/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(`Following ${username}`);
          setIsFollowing(true);
        } else {
          toast.error(
            "There was a problem while following, please try again..."
          );
        }
      })
      .catch((err) => {
        toast.error("There was a problem while following, please try again...");
      });
  }

  function handleUnFollow(userName) {
    fetch(
      `http://localhost:8080/unFollow/${localStorage.getItem(
        "logId"
      )}/${id}/${userName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success(`Unfollowed ${userName}`);
          setIsFollowing(false);
        } else {
          toast.error(
            "There was a problem while unfollowing, please try again..."
          );
        }
      })
      .catch((err) => {
        toast.error(
          "There was a problem while unfollowing, please try again..."
        );
      });
  }

  function handleShowComments() {
    setShowLikes(false);
      setShoeCommments(true);
  }

  function handleShowLikes() {
    setShoeCommments(false);
      setShowLikes(true);
  }

  return (
    <div className="qwerty">
      {loading === true ? (
        <div className="loader">
          <SquareLoader size={100} color="blue" />
        </div>
      ) : (
        <div className="qwerty1">
          <nav className="sidebar">
            <FaConnectdevelop size={50} className="logo" />
            <Link
              to={`/allposts/${localStorage.getItem("logId")}`}
              className="nav-link"
            >
              <FaHome size={30} />
            </Link>
            <Link to={`/notification/${id}`} className="nav-link">
              <FaHeart size={30} />
            </Link>
            <Link
              to={`/createpost/${localStorage.getItem("logId")}`}
              className="nav-link"
            >
              <FaPlusCircle size={30} />
            </Link>
            <Link onClick={handleBackProfile} className="nav-link">
              <FaUser size={30} color="blue" />
            </Link>
            <Link
              to={`/test/${localStorage.getItem("logId")}`}
              className="nav-link"
            >
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
                <div style={{ display: "flex", alignItems: "center" }}>
                  {userName} &nbsp;&nbsp;&nbsp;&nbsp;
                  {localStorage.getItem("logId") != id && (
                    <div>
                      {!isFollowing && (
                        <span>
                          <button
                            className="edit"
                            onClick={() => handleFollow(userName)}
                          >
                            Follow
                          </button>
                        </span>
                      )}
                      {isFollowing && (
                        <span>
                          <button
                            className="edit"
                            onClick={() => handleUnFollow(userName)}
                          >
                            Unfollow
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {id != localStorage.getItem("logId") ? (
                  ""
                ) : (
                  <button
                    className="edit"
                    onClick={() => navigate(`/editProfile/${id}`)}
                  >
                    <FaEdit /> Edit
                  </button>
                )}
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
                  marginTop: "0.5rem",
                }}
              >
                Suggestions
              </h3>
              {five.map((friend, index) => (
                <Link to={`/profile/${friend._id}`} key={friend._id}>
                  <div
                    className="suggestions"
                    onClick={() => handleProView(adhar)}
                  >
                    <img
                      src={fivePic[index]}
                      alt="images"
                      className="fivePic"
                    />
                    <p>
                      <span className="friendName">{friend.name} &nbsp; </span>
                      <button
                        onClick={() => handleProView(adhar)}
                        className="myButton"
                      >
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
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div className="myPosts">
                  {posty.length === 0 ? (
                    <div className="noposts">...</div>
                  ) : (
                    posty.map((pic, index) => (
                      <div key={index} className="mypost-pic">
                        <img
                          src={postUrls[index]}
                          alt={`post-${index}`}
                          className="pot"
                        />

                        <div className="post-hover" onClick={() => handleClickOpen(postUrls[index])}>
                          <span>
                            {" "}
                            <FaComment size={20} color="white" />
                            {"  "}102
                          </span>
                          <span>
                            <FaHeart size={20} color="white" />
                            {"  "}99
                          </span>
                        </div>
                        <div>
                          <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="responsive-dialog-title"
                          >
                            <DialogTitle id="responsive-dialog-title">
                              {"POST"}
                            </DialogTitle>
                            <DialogContent>
                              <img
                                 src={selectedImage}
                                alt="post-image"
                                height="300px"
                                width="300px"
                                style={{borderRadius : '7px'}}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "1rem",
                                  marginTop : '1rem'
                                }}
                              >
                                <div style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "0.7rem",
                                }}>
                                  <FaHeart size={25} className="post-likes" onClick={handleShowLikes}/>
                                  120
                                </div>
                                <div style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  gap: "0.7rem",
                                }}>
                                  <FaComment size={25} className="post-comments" onClick={handleShowComments}/>
                                  99
                                </div>
                              </div>
                              <div>
                                  {
                                    showLikes && <div>This is the likes section!</div>
                                  }

                                  {
                                    showComments && <div>This is the comments section!</div>
                                  }
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))
                  )}
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
