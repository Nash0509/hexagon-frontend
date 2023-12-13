import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Header from './Components/Header'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Comeback from './Components/Comeback'
import CreatePost from './Components/CreatePost'
import AllPosts from './Components/AllPosts'
import ViewProfile from './Components/ViewProfile'
import EditProfile from './Components/EditProfile'

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
      <Route  path='/login' element={<Login />}/>
        <Route path='/home/:id' element={<Home />}/>
        <Route path='/signup/:id' element={<Signup />}/>
        <Route index element={<Navigate to="/login" />} />
        <Route path='/comeback' element={<Comeback />}/>
        <Route path='/createpost/:id' element={<CreatePost />}/>
        <Route path='/allposts/:id'  element={<AllPosts />}/>
        <Route path='/viewProfile/:id/:back' element={<ViewProfile />}/>
        <Route path='/EditProfile/:id' element = {<EditProfile/>}/>
      </Routes>
    </Router>
  )
}

export default App