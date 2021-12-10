import { useContext, useState, useEffect } from 'react';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios'
import Loading from '../utils/loading/Loading';
import { Link } from 'react-router-dom';


const ProductGroupBuys = ({ params, productDetails, addGroupBuyCart }) => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [loading] = useState(false)
    // const [result, setResult] = useState([])
    const [productGroupBuys, setProductGroupBuys] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    

    useEffect(() => {
        const getProductGroupBuys = async () => {
            const res = await axios.get(`/api/groupbuys_product?id=${params}`, {
                headers: { Authorization: token }
            })
             setProductGroupBuys(res.data.productGroupBuys)
        }
        getProductGroupBuys()
    }, [token, params])

    if (loading) return <div><Loading /></div>

    return ( 
        <div>
            { !isAdmin &&
            productGroupBuys.map(p => {
                return (
                    <div key={p._id}>
                        <p>{p._id}</p>
                         <Link to="/allcarts" className="cart" onClick={() => addGroupBuyCart(productDetails, p)}>Join</Link>
                        </div>
                        
                )
            })
            }
        </div>
     );
}
 
export default ProductGroupBuys;