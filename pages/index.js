import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'

const Home = () => {
  return (<>
  <HeroBanner/>

    <div className='products-heading'>
      <h2>Recommended</h2>
      <p>Second-hand Classic Books in Great Condition</p>
    </div>
    <div>
      {['product 1', 'Product 2'].map((product) => product)}
    </div>
    <FooterBanner/>
    </>
  )
}

export default Home