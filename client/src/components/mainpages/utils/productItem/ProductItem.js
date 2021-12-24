import { Link } from 'react-router-dom';
import BtnRender from './BtnRender'
import { grey } from '@mui/material/colors';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import './ProductItem.css'

const ProductItem = ({ product, isSuperAdmin, deleteProduct, handleCheck, gb }) => {
    // console.log(product)
    return (

        <div className="product_card">

<div className="productcard_timer">
            <p>{
                isSuperAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)} />
            }</p> 
            </div>
            {/* {
                isAdmin && <input type="checkbox" checked={product.checked} 
                onChange={() => handleCheck(product._id)}/>
            } */}

<div className="productcard_image">
            <Link to={`/detail/${product._id}`} product={product}>
                <img src={product.images.url} alt="" />
            </Link>

            </div>

            <div className="productcard_content">



            <div className="productcard_details">
           
            <Link to={`/detail/${product._id}`} product={product}> 
            <p className="gb_title" title={product.title}>{product.title}</p>
            </Link>
                <p style={{ fontSize: '10px'}}>Buy Now: ${product.buyNowPrice}</p>
                <p style={{ fontSize: '10px'}}>Group Buy Price: ${product.groupBuyPrice}</p>
                </div>

                <div className="productcard_favorite">
                <span className="span1"><FavoriteBorderOutlinedIcon  sx={{ color: grey[500] }} fontSize="18px" /></span>
                <span className="span2">Sold: {product.sold}</span>
                </div>
                <div className="productcard_desc">
                   <p>{product.content}</p> 
                </div>
            
            <BtnRender product={product} deleteProduct={deleteProduct} />




            </div>
        </div>

    );
}

export default ProductItem
