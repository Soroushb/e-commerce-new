import React, {useEffect, useState} from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client';
import { useStateContext} from '../context/StateContext'
import { motion } from 'framer-motion';
import { AiFillFilter, AiOutlineArrowRight  } from 'react-icons/ai'





const Home = ({products, bannerData}) => {

  const {activeFilter, setActiveFilter, ourProducts, setOurProducts, filterProducts, setFilterProducts} = useStateContext();
  const [range, setRange] = useState(0);

  /*useEffect(() => {
    const query = '*[_type == "product"]';
    client.fetch(query).then((data) => {
      setOurProducts(data);
      setFilterProducts(data);
    });
  }, []);*/

  const ranges = [
    {
      title: "Below $5",
      price: 5.00
    },
    {
      title: "Below $8",
      price: 8.00
    },
    {
      title: "Below $10",
      price: 10.00
    },
    {
      title: "Below $50",
      price: 50.00
    }
  ]

  const handleProductFilter = (item) => {
    setActiveFilter(item);

    setTimeout(() => {

      if (item === 'ALL') {
        setFilterProducts(products);
      } else {
        setFilterProducts(products.filter((product) => product.tag === item));
      }
    }, 500);
  };

  const handleRangeFilter = (price) => {
    setFilterProducts(products.filter((product) => product.price <= price));

  }

  return (<>
  <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

    {useEffect(()=>{
      handleProductFilter('ALL')
    }, [])}

    <div className='products-heading'>
      <h3>Second-hand Classic Books in Great Condition</h3>
    </div>

    <div className="product-filter">
        {['ALL', 'FICTION', 'PHILOSOPHY', 'ART', 'POETRY', 'OTHER'].map((item, index) => (
          <div
            key={index}
            onClick={() => handleProductFilter(item)}
            className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className='filter-price'>
          <AiFillFilter/>
          <h4>Filter Price:</h4>
          <div className='ranges-list'>
            {ranges.map((item, index) => (
              <div>
              <div className='range-button'>
                <p onClick={() => handleRangeFilter(item.price)}>{item.title}</p>
              </div>
             </div>
            ))}
          </div>
          <div className='range-manual'>
              <p>or enter the price:</p>
              <input className='range-input' type="text" onChange={(e) => setRange(e.target.value)}></input>
              <div className='range-submit' onClick={() => handleRangeFilter(range)}><AiOutlineArrowRight/></div>
          </div>
      </div>

    <div className='products-container'>
      {filterProducts?.map((product) => <Product key={product._id} product={product}/>)}
    </div>

    <FooterBanner footerBanner={products[3]}/>
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