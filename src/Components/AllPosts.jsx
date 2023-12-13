import React, { useEffect, useState } from 'react';
import { SquareLoader } from 'react-spinners';
import '../Styles/allposts.css';
import { FaPlusCircle, FaHome, FaHeart, FaEdit, FaUserFriends, FaUser, FaThumbsUp, FaThumbsDown, FaConnectdevelop } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [allUserNames, setUserNames] = useState([]);
  const [allUrls, setAllUrls] = useState([]);
  const [comment, setComment] = useState('');
  const [allUid, setAllUid] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [uidComment, setUidComment] = useState([]);
  const [current, setCurrent] = useState('');
  const [like, setLike] = useState(false);
  const [yehWala, setYehWala] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    async function fetchPosts() {

      setLoading(true);
      try {
        const response = await fetch('https://hexagon-h6fl.onrender.com/allposts');
        const data = await response.json();
        console.log(data);
        setPosts(data);

        // Use Promise.all to wait for all asynchronous calls to complete
        const promises = data.map(async (post) => {
          const uid = post.uid;

          try {
            const res = await fetch(`https://hexagon-h6fl.onrender.com/display/${uid}`);
            const userData = await res.json();

            return {
              userName: userData.userName,
              url: `https://hexagon-h6fl.onrender.com/profile-pic/${userData.profilePic}`,
              uid : userData.uid,
            };
          } catch (err) {
            console.log("An error occurred: " + err.message);
            return {
              userName: '',
              url: null,
              uid: ''
            };
          }
        });

        const results = await Promise.all(promises);

        // Extract userNames and urls from results
        const reversedPosts = data.reverse();
      const reversedUserNames = results.map((data) => data.userName).reverse();
      const reversedUrls = results.map((data) => data.url).reverse();
      const reversedUids = results.map((data) => data.uid).reverse();

      setPosts(reversedPosts);
      setUserNames(reversedUserNames);
      setAllUrls(reversedUrls);
      setAllUid(reversedUids);
      setLoading(false);
      } catch (err) {
        console.error('Error while fetching all posts:', err.message);
      }
    }

    fetchPosts();
  }, []);

 async function handleLike(index, uid) {

const a = document.getElementById(index);
a.style.color = 'green';
document.getElementById(`${index}${index}`).style.color = '#5e5858';

await fetch(`https://hexagon-h6fl.onrender.com/like/${id}/${uid}`, {
  method: 'POST',
  headers : {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    hi: 'HI',
  }),
})
.then((res) => {
  console.log("Liked successfully...");
  toast.success("Liked successfully!");
})
.catch((err) => console.log("Error: " + err))

  }

  async function handleDislike(uid, index) {

     await fetch(`https://hexagon-h6fl.onrender.com/unLike/${id}/${uid}`, {
      method : 'DELETE',
      headers : {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({})
     })
     .then((res) => {
      console.log("DisLiked...");
     if(res.status === 200) {
      toast.success("Disliked");
      document.getElementById(`${index}${index}`).style.color = "red"
      document.getElementById(index).style.color = '#5e5858';
     }
     else {
      toast.warning("Like to dislike...");
     }
     })

  }

  async function handleComment(uid, index, key) {
    try {
      await fetch(`https://hexagon-h6fl.onrender.com/comment/${id}/${uid}/${comment}/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hi: 'HI',
        }),
      }).then((res) => {
        if (res.ok) {
          console.log('Commented successfully...');
          toast.success('Commented successfully...');
          let a = document.getElementById(`comment${index}`);
          let newDiv = document.createElement('div');
          newDiv.innerHTML = `<p><span>you</span>${comment}</p>`;
          newDiv.style.color = 'white';
          a.appendChild(newDiv);
         
          setTimeout(() => {
            document.getElementById('inny').value = '';
          }, 0);

        } else {
          console.log("Didn't comment...");
        }
      });
    } catch (err) {
      console.log('An error occurred... from the catch of the frontend while commenting : ' + err.message);
    }
  }

  async function getComments(uid, key) {

     await fetch(`https://hexagon-h6fl.onrender.com/comment/${id}/${uid}/${key}`)
     .then((res) => {
      if(res.ok) {
        toast.success("Got  it!")
      }
      return res.json();
     })
     .then((res) => {
      console.log(res)
      setUidComment(res);

     })


     .catch((err) => console.log("Din't got!"))

  }

  useEffect(() => {
    let a = document.getElementById(current);
    uidComment.forEach((comment, index) => {
      const b = document.createElement('p');
      b.innerHTML = `<span>you</span>${comment.comments}`
      a.appendChild(b);
      console.log("written");
    });
  }, [uidComment]);
  
  
  return ( (loading) ? (<SquareLoader size={100} color='blue' />) : (
    <div className='allPostHome'>
      <div className='hea'>
        <FaConnectdevelop size={50} color='black' className='namaste'/>
        <Link to={`/signup/${id}`} style={{position:'relative'}}> 
          {' '}
          <FaUser size={40} color='black' />
        </Link>
      </div>
      <h1 className='niru'>Posts</h1>
      <div className='allposts-container'>
        {posts.map(function (post, index) {
          return (
            <div className='line' key={index}>
              <div className='info'>
                <img src={allUrls[index]} alt='pp' />
                <p>{allUserNames[index]}</p>
              </div>
              <div className='post'>
                <img
                  src={`https://hexagon-h6fl.onrender.com/profile-pic/${post.post}`}
                  alt='postPic'
                  className='post-image'
                />
              </div>
              <div className='captionDiv'>
                <p>
                  <FaThumbsUp
                    size={25}
                    className='like'
                    onClick={() => {
                      handleLike(index, post.uid);
                    }}
                    id={index}
                  />{' '}<FaThumbsDown size={25} className='like' id={`${index}${index}`} onClick={() => {
                    handleDislike(post.uid, index);
                  }}/>{' '}
                  <span className='us'>{allUserNames[index]}</span>&nbsp;&nbsp;<span className='makeIt'>{post.caption}</span>
                </p>
              </div>
              <div className='comment' id={`comment${index}`}>
                <input type='text' placeholder='comment' onChange={(e) => setComment(e.target.value)} id='inny'/>
                <button
                  onClick={() => {
                    const uid = post.uid;
                    handleComment(uid, index, `comm${index}`);
                  }}
                >
                  send
                </button>
              </div>
              <div className="allComments">
                <button onClick={() => {
                  getComments(post.uid, `comm${index}`);
                  setCurrent(`comm${index}`);
                }}>Get comments</button>
                <div className='comm' id={`comm${index}`}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
  )
};

export default AllPosts;
