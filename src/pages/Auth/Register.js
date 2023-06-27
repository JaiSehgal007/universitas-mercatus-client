// import React, { useState } from 'react'
// import Layout from '../../components/Layout/Layout'

// const Register = () => {
//     const onChangeVal= (e)=>{
//         setCredentials({...credentials, [e.target.name]:e.target.value})
//     }
//     const [credentials, setCredentials] = useState({name:"",email:"",password:"",address:"",phone:""});
//     const onSubmitForm = (e) => {
//         e.preventDefault();
//         console.log(credentials);
//       };
//     return (
//         <Layout title="Signup - Universitas Mercatus">
//             <div className="register">
//                 <div className="register-form">
//                     <h1>Create a New Account</h1>
//                     <form onSubmit={onSubmitForm}>
//                         <div>
//                             <div className="mb-3">
//                                 {/* <label htmlFor="name" className="form-label">Name</label> */}
//                                 <input onChange={onChangeVal} value={credentials.name} placeholder='Enter Your Name' type="text" className="form-control" id="name"/>
//                             </div>
//                             <div className="mb-3">
//                                 {/* <label htmlFor="exampleInputEmail1" className="form-label">Email address</label> */}
//                                 <input onChange={onChangeVal} value={credentials.email} placeholder='Enter Your Email Id' type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
//                             </div>
//                             <div className="mb-3">
//                                 {/* <label htmlFor="phone" className="form-label">Phone No.</label> */}
//                                 <input onChange={onChangeVal} value={credentials.phone} placeholder='Enter your Phone No.' type="text" className="form-control" id="phone"/>
//                             </div>
//                             <div className="mb-3">
//                                 {/* <label htmlFor="address" className="form-label">Adress</label> */}
//                                 <input onChange={onChangeVal} value={credentials.address} placeholder='Enter Your Address' type="text" className="form-control" id="address"/>
//                             </div>
//                             <div className="mb-3">
//                                 {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
//                                 <input onChange={onChangeVal} value={credentials.password} placeholder='Create a strong password'  type="password" className="form-control" id="exampleInputPassword1" />
//                             </div>
//                             <button type="submit" className="btn btn-primary">Submit</button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </Layout>
//     )
// }

// export default Register


import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Address:", address);
    console.log("Phone:", phone);
  };

  return (
    <Layout title="Signup - Universitas Mercatus">
      <div className="register">
        <div className="register-form">
          <h1>Create a New Account</h1>
          <form onSubmit={onSubmitForm}>
            <div>
              <div className="mb-3">
                <input
                  onChange={onChangeName}
                  value={name}
                  placeholder='Enter Your Name'
                  type="text"
                  className="form-control"
                  id="name"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={onChangeEmail}
                  value={email}
                  placeholder='Enter Your Email Id'
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={onChangePhone}
                  value={phone}
                  placeholder='Enter your Phone No.'
                  type="text"
                  className="form-control"
                  id="phone"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={onChangeAddress}
                  value={address}
                  placeholder='Enter Your Address'
                  type="text"
                  className="form-control"
                  id="address"
                />
              </div>
              <div className="mb-3">
                <input
                  onChange={onChangePassword}
                  value={password}
                  placeholder='Create a strong password'
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
