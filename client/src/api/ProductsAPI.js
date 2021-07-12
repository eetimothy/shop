import { useState, useEffect } from 'react'
import axios from 'axios'

function ProductsAPI() {
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)  
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [productType, setProductType] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
    const [id, setId] = useState('')
    

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get(`/api/products?limit=${page*9}&${category}&${brand}&${sort}&${productType}&title[regex]=${search}`)
            setProducts(res.data.products)
            setResult(res.data.result)
            //console.info(res)
        }
        getProducts()
    },[callback, category, brand, productType, sort, search, page])

    // useEffect(() => {
    //     const getVendorProducts = async () => {
    //         const res = await axios.get(`api/vendorproducts?user=${id}`)
    //         setVendorProducts(res.data)
    //     }
    //     getVendorProducts()
    // }, [callback, id])

    return {
        products: [products, setProducts],
        callback: [callback, setCallback],
        category: [category, setCategory],
        brand: [brand, setBrand],
        productType: [productType, setProductType],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult],
        id: [id, setId]
    }
}
 
export default ProductsAPI;