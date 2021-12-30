import { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
// import { useParams } from 'react-router-dom'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CancelIcon from '@mui/icons-material/Cancel';
import './Cart.css'

const Cart = () => {
    const state = useContext(GlobalState)
    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [user] = state.userAPI.user



    // const { uid } = useParams()

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => {
                return prev + (item.groupBuyPrice * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    // console.log(cart)

    //create group buy cart
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', { cart }, {
            headers: { Authorization: token }
        })

    }



    const increment = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                // item.quantity += 1
                item.quantity < item.groupBuyQty ? item.quantity += 1 : item.quantity = item.groupBuyQty

            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = (id) => {
        // if(window.confirm("Do you want to remove this item permanently?")){
        cart.forEach((item, index) => {
            if (item._id === id) {
                cart.splice(index, 1)
            }
        })
        setCart([...cart])
        addToCart(cart)
        // }
    }

    const createGroupBuy = async (cart) => {
        // const { product_id } = cart;
        //when user completes payment, he auto creates a group buy
        //when user completes payment of eg 2 products, he will auto create 2 group buys
        await cart.map(item => {
            //order = total available quantity per group buy
            if (item.quantity === item.groupBuyQty) {
                return axios.post('/api/groupbuys', {
                    product: item._id, title: item.title, description: item.description, content: item.content,
                    brand: item.brand, productType: item.productType, category: item.category, product_id: item.product_id,
                    groupBuyPrice: item.groupBuyPrice, vendorId: item.vendorId, images: item.images,
                    users: [{ id: user._id, username: user.username, email: user.email, mobile: user.mobile, address: user.address, quantity: item.quantity }], startUser: user.username, startedBy: user._id, groupBuyQty: item.groupBuyQty - item.quantity,
                    buyers: item.quantity, successTarget: item.successTarget - item.quantity, vendorCompany: item.vendorCompany, vendorMobile: item.vendorMobile, vendorEmail: item.vendorEmail,
                    isActive: false, success: true
                }, {
                    headers: { Authorization: token }
                })
            } else if (item.quantity === item.successTarget || item.quantity > item.successTarget) {
                return axios.post('/api/groupbuys', {
                    product: item._id, title: item.title, description: item.description, content: item.content,
                    brand: item.brand, productType: item.productType, category: item.category, product_id: item.product_id,
                    groupBuyPrice: item.groupBuyPrice, vendorId: item.vendorId, images: item.images,
                    users: [{ id: user._id, username: user.username, email: user.email, mobile: user.mobile, address: user.address, quantity: item.quantity }], startUser: user.username, startedBy: user._id, groupBuyQty: item.groupBuyQty - item.quantity,
                    buyers: item.quantity, successTarget: item.successTarget - item.quantity, vendorCompany: item.vendorCompany, vendorMobile: item.vendorMobile, vendorEmail: item.vendorEmail,
                    isActive: true, success: true
                }, {
                    headers: { Authorization: token }
                })
            } else {
                return axios.post('/api/groupbuys', {
                    product: item._id, title: item.title, description: item.description, content: item.content,
                    brand: item.brand, productType: item.productType, category: item.category, product_id: item.product_id,
                    groupBuyPrice: item.groupBuyPrice, vendorId: item.vendorId, images: item.images,
                    users: [{ id: user._id, username: user.username, email: user.email, mobile: user.mobile, address: user.address, quantity: item.quantity }], startUser: user.username, startedBy: user._id, groupBuyQty: item.groupBuyQty - item.quantity,
                    buyers: item.quantity, successTarget: item.successTarget - item.quantity, vendorCompany: item.vendorCompany, vendorMobile: item.vendorMobile, vendorEmail: item.vendorEmail,
                    isActive: true, success: false
                }, {
                    headers: { Authorization: token }
                })
            }
        })
    }

    const tranSuccess = async (payment) => {
        console.log(payment)
        const { paymentID, address } = payment;

        await axios.post('/api/payment', { cart, paymentID, address }, {
            headers: { Authorization: token }
        })
        setCart([])
        addToCart([])
        alert("You have successfully placed an order and started a Group Buy!")
        createGroupBuy(cart)
        // window.location.href = `/groupbuys_user/${uid}`;
    }


    if (cart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "2rem" }}> </h2>

    return (
        <div>
            <h2>Start Group Buys</h2>
            {
                cart.map(product => (
                    <div className="details cart" key={product._id}>

                        <img src={product.images.url} alt="" className="img_container" style={{ height: "200px" }} />

                        <div className="box-detail">

                            <h6>{product.title}</h6>


                            <h3>$ {product.groupBuyPrice * product.quantity}</h3>
                            <h6>Group Buy Description</h6>

                            <p>{product.content}</p>
                            <p style={{ color: "crimson", fontWeight: "700" }}>*Instructions: Checkout to start the group buy.</p>
                            {/* 
                    <h6>Vendor Details</h6>
                    <p>Company: {product.vendorCompany}</p>
                    <p>Email: {product.vendorEmail}</p>
                    <p>Contact: {product.vendorMobile}</p> */}

                            {/* <p>Sold: {product.sold}</p> */}

                            <div className="amount">
                                {/* <button onClick={() => decrement(product._id)}> - </button> */}
                                <Fab onClick={() => decrement(product._id)} size="small" aria-label="remove">
                                    <RemoveIcon style={{color: '#000' }}/>
                                </Fab>

                                <span>{product.quantity}</span>
                                {/* <button onClick={() => increment(product._id)}> <AddIcon /> </button> */}
                                <Fab onClick={() => increment(product._id)} size="small" aria-label="add">
                                    <AddIcon style={{color: '#000' }}/>
                                </Fab>
                            </div>

                            <div className="delete">
                               <CancelIcon onClick={() => removeProduct(product._id)} style={{ color: "#000" }}/>
                               </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton
                    total={total}
                    tranSuccess={tranSuccess} />
            </div>

        </div>
    );
}

export default Cart;