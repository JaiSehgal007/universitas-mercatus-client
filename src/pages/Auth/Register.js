import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BiSolidUser, BiSolidLockAlt} from 'react-icons/bi';
import { MdEmail } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaAddressCard } from 'react-icons/fa';
import {RiQuestionnaireFill}from 'react-icons/ri'


// installing axios to pass the data to the servers as we cannot communicate directly yo yhe server
// if we want to make the use of http client then the best package is axios
// along with it we will be using tostify to get the toast notification


const Register = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", address: "", phone: "" ,answer:""});
    const navigate = useNavigate();
    const onChangeVal = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/auth/register`,
                credentials
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
        <Layout title="Signup - Universitas Mercatus">
            <div className="register">
                <div className="register-form">
                    <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Create a New Account</h1>
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
                                <input required name='email' onChange={onChangeVal} value={credentials.email} placeholder='Enter Your Email Id' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
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
                                <RiQuestionnaireFill className="register-form-icons" />
                                {/* <label htmlFor="address" className="form-label">Adress</label> */}
                                <input required name='answer' onChange={onChangeVal} value={credentials.answer} placeholder="Enter your Teacher's Name" type="text" className="form-control" id="answer" />
                            </div>
                            <div className="mb-3 d-flex">
                                <BiSolidLockAlt className="register-form-icons" />
                                {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                                <input required name='password' onChange={onChangeVal} value={credentials.password} placeholder='Create a strong password' type="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button style={{marginTop:'20px'}} type="submit" className=" d-flex btn btn-primary">
                                SignUp
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Register


// import React, { useState } from 'react';
// import Layout from '../../components/Layout/Layout';

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [phone, setPhone] = useState("");

//   const onChangeName = (e) => {
//     setName(e.target.value);
//   };

//   const onChangeEmail = (e) => {
//     setEmail(e.target.value);
//   };

//   const onChangePassword = (e) => {
//     setPassword(e.target.value);
//   };

//   const onChangeAddress = (e) => {
//     setAddress(e.target.value);
//   };

//   const onChangePhone = (e) => {
//     setPhone(e.target.value);
//   };

//   const onSubmitForm = (e) => {
//     e.preventDefault();
//     console.log("Name:", name);
//     console.log("Email:", email);
//     console.log("Password:", password);
//     console.log("Address:", address);
//     console.log("Phone:", phone);
//   };

//   return (
//     <Layout title="Signup - Universitas Mercatus">
//       <div className="register">
//         <div className="register-form">
//           <h1>Create a New Account</h1>
//           <form onSubmit={onSubmitForm}>
//             <div>
//               <div className="mb-3">
//                 <input
//                   onChange={onChangeName}
//                   value={name}
//                   placeholder='Enter Your Name'
//                   type="text"
//                   className="form-control"
//                   id="name"
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   onChange={onChangeEmail}
//                   value={email}
//                   placeholder='Enter Your Email Id'
//                   type="email"
//                   className="form-control"
//                   id="exampleInputEmail1"
//                   aria-describedby="emailHelp"
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   onChange={onChangePhone}
//                   value={phone}
//                   placeholder='Enter your Phone No.'
//                   type="text"
//                   className="form-control"
//                   id="phone"
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   onChange={onChangeAddress}
//                   value={address}
//                   placeholder='Enter Your Address'
//                   type="text"
//                   className="form-control"
//                   id="address"
//                 />
//               </div>
//               <div className="mb-3">
//                 <input
//                   onChange={onChangePassword}
//                   value={password}
//                   placeholder='Create a strong password'
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                 />
//               </div>
//               <button type="submit" className="btn btn-primary">Submit</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Register;
