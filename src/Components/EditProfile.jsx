import React from 'react'
import '../Styles/create.css'
import { useState, useRef, useEffect } from 'react'
import { FaImage, FaTimes } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [p, setP] = useState(null);
    const [name, setName] = useState('');
    const [dis, setDis] = useState('');
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const {id} = useParams();

function handleImage(e) {

     const file = e.target.files[0];

     if(file) {
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

        const data = {
            userName : caption,
            name : name,
            dis : dis,
        };
    
        const formData = new FormData();
        formData.append('profilePic', p);
        formData.append('userData',  JSON.stringify(data));

  const result =  await fetch(`https://hexagon-backend.onrender.com/updateUser/${id}`, {
        method : 'PUT',
        body : formData
     });

     if(result.ok) {
        toast.success("Profile updated successfully!");
        console.log("Post created successfully...");
        navigate(`/signup/${id}`);
     }
     else {
        toast.warning("Please give a caption...");
        console.log("Caption was not there...")
     }

     }
     catch (err){
        console.log("Error from catch : "+ err.message)
     }

}

function handleCross() {

    setImage(null);
    fileInputRef.current.value = '';
}

function handlePicture(e) {
    const fi = e.target.files[0];
    setP(fi);
  
}

useEffect(() => {
    console.log(p);
  }, [p]);


  return (
    <div className='cre'>
       <div className="cre1">
       <p>Edit profile</p><br />
         <div className="others">
            <input type="text" placeholder='userName' onChange={(e) => setCaption(e.target.value)}/><br />
            <input type="text" placeholder='name' style={{marginTop:'1rem'}} onChange={(e) => setName(e.target.value)}/><br />
            <input type="text" placeholder='Bio' style={{marginTop:'1rem'}} onChange={(e) => setDis(e.target.value)}/>
            <p style={{fontSize:'20px',  marginTop:'0.7rem', backgroundColor:'yellow', width:'120px', padding:'0.7rem', color:'white'}}>Profile image</p>
            <input type="file"  onChange={(e) => {
                handleImage(e);
                handlePicture(e);
            }} style={{display:'none'}} ref={fileInputRef}/>
            <div className='icoo'  onClick={handleIcon}><FaImage size={30}/>&nbsp;<FaTimes className='cross' size={20} onClick={handleCross}/></div>
           <div className="showImage">
           {
                image && (
                    <img src={image} alt="image"/>
                )
            }
           </div>
          <div className="but">
          <button onClick={handlePost}>SAVE</button>
          </div>
         </div>
       </div>
    </div>
  )
}

export default EditProfile