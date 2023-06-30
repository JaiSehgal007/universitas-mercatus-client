import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BiSolidLockAlt} from 'react-icons/bi';
import { MdEmail } from 'react-icons/md'
import {RiQuestionnaireFill}from 'react-icons/ri'


const ForgotPassword = () => {

    const [credentials, setCredentials] = useState({email: "", newPassword: "",answer:""});
    const navigate = useNavigate(); 
    const onChangeVal = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const {email,newPassword,answer}=credentials;
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,{
                    email,
                    newPassword,
                    answer
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login")
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <Layout title="Forgot Password - Universitas Mercatus">
            <div className="register">
                <div className="register-form">
                    <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Reset Password</h1>
                    <form onSubmit={onSubmitForm}>
                        <div>
                            <div className="mb-3 d-flex">
                                <MdEmail className="register-form-icons" />
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                                <input required name='email' onChange={onChangeVal} value={credentials.email} placeholder='Enter Your Email Id' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 d-flex">
                                <RiQuestionnaireFill className="register-form-icons" />
                                {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                                <input required name='answer' onChange={onChangeVal} value={credentials.answer} placeholder="Enter your Teacher's Name" type="text" className="form-control" id="answer" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 d-flex">
                                <BiSolidLockAlt className="register-form-icons" />
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                                <input required name='newPassword' onChange={onChangeVal} value={credentials.newPassword} placeholder='Enter your new password' type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="d-flex">
                            <button style={{marginTop:'20px'}} type="submit" className=" d-flex btn btn-primary">
                                Reset Password
                            </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword

