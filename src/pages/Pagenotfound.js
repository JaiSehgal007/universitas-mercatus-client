import React from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate } from 'react-router-dom'

const Pagenotfound = () => {
    const navigate=useNavigate();
    const goBack = () => {
      navigate(-1);
    };
    return (
        <Layout title={"go back- page not found"}>
          <div className="pnf">
            <h1 className="pnf-title">404</h1>
            <h2 className="pnf-heading">Oops ! Page Not Found</h2>
            <button onClick={goBack} className="pnf-btn">
              Go Back
            </button>
          </div>
        </Layout>
      );
}

export default Pagenotfound