import React from "react";
import "../Styles/notification.css";
import {
  FaConnectdevelop,
  FaHome,
  FaPlusCircle,
  FaSignOutAlt,
  FaUser,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SquareLoader } from "react-spinners";
import { FaBell, FaHeart, FaComment, FaUserPlus } from "react-icons/fa";
import { toast } from "react-toastify";

const Notifications = () => {
  const { id } = useParams();

  const [spinner, setSpinner] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profileUrls, setProfileUrls] = useState([]);

  useEffect(() => {
    setSpinner(true);
    try {
      fetch(`http://localhost:8080/notifications/${id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setSpinner(false);
            console.log(res.notifications);
            setNotifications(res.notifications);
            res.notifications.forEach(async (noti) => {
              if (noti.myId) {
                await fetch(
                  `http://localhost:8080/profilePic/${noti.myId?.key}`
                )
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res);
                    if (res.success) {
                      setProfileUrls((prev) => [...prev, res.url]);
                    } else {
                      toast.error(
                        "There was problem while fetching the profilepics of the users..."
                      );
                    }
                  })
                  .catch((err) => {
                    toast.error(
                      "There was an error while fetching the profilepics of the users..."
                    );
                  });
              }
            });
          } else {
            toast.error(
              "There was an error while fetching the notifications..."
            );
          }
        })
        .catch((err) => {
          toast.error("There was an error while fetching the notifications...");
        });
    } catch (err) {
      toast.error("There was an error while fetching the notifications...");
    }
  }, []);

  function handleRemove(notiId, index) {
    fetch(`http://localhost:8080/removeNotification/${notiId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          const updatedNotifications = [...notifications];
          updatedNotifications.splice(index, 1);
          setNotifications(updatedNotifications);

          const updatedProfileUrls = [...profileUrls];
          updatedProfileUrls.splice(index, 1);
          setProfileUrls(updatedProfileUrls);
          toast.success("The notification was removed successfully...");
        } else {
          toast.error("There was an error removing the notification...");
        }
      })
      .catch((err) => {
        toast.error("An error occurred while removing the notification...");
      });
  }

  return spinner ? (
    <div className="spino loader">
      <SquareLoader size={100} color="blue" />{" "}
    </div>
  ) : (
    <div className="notification1">
      <nav className="sidebar">
        <FaConnectdevelop size={50} className="logo" />
        <Link to={`/allposts/${id}`} className="nav-link">
          <FaHome size={30} />
        </Link>
        <Link to={`/notification/${id}`} className="nav-link">
          <FaHeart size={30} color="blue" />
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

      <div className="notification2">
        <h1 style={{ textAlign: "center" }}>
          Notifications <FaBell color="gold" />
        </h1>
        <div className="notifications">
          {notifications.map((nofification, index) => {
            return (
              <div className="notification">
                <div
                  onClick={() =>
                    (window.location.href = `/profile/${nofification.myId._id}`)
                  }
                  className="goto-user"
                >
                  <img
                    src={profileUrls[index]}
                    alt="profile-image"
                    className="noti-pro"
                  />
                </div>
                <h3
                  className="notification-message"
                  onClick={() =>
                    (window.location.href = `/profile/${nofification.myId._id}`)
                  }
                >
                  {nofification.message}
                </h3>
                <h5>{nofification.createdAt.slice(0, 10)}</h5>
                <FaTimes
                  size={12}
                  className="remove-noti"
                  title="remove"
                  onClick={() => handleRemove(nofification._id, index)}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="notification3"></div>
    </div>
  );
};

export default Notifications;
