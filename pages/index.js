import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client';

const Home = ({products, bannerData}) => {
  return (<>
  <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

    <div className='products-heading'>
      <h2>Recommended</h2>
      <p>Second-hand Classic Books in Great Condition</p>
    </div>
    <div>
      {products?.map((product) => product.name)}
    </div>
    <FooterBanner/>
    </>
  )
}

export const getServerSideProps = async () => {

  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return{
    props: {products, bannerData}
  }

}
export default Home