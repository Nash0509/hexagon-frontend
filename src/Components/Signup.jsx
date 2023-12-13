import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import '../Styles/user.css';
import { FaUser, FaClipboardList, FaPlusCircle, FaHome, FaHeart, FaEdit, FaUserFriends, FaComment, FaThumbsUp, FaConnectdevelop } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SquareLoader } from 'react-spinners';

const Signup = () => {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [bio, setbio] = useState('');
  const [url, setUrl] = useState(null);
  const [five, setFive] = useState([]);
  const [posty, setPosty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState('');
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    try {
      fetch(`https://hexagon-h6fl.onrender.com/display/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setName(data.name);
          setUserName(data.userName);
          setbio(data.dis);
          setUrl(`https://hexagon-h6fl.onrender.com/profile-pic/${data.profilePic}`);
          setUid(data.uid);
          setLoading(false);
        });
    } catch (err) {
      console.log("An error occurred: " + err.message);
      toast.error("An error occurred, try again...");
    }
  }, [id]);

  useEffect(() => {
    try {
      fetch('https://hexagon-h6fl.onrender.com/getFive')
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setFive(res);
        });
    } catch (err) {
      console.log("An error occurred: " + err.message);
      toast.error("An error occurred, try again...");
    }
  }, [id]);

  useEffect(() => {
    fetch(`https://hexagon-h6fl.onrender.com/getPosts/${id}`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setPosty(res);
      })
      .catch((err) => {
        toast.error(
          "There was an error fetching the posts, please refresh the page and try again..."
        );
        console.log(err.message);
      });
  }, [id]);

  function handleProView(adhar) {
    navigate(`/signup/${adhar}`);
  }

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const res = await fetch(`https://hexagon-h6fl.onrender.com/following/${id}`);
        const data = await res.json();
        setFollowing(data.length);
        console.log(data.length + " == " + data);
      } catch (err) {
        console.log(err.message);
      }
    }

    async function fetchFollowers() {
      try {
        const res = await fetch(`https://hexagon-h6fl.onrender.com/noOfFollowers/${id}`);
        const data = await res.json();
        console.log("Hello : " + data);
        setFollowers(data.length);
        console.log(data.length + " == " + data);
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchFollowing();
    fetchFollowers();
  }, [id]);

  function handleOverlay(url) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("enlarged-image").src = url;
  }

  function handleLeave() {
    document.getElementById("overlay").style.display = "none";
  }

  
 useEffect(() => {

  async function getComments() {

    await fetch(`https://hexagon-h6fl.onrender.com/getNoComment/${id}`)
    .then((res) => {
     if(res.ok) {
       console.log("Comments fetched...")
     }
     return res.json();
    })
    .then((res) => {
     console.log(res + " Count "+ res.length)
     setCommentCount(res);
     console.log(" Mochi : "+ res[0].comments);
    })


    .catch((err) => console.log("Din't got!"))

 }

 getComments();

 }, [])

 useEffect(() => {
      
     async function getLikes() {
 
       await fetch(`https://hexagon-h6fl.onrender.com/likes/${id}`)
       .then((res) => res.json())
       .then((res) => {
          
        console.log("Like count fetched...");
        setLikeCount(res.length);

       })
       .catch((err) => {
        console.log("An error occured while fetching the likes count : "+ err.message)
       })

     }
     getLikes();

 }, [])

  return (
    <div className='qwerty'>
      {loading === true ? (
        <SquareLoader size={100} color='blue' className='squareLoad'/>
      ) : (
        <div className='qwerty1'>
          <div className='hea'>
            <FaConnectdevelop size={50} style={{position:'absolute', marginBottom:'40rem'}}/>
           <div style={{position:'relative'}}>
           <Link to={`/allposts/${id}`}>
              {' '}
              <FaHome size={40} color='black' />
              <br />
              <br />
              <br />
            </Link>
            <FaHeart size={40} />
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
            <FaUser size={40} />
           </div>
          </div>
          <div className='pura'>
            <div className='pic'>
              {url ? (
                <img src={url} className='profileImage' alt='profile' />
              ) : (
                <FaUser size={140} color='gray' />
              )}
            </div>

            <div className='proInfo'>
              <div className='userNam'>
                {userName} &nbsp;&nbsp;&nbsp;&nbsp;
                <button className='edit' onClick={() => navigate(`/editProfile/${id}`)}>
                  <FaEdit /> Edit
                </button>{' '}
                &nbsp;&nbsp;&nbsp;
              </div>
              <div className='extra'>
                <p>
                  <span>{posty.length} POSTS</span> &nbsp;&nbsp;&nbsp;{' '}
                  <span>{followers} FOLLOWERS</span> &nbsp;&nbsp;&nbsp;
                  <span>{following} FOLLOWING</span>
                </p>
              </div>
              <p className='namWala'>{name}</p>
              <p className='bioWala'>{bio}</p>
            </div>

            <div className='moreUsers'>
              {five.map((friend, index) => (
                <Link to={`/viewProfile/${friend._id}/${id}`} key={friend._id}>
                  <div className='user' onClick={() => handleProView(adhar)}>
                    <img src={`https://hexagon-h6fl.onrender.com/profile-pic/${friend.profilePic}`} alt='images' className='fivePic' />
                    <p>
                      {friend.name} &nbsp; <button onClick={() => handleProView(adhar)}>View <FaUserFriends /></button>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className='posts'>
            <h1 className='mainPost'>
              <FaClipboardList /> POSTS
            </h1>
            <div className='post1'>
              <div className='post'>
                {posty.length === 0 ? (
                  <div className='noposts'>No posts yet</div>
                ) : (
                  posty.map((pic, index) => (
                    <div key={index}>
                      <img
                        src={`https://hexagon-h6fl.onrender.com/profile-pic/${pic.post}`}
                        alt={`post-${index}`}
                        className='pot'
                        onClick={() => handleOverlay(`https://hexagon-h6fl.onrender.com/profile-pic/${pic.post}`)}
                      />
                    </div>
                  ))
                )}
              </div>
              {/* Overlay */}
              <div className="overlay" id='overlay' onClick={handleLeave}>
                <div className="text" id='text'>
                 <div className="imageWala">
                 <img id="enlarged-image" alt="enlarged" className='overlayImage'/>
               
                 </div>
                 <p><span>{likeCount}</span>&nbsp;<FaThumbsUp size={30}/>&nbsp;&nbsp;&nbsp;&nbsp;<span>{commentCount.length}</span>&nbsp;<FaComment size={30}/></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
