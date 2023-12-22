import React from 'react'
import '../Styles/comeback.css';
import { useState, useEffect } from 'react';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaInstagram , FaConnectdevelop} from 'react-icons/fa';

const Comeback = () => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();
   const [cmr, setCmr] = useState('');


   useEffect(() => {

    let c = false;
        
    console.log("This is the cookies : "+ document.cookie);
    const a = document.cookie.split(';');
    a.forEach((cookie) => {
  
      let b =  cookie.split('=');
       if(b[1] == 'hexagon') {
        c = true;
       }
  
    })
    if(c === true) {
      toast.warning("You are already logged in, logout first...");
     navigate(`/signup/${localStorage.getItem('logId')}`);
    }
  
  }, [])

  async  function handleSignIn() {
     
   toast.info("We are fetching your data, please wait...")

    try {

      const response = await fetch(`https://hexagon-backend.onrender.com/sign/${email}/${password}`);

      const resBody = await response.json();

    if(response.ok) {
        console.log(resBody._id);
        const response2 = await fetch(`https://hexagon-backend.onrender.com/find/${resBody._id}`);
        setCmr(resBody._id);
        if(response2.ok) {
            const resBody2 = await response2.json();
            console.log(resBody2);
             navigate(`/signup/${resBody2._id}`);
             document.cookie = `name=hexagon;expires=Thu, 01 Jan 2024 00:00:00 UTC;path=/`;
             localStorage.setItem('logId',resBody2._id);
        }
        else {
          toast.warning("Please check your email or password and try again...")
          console.log("Wrong password or email...")
        }
        console.log('Successfully signed in...');
        toast.success("Successfully signed In!");
      }
      else {
        toast.warning("Please check your email or password and try again...")
        console.log("Wrong password or email...")
      }

    }
    catch (err) {
        console.log("An error occured : " + err.message);
        toast.error("An error occured, please try again...");
    }

   }

  return (
    <div className='come'>
        <h1 className='cbsign'>Sign In</h1>
        <FaConnectdevelop size={50} color='white' style={{marginTop:'1.5rem'}}/>
        <div className="sign">
        
            <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/><br />
            <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)}/><br />
            <button onClick={handleSignIn}>SignIn</button><br /><br />
            <p>or</p><br />
            <Link to='/login' className='logAgain'>Sign Up</Link>
        </div>
    </div>
  )
}

export default Comeback