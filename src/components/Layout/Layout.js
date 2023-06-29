import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            {/* for SEO Optimization */}
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '84.5vh' }}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'Universitas Mercatus - shop now',
    description: 'market plcae for you college',
    keywords: 'mern,react,node,express,mongodb,firebase,college,market',
    author: 'Jai Sehgal'
}

export default Layout