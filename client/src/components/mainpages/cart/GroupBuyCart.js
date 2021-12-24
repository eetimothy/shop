import { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
// import { useParams } from 'react-router-dom'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CancelIcon from '@mui/icons-material/Cancel';

const GroupBuyCart = ({ groupBuy }) => {
    const state = useContext(GlobalState)
    const [groupBuyCart, setGroupBuyCart] = state.userAPI.groupBuyCart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [user] = state.userAPI.user
    // const [allGroupBuys] = state.groupBuysAPI.allGroupBuys

    // const { uid } = useParams()

    useEffect(() => {
        const getTotal = () => {
            const total = groupBuyCart.reduce((prev, item) => {
                return prev + (item.groupBuyPrice * item.quantity)
            }, 0)
            setTotal(total)
        }
        getTotal()
    }, [groupBuyCart])

    // console.log(groupBuyCart)

    // join group buy cart
    const addToJoinGroupBuyCart = async (groupBuyCart) => {
        await axios.patch('/user/addcart_groupbuy_join', { groupBuyCart }, {
            headers: { Authorization: token }
        })
    }

    let availableGroupBuys = groupBuyCart.map(items => {
        return items.groupBuy
    })

    // console.log(availableGroupBuys)


    const increment_joinGbCart = (id) => {

        groupBuyCart.forEach(item => {
            if (item._id === id) {
                // item.quantity += 1
                // eslint-disable-next-line array-callback-return
                availableGroupBuys.map(p => {
                    if (p.product === id)
                        return item.quantity < p.groupBuyQty ? item.quantity += 1 : item.quantity = p.groupBuyQty
                })
            }
        })
        setGroupBuyCart([...groupBuyCart])
        // console.log(groupBuyCart)
        addToJoinGroupBuyCart(groupBuyCart)
    }

    const decrement_joinGbCart = (id) => {
        groupBuyCart.forEach(item => {
            if (item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setGroupBuyCart([...groupBuyCart])
        addToJoinGroupBuyCart(groupBuyCart)
    }

    const removeProduct_joinGbCart = (id) => {
        // if(window.confirm("Do you want to remove this item permanently?")){
        groupBuyCart.forEach((item, index) => {
            if (item._id === id) {
                groupBuyCart.splice(index, 1)
            }
        })
        setGroupBuyCart([...groupBuyCart])
        addToJoinGroupBuyCart(groupBuyCart)
        // }
    }

    const joinGroupBuy = async (groupBuyCart) => {
        // const { product_id } = cart;
        //when user completes payment, he auto joins a group buy..

        await groupBuyCart.map(item => {
            if (item.quantity === item.groupBuy.groupBuyQty) {
                return axios.patch('/api/add_user_group_buy', { _id: item.groupBuy._id, quantity: item.quantity, username: user.username, email: user.email, mobile: user.mobile, address: user.address, userid: user._id, isActive: false, success: true }, {
                    headers: { Authorization: token }
                })
            } else if (item.quantity > item.groupBuy.successTarget || item.quantity === item.groupBuy.successTarget) {
                return axios.patch('/api/add_user_group_buy', { _id: item.groupBuy._id, quantity: item.quantity, username: user.username, email: user.email, mobile: user.mobile, address: user.address, userid: user._id, isActive: true, success: true }, {
                    headers: { Authorization: token }
                })
            } else {
                return axios.patch('/api/add_user_group_buy', { _id: item.groupBuy._id, quantity: item.quantity, username: user.username, email: user.email, mobile: user.mobile, address: user.address, userid: user._id, isActive: true, success: false }, {
                    headers: { Authorization: token }
                })
            }

        })

    }

    const tranSuccess = async (payment) => {
        console.log(payment)
        const { paymentID, address } = payment;

        await axios.post('/api/payment_join_groupbuy', { groupBuyCart, paymentID, address }, {
            headers: { Authorization: token }
        })
        setGroupBuyCart([])
        addToJoinGroupBuyCart([])
        alert("You have successfully placed an order and Joined the Group Buy!")
        joinGroupBuy(groupBuyCart)
        // window.location.href = `/groupbuys_user/${uid}`;
    }


    if (groupBuyCart.length === 0)
        return <h2 style={{ textAlign: "center", fontSize: "2rem" }}> </h2>

    return (
        <div style={{ paddingTop: "30px"}}>
            <h2>Join Group Buys</h2>
            {
                groupBuyCart.map(product => (
                    <div className="details cart" key={product.groupBuy._id}>

                        <img src={product.images.url} alt="" className="img_container" />

                        <div className="box-detail">

                            <h6>{product.title}</h6>


                            <h3>$ {product.groupBuyPrice * product.quantity}</h3>
                            {/* <p>{product._id}</p> */}
                            {/* <p>{product.description}</p> */}
                            <h6>Group Buy Description</h6>
                            <p>{product.content}</p>
                            <p>Started By: {product.groupBuy.startUser}</p>
                            <p>{product.groupBuy.buyers} / {product.groupBuy.buyers + product.groupBuy.successTarget} Joined</p>
                            <p>*Instructions: Checkout to join the group buy.</p>

                            <div className="amount">
                                {/* <button onClick={() => decrement_joinGbCart(product._id)}> - </button> */}
                                <Fab onClick={() => decrement_joinGbCart(product._id)} size="small" aria-label="remove">
                                    <RemoveIcon style={{color: '#000' }}/>
                                </Fab>

                                <span>{product.quantity}</span>
                                <Fab onClick={() => increment_joinGbCart(product._id)} size="small" aria-label="add">
                                    <AddIcon style={{color: '#000' }}/>
                                </Fab>

                                {/* <button onClick={() => increment_joinGbCart(product._id)}> + </button> */}
                                {/* <p>Available group buy quantity: {availableGroupBuys.map(p => {
                                    return p.groupBuyQty
                                })}</p> */}
                            </div>

                            <div className="delete">
                                
                                <CancelIcon onClick={() => removeProduct_joinGbCart(product._id)} style={{ color: "#000" }}/>
                                
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

export default GroupBuyCart;