import React, { useState } from "react";
import "../Styles/comeback.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaConnectdevelop } from "react-icons/fa";
import RingLoader from "react-spinners/RingLoader";

const Comeback = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    console.log("I am coming here!");
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    console.log("I am not coming here!");

    try {
      setLoading(true);
      const response = await fetch(
        `https://hexagon-backend.onrender.com/sign/${email}/${password}`
      );

      const resBody = await response.json();

      if (response.ok) {
        const response2 = await fetch(
          `https://hexagon-backend.onrender.com/find/${resBody._id}`
        );
        setEmailError("");
        setPasswordError("");
        if (response2.ok) {
          const resBody2 = await response2.json();
          navigate(`/profile/${resBody2._id}`);
          localStorage.setItem("logId", resBody2._id);
          setLoading(false);
        } else {
          setPasswordError("Wrong email or password...");
          setLoading(false);
        }
      } else {
        setPasswordError("Wrong email or password...");
        setLoading(false);
      }
    } catch (err) {
      setPasswordError("An error occurred, please try again...");
      setLoading(false);
    }
  };

  return (
    <div className="come">
      <div className="comeback-container">
        <FaConnectdevelop size={50} className="instagramLogo" />
        <h1>Hexagon</h1>
        <h3 style={{ marginBottom: "1rem" }}>Log In</h3>
        <input
          type="email"
          placeholder="Email"
          className={emailError ? "input-error" : ""}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        {emailError && <div className="error-message">{emailError}</div>}
        <input
          type="password"
          placeholder="Password"
          className={passwordError ? "input-error" : ""}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {passwordError && <div className="error-message">{passwordError}</div>}
        <button onClick={handleSignIn}>
          {loading ? (
            <RingLoader
              color={"#fff"}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "LogIn"
          )}
        </button>
        <h5>or</h5>
        <div className="lin">
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Comeback;
