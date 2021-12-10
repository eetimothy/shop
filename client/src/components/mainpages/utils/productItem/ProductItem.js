import { Link } from 'react-router-dom';
import BtnRender from './BtnRender'


const ProductItem = ({ product, isSuperAdmin, deleteProduct, handleCheck, gb }) => {
    // console.log(product)
    return (

        <div className="product_card">
            {/* {
                isAdmin && <input type="checkbox" checked={product.checked} 
                onChange={() => handleCheck(product._id)}/>
            } */}

            {
                isSuperAdmin && <input type="checkbox" checked={product.checked}
                    onChange={() => handleCheck(product._id)} />
            }
            <Link to={`/detail/${product._id}`} product={product}>
                <img src={product.images.url} alt="" />
            </Link>
            <Link to={`/detail/${product._id}`} product={product}>
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>

                <span>Group Buy Price: ${product.groupBuyPrice}</span>

                <p>{product.description}</p>
            </div>
            </Link>
            
            <BtnRender product={product} deleteProduct={deleteProduct} />
            {/* <GroupBuyBtnRender gb={gb}/> */}
        </div>

    );
}

export default ProductItem
