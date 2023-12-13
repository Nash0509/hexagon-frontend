import React from 'react'
import '../Styles/login.css'
import { useState, useEffect } from 'react'
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import { Link } from 'react-router-dom';
import {FaConnectdevelop} from 'react-icons/fa';

const Login = () => {

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [id, setId] = useState('');
   const navigate = useNavigate();

  async  function handleLogIn() {

    const userData = {
        email : email,
        password : password,
    };

    const already = await fetch(`https://hexagon-h6fl.onrender.com/sign/${email}/${password}`);
    
    if(already.ok) {

      console.log("Email already in use...")
      toast.warning("Email already in use, login instead...");

    }

    else {
         
      try {
        const response =    await fetch('https://hexagon-h6fl.onrender.com/login', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(userData),
          });
    
          if(response.ok) {
            const redBody = await response.json();
            console.log(redBody._id);
            navigate(`/home/${redBody._id}`);
            console.log('Data submitted successfully!');
            toast.success('You have been logged in!');
          }
          else {
            console.log("There was an error!")
            toast.error('There was an error');
          }
      }
      catch (err) {
        console.log('There was an error : ' + err.message);
      }

    }
   

   }

  return (
    <div className='log'>
       <div className='log1'>
        <FaConnectdevelop size={50} className='instagramLogo'/>
       <h1>Hexagon</h1><br />
        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)}/><br />
        <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)}/><br />
        <button onClick={handleLogIn}>SignUp</button><br />
        <h5>or</h5>
        <div className="lin">
        <Link to='/comeback' style={{textDecoration:'none', color:'black'}}>LogIn</Link>
        </div>
       </div>
    </div>
  )
}

export default Login