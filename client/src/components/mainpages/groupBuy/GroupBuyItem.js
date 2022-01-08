//group buy card display
// import GroupBuyBtnRender from './GroupBuyBtnRender'
import { Link } from 'react-router-dom'
// import { grey } from '@mui/material/colors';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
// import BtnRender from '../utils/productItem/BtnRender'
// import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
// import './GroupBuyItem.css'
import './Cards.css'


const GroupBuyItem = ({ groupBuy, product }) => {
    // console.log(`http://group-buy.io/groupbuy_details/${groupBuy._id}/${groupBuy.product}`)
    // const shareUrl = `/groupbuy_details/${groupBuy._id}/${groupBuy.product}`
    // console.log(groupBuy.endDate)
    const endDate = groupBuy.endDate
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
        return floor((diff % unitmapping.days) / unitmapping.hours) + " h " +
            floor((diff % unitmapping.hours) / unitmapping.minutes) + " min "
    }

    // console.log(getHumanizedDiff(new Date(endDate) - new Date(dateNow)).toLocaleString());
    const timeLeft = getHumanizedDiff(new Date(endDate) - new Date(dateNow)).toLocaleString()

    return (
        // <div className="groupbuy_card">
        //     <div className="groupbuycard_timer">
        //         <p>Time Left: {timeLeft}</p>
        //     </div>
        //     <div className="groupbuycard_image">
        //         <Link to={`/groupbuy_details/${groupBuy._id}/${groupBuy.product}`} product={product} >  <img src={groupBuy.images.url} alt="" /></Link>
        //     </div>
        //     <div className="groupbuycard_content">
        //         <div className="groupbuycard_details">
        //             <Link to={`/groupBuy_details/${groupBuy._id}/${groupBuy.product}`} product={product} >
        //                 <p className="gb_title">{groupBuy.title}</p>
        //             </Link>
        //             <p>${groupBuy.groupBuyPrice}</p>
        //         </div>
        //         <div className="groupbuycard_favorite">
        //             <span className="span1"><FavoriteBorderOutlinedIcon sx={{ color: grey[500] }} fontSize="18px" /></span>
        //             <span className="span2">{groupBuy.buyers}/ {groupBuy.successTarget + groupBuy.buyers} joined</span>
        //         </div>
        //         <div className="groupbuycard_desc">
        //             <p>{groupBuy.content}</p>
        //             <p>Started By: {groupBuy.startUser}</p>
        //         </div>
        //     </div>
        // </div>
        <>
        <li className='cards__item' style={{ maxWidth: "350px", minWidth: "200px" }}>
          <Link className='cards__item__link' to={`/groupbuy_details/${groupBuy._id}/${groupBuy.product}`}>
            <figure className='cards__item__pic-wrap' data-category={timeLeft}>
              <img
                className='cards__item__img'
                alt='Travel_Image'
                src={groupBuy.images.url}
              />
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{groupBuy.title}</h5>
              <p>Group Buy Price: ${groupBuy.groupBuyPrice}</p>
              <span>Started: {groupBuy.startUser}</span>
              <span className="span2">{groupBuy.buyers}/ {groupBuy.successTarget + groupBuy.buyers} Bought</span>
            </div>
          </Link>
        </li>
      </>

    )
}

export default GroupBuyItem


//                 <span>
        //                     <WhatsappShareButton url={shareUrl}>
        //                         <WhatsappIcon size={30} round={true}/>
        //                     </WhatsappShareButton>

        //                     <FacebookShareButton url={shareUrl}>
        //                         <FacebookIcon size={30} round={true} />
        //                     </FacebookShareButton>
        //                     {/* <GroupBuyBtnRender groupBuy={groupBuy} /> */}
        //                 </span>