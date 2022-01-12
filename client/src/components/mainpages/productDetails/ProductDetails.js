import { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { Link } from 'react-router-dom'
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from 'react-share'
import ProductGroupBuys from '../groupBuy/ProductGroupBuys'
import Button from '@mui/material/Button';

const ProductDetails = () => {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const [productDetails, setProductDetails] = useState([])
    const addGroupBuyCart = state.userAPI.addGroupBuyCart
    const [isAdmin] = state.userAPI.isAdmin

    const shareUrl = `www.group-buy.io/detail/${params.id}`

    useEffect(() => {

        if (params.id) {

            products.forEach(product => {
                if (product._id === params.id) setProductDetails(product)
            })
        }
    }, [params.id, products])


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

                    <h6>Group Buy Description</h6>

                    <p>{productDetails.content}</p>
                    <p>Instructions: Checkout to start a group buy</p>

                    <h6>Vendor Details</h6>
                    <p>Company: {productDetails.vendorCompany}</p>
                    <p>Email: {productDetails.vendorEmail}</p>
                    <p>Contact: {productDetails.vendorMobile}</p>

                    <h6>Share:</h6>

                    <p>
                        <span>
                            <WhatsappShareButton url={shareUrl}>
                                <WhatsappIcon size={40} round={true} />
                            </WhatsappShareButton>

                            <FacebookShareButton url={shareUrl} style={{ paddingLeft: '5px' }}>
                                <FacebookIcon size={40} round={true} />
                            </FacebookShareButton>
                        </span>
                    </p>
                    {
                        !isAdmin && <Link to="#!" onClick={() => addCart(productDetails)}>
                            <Button variant="contained" style={{ backgroundColor: '#F05E23', marginTop: "10px", marginBottom: "10px" }}>Buy</Button>
                        </Link>

                    }
                </div>

                <div className="row">
                    <ProductGroupBuys params={params.id} productDetails={productDetails} addGroupBuyCart={addGroupBuyCart} />
                </div>

            </div>



        </>
    );
}

export default ProductDetails;