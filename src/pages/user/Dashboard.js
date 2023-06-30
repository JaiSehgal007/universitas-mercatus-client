import React from 'react'
import Layout from '../../components/Layout/Layout.js'
import { useAuth } from '../../context/auth.js'


const Dashboard = () => {
  const [auth]=useAuth();
  let userName=auth.user.name;
  return (
    <Layout title={`Dashboard - ${userName}`}>
        
    </Layout>
  )
}

export default Dashboard