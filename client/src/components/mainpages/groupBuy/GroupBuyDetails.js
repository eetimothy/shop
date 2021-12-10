import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Link } from 'react-router-dom'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
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
    const [user] = state.userAPI.user
    const [isAdmin] = state.userAPI.isAdmin

    // console.log(productDetails)
    // console.log(groupBuyDetails._id)

    useEffect(() => {
        if (params.group_buy_id) {

            allGroupBuys.forEach(groupBuy => {
                if (groupBuy._id === params.group_buy_id) setGroupBuyDetails(groupBuy)
            })
        }
    }, [params.group_buy_id, allGroupBuys])

    useEffect(() => {
        if (params.product_id) {

            products.forEach(product => {
                if (product._id === params.product_id) setProductDetails(product)
            })
        }
    }, [params.product_id, products])


    // console.log(groupBuyDetails)

    const shareUrl = `http://group-buy.io/groupbuy_details/${params.group_buy_id}/${params.product_id}`

    if (groupBuyDetails.length === 0) return null;


    return (
        <>
            <div className="details">
                <img src={groupBuyDetails.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{groupBuyDetails.title}</h2>

                        {/* <h6>#id: {groupBuyDetails.product}</h6> */}
                    </div>
                    <span>$ {groupBuyDetails.groupBuyPrice}</span>
                    <h6>Product Description</h6>
                    <p>{groupBuyDetails.description}</p>
                    <h6>Group Buy Description</h6>
                    <p>{groupBuyDetails.content}</p>
                    <p>{(groupBuyDetails.createdAt)} {new Date(groupBuyDetails.createdAt)}</p>
                    {
                        groupBuyDetails.isActive &&
                        <p>
                            <span>
                                <WhatsappShareButton url={shareUrl}>
                                    <WhatsappIcon size={40} round={true} />
                                </WhatsappShareButton>

                                <FacebookShareButton url={shareUrl}>
                                    <FacebookIcon size={40} round={true} />
                                </FacebookShareButton>
                            </span>
                        </p>
                    }

                    {
                        groupBuyDetails.isActive === false && 'Group Buy Has Ended!'
                    }
                    {
                        groupBuyDetails.startedBy !== user._id && !isAdmin && groupBuyDetails.isActive === true && <Link to="/allcarts" className="cart" onClick={() => addGroupBuyCart(productDetails, groupBuyDetails)}>Join GB: $1,000</Link>
                    }
                    {
                        groupBuyDetails.success === true ? 'Group Buy is On!' : 'Group Buy still needs more people'
                    }


                </div>
            </div>

        </>
    )
}

export default GroupBuyDetails