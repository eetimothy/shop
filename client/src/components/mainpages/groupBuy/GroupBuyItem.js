//group buy card display
// import GroupBuyBtnRender from './GroupBuyBtnRender'
import { Link } from 'react-router-dom'
// import BtnRender from '../utils/productItem/BtnRender'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'

const GroupBuyItem = ({ groupBuy, product }) => {
    // console.log(`http://group-buy.io/groupbuy_details/${groupBuy._id}/${groupBuy.product}`)
    
    const shareUrl = `http://group-buy.io/groupbuy_details/${groupBuy._id}/${groupBuy.product}`

    return (
        <div className="product_card">
             <Link to={`/groupBuy_details/${groupBuy._id}/${groupBuy.product}`} product={product} >
            <img src={groupBuy.images.url} alt="" />
            </Link>

            <div className="product_box">
            <Link to={`/groupBuy_details/${groupBuy._id}/${groupBuy.product}`} product={product} >
                <h2>{groupBuy.title}</h2>
                
                <span>${groupBuy.groupBuyPrice}</span>
                <p>{groupBuy.content}</p>
                <p>{groupBuy.success}</p>
                <p>{groupBuy.buyers}</p>
                <p>{groupBuy.isActive}</p>
                <p>{groupBuy.groupBuyQty}</p>
                </Link>
                        <span>
                            <WhatsappShareButton url={shareUrl}>
                                <WhatsappIcon size={40} round={true}/>
                            </WhatsappShareButton>

                            <FacebookShareButton url={shareUrl}>
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                            {/* <GroupBuyBtnRender groupBuy={groupBuy} /> */}
                        </span>
                    
            </div>
        
            
        </div>
    )
}

export default GroupBuyItem