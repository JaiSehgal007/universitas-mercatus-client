import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Orders = () => {
    return (
        <Layout title="Your Orders">
            <div style={{minHeight:'84.5vh'}} className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <h1>All Orders</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders