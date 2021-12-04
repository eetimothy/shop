import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Link } from 'react-router-dom'
// import GroupBuyItem from "./GroupBuyItem";
// import ProductDetails from "../productDetails/ProductDetails";


const GroupBuyDetails = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [allGroupBuys] = state.groupBuysAPI.allGroupBuys
    const [groupBuyDetails, setGroupBuyDetails] = useState([])
    const [products] = state.productsAPI.products
    const [productDetails, setProductDetails] = useState([])
    const addGroupBuyCart = state.userAPI.addGroupBuyCart

    // console.log(productDetails)
    // console.log(groupBuyDetails._id)

    useEffect(() => {
        if(params.group_buy_id) {

            allGroupBuys.forEach(groupBuy => {
                if(groupBuy._id === params.group_buy_id) setGroupBuyDetails(groupBuy)
            })
        }
    }, [params.group_buy_id, allGroupBuys])

    useEffect(() => {
        if(params.product_id) {

            products.forEach(product => {
                if(product._id === params.product_id) setProductDetails(product)
            })
        }
    }, [params.product_id, products])

   

    if(groupBuyDetails.length === 0) return null;


    return (
        <>
        <div className="details">
            <img src={groupBuyDetails.images.url} alt="" />
            <div className="box-detail">
                <div className="row">
                    <h2>{groupBuyDetails.title}</h2>
                    
                    <h6>#id: {groupBuyDetails.product}</h6>
                </div>
                <span>$ {groupBuyDetails.groupBuyPrice}</span>
                <h6>Product Description</h6>
                <p>{groupBuyDetails.description}</p>
                <h6>Group Buy Description</h6>
                <p>{groupBuyDetails.content}</p>
                
                <Link to="/groupbuy_cart" className="cart" onClick={() => addGroupBuyCart(productDetails, groupBuyDetails)}>Join GB: $1,000</Link>
            </div>
        </div>
        
        </>
    )
}

export default GroupBuyDetails