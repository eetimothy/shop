import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'


// Create Products is for Admins/ vendors to create Group Buys

const initialState = {
    user: '',
    product_id: '',
    title: '',
    buyNowPrice: 0,
    groupBuyPrice: 0,
    description: 'This is the demo description',
    content: 'This is the demo content',
    brand: '',
    category: '',
    productType: '',
    _id: '',
    groupBuyQty: 0,
    successTarget: 10,
    totalQty: 0,
    isActive: true,
    maxGroupBuys: 0
}

const CreateProduct = () => {
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user
    const [token] = state.token
    
    const [product, setProduct] = useState(initialState)
    const [categories] = state.categoriesAPI.categories
    // const [brands] = state.brandsAPI.brands
    const [productTypes] = state.productTypesAPI.productTypes
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin

    const history = useHistory()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback
    
    console.log(user.email, user.company, user.mobile)

    useEffect(() => {

        if(param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if(product._id === param.id){
                    setProduct(product)
                    setImages(product.images)
                }
            }) 
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    },[param.id, products])


    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            if (!isAdmin && !isSuperAdmin) return alert("Admin access only..")
            const file = e.target.files[0]

            if (!file) return alert("File does not exist..")

            if (file.size > 1024 * 1024) return alert("File size exceeded.. ")

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
                return alert("Wrong file format.. Only .jpeg and .png files allowed..")

            let formData = new FormData()
            formData.append('file', file)

            setLoading(true)

            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token
                }
            })
            setLoading(false)
            //console.info(res)
            setImages(res.data)
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin && !isSuperAdmin) return alert("Admin access only..")
            setLoading(true)
            await axios.post('/api/destroy', { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handChangeInput = async (e) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(!isAdmin && !isSuperAdmin) return alert('Admin access only..')
            if(!images) return alert('Please add an image for this product..')

            if(onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images}, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post('/api/products', { ...product, images, user: user._id, vendorEmail: user.email, vendorMobile: user.mobile, vendorCompany: user.company}, {
                    headers: { Authorization: token }
                })
            }
            setCallback(!callback)
            // setImages(false)
            // setProduct(initialState)
            isAdmin ? history.push(`/vendorproducts/${user._id}`) : history.push('/products')
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const styleUpload = {
        display: images ? "block" : "none"
    }

    return (
        <div className="create_product">
            <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload} />
                {
                    loading ? <div id="file_img"><Loading /></div>
                        : <div id="file_img" style={styleUpload}>
                            <img src={images ? images.url : ''} alt="" />
                            <span onClick={handleDestroy}>X</span>
                        </div>
                }
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="product_id">Product ID</label>
                    <input type="text" name="product_id" id="product_id" required
                        value={product.product_id} onChange={handChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                        value={product.title} onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="groupBuyPrice">Group Buy Price</label>
                    <input type="number" name="groupBuyPrice" id="groupBuyPrice" required
                        value={product.groupBuyPrice} onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="buyNowPrice">Buy Now Price</label>
                    <input type="number" name="buyNowPrice" id="buyNowPrice" required
                        value={product.buyNowPrice} onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="totalQty">Products Instock</label>
                    <input type="number" name="totalQty" id="totalQty" min="0" required
                        value={product.totalQty} onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="maxGroupBuys">Max Number of Group Buys Allowed</label>
                    <input type="number" name="maxGroupBuys" id="maxGroupBuys" min="0" required
                        value={product.maxGroupBuys} onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="groupBuyQty">Group Buy Quantity</label>
                    <input type="number" name="groupBuyQty" id="groupBuyQty" required
                        value={product.groupBuyQty} onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="successTarget">Set Minimum Group Buy</label>
                    <input type="number" name="successTarget" id="successTarget" required
                        value={product.successTarget} onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                        value={product.description} rows="5" onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                        value={product.content} rows="5" onChange={handChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories</label>
                    <select name="category" id="category" value={product.category} onChange={handChangeInput}>
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                {/* <div className="row">
                    <label htmlFor="brands">Brands</label>
                    <select name="brand" id="brand" value={product.brand} onChange={handChangeInput}>
                        <option value="">Please select a brand</option>
                        {
                            brands.map(brand => (
                                <option value={brand._id} key={brand._id}>
                                    {brand.name}
                                </option>
                            ))
                        }
                    </select>
                </div> */}

                <div className="row">
                    <label htmlFor="productTypes">Product Type</label>
                    <select name="productType" id="productType" value={product.productType} onChange={handChangeInput}>
                        <option value="">Please select a product type</option>
                        {
                            productTypes.map(productType => (
                                <option value={productType._id} key={productType._id}>
                                    {productType.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                
                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    );
}

export default CreateProduct;