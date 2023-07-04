import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import NavbarImg from '../../assets/shopping-bag.png'
import { useAuth } from '../../context/auth'
import { toast } from 'react-toastify'
import SearchInput from '../Form/SearchInput'

const Header = () => {
    const [auth, setAuth] = useAuth()
    const handleLogout = () => {
        setAuth({
            ...setAuth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth')
        toast.success("Logged out Successfully");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src={NavbarImg} alt="Logo" width="30" height="30" className="d-inline-block align-text-top mx-2" />
                        Universitas Mercatus
                    </Link >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link">Home</NavLink >
                            </li>
                            <li className="nav-item">
                                <NavLink to="/category" className="nav-link">Category</NavLink >
                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/signup" className="nav-link">Signup</NavLink >
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link">Login</NavLink >
                                    </li>
                                </>) : (<>

                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" role='button' href="/" data-bs-toggle="dropdown" aria-expanded="false">
                                            {auth?.user?.name}
                                        </Link>
                                        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                            <NavLink to={`/dashboard/${auth?.user?.role===1?'admin':'user'}`} className="dropdown-item">Dashboard</NavLink>
                                            <NavLink onClick={handleLogout} to="/login" className="dropdown-item">Logout</NavLink >
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/cart" className="nav-link">
                                            Cart
                                            
                                        </NavLink >
                                        {/* <span className="cart-badge translate-middle badge rounded-pill bg-danger">
                                                0
                                                <span className="visually-hidden">unread messages</span>
                                            </span> */}
                                    </li>
                                </>)
                            }
                            <SearchInput/>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header