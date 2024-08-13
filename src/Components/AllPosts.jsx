import React, { useState, useEffect } from "react";
import "../Styles/allposts.css";
import {
  FaUser,
  FaPlusCircle,
  FaHome,
  FaHeart,
  FaConnectdevelop,
  FaSignOutAlt,
  FaRegHeart,
  FaRegComment,
  FaShareSquare,
  FaPaperPlane,
} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import noPosts from "../../assets/noposts.jpg";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { toast } from "react-toastify";

const AllPosts = () => {
  const [isZeroFollowers, setIsZeroFollowers] = useState(true);
  const [posts, setPosts] = useState([]);
  const [profilePics, setProfilePics] = useState({});
  const [postsPicUrls, setPostsPicsUrls] = useState({});
  const [open, setOpen] = useState(false);
  const [Opencomment, setOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [setComments, setGetComments] = useState([]);
  const [showReplyInput, setShowReplyInput] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { id } = useParams();

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const res = await fetch(`http://localhost:8080/following/${id}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
        setIsZeroFollowers(false);
      } catch (err) {
        toast.error("There was a problem while following...");
      }
    }
    fetchFollowing();
  }, []);

  function handleVisitProfile(userId) {
    window.location.href = `/profile/${userId}`;
  }

  useEffect(() => {
    const fetchProfilePics = async () => {
      const pics = {};
      const pics2 = {};
      for (const post of posts) {
        const response = await fetch(
          `http://localhost:8080/profilePic/${post.user.key}`
        );
        const response2 = await fetch(
          `http://localhost:8080/profilePic/${post.post.post}`
        );
        const data = await response.json();
        const data2 = await response2.json();
        pics[post.user.key] = data.url;

        pics2[post.post.post] = data2.url;
      }
      setProfilePics(pics);
      setPostsPicsUrls(pics2);
    };

    fetchProfilePics();
  }, [posts]);

  useEffect(() => {
    if (open) {
      handleShowInfo(currentPostId);
    }
  }, [Opencomment]);

  const [currentPostId, setCurrentPostId] = useState(null);

  const handleShowInfo = async (uid) => {
    let displayString = "Inside of the getInfo function for fetching the";

    if (Opencomment) {
      try {
        const res = await fetch(`http://localhost:8080/comment/${uid}`);
        const data = await res.json();
        if (data.success) {
          setGetComments(data.result);
          setShowReplyInput(
            data.result.map(() => ({
              show: false,
              replies: false,
              replyMessage: "",
            }))
          );
          console.log("This is the fetched comments...");
          console.log(data.result);
        } else {
          toast.error(
            "There was an error while fetching the comments, refresh the page or try again..."
          );
        }
      } catch (err) {
        console.log(err);
        toast.error(
          "There was an error while fetching the comments, please try again or refresh the page..."
        );
      }
    } else {
      displayString = displayString + `Likes for the ${uid}`;
    }
  };

  const handleActionClick = (postId, isComment) => {
    setCurrentPostId(postId);
    setOpenComment(isComment);
    handleClickOpen();
  };

  const makeComment = async (uid) => {
    if (comment === "") {
      alert("Comment box is empty...");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          myId: id,
          comment,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Made the comment...");
        setComment("");
      } else {
        toast.error("There was an error while making the comment...");
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "An error occurred while making the comment, please try again..."
      );
    }
  };

  function handleMakeReply(commentFor, index) {
    alert(showReplyInput[index].replyMessage);
    if (showReplyInput[index].replyMessage === "") {
      return;
    }
    alert("I am coming here!");
    try {
      fetch(`http://localhost:8080/reply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          myId: id,
          uid: commentFor,
          comment: showReplyInput[index].replyMessage,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            toast.success("Replied successfully!");
          } else {
            toast.error("There was an error while making the reply!");
          }
        });
    } catch (err) {
      toast.error("There was an error whiile making the reply!");
    }
  }

  async function handleGetCommentReplies(uid) {
    try {
      const res = await fetch(`http://localhost:8080/comment/${uid}`);
      const data = await res.json();
      if (data.success) {
        console.log("This is the comment comments...");
        console.log(data.result);
      } else {
        toast.error(
          "There was an error while fetching the comments, refresh the page or try again..."
        );
      }
    } catch (err) {
      console.log(err);
      toast.error(
        "There was an error while fetching the comments, please try again or refresh the page..."
      );
    }
  }

  return (
    <div className="allposts-main">
      <div className="sidenavbar">
        <FaConnectdevelop size={50} className="logo" />
        <Link
          to={`/allposts/${localStorage.getItem("logId")}`}
          className="nav-link"
        >
          <FaHome size={30} color="blue" />
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
        <Link to={`/profile/${id}`} className="nav-link">
          <FaUser size={30} />
        </Link>
        <Link
          to={`/test/${localStorage.getItem("logId")}`}
          className="nav-link"
        >
          <FaSignOutAlt size={30} />
        </Link>
      </div>
      <div className="feed-section">
        <div className="stories">
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
          <div className="story"></div>
        </div>
        <hr />
        <div className="posts-section">
          {isZeroFollowers ? (
            <div className="no-posts">
              <h3>
                Make some friends by following them to see their pics and
                videos...
              </h3>
              <img
                src={noPosts}
                alt="noposts-image"
                height="300px"
                width="300px"
              />
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {posts.map((post, index) => (
                <div
                  key={index}
                  style={{ border: "1px solid black", width: "23vw" }}
                  className="my-post"
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.8rem",
                      padding: "4px",
                      position: "relative",
                    }}
                    className="userName-pic"
                    onClick={() => handleVisitProfile(post.user._id)}
                  >
                    <img
                      src={
                        profilePics[post.user.key] || "default-profile-pic-url"
                      }
                      alt="user-image"
                      className="profile-pic"
                    />
                    <p className="font">{post.user.name}</p>
                    <p className="post-unfollow" title="unfollow">
                      Unfollow
                    </p>
                  </div>
                  <hr />
                  <div className="post-image">
                    <img
                      src={postsPicUrls[post.post.post]}
                      alt="post-image"
                      className="my-post-pic"
                    />
                    <hr />
                    <div className="post-actions">
                      <FaRegHeart
                        size={18}
                        className="action-icons"
                        onClick={() => handleActionClick(post.user._id, false)}
                      />
                      <FaRegComment
                        size={18}
                        className="action-icons"
                        onClick={() => handleActionClick(post.post._id, true)}
                      />
                      <FaShareSquare size={18} className="action-icons" />
                    </div>
                    <hr />
                    <div className="post-caption">
                      <span>{post.user.userName}</span>
                      {post.post.caption}
                    </div>
                    <hr />
                  </div>
                  <div className="comment-div">
                    <input
                      type="text"
                      placeholder="comment..."
                      className="comment-input"
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <FaPaperPlane
                      size={25}
                      className="makeComment-icon"
                      onClick={() => makeComment(post.post._id)}
                    />
                  </div>
                </div>
              ))}
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">
                  {Opencomment ? (
                    <span style={{ textAlign: "center" }}>Comments</span>
                  ) : (
                    <span style={{ textAlign: "center" }}>Likes</span>
                  )}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {setComments.map((comment, index) => {
                      return (
                        <div
                          className="post-comment1"
                          style={{ border: "1px solid black" }}
                        >
                          <span
                            className="comment-userName"
                            onClick={() =>
                              (location.href = `/profile/${comment.myId._id}`)
                            }
                            title="visit profile"
                          >
                            @{comment.myId.userName}
                          </span>
                          <span>{comment.comment}</span>
                          <div className="replies-div">
                            <span
                              title="show replies"
                              onClick={() => {
                                const newShowReplyInput = [...showReplyInput];
                                newShowReplyInput[index] = {
                                  ...newShowReplyInput[index],
                                  replies: !newShowReplyInput[index]?.replies,
                                };
                                setShowReplyInput(newShowReplyInput);
                                handleGetCommentReplies(comment._id);
                              }}
                            >
                              replies
                            </span>
                            <span
                              title="make a reply"
                              onClick={() => {
                                const newShowReplyInput = [...showReplyInput];
                                newShowReplyInput[index] = {
                                  ...newShowReplyInput[index],
                                  show: !newShowReplyInput[index]?.show,
                                };
                                setShowReplyInput(newShowReplyInput);
                              }}
                            >
                              reply
                            </span>
                          </div>
                          <div className="showReply-div">
                            {showReplyInput[index]?.show && (
                              <>
                                {" "}
                                <input
                                  type="text"
                                  placeholder="make a reply..."
                                  onChange={(e) => {
                                    const newShowReplyInput = [
                                      ...showReplyInput,
                                    ];
                                    newShowReplyInput[index] = {
                                      ...newShowReplyInput[index],
                                      replyMessage: e.target.value,
                                    };
                                    setShowReplyInput(newShowReplyInput);
                                  }}
                                />
                                <button
                                  className="reply-button"
                                  title="make the reply"
                                  onClick={() =>
                                    handleMakeReply(comment._id, index)
                                  }
                                >
                                  Reply
                                </button>{" "}
                              </>
                            )}
                          </div>
                          {showReplyInput[index]?.replies && (
                            <div className="replies-box">
                              <h3>This is the replies box</h3>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllPosts;
