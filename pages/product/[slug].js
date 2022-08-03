import React, {useState, useEffect} from 'react'
import { urlFor, client } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext'
import { toast } from 'react-hot-toast';


const ProductDetails = ({product, products}) => {
    const {image, name, details, price} = product;
    const [index, setIndex] = useState(0)
    const {incQty, decQty, qty, onAdd, filterProducts, setFilterProducts} = useStateContext();

    
  const buyNow = () => {

    toast.error("Sorry, This feature is unavailable at the moment.");
  }

  {useEffect(()=>{
    setFilterProducts(products.filter((singleProduct) => singleProduct.tag === product.tag && singleProduct._id != product._id))
  }, [])}

  return (
    <div>
        <div className='product-detail-container'>
        <div>
            <div className='image-container'>
                <img src= {urlFor(image && image[index])} className="product-detail-image"/>
            </div>
            <div className='small-images-container'>
                {image?.map((item, i) => (
                  <img 
                  src={urlFor(item)}
                  className={i === index ? 'small-image selected-image' : 'small-image'}
                  onMouseEnter={() => setIndex(i)}
                  />
                ))}
            </div>
        </div>
            <div className='product-detail-desc'> 
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiFillStar/>
                      <AiOutlineStar/>
                    </div>
                    <p>
                      (20)
                    </p>
                </div>
                <h4>
                  Details:
                </h4>
                <p>{details}</p>
                <p className='price'>${price}</p>
                <div className='quantity'>
                  <h3>Quantity:</h3>
                  <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}><AiOutlineMinus/></span>
                    <span className='num' onClick="">{qty}</span>
                    <span className='plus' onClick={incQty}><AiOutlinePlus/></span>
                  </p>
                </div>
                <div className='buttons'>
                  <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>
                    Add To Cart
                  </button>
                  
                </div>
            </div>
        </div>

        {filterProducts.length < 1 && (
          <div className='maylike-products-wrapper'>
              <h2>Sorry, We Have No Similar Books</h2>
              </div>
              )}
        {filterProducts.length >= 1 &&(<div className='maylike-products-wrapper'>
              <h2>You May Also Like</h2>
              <div className='marquee'>
              <div className='maylike-products-container track'>
              
              {filterProducts.map((item) => (
                <Product key={item._id} product={item}/>
              ))}

              </div>

              </div>
        </div>)}
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  
    const products = await client.fetch(query);
  
    const paths = products.map((product) => ({
      params: { 
        slug: product.slug.current
      }
    }));
  
    return {
      paths,
      fallback: 'blocking'
    }
  }
  
  export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'
    
    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    console.log(product);
  
    return {
      props: { products, product }
    }
  }

export default ProductDetails