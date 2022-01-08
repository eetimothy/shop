import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

const BtnRender = ({ product, deleteProduct }) => {

    const state = useContext(GlobalState)
    const [isSuperAdmin] = state.userAPI.isSuperAdmin
    const [isAdmin] = state.userAPI.isAdmin
    // const addCart = state.userAPI.addCart
    const [user] = state.userAPI.user

    

    return (
        <div className="row_btn">
            {
                isSuperAdmin ?
                // isSuperAdmin || isAdmin ?
                    <>
                       <p> <Link id="btn_buy" to="#!" 
                        onClick={() => deleteProduct(product._id, product.images.public_id)} style={{ color: "crimson" }}>Delete</Link></p>
                       <p>  <Link id="btn_view" to={`/edit_product/${product._id}`} style={{ color: "#000" }}>Edit</Link></p>
                    </>
                    : 
                    isAdmin && (user._id === product.vendorId) ?
                    <>
                    <p>  <Link id="btn_view" to={`/edit_product/${product._id}`} style={{ color: "#000" }}>Edit</Link></p>
                        {/* <Link id="btn_buy" to="#!" 
                        onClick={() => deleteProduct(product._id, product.images.public_id)}>Delete</Link>
                        <Link id="btn_view" to={`/edit_product/${product._id}`}>Edit</Link> */}
                    </>
                    :
                    <>
                        {/* <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>+ Create Group Buy</Link>
                        <Link id="btn_view" to={`/detail/${product._id}`}>Join Group Buy</Link> */}
                    </>
            }
        </div>
    );
}

export default BtnRender;