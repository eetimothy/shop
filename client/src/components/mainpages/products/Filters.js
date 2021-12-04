import { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'


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
        <div className="filter_menu">
            <div className="row sort">
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
            <div className="row sort">
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
            </div>
            <input type="text" value={search} placeholder="Search"
                onChange={e => setSearch(e.target.value.toLowerCase())} />

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