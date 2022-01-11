import { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../groupBuy/Cards.css'

const Filters = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories
    // const [brands] = state.brandsAPI.brands
    const [productTypes] = state.productTypesAPI.productTypes

    const [category, setCategory] = state.productsAPI.category
    // const [brand, setBrand] = state.productsAPI.brand
    const [productType, setProductType] = state.productsAPI.productType
    // const [sort, setSort] = state.productsAPI.sort
    const [search, setSearch] = state.productsAPI.search

    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch('')
    }
    // const handleBrand = e => {
    //     setBrand(e.target.value)
    //     setSearch('')
    // }
    const handleProductType = e => {
        setProductType(e.target.value)
        setSearch('')
    }

    return (
        <div className="gb_filter">
            <div className='filter_1'>
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






            {/* <div className="row sort">
                <span>   </span>
                <select name="brand" value={brand} onChange={handleBrand}>
                    <option value=''>Brands</option>
                    {
                        brands.map(brand => (
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
                    <option value=''>Product</option>
                    {
                        productTypes.map(productType => (
                            <option value={"productType=" + productType._id} key={productType._id}>
                                {productType.name}
                            </option>
                        ))
                    }
                </select>
            </div> */}
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
    );
}

export default Filters;