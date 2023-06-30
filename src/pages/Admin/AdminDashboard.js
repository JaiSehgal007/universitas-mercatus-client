import React from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={`Admin Dashboard - ${auth?.user?.name}`}>
      <div style={{minHeight:'84.5vh'}} className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu active='active'/>
          </div>
          <div className="col-md-9">
            <div className="card w-75 my-3 p-3">
              <h3 className='mx-2'>Name : {auth?.user?.name}</h3>
              <h3 className='mx-2'>Email : {auth?.user?.email}</h3>
              <h3 className='mx-2'>Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard