import { useContext, useState, useEffect } from 'react'
import { GlobalState } from '../../../../GlobalState'
import ProductItem from '../../utils/productItem/ProductItem'
import Loading from '../../utils/loading/Loading'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './vendorProducts.css'

const VendorProducts = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    // const [user] = state.userAPI.user
    const [vendorProducts, setVendorProducts] = useState([])
    const [isAdmin] = state.userAPI.isAdmin
    const [loading, setLoading] = useState(false)
    // const [isCheck, setIsCheck] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback
    const [products, setProducts] = state.productsAPI.products

    const [categories] = state.categoriesAPI.categories
    const [productTypes] = state.productTypesAPI.productTypes
    // const [vendorBrands, setVendorBrands] = useState([])
    const [category, setCategory] = useState('')
    // const [brand, setBrand] = useState('')
    const [productType, setProductType] = state.productsAPI.productType
    // const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = state.productsAPI.page
    const [result] = state.productsAPI.result
    // const [page, setPage] = useState(1)
    // const [result, setResult] = useState(0)

    const { username } = useParams()


    useEffect(() => {
        const getVendorProducts = async () => {
            const res = await axios.get(`/api/vendorproducts?vendorUsername=${username}&limit=${page * 9}&${category}&${productType}&title[regex]=${search}`, {
                // params: { user: uid },
                headers: { Authorization: token }
            })
            // console.log(res.data)
            setVendorProducts(res.data.vendorProducts)
        }

        // const getVendorBrands = async (e) => {
        //     const res = await axios.get('/api/vendorbrands', {
        //         params: { user: uid },
        //         headers: { Authorization: token }
        //     })
        //     // console.log(res.data)
        //     setVendorBrands(res.data)
        // }
        // getVendorBrands()
        getVendorProducts()
    }, [callback, productType, category, search, page, loading, token, username])

    const handleCheck = (id) => {
        // console.info(id)
        vendorProducts.forEach(product => {
            if (product._id === id) product.checked = !product.checked
        })
        setProducts([...products])
    }

    const deleteProduct = async (id, public_id) => {
        // console.info({id, public_id})
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

    // const checkAll = () => {
    //     vendorProducts.forEach(p => {
    //         p.checked = !isCheck
    //     })
    //     setProducts([...products])
    //     setIsCheck(!isCheck)
    // }

    // const deleteAll = () => {
    //     vendorProducts.forEach(product => {
    //         if (product.checked) deleteProduct(product._id, product.images.public_id)
    //     })
    // }

    const handleCategory = (e) => {
        setCategory(e.target.value)
        setSearch('')
    }

    // const handleBrand = (e) => {
    //     // setBrand(e.target.value)
    //     setSearch('')
    // }

    const handleProductType = e => {
        setProductType(e.target.value)
        setSearch('')
    }

    if (loading) return <div><Loading /></div>

    return (
        <>
             <div className="gb_filter">
             <div className='filter_1'>
                {/* <div className="row sort">
                    <span></span>
                    <select name="category" value={category} onChange={handleCategory}>
                        <option value=''>Categories</option>
                        {
                            categories.map(category => (
                                <option value={"category=" + category._id} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div> */}
                {/* <div className="row sort">
                    <span>   </span>
                    <select name="brand" value={brand} onChange={handleBrand}>
                        <option value=''>Brands</option>
                        {
                            vendorBrands.map(brand => (
                                <option value={"brand=" + brand._id} key={brand._id}>
                                    {brand.name}
                                </option>
                            ))
                        }
                    </select>
                </div> */}
                {/* <div className="row sort">
                    <span>   </span>
                    <select name="productType" value={productType} onChange={handleProductType}>
                        <option value=''>ProductTypes</option>
                        {
                            productTypes.map(productType => (
                                <option value={"productType=" + productType._id} key={productType._id}>
                                    {productType.name}
                                </option>
                            ))
                        }
                    </select>
                </div> */}
                {/* <input type="text" value={search} placeholder="Search"
                    onChange={e => setSearch(e.target.value.toLowerCase())} /> */}


                <span>
                    <FormControl fullWidth>
                        <InputLabel id="category">All Categories</InputLabel>
                        <Select
                            labelId="All Categories"
                            id="category"
                            name="category"
                            value={category}
                            label="All Categories"
                            onChange={handleCategory}
                        >
                            <MenuItem value=''>All Categories</MenuItem>
                            {
                                categories.map(category => (
                                    <MenuItem value={"category=" + category._id} key={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </span>

                <span>
                    <FormControl fullWidth>
                        <InputLabel id="type">Product Types</InputLabel>
                        <Select
                            labelId="All Types"
                            id="category"
                            value={productType}
                            label="All Product Types"
                            name="productType"
                            onChange={handleProductType}
                        >
                            <MenuItem value=''>All Products</MenuItem>
                            {
                                productTypes.map(productType => (
                                    <MenuItem value={"productType=" + productType._id} key={productType._id}>
                                        {productType.name}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </span>
                </div>

                <div className='filter_search'>
                    <TextField fullWidth type="text" value={search} label="Search" id="Search"
                        onChange={e => setSearch(e.target.value.toLowerCase())} />
                </div>


                {/* <div className="row sort">
                    <span>Sort By: </span>
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value=''>Latest</option>
                        <option value='sort=oldest'>Oldest</option>
                        <option value='sort=-sold'>Best Sellers</option>
                        <option value='sort=-price'>Price: High-Low</option>
                        <option value='sort=price'>Price: Low-High</option>
                    </select>
                </div> */}
            </div>


            {/* {
                isAdmin &&
                <div className="delete-all">
                    <span>Select All</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>Delete Selected</button>
                </div>
            } */}

            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>

                        {
                            vendorProducts.map(product => {
                                return <ProductItem key={product._id} product={product}
                                    isAdmin={isAdmin} deleteProduct={deleteProduct} handleCheck={handleCheck} />
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className="load_more">
                {
                    result < page * 9 ? ""
                        : <button onClick={() => setPage(page + 1)}>Load more</button>
                }
            </div>
            {vendorProducts.length === 0 && <Loading />}
        </>
    )
}
export default VendorProducts