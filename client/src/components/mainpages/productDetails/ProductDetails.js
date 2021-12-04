import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import ProductItem from '../utils/productItem/ProductItem'



const ProductDetails = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    
    const [user] = state.userAPI.user
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [productDetails, setProductDetails] = useState([])
    const [productGroupBuys] = state.groupBuysAPI.productGroupBuys
    const [productGroupBuyDetails, setProductGroupBuyDetails] = useState([])
    const addGroupBuyCart = state.userAPI.addGroupBuyCart
    

    useEffect(() => {

        if (params.id) {

            products.forEach(product => {
                if (product._id === params.id) setProductDetails(product)
            })
        }
    }, [params.id, products])

    useEffect(() => {
        if (params.id) {

            productGroupBuys.forEach(productGroupBuy => {
                if (productGroupBuy.product === params.id) setProductGroupBuyDetails(productGroupBuy)
            })
        }
    })

    // console.log(productDetails)
    if (productDetails.length === 0) return null;

    return (
        <>
            <div className="details">
                <img src={productDetails.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{productDetails.title}</h2>

                        <h6>#id: {productDetails.product_id}</h6>
                    </div>
                    <span>$ {productDetails.groupBuyPrice}</span>
                    <h6>Product Description</h6>
                    <p>{productDetails.description}</p>
                    <h6>Group Buy Description</h6>
                    <p>{productDetails.content}</p>
                    <p>Sold: {productDetails.sold}</p>
                    <Link to="/cart" className="cart" onClick={() => addCart(productDetails)}>Buy now: $800</Link>
                    <Link to="/cart" className="cart" onClick={() => addCart(productDetails)}>Create GB: ${productDetails.groupBuyPrice}</Link>


                </div>

            </div>
            {
                productGroupBuyDetails.length !== 0 && user !== productGroupBuyDetails.users &&
                <div className="details">
                    <p>{productGroupBuyDetails.title}</p> <Link to="/groupbuy_cart" className="cart" onClick={() => addGroupBuyCart(productDetails, productGroupBuyDetails)}>Join GB: $1,000</Link>
                </div>
            }


            <div>
                <h2>Related Products</h2>
                <div className="products">
                    {
                        products.map(product => {
                            return product.productType === productDetails.productType
                                ? <ProductItem key={product._id} product={product} /> : null
                        })
                    }
                </div>

            </div>
        </>
    );
}

export default ProductDetails;