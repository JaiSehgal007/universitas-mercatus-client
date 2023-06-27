import React from 'react'
import { Link } from 'react-router-dom'
import {GrFacebook,GrInstagram, GrLinkedin, GrTwitter} from 'react-icons/gr'

const Footer = () => {
  return (
    <div className='bg-dark text-light p-3'>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-row">

            <div className="footer-col">
              <h4>Company</h4>
              <ul className='footer-ul'>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/services">Our Services</Link></li>
                <li><Link to="/policy">Privacy Policy</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get Help</h4>
              <ul className='footer-ul'>
                <li><Link to="/">FAQ</Link></li>
                <li><Link to="/">Shipping</Link></li>
                <li><Link to="/">Returns</Link></li>
                <li><Link to="/">Order Status</Link></li>
                <li><Link to="/">Payment Options</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Online Shop</h4>
              <ul className='footer-ul'>
                <li><Link to="/">Women</Link></li>
                <li><Link to="/">Men</Link></li>
                <li><Link to="/">Kids</Link></li>
                <li><Link to="/">Watches</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Follow Us</h4>
              <div className='social-links'>
                <Link to="/"><GrFacebook className='mx-1'/></Link>
                <Link to="/"><GrLinkedin className='mx-1'/></Link>
                <Link to="/"><GrInstagram className='mx-1'/></Link>
                <Link to="/"><GrTwitter className='mx-1'/></Link>
              </div>
            </div>


          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer

// All Rights Reserved &copy; Universitas Mercatus