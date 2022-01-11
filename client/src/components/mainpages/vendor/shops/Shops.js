import { useState, useContext} from 'react'
import { GlobalState } from '../../../../GlobalState'
import Loading from '../../utils/loading/Loading'
import ShopCard from './ShopCard'


const Shops = () => {
    const state = useContext(GlobalState)
    const [vendors] = state.userAPI.vendors
    const [loading] = useState(false)

    if (loading) return <div><Loading /></div>
    return ( 
        <div className="shop_wrapper">
            {
                vendors.map(vendor => {
                    return <div className="shop_logo" key={vendor._id}><ShopCard key={vendor._id} vendor={vendor}/></div>
                })
            }
        </div>
     );
}
 
export default Shops;