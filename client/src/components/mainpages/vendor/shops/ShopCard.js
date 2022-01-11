import { Link } from 'react-router-dom'

const ShopCard = ({ vendor }) => {


    return (
        <div className="shopcard">
                <Link to={`/shop/${vendor.username}`}>
                    <img src={vendor.logo} alt="" />
                </Link>
        </div>
    );
}

export default ShopCard;