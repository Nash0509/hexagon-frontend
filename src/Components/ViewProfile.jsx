import React from 'react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import '../Styles/user.css';
import { FaUser, FaClipboardList, FaPlusCircle, FaHome, FaHeart, FaLock, FaConnectdevelop, FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { SquareLoader } from 'react-spinners';

const ViewProfile = () => {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [bio, setbio] = useState('');
  const [url, setUrl] = useState(null);
  const [five, setFive] = useState([]);
  const [posty, setPosty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState('');
  const [viewPro, setViewPro] = useState('');
  const [follows, setFollows] = useState(false);
  const [following, setFollowing] = useState(0);
  const [followers, setFollowers] = useState(0);
  const { id } = useParams();
  const {back} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    try {
      fetch(`http://localhost:3000/display/${id}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setName(data.name);
          setUserName(data.userName);
          setbio(data.dis);
          setUrl(`http://localhost:3000/profile-pic/${data.profilePic}`);
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
      fetch('http://localhost:3000/getFive')
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
    fetch(`http://localhost:3000/getPosts/${id}`)
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

  const fname = name.split(" ");

  function handleProView(adhar) {
    setViewPro(adhar);
    navigate(`/signup/${adhar}`);
    return;
  }

  async function handleFollow() {
   
    if(follows === true) {

      await fetch(`http://localhost:3000/unFollow/${back}/${id}`, {
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application-json',
        },
        body : JSON.stringify({})
      })
      .then((res) => {
        if(res.status === 200) {
          toast.success("Unfollowed successfully");
          console.log("Unfollowed...");
          setFollows(false);
        }
        else {
          console.log("Unable to follow...");
        }
      })

    }

    if(follows === false) {

      try {
        const response = await fetch(`http://localhost:3000/follow/${back}/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            hi: 'Hello',
          }),
        });
    
        if (response.status === 200) {
          toast.success("Followed successfully");
          setFollows(true);
        } else {
          toast.error("Failed to follow");
        }
      } catch (err) {
        console.log(err);
      }

    }

  }

  useEffect(() => {

      async function doesFollow() {

      const result = await fetch(`http://localhost:3000/follower/${back}/${id}`)
      if(result.status === 200) {
        console.log("Follows");
        setFollows(true);
      }
     else {
      console.log("An error occured while fetching isFollow...")
     }
      }

      doesFollow();

  }, [])

  useEffect(() => {
     
    async function following() {

        await fetch(`http://localhost:3000/following/${id}`)
        .then((res) => res.json())
        .then((res) => {
          setFollowing(res.length);
          console.log(res.length + " == "+ res);
        })
        .catch((err) => console.log(err.message))

    }
    following();

    async function followers() {

     await fetch(`http://localhost:3000/noOfFollowers/${id}`)
     .then((res) => res.json())
     .then((res) => {
      console.log("Hello : "+ res);
       setFollowers(res.length);
       console.log(res.length + " == "+ res);
     })
     .catch((err) => console.log(err.message))

    }
    followers();

  }, [follows])
  

  return (
    <div className='qwerty ytrewq'>
      {loading === true ? (
        <SquareLoader size={100} color='blue' className='squareLoad'/>
      ) : (
        <div>
          <div className='hea'>

            <Link style={{marginBottom:'6rem'}} to={`/signup/${back}`}><FaConnectdevelop size={40} color='black'/></Link>
            <br />
            <br />
            <br />
            <br />

            <Link to={`/allPosts/${back}`}><FaHome color='black' size={40}/></Link>
            <br />
            <br />

          <Link to={`/notification/${back}`}><FaHeart size={40} color='black'/></Link>
          <br />
            <br />
          <Link to={`/createPost/${back}`}><FaPlusCircle color='black' size={40}/></Link>
          <br />
          <br />
            <FaUser size={40} onClick={() => {
                   navigate(`/signup/${back}`)
            }}/>
            <br />
            <br />
            <br />
            <Link style={{marginTop:'7rem'}} to={`/test/${back}`}><FaSignOutAlt color='black' size={30}/></Link>

           
          </div>
          <div className='pura pura1 pura2 pura3'>
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
                <button onClick={handleFollow} className='chal'>{(follows) ? 'Unfollow': 'follow'}</button>
                {' '}
                &nbsp;&nbsp;&nbsp;
              </div>
              <div className='extra extra1'>
                <p>
                  <span>{posty.length} POSTS</span> &nbsp;&nbsp;&nbsp;{' '}
                  <span>{followers} FOLLOWERS</span> &nbsp;&nbsp;&nbsp;
                  <span>{following} FOLLOWING</span>
                </p>
              </div>
              <p className='namWala'>{name}</p>
              <p className='bioWala'>{bio}</p>
            </div>

          </div>
          <div className='posts postsSp'>
            <h1 className='mainPost'>
              <FaClipboardList /> POSTS
            </h1>
            <div className='post1'>
             {
              (follows === true) ? (
                <div className='post'>
                {posty.length === 0 ? (
                  <div className='noposts'>No posts yet</div>
                ) : (
                  posty.map((pic, index) => (
                    <div key={index}>
                      <img src={`http://localhost:3000/profile-pic/${pic.post}`} alt={`post-${index}`} className='pot' />
                    </div>
                  ))
                )}
              </div>
              ) : (
               <div className="lock" style={{textAlign:'center'}}>
                 <FaLock size={50} color='white'/>
               </div>
              )
             }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
