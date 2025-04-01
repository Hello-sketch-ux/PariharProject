import React from 'react';
import "./contactUs.css";
import { MdOutlineWhatsapp } from "react-icons/md";

const ContactUs = () => {
  return (
    <div className='contact-us-wrapper'>
        {/* Contact us heading */}
        <h3 className='contact-us-heading'>
            Contact Us
            <div className='contact-us-heading-underline'></div>
        </h3>

        <div className='contact-us-description-section'>

            {/* greeting message */}
            <div className='contact-us-first-sub-description'>
                <p className='contact-us-first-sub-description-first-line'>Better yet, see us in person!</p>
                <div className='contact-us-first-sub-description-second-line'>
                    <p>We love our customers, So feel free to visit us anytime.</p>
                    <p>We are available 24/7.</p>
                </div>
            </div>

            {/* Contactus on whatsapp button */}
            <a href="https://wa.me/701198792?text=Hello! I'm interested in your services. Can you please provide more details?" 
               className='contact-us-message-button'
               target="_blank"
               rel="noreferrer">
                <span className='contact-us-message-button-content'><MdOutlineWhatsapp className='whatsappSymbol'/>Message us on WhatsApp</span>
            </a>

            {/* contact credentials */}
            <div className='contact-us-contact-details'>
                <a href="mailto:helpdesk@pariharindia.com" className='contact-us-email'>Email ID : helpdesk@pariharindia.com</a>
                <p className='contact-us-phone-number'>Phone Number: <span className='contact-us-number'>7011989792</span></p>
            </div>
        </div>
    </div>
  )
}

export default ContactUs