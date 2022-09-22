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

      }, (error) => {
          console.log(error.text);
          toast.error("Sorry, This feature is unavailable at the moment.");

      });
  };
 
  return (
    
    
    <div className='footer-banner-container'>
      <div className='contact'>
      <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
      </div>
    </div>   
  )
}

export default FooterBanner