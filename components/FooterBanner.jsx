import React, { useState } from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
const FooterBanner = ({footerBanner: {name, price, details, saleTime, smallText, midText, product, buttonText, image, desc}}) => {
  
 
  return (
    
    
    <div className='footer-banner-container'>
    <div className='banner-desc'>
      <div className='left'>
        <h3>Our Sale</h3>
        <h4>{name}</h4>
        <h3>Only ${price}</h3>
        <p>{details}</p>

      </div>
      
      <img src={urlFor(image[0])} width={400} className="footer-banner-image"/>
    </div>
    </div>   
  )
}

export default FooterBanner