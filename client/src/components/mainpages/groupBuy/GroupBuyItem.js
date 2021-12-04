//group buy card display
import GroupBuyBtnRender from './GroupBuyBtnRender'
// import BtnRender from '../utils/productItem/BtnRender'

const GroupBuyItem = ({ groupBuy }) => {
    return (
        <div className="product_card">
            <img src={groupBuy.images.url} alt="" />

            <div className="product_box">
                <h2>{groupBuy.title}</h2>
                <span>${groupBuy.groupBuyPrice}</span>
                <p>{groupBuy.content}</p>
               
            </div>
        <GroupBuyBtnRender groupBuy={groupBuy} />
            
        </div>
    )
}

export default GroupBuyItem