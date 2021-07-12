import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import Products from './products/Products'
import ProductDetails from './productDetails/ProductDetails'
import Cart from './cart/Cart'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import NotFound from './utils/not_found/NotFound'
import Brands from './brands/Brands'
import Categories from './categories/Categories'
import ProductTypes from './productTypes/ProductTypes'
import CreateProduct from './createProduct/CreateProduct'
import { GlobalState } from '../../GlobalState'
import UserProfiles from '../mainpages/userProfiles/userProfiles'
import VendorBrands from '../mainpages/vendor/vendorBrands/vendorBrands'
import VendorProducts from '../mainpages/vendor/vendorProducts/vendorProducts';
import DashboardLanding from './Landing/DashboardLanding';
import ActivationEmail from './auth/ActivationEmail';
import ForgotPassword from './auth/ForgotPassword';
import ResetPassword from './auth/ResetPassword';
import ManageUsers from './superAdmin/manage_users/ManageUsers';
import EditUser from './superAdmin/manage_users/EditUser';

function Pages() {

    const state = useContext(GlobalState)
    const [isLoggedIn] = state.userAPI.isLoggedIn
    const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin


    return (
        <Switch>
            <Route path="/" exact component={DashboardLanding} />
            <Route path="/detail/:id" exact component={ProductDetails} />

            <Route path="/account/login" exact component={ isLoggedIn ? NotFound : Login } />
            <Route path="/account/register" exact component={ isLoggedIn ? NotFound : Register } />
            <Route path="/account/forgot_password" exact component={ isLoggedIn ? NotFound : ForgotPassword } />
            <Route path="/user/account/reset_password/:token" exact component={ isLoggedIn ? NotFound : ResetPassword } />

            <Route path="/user/account/activate/:activation_token" exact component={ActivationEmail} />

            <Route path="/manage_users" exact component={ isSuperAdmin ? ManageUsers : NotFound } />
            <Route path="/edit_users/:id" exact component={ isSuperAdmin ? EditUser : NotFound } />

            <Route path="/products" exact component={ isAdmin ? NotFound : Products } />

            <Route path="/category" exact component={ isSuperAdmin ? Categories : NotFound } />
            <Route path="/brand" exact component={ isSuperAdmin ? Brands : NotFound } />
            <Route path="/product_type" exact component={ isSuperAdmin ? ProductTypes : NotFound } />
            <Route path="/user_profile/:id" exact component={ isLoggedIn ? UserProfiles : NotFound } />
            <Route path="/vendorbrands/:uid" exact component={ isAdmin ? VendorBrands : NotFound } />
            <Route path="/vendorproducts/:uid" exact component={ isAdmin ? VendorProducts : NotFound } />

            <Route path="/create_product" exact component={ isAdmin ? CreateProduct : NotFound } />
            <Route path="/edit_product/:id" exact component={ isAdmin || isSuperAdmin ? CreateProduct : NotFound } />

            <Route path="/history" exact component={ isLoggedIn ? OrderHistory : NotFound } />
            <Route path="/history/:id" exact component={ isLoggedIn ? OrderDetails : NotFound } />

            <Route path="/cart" exact component={Cart} />
            
            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages