import React, { useContext } from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { useStateContext } from '../context/StateContext'

const HeroBanner = ({heroBanner}) => {

  const {payNow} = useStateContext()


  return (
    <div className='hero-banner-container' whileInView={{ x: [-100, 0], opacity: [0,1]}}
    transition={{ duration: 0.5 }}>
      <div>
       
        <h1>Soroush's <br/> <span>Books</span></h1>
        <img src={urlFor(heroBanner.image)} alt="Book" className='hero-banner-image'/>
        <div>
              <button type='button' onClick={() => payNow()}>{heroBanner.buttonText}</button>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner