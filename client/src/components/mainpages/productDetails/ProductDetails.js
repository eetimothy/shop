import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import ProductItem from '../utils/productItem/ProductItem'
// import axios from 'axios'
import ProductGroupBuys from '../groupBuy/ProductGroupBuys'


const ProductDetails = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    // const [user] = state.userAPI.user
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [productDetails, setProductDetails] = useState([])
    // const [allGroupBuys] = state.groupBuysAPI.allGroupBuys
    // const [productGroupBuyDetails, setProductGroupBuyDetails] = useState([])
    const addGroupBuyCart = state.userAPI.addGroupBuyCart
    const [isAdmin] = state.userAPI.isAdmin


    
    useEffect(() => {

        if (params.id) {

            products.forEach(product => {
                if (product._id === params.id) setProductDetails(product)
            })
        }
    }, [params.id, products])

    // useEffect(() => {
    //     if (params.id) {

    //         allGroupBuys.forEach(productGroupBuy => {
    //             if (productGroupBuy.product === params.id) setProductGroupBuyDetails(productGroupBuy)
    //         })
    //     }
    // }, [params.id, allGroupBuys])


    // console.log(productGroupBuyDetails)

    if (productDetails.length === 0) return null;

    return (
        <>
            <div className="details">
                <img src={productDetails.images.url} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{productDetails.title}</h2>
                    </div>
                    <span>$ {productDetails.groupBuyPrice}</span>
                    <h6>Description</h6>
                    <p>{productDetails.description}</p>
                    <p>Sold: {productDetails.sold}</p>
                    {/* <Link to="/allcarts" className="cart" onClick={() => addCart(productDetails)}>Buy now: $800</Link> */}
                    { !isAdmin && <Link to="/allcarts" className="cart" onClick={() => addCart(productDetails)}>Create Group Buy</Link> }


                </div>

            </div>

            <div className="products">
            {/* {
                productGroupBuyDetails.length !== 0 && user !== productGroupBuyDetails.users &&
                <div className="details">
                    <p>{productGroupBuyDetails.title}</p> <Link to="/allcarts" className="cart" onClick={() => addGroupBuyCart(productDetails, productGroupBuyDetails)}>Join: {productGroupBuyDetails.groupBuyPrice}</Link>
                </div>
            } */}
            

                       <ProductGroupBuys params={params.id} productDetails={productDetails} addGroupBuyCart={addGroupBuyCart}/>
                        {/* <Link to="/allcarts" className="cart" onClick={() => addGroupBuyCart(productDetails, productGroupBuyDetails)}>Join</Link> */}
                        

                        </div>
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