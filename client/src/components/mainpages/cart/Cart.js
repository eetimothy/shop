import { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import PaypalButton from './PaypalButton'
// import { useParams } from 'react-router-dom'


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
            },0)
            setTotal(total)
        }
        getTotal()
    },[cart])

    // console.log(cart)
   
    //create group buy cart
    const addToCart = async (cart) => {
        await axios.patch('/user/addcart', {cart}, {
            headers: { Authorization: token }
        })
       
    }

    

    const increment = (id) => {
        cart.forEach(item => {
            if(item._id === id) {
                // item.quantity += 1
                item.quantity < item.groupBuyQty ? item.quantity += 1 : item.quantity = item.groupBuyQty
                
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if(item._id === id) {
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = (id) => {
        if(window.confirm("Do you want to remove this item permanently?")){
            cart.forEach((item, index) => {
                if(item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart(cart)
        }
    }

    const createGroupBuy = async (cart) => {
        // const { product_id } = cart;
        //when user completes payment, he auto creates a group buy
        //when user completes payment of eg 2 products, he will auto create 2 group buys
        await cart.map(item => {
            return axios.post('/api/groupbuys', { 
                product: item._id, title: item.title, description: item.description, content: item.content, 
                brand: item.brand, productType: item.productType, category: item.category, product_id: item.product_id,
                groupBuyPrice: item.groupBuyPrice, vendorId: item.vendorId, images: item.images,
                users: [{ id: user._id, quantity: item.quantity }], startedBy: user._id, groupBuyQty: item.groupBuyQty - item.quantity, buyers: item.quantity
            
            }, {
                headers: { Authorization: token }
            })
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
        return <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>

    return (
        <div>
            <h2>Create Group Buy</h2>
            {
                cart.map(product => (
                    <div className="details cart" key={product._id}>
                        
                        <img src={product.images.url} alt="" className="img_container" />

                        <div className="box-detail">
                           
                                <h2>{product.title}</h2>
                               
                            
                            <h3>$ {product.groupBuyPrice * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <p>{product.user}</p>
                            
                            <div className="amount">
                                <button onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button> 
                                
                            </div>

                            <div className="delete" 
                            onClick={() => removeProduct(product._id)}>
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

export default Cart;