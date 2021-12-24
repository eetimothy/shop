import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Link } from 'react-router-dom'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
// import GroupBuyItem from "./GroupBuyItem";
// import ProductDetails from "../productDetails/ProductDetails";
import '../productDetails/ProductDetails.css'


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

    const shareUrl = `/groupbuy_details/${params.group_buy_id}/${params.product_id}`


    // let localDate = new Date(groupBuyDetails.createdAt),
    //     currDate = new Date(groupBuyDetails.createdAt)
    // currDate.setHours(localDate.getHours() + 24)

    // let endDate = currDate.toLocaleString()

    // console.log(currDate)
    // console.log(groupBuyDetails.createdAt)
    // const startDate = groupBuyDetails.createdAt
    const endDate = groupBuyDetails.endDate
    const dateNow = new Date()

    let unitmapping = {
        "days": 24 * 60 * 60 * 1000,
        "hours": 60 * 60 * 1000,
        "minutes": 60 * 1000,
        "seconds": 1000
    };

    function floor(value) {
        return Math.floor(value)
    }

    function getHumanizedDiff(diff) {
        return floor(diff / unitmapping.days) + " days " +
            floor((diff % unitmapping.days) / unitmapping.hours) + " hours " +
            floor((diff % unitmapping.hours) / unitmapping.minutes) + " minutes " +
            floor((diff % unitmapping.minutes) / unitmapping.seconds) + " seconds " 
    }

    // console.log(getHumanizedDiff(new Date(endDate) - new Date(dateNow)).toLocaleString());
    const timeLeft = getHumanizedDiff(new Date(endDate) - new Date(dateNow)).toLocaleString()

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
                    

                    {/* <p>Group Buy Start: {new Date(groupBuyDetails.createdAt).toLocaleString()}</p> */}
                    {/* <p>Group Buy End: {endDate}</p> */}
                    <p>Group Buy End: {new Date(groupBuyDetails.endDate).toLocaleString()}</p>
                    <p style={{ color: 'crimson', fontSize: '20px' }}>Time Left: {timeLeft}</p>

                    <h6>Group Buy Provider</h6>
                    <p>Company: {groupBuyDetails.vendorCompany}</p>
                    <p>Contact: {groupBuyDetails.vendorMobile}</p>
                    <p>Email: {groupBuyDetails.vendorEmail}</p>
                    
                    <h6>Share:</h6>
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
                        groupBuyDetails.startedBy !== user._id && !isAdmin && groupBuyDetails.isActive === true && <Link to="/allcarts" className="cart" onClick={() => addGroupBuyCart(productDetails, groupBuyDetails)}>Join</Link>
                    }
                    <p>
                    {
                        groupBuyDetails.success === true ? 'Group Buy is On!' : `Group Buy still needs ${groupBuyDetails.successTarget} more buys.. `
                    }
                    </p>

                </div>
            </div>

        </>
    )
}

export default GroupBuyDetails