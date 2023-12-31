import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import {BiSolidLockAlt} from 'react-icons/bi';
import { MdEmail } from 'react-icons/md'
import { useAuth } from '../../context/auth';


const Login = () => {

    const [credentials, setCredentials] = useState({email: "", password: ""});
    const [auth,setAuth]=useAuth()
    const navigate = useNavigate();
    const location = useLocation();
    const onChangeVal = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/login`,
                credentials
            );

            if (res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    // this way we are spreading auth, so that all the previous values are retained and only the selected values are updated
                    ...auth,
                    user:res.data.user,
                    token:res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data));
                navigate(location.state || "/")
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title="Login - Universitas Mercatus">
            <div className="register">
                <div className="register-form">
                    <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Login to your Account</h1>
                    <form onSubmit={onSubmitForm}>
                        <div>
                            <div className="mb-3 d-flex">
                                <MdEmail className="register-form-icons" />
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                                <input required name='email' onChange={onChangeVal} value={credentials.email} placeholder='Enter Your Email Id' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 d-flex">
                                <BiSolidLockAlt className="register-form-icons" />
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                                <input required name='password' onChange={onChangeVal} value={credentials.password} placeholder='Enter your password' type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="d-flex">
                            <button style={{marginTop:'20px'}} type="submit" className=" d-flex btn btn-primary">
                                Login
                            </button>
                            <button style={{marginTop:'20px'}} type="button" onClick={()=>{navigate('/forgot-password')}}  className="mx-2 d-flex btn btn-primary">
                                Forgot Password
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login

