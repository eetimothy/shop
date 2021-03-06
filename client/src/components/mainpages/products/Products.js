import { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductItem from '../utils/productItem/ProductItem'
import Loading from '../utils/loading/Loading'
import axios from 'axios'
import Filters from './Filters'
import LoadMore from './LoadMore'
// import BottomNav from '../../footer/BottomNav'
import '../utils/productItem/ProductItem.css'

const Products = () => {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin
    const [token] = state.token
    const [callback, setCallback] = state.productsAPI.callback
    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)
    const [allGroupBuys] = state.groupBuysAPI.allGroupBuys

    const handleCheck = (id) => {
        //console.info(id)
        products.forEach(product => {
            if(product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        //console.info({id, public_id})
        try {
            setLoading(true)
            const destroyImg = await axios.post('/api/destroy', { public_id }, {
                headers: { Authorization: token }
            })
            const deleteProduct = await axios.delete(`/api/products/${id}`, {
                headers: { Authorization: token }
            })
            await destroyImg
            await deleteProduct
            setCallback(!callback)
            setLoading(false)
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }   

    const checkAll = () => {
        products.forEach(product => {
            product.checked = !isCheck
        })
        setProducts([...products])
        setIsCheck(!isCheck)
    } 

    const deleteAll = () => {
        products.forEach(product => {
            if(product.checked) deleteProduct(product._id, product.images.public_id)
        })
    }

    // console.log(products)
    // console.log(allGroupBuys)
    const gb = allGroupBuys.map(gb => {
        return gb
    })
    

    if(loading) return <div><Loading/></div>

    return ( 
        <>
        <Filters />
        
        
        {/* <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'center', flexWrap: 'wrap', padding: '20px', alignContent: 'center', gap: '15px' }}>
            {
                products.map(product => {
                    if(product.isActive === true)
                    return <ProductItem key={product._id} product={product} gb={gb}
                    isSuperAdmin={isSuperAdmin} isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                    else return ''
                })
            }
            </div>
        </div> */}
         <div className='cards'>
         {
            isSuperAdmin && 
            <div className='deleteall'>
                <div className="deleteall_item1">
                <span style={{ paddingRight: "5px" }}>Select All</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                </div>
                <div className="deleteall_item1">
                <button onClick={deleteAll} style={{ border: "1px solid #000", padding: "3px 10px 3px 10px" }}>Delete Selected</button>
                </div>
            </div>
        }
                        <div className='cards__container'>
                            <div className='cards__wrapper'>
                                <ul className='cards__items'>
                                    {
                                        products.map(product => {
                                            if (product.isActive === true)
                                                return <ProductItem key={product._id} product={product} gb={gb} 
                                                isSuperAdmin={isSuperAdmin} isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                                            else return ''
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
        
        <LoadMore />
        {products.length === 0 && <Loading />}

        {/* <BottomNav/> */}
        </>
     );
}
 
export default Products;