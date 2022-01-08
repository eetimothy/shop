import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import '../superAdmin/superAdminCreateProduct/SuperAdminCreateProduct.css'

// Create Products is for Admins/ vendors to create Group Buys

const theme = createTheme();

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

    // console.log(user.email, user.company, user.mobile)

    useEffect(() => {

        if (param.id) {
            setOnEdit(true)
            products.forEach(product => {
                if (product._id === param.id) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        } else {
            setOnEdit(false)
            setProduct(initialState)
            setImages(false)
        }
    }, [param.id, products])


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
            if (!isAdmin && !isSuperAdmin) return alert('Admin access only..')
            if (!images) return alert('Please add an image for this product..')

            if (onEdit) {
                await axios.put(`/api/products/${product._id}`, { ...product, images }, {
                    headers: { Authorization: token }
                })
            } else {
                await axios.post('/api/products', { ...product, images, vendorId: user._id, user: user._id, vendorEmail: user.email, vendorMobile: user.mobile, vendorCompany: user.company }, {
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
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            Add Product
                        </Typography>



                        <div className="upload">
                            <input type="file" name="file" id="file_up" onChange={handleUpload} />
                            {
                                loading ? <div id="file_img"><Loading /></div>
                                    : <div id="file_img" style={styleUpload}>
                                        <img src={images ? images.url : ''} alt="" />
                                        <span onClick={handleDestroy}><DeleteForeverIcon style={{ color: "#000" }} /></span>
                                    </div>
                            }
                        </div>

                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>


                                {/* <div className="row">
                                    <label htmlFor="product_id">Product ID</label>
                                    <input type="text" name="product_id" id="product_id" required
                                        value={product.product_id} onChange={handChangeInput} disabled={onEdit} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="product_id"
                                        label="Product ID"
                                        name="product_id"
                                        autoComplete="product_id"
                                        value={product.product_id}
                                        onChange={handChangeInput}
                                        disabled={onEdit}
                                    />
                                    <p style={{ fontSize: "8px" }}>Give your product a SKU or unique product identifier.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" name="title" id="title" required
                                        value={product.title} onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="title"
                                        label="Title"
                                        name="title"
                                        autoComplete="title"
                                        value={product.title}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>The Product's name.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="groupBuyPrice">Group Buy Price</label>
                                    <input type="number" name="groupBuyPrice" id="groupBuyPrice" required
                                        value={product.groupBuyPrice} onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="groupBuyPrice"
                                        label="Group Buy Price"
                                        name="groupBuyPrice"
                                        autoComplete="groupBuyPrice"
                                        min="0"
                                        value={product.groupBuyPrice}
                                        onChange={handChangeInput}
                                    />
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="buyNowPrice">Buy Now Price</label>
                                    <input type="number" name="buyNowPrice" id="buyNowPrice" required
                                        value={product.buyNowPrice} onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="buyNowPrice"
                                        label="Buy Now Price"
                                        name="buyNowPrice"
                                        autoComplete="buyNowPrice"
                                        min="0"
                                        value={product.buyNowPrice}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>Purchase price without Group Buy.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="totalQty">Products Instock</label>
                                    <input type="number" name="totalQty" id="totalQty" min="0" required
                                        value={product.totalQty} onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        type="number"
                                        required
                                        fullWidth
                                        id="totalQty"
                                        label="Products Instock"
                                        name="totalQty"
                                        autoComplete="totalQty"
                                        min="0"
                                        value={product.totalQty}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>The total quantity available for this product.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="maxGroupBuys">Max Number of Group Buys Allowed</label>
                                    <input type="number" name="maxGroupBuys" id="maxGroupBuys" min="0" required
                                        value={product.maxGroupBuys} onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="maxGroupBuys"
                                        label="Max no. of Group Buys Allowed"
                                        name="maxGroupBuys"
                                        autoComplete="maxGroupBuys"
                                        min="0"
                                        value={product.maxGroupBuys}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>Sets the total no. of Group Buys allowed to be created for this product.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="groupBuyQty">Group Buy Quantity</label>
                                    <input type="number" name="groupBuyQty" id="groupBuyQty" required
                                        value={product.groupBuyQty} onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="groupBuyQty"
                                        label="Group Buy Qty"
                                        name="groupBuyQty"
                                        autoComplete="groupBuyQty"
                                        min="0"
                                        value={product.groupBuyQty}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>Sets the total no. of purchases allowed for each Group Buy.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="successTarget">Set Minimum Group Buy</label>
                                    <input type="number" name="successTarget" id="successTarget" required
                                        value={product.successTarget} onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        id="successTarget"
                                        label="Minimum Order"
                                        name="successTarget"
                                        autoComplete="successTarget"
                                        min="1"
                                        value={product.successTarget}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>MOQ: Sets the minimum no. of purchases required for the Group Buy to be successful.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="description">Description</label>
                                    <textarea type="text" name="description" id="description" required
                                        value={product.description} rows="5" onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="description"
                                        label="Description"
                                        name="description"
                                        autoComplete="description"
                                        value={product.description}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>Description of the product, variations, shipping details etc.</p>
                                </Grid>

                                {/* <div className="row">
                                    <label htmlFor="content">Content</label>
                                    <textarea type="text" name="content" id="content" required
                                        value={product.content} rows="5" onChange={handChangeInput} />
                                </div> */}

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="content"
                                        label="Group Buy Content"
                                        name="content"
                                        autoComplete="content"
                                        value={product.content}
                                        onChange={handChangeInput}
                                    />
                                    <p style={{ fontSize: "8px" }}>Describe your requirements for group buys: eg, MOQ, promotion, etc.</p>
                                </Grid>

                                {/* <div className="row">
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
                                </div> */}

                                <Grid item xs={12}>
                                    <InputLabel id="category">Product Category</InputLabel>
                                    <Select
                                        fullWidth
                                        required
                                        columns={5}
                                        name="category"
                                        labelId="category"
                                        id="category"
                                        value={product.category}
                                        label="Set Product Category"
                                        onChange={handChangeInput}
                                    >
                                        {
                                            categories.map(category => (
                                                <MenuItem value={category._id} key={category._id}>
                                                    {category.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <p style={{ fontSize: "8px" }}>Select the product's category.</p>
                                </Grid>

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

                                {/* <div className="row">
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
                                </div> */}

                                <Grid item xs={12}>
                                    <InputLabel id="productTypes">Product Type</InputLabel>
                                    <Select
                                        fullWidth
                                        required
                                        columns={5}
                                        name="productType"
                                        labelId="productType"
                                        id="productType"
                                        value={product.productType}
                                        label="Set The Product Type"
                                        onChange={handChangeInput}
                                    >
                                        {
                                            productTypes.map(productType => (
                                                <MenuItem value={productType._id} key={productType._id}>
                                                    {productType.name}
                                                </MenuItem>
                                            ))
                                        }
                                    </Select>
                                    <p style={{ fontSize: "8px" }}>Select the product's category.</p>
                                </Grid>

                                <Grid item xs={12}>
                                    <div style={{ marginBottom: "80px", marginTop: "50px", display: "flex", flexDirection: "row" }}>
                                        <div style={{ display: "flex", paddingRight: "30px" }}> <Button style={{ backgroundColor: '#F05E23', color: "#ffffff" }} type="submit">{onEdit ? "Update" : "Add Product"}</Button></div>
                                       {
                                           isAdmin ? <div style={{ display: "flex" }}> <Button><Link to={`/vendorproducts/${user._id}`}>Cancel</Link> </Button> </div>
                                           : isSuperAdmin ? <div style={{ display: "flex" }}> <Button><Link to={`/products`}>Cancel</Link> </Button> </div>
                                           : ''
                                       }
                                       
                                        
                                    </div>
                                </Grid>

                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}

export default CreateProduct;