import React from 'react'
import { AiFillLinkedin  } from 'react-icons/ai'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Soroush's Bookshop All rights reserved.</p>
      <Link href="https://www.linkedin.com/in/soroush-bahrami-ba691b19b/" >
        <a target="_blank">
        <AiFillLinkedin className='icons'/>
        </a>
        </Link>
    </div>
  )
}

export default Footer