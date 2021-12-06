import { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
// import { useParams } from 'react-router-dom'

const GroupBuyCart = ({ groupBuy }) => {
    const state = useContext(GlobalState)
    const [groupBuyCart, setGroupBuyCart] = state.userAPI.groupBuyCart
    const [token] = state.token
    const [total, setTotal] = useState(0)
    // const [user] = state.userAPI.user
    // const [allGroupBuys] = state.groupBuysAPI.allGroupBuys

    // const { uid } = useParams()

    useEffect(() => {
        const getTotal = () => {
            const total = groupBuyCart.reduce((prev, item) => {
                return prev + (item.groupBuyPrice * item.quantity)
            },0)
            setTotal(total)
        }
        getTotal()
    },[groupBuyCart])

    // console.log(groupBuyCart)

    // join group buy cart
    const addToJoinGroupBuyCart = async (groupBuyCart) => {
        await axios.patch('/user/addcart_groupbuy_join', {groupBuyCart}, {
            headers: { Authorization: token }
        })
    }

    let availableGroupBuys = groupBuyCart.map(items => {
        return items.groupBuy
    })

    // console.log(availableGroupBuys)
    

    const increment_joinGbCart = (id) => {
        
        groupBuyCart.forEach(item => {
            if(item._id === id) {
                // item.quantity += 1
                // eslint-disable-next-line array-callback-return
                availableGroupBuys.map(p => {
                    if(p.product === id) 
                        return item.quantity < p.groupBuyQty ? item.quantity += 1 : item.quantity = p.groupBuyQty
                })
            }
        })
        setGroupBuyCart([...groupBuyCart])
        addToJoinGroupBuyCart(groupBuyCart)
    }

    const decrement_joinGbCart = (id) => {
        groupBuyCart.forEach(item => {
            if(item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setGroupBuyCart([...groupBuyCart])
        addToJoinGroupBuyCart(groupBuyCart)
    }

    const removeProduct_joinGbCart = (id) => {
        if(window.confirm("Do you want to remove this item permanently?")){
            groupBuyCart.forEach((item, index) => {
                if(item._id === id) {
                    groupBuyCart.splice(index, 1)
                }
            })
            setGroupBuyCart([...groupBuyCart])
            addToJoinGroupBuyCart(groupBuyCart)
        }
    }

    const joinGroupBuy = async (groupBuyCart) => {
        // const { product_id } = cart;
        //when user completes payment, he auto joins a group buy..
       await groupBuyCart.map(item => {
            return axios.patch('/api/add_user_group_buy', { _id: item.groupBuy._id, quantity: item.quantity }, {
            headers: { Authorization: token }
        })
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
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

    return (
        <div>
            <h2>Join Group Buys</h2>
            {
                groupBuyCart.map(product => (
                    <div className="details cart" key={product._id}>
                        
                        <img src={product.images.url} alt="" className="img_container" />

                        <div className="box-detail">
                           
                                <h2>{product.title}</h2>
                               
                            
                            <h3>$ {product.groupBuyPrice * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <p>{product.user}</p>
                            
                            <div className="amount">
                                <button onClick={() => decrement_joinGbCart(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment_joinGbCart(product._id)}> + </button>
                                {/* <p>Available group buy quantity: {availableGroupBuys.map(p => {
                                    return p.groupBuyQty
                                })}</p> */}
                            </div>

                            <div className="delete" 
                            onClick={() => removeProduct_joinGbCart(product._id)}>
                                X
                            </div>
                        </div>
                    </div>
                ))
            }

            <div className="total">
                <h3>Total: $ {total}</h3>
                <PaypalButton 
                total={total}
                tranSuccess={tranSuccess}/>
            </div>

        </div>
    );
}

export default GroupBuyCart;