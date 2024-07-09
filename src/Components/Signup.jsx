import React, { useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import { FaConnectdevelop } from "react-icons/fa";
import { Link } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading ] = useState(false);

  const navigate = useNavigate();

  const handleLogIn = async () => {
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

    const userData = {
      email,
      password,
    };

    try {
      setLoading(true);
      const already = await fetch(
        `https://hexagon-backend.onrender.com/sign/${email}/${password}`
      );

      if (already.ok) {
        setEmailError("Email already in use, login instead...");
        setLoading(false);
        return;
      }

      const response = await fetch(
        "https://hexagon-backend.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const resBody = await response.json();

      if (resBody._id === undefined) {
        setPasswordError(resBody[0].message);
        setLoading(false);
      } else {
        navigate(`/home/${resBody._id}`);
        setLoading(false);
      }
    } catch (err) {
      setPasswordError("An error occurred, please try again...");
      setLoading(false);
    }
  };

  return (
    <div className="log">
      <div className="log1">
        <FaConnectdevelop size={50} className="instagramLogo" />
        <h1>Hexagon</h1>
        <h3 style={{ marginBottom: "1rem" }}>Sign Up</h3>
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
        <button onClick={handleLogIn}>
        {
            loading ? <RingLoader
            color={"#fff"}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          /> : "SignUp"
          }
        </button>
        <h5>or</h5>
        <div className="lin">
          <Link to="/login">LogIn</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
