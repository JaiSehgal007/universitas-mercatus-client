import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import { toast } from 'react-toastify';
import '../styles/Homepage.css'

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [cart, setCart] = useCart();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {

                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, [])

    // get products
    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }
    useEffect(() => {
        if (!checked.length & !radio.length) getAllProducts();
        // eslint-disable-next-line
    }, [checked.length, radio.length])

    useEffect(() => {
        if (checked.length || radio.length) filterProduct();
        // eslint-disable-next-line
    }, [checked, radio]);


    // get total count

    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    }

    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts([...products, ...data.products])
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        if (page === 1) return
        loadMore()
        // eslint-disable-next-line
    }, [page])

    // get products filtered
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`, { checked, radio })
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    // filter by category 
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
            all.push(id);
        } else {
            all = all.filter(c => c !== id);
        }
        setChecked(all);
    }

    return (
        <Layout title={"Home - Universitas Mercatus"}>
            <div className="container-fluid row mt-3 home-page">
                <div className="col-md-2 filters">
                    <h4 className="text-center">Filer By Category</h4>
                    <div className="d-flex flex-column mx-3">
                        {categories?.map(c => {
                            return (
                                <Checkbox key={c._id} onChange={(e) => { handleFilter(e.target.checked, c._id) }}>
                                    {c.name}
                                </Checkbox>
                            );
                        })}
                    </div>
                    <h4 className="text-center mt-4">Filer By Price</h4>
                    <div className="d-flex flex-column mx-3">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio value={p.array}>{p.name}</Radio>
                                </div>
                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column mx-3">
                        <button className='btn btn-danger mt-4' onClick={() => window.location.reload()}>RESET FILTERS</button>
                    </div>
                </div>
                <div className="col-md-10">
                    {/* {JSON.stringify(radio,null,4)} */}
                    <h1 className="text-center">All Products</h1>
                    <h3>Products</h3>
                    <div className="d-flex flex-wrap">
                        {products?.map(p => {
                            return (
                                <div key={p._id} className="card m-2" style={{ width: '18rem' }}>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                                    <div className="card-body">
                                        <div className="card-name-price">
                                            <h5 className="card-title">{p.name}</h5>
                                            <h5 className="card-title card-price">
                                                {p.price.toLocaleString("en-US", {
                                                    style: "currency",
                                                    currency: "USD",
                                                })}
                                            </h5>
                                        </div>
                                        <p className="card-text ">
                                            {p.description.substring(0, 60)}...
                                        </p>
                                        <div className="card-name-price">
                                            <button
                                                className="btn btn-info ms-1"
                                                onClick={() => navigate(`/product/${p.slug}`)}
                                            >
                                                More Details
                                            </button>
                                            <button
                                                className="btn btn-dark ms-1"
                                                onClick={() => {
                                                    setCart([...cart, p]);
                                                    localStorage.setItem(
                                                        "cart",
                                                        JSON.stringify([...cart, p])
                                                    );
                                                    toast.success("Item Added to cart");
                                                }}
                                            >
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="m-3 p-3">
                        {products && products.length < total && (
                            <button className='btn btn-warning' onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage     