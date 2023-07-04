import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import { BiSolidUser,BiSolidLockAlt } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaAddressCard } from 'react-icons/fa';


const Profile = () => {
    // state
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", address: "", phone: "" });
    // context
    const [auth, setAuth] = useAuth();

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/auth/profile`,
                credentials
            );

            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth")
                ls = JSON.parse(ls)
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    };

    const onChangeVal = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        const { name, email, phone, address } = auth.user
        setCredentials({ ...credentials, name: name, email: email, phone: phone, address: address });
        // eslint-disable-next-line 
    }, [])

    return (
        <Layout title={`${auth?.user?.name}'s Profile`}>
            <div style={{ minHeight: '84.5vh' }} className="container-fluid">
                <div style={{ minHeight: '84.5vh' }} className="row">
                    <div className="col-md-2 bg-light">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="register-form mt-5">
                            <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>USER PROFILE</h1>
                            <form onSubmit={onSubmitForm}>
                                <div>
                                    <div className="mb-3 d-flex">
                                        <BiSolidUser className='register-form-icons' />
                                        {/* <label htmlFor="name" className="form-label">Name</label> */}
                                        <input required name='name' onChange={onChangeVal} value={credentials.name} placeholder='Enter Your Name' type="text" className="form-control" id="name" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <MdEmail className="register-form-icons" />
                                        {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
                                        <input disabled required name='email' onChange={onChangeVal} value={credentials.email} placeholder='Enter Your Email Id' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <BsFillTelephoneFill className="register-form-icons" />
                                        {/* <label htmlFor="phone" className="form-label">Phone No.</label> */}
                                        <input required name='phone' onChange={onChangeVal} value={credentials.phone} placeholder='Enter your Phone No.' type="text" className="form-control" id="phone" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <FaAddressCard className="register-form-icons" />
                                        {/* <label htmlFor="address" className="form-label">Adress</label> */}
                                        <input required name='address' onChange={onChangeVal} value={credentials.address} placeholder='Enter Your Address' type="text" className="form-control" id="address" />
                                    </div>
                                    <div className="mb-3 d-flex">
                                        <BiSolidLockAlt className="register-form-icons" />
                                        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                                        <input required name='password' onChange={onChangeVal} value={credentials.password} placeholder='**********' type="password" className="form-control" id="exampleInputPassword1" />
                                    </div>
                                    <button style={{ marginTop: '20px' }} type="submit" className=" d-flex btn btn-primary">
                                        UPDATE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile