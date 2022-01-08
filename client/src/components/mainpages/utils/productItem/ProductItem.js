import { Link } from 'react-router-dom';
import BtnRender from './BtnRender'
// import { grey } from '@mui/material/colors';
// import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './ProductItem.css'

const ProductItem = ({ product, isSuperAdmin, deleteProduct, handleCheck, gb }) => {
    // console.log(product)
    const gbPrice = `Group Buy: $${product.groupBuyPrice}`

    return (
        <>

            {/* <p>{
                    isSuperAdmin && <input type="checkbox" checked={product.checked}
                        onChange={() => handleCheck(product._id)} />
                }</p> */}

            {/* {
                isAdmin && <input type="checkbox" checked={product.checked} 
                onChange={() => handleCheck(product._id)}/>
            } */}

            {/* <div className="productcard_image">
            <Link to={`/detail/${product._id}`} product={product}>
                <img src={product.images.url} alt="" />
            </Link>

            </div> */}





            <li className='cards__item' style={{ maxWidth: "300px", minWidth: "200px" }}>
            <BtnRender product={product} deleteProduct={deleteProduct} />
                {
                    isSuperAdmin && <input type="checkbox" checked={product.checked}
                        onChange={() => handleCheck(product._id)} />
                }
                <Link className='cards__item__link' to={`/detail/${product._id}`}>
                    <figure className='cards__item__pic-wrap' data-category={gbPrice}>

                        <img
                            className='cards__item__img'
                            alt=''
                            src={product.images.url}
                        />
                    </figure>
                    <div className='cards__item__info'>
                        <h5 className='cards__item__text'>{product.title}</h5>
                        <p>${product.buyNowPrice}</p>
                    </div>
                </Link>
            </li>
            
                





            {/* </div> */}
            {/*  </div> */}
        </>

    );
}

export default ProductItem
