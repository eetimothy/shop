import { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import { Link } from 'react-router-dom'
import Menu from './icon/menu.svg'
import Cart from './icon/cart.svg'
import Close from './icon/close.svg'
import axios from 'axios'


function Header() {
    const state = useContext(GlobalState)
    // console.log(state)
    const [isLoggedIn] = state.userAPI.isLoggedIn
    const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin
    const [cart] = state.userAPI.cart
    const [menu, setMenu] = useState(false)

    const [user] = state.userAPI.user
    // console.log(user._id)
    // console.log(state)

    const logoutUser = async () => {
        try {
            await axios.get('user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/"
        } catch (err) {
            window.location.href = "/"
        }
        
    }

    const adminRouter = () => {
        return (
            <>
                <li><Link to={`/vendorbrands/${user._id}`}>Manage Brands</Link></li>
                <li><Link to={`/vendorproducts/${user._id}`}>Manage Products</Link></li>
                <li><Link to="/create_product">Create Product</Link></li>
            </>
        )
    }

    const superAdminRouter = () => {
        return (
            <>
                <li><Link to={`/products`}>Products</Link></li>
                <li><Link to="/brand">Brands</Link></li>
                <li><Link to="/category">Categories</Link></li>
                <li><Link to="/product_type">Product Types</Link></li>
            </>
        )
    }

    // const loggedRouter = () => {
    //     return (
    //         <>
    //             <li><Link to="/history">Order History</Link></li>
    //             <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
    //         </>
    //     )
    // }

    const loggedRouter = () => {
        return <li className="drop-nav">
            <Link to='#' className="avatar">
                <img src={user.avatar} alt="" />{user.username}<i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to={`/user_profile/${user._id}`}>Profile</Link></li>
                <li><Link to="/history">Orders</Link></li>
                {isSuperAdmin ? <li><Link to="/manage_users">Manage Users</Link></li> : '' }
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </ul>
        </li>
    }

    // const toggleMenu = () => setMenu(!menu)

    // const transform = {
    //     transform: isLoggedIn ? "translateY(-5px)" : 0
    // }

    const styleMenu = {
        left: menu ? 0 : "-100%",
        transform: isLoggedIn ? "translateY(-5px)" : 0
    }

    return (
        <header>
            <div className="menu" onClick={() => setMenu(!menu)}>
                <img src={Menu} alt="" width="30" />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">
                        {
                            isAdmin ? 'Vendor'
                                : isSuperAdmin ? 'Super Admin'
                                    : 'Shop'
                        }
                    </Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to='/products'>
                    {
                        isAdmin ? ''
                            : isSuperAdmin ? ''
                                : 'Shop'
                    }
                </Link></li>

                {isAdmin && adminRouter()}
                {isSuperAdmin && superAdminRouter()}
                {
                    isLoggedIn ? loggedRouter() : <li><Link to='/account/login'><i className="fas fa-user">Sign in</i></Link></li>
                }


                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt="" width="30" className="menu" />
                </li>
            </ul>

            {
                isAdmin ? ''
                : isSuperAdmin ? ''
                    : <div className="cart-icon">
                        <span>{cart.length}</span>
                        <Link to="/cart">
                            <img src={Cart} alt="" width="30" />
                        </Link>
                    </div>
            }


        </header>
    )
}

export default Header;