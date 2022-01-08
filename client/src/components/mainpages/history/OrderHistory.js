import { useContext, useEffect } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Button from '@mui/material/Button';
import './History.css'

const OrderHistory = () => {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
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
                    setHistory(res.data)
                } else {
                    const res = await axios.get('/user/orderhistory', {
                        headers: { Authorization: token }

                    })
                    //console.log(res)
                    setHistory(res.data)
                }
            }
            getHistory()
        }
    }, [token, isAdmin, setHistory])

    // console.log(history)



    return (
        <div className="history-page">
            <h2>Order History</h2>

            <h4>{history.length} Past Invoices</h4>

            {/* <div>
                <table>
                    <thead>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            history.map(items => (
                                <tr key={items._id}>
                                    <td>{items.paymentID}</td>
                                    <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                                    <td><Link to={`/history/${items._id}`}>view</Link></td>
                                    
                                </tr>

                            ))
                        }
                        
                        

                    </tbody>
                </table>
            </div> */}
            <div className="invoice_list">
                {
                    history.map(items => {
                        return <div className="invoice" key={items.paymentID}>

                            <div className="invoice_list_item_wrap">
                                <div className="invoice_list_item">
                                    <h6>{items.paymentID}</h6>
                                </div>

                                <div className="invoice_list_item">
                                   <p>Date: {new Date(items.createdAt).toLocaleDateString()}</p> 
                                </div>
                            </div>

                            <div className='invoice_list_btn'>
                                <Button>
                                    <Link to={`/history/${items._id}`} style={{ fontSize: '15px', textTransform: "none", color: "#ffffff", fontWeight: "700" }}>View</Link>
                                    </Button>                           
                            </div>

                        </div>
                    })
                }
            </div>
        </div>
    );
}

export default OrderHistory;