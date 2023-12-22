import React from 'react'
import '../Styles/notification.css'
import { FaConnectdevelop, FaHome, FaPlusCircle, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { SquareLoader } from 'react-spinners'
import { FaBell, FaHeart, FaComment, FaUserPlus } from 'react-icons/fa'


const Notifications = () => {

    const {id} = useParams();
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [follow, setFollow] = useState([]);
    const [users1, setUsers1] = useState([]);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {

    setSpinner(true);

    console.log("UseEffect is running with the id : "+ id);
    async function getLikes() {
    if(id) {

        await fetch(`https://hexagon-backend.onrender.com/likes/${id}`)
        .then((res) => res.json())
        .then((res) => {
          console.log("Got the likes: ", res);
          setLikes(res);
          res.forEach((like, index) => {
            fetch(`https://hexagon-backend.onrender.com/display/${like.myId}`)
              .then((res) => res.json())
              .then((userData) => {
                let a = document.getElementById('lucknow');
                let b = document.createElement('div');
                b.className = 'likes1'
                b.innerHTML = `<img src="https://hexagon-backend.onrender.com/profile-pic/${userData.profilePic}" alt="Image" width="90"/>&nbsp; &nbsp; <h4>${userData.userName}</h4>&nbsp;&nbsp;Liked your post`;
                b.style.backgroundColor = 'rgb(31,31,31)'
                b.style.padding = '1rem';
                b.style.borderRadius = '5px'

                a.appendChild(b);
              });
          });
        });

    }
    }
    getLikes();

    async function getFollows() {

  await fetch(`https://hexagon-backend.onrender.com/noOfFollowers/${id}`)
  .then((res) => res.json())
  .then((res) => {

    console.log(res[0]);
   
    res.forEach((follower) => {

        fetch(`https://hexagon-backend.onrender.com/display/${follower.userId}`)
        .then((res) => res.json())
        .then((reso) => {

           console.log("I am here : ", reso)

            let b = document.getElementById('chennai');
            let c = document.createElement('div');
            
            c.className = 'comments1'
            c.innerHTML = `<img src="https://hexagon-backend.onrender.com/profile-pic/${reso.profilePic}" alt="Image" width="90"/>&nbsp; &nbsp; <h4>${reso.userName}</h4>&nbsp;&nbsp; Followed you!🎉`;

            b.appendChild(c);

        })

    })


  })

    }
    getFollows();

    async function getComments() {

       await fetch(`https://hexagon-backend.onrender.com/getNoComment/${id}`)
       .then((res) => res.json())
       .then((res) => {

        res.map((comment) => {

            fetch(`https://hexagon-backend.onrender.com/display/${comment.userId}`)
            .then((res) => res.json())
            .then((res) => {

               
            let b = document.getElementById('bengaluru');
            let c = document.createElement('div');
            
            c.className = 'comments1'
            c.innerHTML = `<img src="https://hexagon-backend.onrender.com/profile-pic/${res.profilePic}" alt="Image" width="90"/>&nbsp; &nbsp; <h4>${res.userName}</h4>&nbsp;&nbsp;Commented on your post`;

            b.appendChild(c);
           

            })

        })

       });
       setSpinner(false);

    }
    getComments();
   

      }, []);

 

  return (
   (spinner) ? <div className="spino"><SquareLoader size={100} color='blue' /> </div>:  <div className='notification1'>
   <div className='hea'>
       <FaConnectdevelop size={50} style={{position:'absolute', marginBottom:'40rem', color:'black'}}/>
      <div style={{position:'relative'}}>
      <Link to={`/allposts/${id}`}>
         {' '}
         <FaHome size={40} color='black' />
       </Link>
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
       <Link to={`/signup/${id}`}> <FaUser size={40} style={{color:'black'}}/></Link>
      </div>
     </div>
   

 <div className="notification2">
 <h1>Notifications <FaBell color='gold'/></h1>
 </div>
 <div className="notification3">
   <div className="likes" id='lucknow'>
       <h2>Likes <FaHeart /></h2>
   </div>
   <div className="comments" id='bengaluru'>
       <h2>Comments <FaComment /></h2>
   </div>
   <div className="follows" id='chennai'>
       <h2>Follow <FaUserPlus /></h2>
   </div>
 </div>
 <div className="notification3">
  
 </div>

</div>
)
}

export default Notifications