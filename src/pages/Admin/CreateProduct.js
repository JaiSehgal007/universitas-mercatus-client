import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const CreateProduct = () => {
  return (
    <Layout  title="Dashboard - Create Product">
      <div style={{minHeight:'84.5vh'}} className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminMenu/>
          </div>
          <div className="col-md-9">
            <h1>Create Products</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct