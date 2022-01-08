import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VendorOrderDetails = () => {
    const state = useContext(GlobalState)
    const [vendorOrders] = state.userAPI.vendorOrders
    const [orderDetails, setOrderDetails] = useState([])
    const [user] = state.userAPI.user

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            vendorOrders.forEach(item => {
                if (item._id === params.id) setOrderDetails(item)
            })
        }
    }, [params.id, vendorOrders])

    // console.log(user._id)
    // console.log(vendorOrders)
    // console.log(orderDetails)


    if (orderDetails.length === 0) return null;

    return (
        <div className="order-history">

            <h3> <Link to={`/vendor_orders`} style={{ color: "#000" }}><ArrowBackIcon style={{ color: "#000" }} /> Back</Link></h3>
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
                    </tr>
                </thead>
                <tbody>
                    
                    {
                        orderDetails.cart.map(item => {
                            if(item.vendorId === user._id)
                            return (
                            <tr key={item._id}>
                                <td><img src={item.images.url} alt="" /></td>
                                <td>{item.title}</td>
                                <td>{item.quantity}</td>
                                <td>${item.groupBuyPrice}</td>
                                <td>$ {item.groupBuyPrice * item.quantity}</td>
                            </tr>
                            )
                            else return ''
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}

export default VendorOrderDetails;