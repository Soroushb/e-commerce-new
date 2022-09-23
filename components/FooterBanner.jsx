import React, { useState, useRef } from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';


const FooterBanner = ({footerBanner: {name, price, details, saleTime, smallText, midText, product, buttonText, image, desc}}) => {
  

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_SERVICE_ID)
    emailjs.sendForm(process.env.NEXT_PUBLIC_SERVICE_ID, process.env.NEXT_PUBLIC_TEMPLATE_ID, form.current, process.env.NEXT_PUBLIC_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          toast.success("Thank you for your feedback!");


      }, (error) => {
          console.log(error.text);
          toast.error("An error occured.");

      });
  };
 
  return (
    
    
    <div className='footer-banner-container'>
      <div className='contact'>
      <h1>Contact Us</h1>
      <form className='message-form' ref={form} onSubmit={sendEmail}>
      <label className='form-label'>Name:</label>
      <input className='form-input' type="text" name="user_name" />
      <label className='form-label'>Email:</label>
      <input className='form-input' type="email" name="user_email" />
      <label className='form-label'>Message:</label>
      <textarea className='form-input' name="message" />
      <input className='form-button' type="submit" value="Send" />
    </form>
      </div>
    </div>   
  )
}

export default FooterBanner