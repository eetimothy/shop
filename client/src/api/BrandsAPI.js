import { useState, useEffect } from 'react'
import axios from 'axios'


const BrandsAPI = (token) => {
    const [brands, setBrands] = useState([])
    const [callback, setCallback] = useState(false)
    const [vendorBrands, setVendorBrands] = useState([])

    useEffect(() => {
        const getBrands = async () => {
            const res = await axios.get('/api/brand')
            // const result = res.data
            // console.log(result)  
            setBrands(res.data)
        }
        getBrands()
    },[callback])

    return {
        brands: [brands, setBrands],
        callback: [callback, setCallback],
        vendorBrands: [vendorBrands, setVendorBrands]
    }
}
 
export default BrandsAPI;