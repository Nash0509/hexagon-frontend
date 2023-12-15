import React from 'react'
import '../Styles/Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
         <footer>
        <div class="container">
            <p>&copy; 2023 Hexagon.&nbsp; All rights reserved.</p><br />
            <nav>
                <a href="/terms">Terms of Service</a><br /><br />
                <a href="/privacy">Privacy Policy</a><br /><br />
                <a href="/contact">Contact Us</a>
            </nav>
        </div>
    </footer>
    </div>
  )
}

export default Footer