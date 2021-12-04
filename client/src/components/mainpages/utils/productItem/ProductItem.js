
import BtnRender from './BtnRender'


const ProductItem = ({ product, isSuperAdmin, isAdmin, deleteProduct, handleCheck }) => {
    // console.log(product)
    return ( 
        <div className="product_card">
            {/* {
                isAdmin && <input type="checkbox" checked={product.checked} 
                onChange={() => handleCheck(product._id)}/>
            } */}

            {
                isSuperAdmin && <input type="checkbox" checked={product.checked} 
                onChange={() => handleCheck(product._id)}/>
            }

            <img src={product.images.url} alt="" />

            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.groupBuyPrice}</span>
                <p>{product.description}</p>
            </div>
        
            <BtnRender product={product} deleteProduct={deleteProduct} />
           

        </div>
     );
}
 
export default ProductItem
