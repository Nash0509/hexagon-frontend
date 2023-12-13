import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <ul>
            <li>Login</li>
            <div className="sec">
                <li><Link to='/home'>Home</Link></li>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/signup'>SignUp</Link></li>
            </div>
        </ul>
    </div>
  )
}

export default Header