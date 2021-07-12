import { useState, useEffect } from 'react'
import axios from 'axios'


const ProductTypesAPI = (token) => {
    const [productTypes, setProductTypes] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getProductTypes = async () => {
            const res = await axios.get('/api/product_type')
            //console.log(res)
            setProductTypes(res.data)
        }
        getProductTypes()
    },[callback])

    return {
        productTypes: [productTypes, setProductTypes],
        callback: [callback, setCallback]
    }
}
 
export default ProductTypesAPI;