import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import { toast } from 'react-toastify'

const CartPage = () => {
    // eslint-disable-next-line
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce, cart
            });
            setLoading(false);
            localStorage.removeItem('cart');
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Order Placed Successfully");
        } catch (error) {
            setLoading(false);
            console.log(error)
        }
    }


    const removeCardItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        } catch (error) {
            console.log(error)

        }
    }

    // get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken();
    }, [auth?.token])

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { return (total = total + item.price) });
            return total.toLocaleString("en-US", {
                style: 'currency',
                currency: 'USD',
            });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="text-center bg-light p-2">
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h5 className="text-center">
                            {cart?.length >= 1 ? `You have ${cart.length} items in your cart${auth?.token ? "" : ". Please login to checkout"}` : " Your cart is Empty"}
                        </h5>
                    </div>
                </div>
                <div className="row gx-5">
                    <div className="col-md-8">
                        {
                            cart?.map(p => (
                                <div key={p._id} className="row p-3 mb-2 card flex-row">
                                    <div className="col-md-2">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                            className="card-img-top cart-img"
                                            alt={p.name}
                                            width={'100px'}
                                            height={'100px'}
                                        />
                                    </div>
                                    <div className="cart-prod-text col-md-8">
                                        <h5>{p.name}4</h5>
                                        <p>{p.description.substring(0, 30)}</p>
                                        <h5>Price : {p.price}</h5>
                                        <button className='btn btn-danger' onClick={() => removeCardItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="cart-payment-details col-md-4">
                        <h4 className='text-center'>Cart Summary</h4>
                        <p className='text-center'>TOTAL | CHECKOUT | PAYMENT</p>
                        <hr />
                        <h4 className='text-center'>Total : {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h5>Current Address : </h5>
                                    <h6>{auth?.user?.address}</h6>
                                    <button className='btn btn-outline-warning' onClick={() => { navigate('/dashboard/user/profile') }}>
                                        Update Adress
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <button className='btn btn-outline-warning' onClick={() => { navigate('/dashboard/user/profile') }}>
                                            Update Adress
                                        </button>
                                    ) : (
                                        <button className='btn btn-outline-warning' onClick={() => { navigate('/login', { state: "/cart" }) }}>
                                            Please Login First
                                        </button>
                                    )
                                }
                            </div>
                        )}
                        <div className="mt-2">
                            {
                                !clientToken || !cart?.length ? ("") : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />
                                        <button
                                            className='btn btn-primary mb-5'
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}>
                                            {loading ? "Processing Payment" : "Make Payment"}
                                        </button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage