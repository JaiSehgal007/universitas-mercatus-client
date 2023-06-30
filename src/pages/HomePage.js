import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'

const HomePage = () => {
    const [auth]=useAuth();
    return (
        <Layout>
            <div>HomePage</div>
            <pre>{JSON.stringify(auth,null,4)}</pre>
        </Layout>
    )
}

export default HomePage     