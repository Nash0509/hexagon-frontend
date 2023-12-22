import React from 'react'
import '../Styles/create.css'
import { useState, useRef, useEffect } from 'react'
import { FaImage, FaTimes, FaConnectdevelop } from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import {toast} from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [p, setP] = useState(null);
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
            caption : caption,
            uid : id,
        };
    
        const formData = new FormData();
        formData.append('postPic', p);
        formData.append('userData',  JSON.stringify(data));

  const result =  await fetch('http://localhost:3000/post', {
        method : 'POST',
        body : formData
     });

     if(result.ok) {
        toast.success("Your post is successful!");
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
                <FaConnectdevelop size={50} color='white'  style={{marginBottom:'3rem'}}/>
       <div className="cre1">

       <p>Create post</p><br />
         <div className="others">
            <input type="text" placeholder='Caption' onChange={(e) => setCaption(e.target.value)}/><br />
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
          <button onClick={handlePost}>POST</button>
          </div>
         </div>
       </div>
    </div>
  )
}

export default CreatePost