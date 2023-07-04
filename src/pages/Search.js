import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    // eslint-disable-next-line
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div className="container">
                <div className="text-center">
                    <h1>Search Results</h1>
                    <h6>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length} Products`}</h6>
                    <div className="d-flex flex-wrap mt-4">
                        {values?.results.map(p => {
                            return (
                                <div key={p._id} className="card m-3" style={{ width: '18rem' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}</p>
                                        <p className="card-text">${p.price}</p>
                                        <button className="btn btn-primary ms-1">View Product</button>
                                        <button className="btn btn-secondary ms-1">Add to Cart</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search