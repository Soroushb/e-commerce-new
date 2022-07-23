import React, {useEffect, useState} from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client';
import { useStateContext } from '../context/StateContext'
import { motion } from 'framer-motion';



const Home = ({products, bannerData}) => {

  const {activeFilter, setActiveFilter, ourProducts, setOurProducts, filterProducts, setFilterProducts} = useStateContext();

  /*useEffect(() => {
    const query = '*[_type == "product"]';

    client.fetch(query).then((data) => {
      setOurProducts(data);
      setFilterProducts(data);
    });
  }, []);*/


  
  const handleProductFilter = (item) => {
    setActiveFilter(item);

    setTimeout(() => {

      if (item === 'All') {
        setFilterProducts(products);
      } else {
        setFilterProducts(products.filter((product) => product.tag === item));
      }
    }, 500);
  };

  return (<>
  <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

    <div className='products-heading'>
      <h2>Recommended</h2>
      <p>Second-hand Classic Books in Great Condition</p>
    </div>

    <div className="product-filter">
        {['All', 'fiction', 'philosophy', 'art', 'poetry', 'other'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleProductFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

    <div className='products-container'>
      {filterProducts?.map((product) => <Product key={product._id} product={product}/>)}
    </div>

    <FooterBanner footerBanner={bannerData && bannerData[0]}/>
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