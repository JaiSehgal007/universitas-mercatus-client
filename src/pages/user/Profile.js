import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Profile = () => {
    const [auth]=useAuth();
    return (
        <Layout title={`${auth?.user?.name}'s Profile`}>
            <div style={{minHeight:'84.5vh'}} className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <UserMenu/>
                    </div>
                    <div className="col-md-9">
                        <h1>User Profile</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile