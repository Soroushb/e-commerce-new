import React, {useEffect, useState} from 'react'
import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client';
import { useStateContext} from '../context/StateContext'
import { motion } from 'framer-motion';
import { AiFillFilter, AiOutlineArrowRight  } from 'react-icons/ai'


const Home = ({products, bannerData}) => {

  const {activeFilter, setActiveFilter, ourProducts, setOurProducts, filterProducts, setFilterProducts} = useStateContext();
  const [showFilterOptions, setShowFilterOptions] = useState(false)
  const [range, setRange] = useState(0);
  const [showGenres, setShowGenres] = useState(false)
  const [showPriceRange, setShowPriceRange] = useState(false)
  const [showTitleSearch, setShowTitleSearch] = useState(false)
  const [showAuthorSearch, setShowAuthorSearch] = useState(false)


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

  const handleTitleSearch = (title) => {
    setFilterProducts(products.filter((product) => product.name.toLowerCase().includes(title)))
  }

  const handleAuthorSearch = (title) => {
    setFilterProducts(products.filter((product) => product.author.toLowerCase().includes(title)))
  }

  return (<>
  <HeroBanner heroBanner={bannerData.length && bannerData[0]}/>

    {useEffect(()=>{
      handleProductFilter('ALL')
    }, [])}

    <div className='products-heading'>
      <h3>Second-hand Classic Books in Great Condition</h3>
    </div>

    <div className='filter-option'>
      <div className='filter-button' onClick={() => setShowFilterOptions(!showFilterOptions)}>
        Filter Books <AiFillFilter/>
      </div>
    </div>

    { showFilterOptions &&
    <div className='filter-options'>
        <div className='filter-option-items'>
        <p className='filter-item' onClick={() => {setShowGenres(!showGenres)
                                                   setShowPriceRange(false)
                                                   setShowTitleSearch(false)
                                                   setShowAuthorSearch(false)}}>By Genre</p>

        <p className='filter-item' onClick={() => {setShowAuthorSearch(!showAuthorSearch)
                                                   setShowPriceRange(false)
                                                   setShowGenres(false)
                                                   setShowTitleSearch(false)}}>By Author</p>
        
        <p className='filter-item' onClick={() => {setShowTitleSearch(!showTitleSearch)
                                                   setShowPriceRange(false)
                                                   setShowGenres(false)
                                                   setShowAuthorSearch(false)}}>By Title</p>

        <p className='filter-item' onClick={() => {setShowPriceRange(!showPriceRange)
                                                   setShowGenres(false)
                                                   setShowTitleSearch(false)
                                                   setShowAuthorSearch(false)}}>By Price</p>
        </div>
    </div>
    }
    { showGenres &&
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
      }
      { showPriceRange &&
      <div className='filter-price'>
          <div className='ranges-list'>
            {ranges.map((item, index) => (
              <div>
              <div>
                <p  className={`app__work-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`} onClick={() => handleRangeFilter(item.price)}>{item.title}</p>
              </div>
             </div>
            ))}
          </div>
          <div className='range-manual'>
              <p>Or enter the price:</p>
              <input className='range-input' type="text" onChange={(e) => setRange(e.target.value)}></input>
              <div className='range-submit' onClick={() => handleRangeFilter(range)
              }><AiOutlineArrowRight/></div>
          </div>
      </div>
      }
      { showTitleSearch &&
      <div className='title-search'>
            <p>Please Enter the Title:</p>
            <input className='title-search-input' type="text" onChange={(e) => handleTitleSearch(e.target.value.toLowerCase())}/>
      </div>
      }
      { showAuthorSearch &&
      <div className='author-search'>
            <p>Please Enter the Author's name:</p>
            <input className='author-search-input' type="text" onChange={(e) => handleAuthorSearch(e.target.value.toLowerCase())}/>
      </div>
      }

    <motion.div
        whileInView={{ opacity: [0.3, 1]}}
        >
    <div className='products-container'>
      {filterProducts.length != 0 ? filterProducts?.map((product) => <Product key={product._id} product={product}/>) : 
      (<h2>Sorry, No Item Was Found.</h2>)}
      
    </div>
    </motion.div>
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