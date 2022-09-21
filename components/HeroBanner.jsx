import React, { useContext } from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { motion } from 'framer-motion'
import { useStateContext } from '../context/StateContext'

const HeroBanner = ({heroBanner}) => {

  const {payNow} = useStateContext()
  


  return (
    <div className='hero-banner-container' whileInView={{ x: [-100, 0], opacity: [0,1]}}
    transition={{ duration: 0.5 }}>
      <div>
        <motion.div
        whileInView={{ y: [-50, 0], opacity: [0, 1]}}
        >
        <h1 className='title'>Anima <br/><span>Books</span></h1>
        </motion.div>
        <motion.div
         whileInView={{ opacity: [0, 1]}}
        >
        {}
        <img src={urlFor(heroBanner.image)} alt="Book" className='hero-banner-image'/>
        </motion.div>
      </div>
    </div>
  )
}

export default HeroBanner