import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate=useNavigate();

  // initial state
  useEffect(() => {
    if (params?.slug) getProduct()
    // eslint-disable-next-line
  }, [params?.slug])

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  }

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="row container mt-2">
        <div className="col-md-3">
          <img
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?._id}`}
            className="card-img-top" alt={product?.name}
            height={'300px'}
            width={'300px'}
          />
        </div>
        <div className="col-md-6 p-4">
          <h1 className='text-center'>Product Details</h1>
          <h6>Name : {product?.name}</h6>
          <h6>Description : {product?.description}</h6>
          <h6>Price : {product?.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <h6>Shipping : {product?.shipping ? "YES" : "NO"}</h6>
          <button className="btn btn-secondary ms-1">Add to Cart</button>

        </div>
      </div>
      <hr />
      <div className="row container">
        <h2 className='text-center'>Similar Products</h2>
        {relatedProducts.length<1 && (<p>No Similar Products Found</p>)}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map(p => {
            return (
              <div key={p._id} className="card m-3" style={{ width: '10rem' }}>
                <img style={{height:'60px',width:'60px'}} src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">${p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={() => navigate(`product/${p.slug}`)}>View Product</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails