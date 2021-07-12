import axios from 'axios'
import { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'


const ProductTypes = () => {
    const state = useContext(GlobalState)
    const [productTypes] = state.productTypesAPI.productTypes
    const [productType, setProductType] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.productTypesAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setId] = useState('')

    const createProductType = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(`/api/product_type/${id}`, { name: productType }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            } else {
                const res = await axios.post('/api/product_type', { name: productType }, {
                    headers: { Authorization: token }
                })
                //console.info(res)
                alert(res.data.msg)
            }
            setOnEdit(false)
            setProductType('')
            setCallback(!callback)
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editProductType = async (id, name) => {
        setId(id)
        setProductType(name)
        setOnEdit(true)
    }

    const deleteProductType = async (id) => {
        try {
            const res = await axios.delete(`/api/product_type/${id}`, {
                headers: { Authorization: token }
            })
            alert(res.data.msg)
            setCallback(!callback)
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }


    return (
        <div className="productTypes">
            <form onSubmit={createProductType}>
                <label htmlFor="productType">Product Type</label>
                <input type="text" name="productType" value={productType} required
                    onChange={e => setProductType(e.target.value)} />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    productTypes.map(productType => (
                        <div className="row" key={productType._id}>
                            <p>{productType.name}</p>
                            <button onClick={() => editProductType(productType._id, productType.name)}>Edit</button>

                            <button onClick={() => deleteProductType(productType._id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ProductTypes
