import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'

const OrderDetails = () => {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    const [orderDetails, setOrderDetails] = useState([])
    // const [user] = state.userAPI.user

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, history])

    // console.info(orderDetails)
    // console.log(user._id)

    

    if (orderDetails.length === 0) return null;

    return (
        <div className="order-history">
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Address</th>
                        <th>Country Code</th>
                        <th>Postal Code</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{orderDetails.address.recipient_name}</td>
                        <td>{orderDetails.address.line1 + "  " + orderDetails.address.city}</td>
                        <td>{orderDetails.address.country_code}</td>
                        <td>{orderDetails.address.postal_code}</td>
                        {/* <td>{orderDetails.cart[0].user}</td> */}
                    </tr>
                </tbody>
            </table>

            <table style={{ margin: "30px 0px" }}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Products</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Total Paid</th>
                        <th>Vendor/ Seller</th>
                    </tr>
                </thead>
                <tbody>
                        {
                            orderDetails.groupBuyCart.map(item => (
                                <tr key={item._id}>
                                    <td><img src={item.images.url} alt="" /></td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>$ {item.groupBuyPrice * item.quantity}</td>
                                    <td>{item.user}</td>
                                   
                                </tr>
                            ))
                        }
                        {
                            orderDetails.cart.map(item => (
                                <tr key={item._id}>
                                    <td><img src={item.images.url} alt="" /></td>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>$ {item.groupBuyPrice * item.quantity}</td>
                                    <td>{item.user}</td>
                                   
                                </tr>
                            ))
                        }
                </tbody>
            </table>
        </div>
    );
}

export default OrderDetails;