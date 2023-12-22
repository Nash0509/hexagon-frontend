import React from 'react'
import { useParams } from 'react-router-dom'
import { FaHome, FaConnectdevelop, FaPlusCircle, FaHeart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import "../Styles/test.css"
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useEffect } from 'react';

const Test = () => {

    const {id} = useParams();
    const navigate = useNavigate();

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
        if(c === false) {
          navigate('/login');
          toast.warning("You need to login first...");
        }
    
      }, [])

    function handleYes() {

       navigate('/login');
       document.cookie = 'name=hexagon;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
       localStorage.removeItem('logId');
       toast.success("Logged out successfully!")

    }

    function handleNo() {

       window.history.back();

    }

  return (
    <div>
          <div className='hea'>
            <FaConnectdevelop size={50} style={{position:'absolute', marginBottom:'40rem'}}/>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
           <div style={{position:'relative'}}>
           <Link to={`/allposts/${id}`}>
              {' '}
              <FaHome size={40} color='black' />
              <br />
              <br />
              <br />
            </Link>
           <Link to={`/notification/${id}`} style={{color:'black'}}> <FaHeart size={40} /></Link>
            <br />
            <br />
            <br />
            <Link to={`/createpost/${id}`} style={{ color: 'black' }}>
              {' '}
              <FaPlusCircle size={40} />
            </Link>
            <br />
            <br />
            <br />
            <Link to={`/signup/${id}`} style={{position:'relative'}}> 
          {' '}
          <FaUser size={40} color='black' />
        </Link>
            <br />
            <br />
            <br />
           </div>
          </div>

          <div className="test">

               <div className="test1">
                <h2>Do you really want to logout ?</h2>
                <button onClick={handleYes}><h3>Yes</h3></button>
                <button style={{marginLeft:'7rem'}} onClick={handleNo}><h3>No</h3></button>
               </div>

          </div>
    </div>
  )
}

export default Test