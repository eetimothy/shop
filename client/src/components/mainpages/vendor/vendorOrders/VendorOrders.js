import { useContext, useEffect } from 'react'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'

const VendorOrders = () => {
    const state = useContext(GlobalState)
    const [vendorOrders, setVendorOrders] = state.userAPI.vendorOrders
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    // const [user] = state.userAPI.user

    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                if (isAdmin) {
                    const res = await axios.get('/api/vendorPayments', {
                        headers: { Authorization: token }
                    })
                    // console.log(res)
                    setVendorOrders(res.data)
                } else {
                    const res = await axios.get('/user/orderhistory', {
                        headers: { Authorization: token }
                        
                    })
                    //console.log(res)
                    setVendorOrders(res.data)
                }
            }
            getHistory()
        }
    }, [token, isAdmin, setVendorOrders])

    // console.log(vendorOrders)

  
   
    return (
        <div className="history-page">

            
            <h2>Order History</h2>

            <h4>{vendorOrders.length} Past Invoices</h4>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            vendorOrders.map(items => (
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/vendor_orders/${items._id}`}>view</Link></td>
                                    
                                </tr>

                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VendorOrders;