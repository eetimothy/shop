// import { useContext } from "react";
import { Link } from 'react-router-dom'
// import { GlobalState } from "../../../GlobalState"

const GroupBuyBtnRender = ({ groupBuy }) => {
    // const state = useContext(GlobalState)
    // const addCart = state.userAPI.addCart
    // const addGroupBuyCart = state.userAPI.addGroupBuyCart
    // const [isAdmin] = state.userAPI.isAdmin

    return (
        <div className="row_btn">
            {/* <Link id="btn_buy" to="#!" onClick={() => addGroupBuyCart(groupBuy)}>Add Item</Link> */}
           <Link id="btn_view" to={`/groupBuy_details/${groupBuy._id}/${groupBuy.product}`}>View</Link>
        </div>
    )
}

export default GroupBuyBtnRender