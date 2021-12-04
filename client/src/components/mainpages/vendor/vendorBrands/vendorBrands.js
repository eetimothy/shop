import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'

const VendorBrands = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [user] = state.userAPI.user
    const [vendorBrands, setVendorBrands] = useState([])
    const [brand, setBrand] = useState('')
    const [callback, setCallback] = state.brandsAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setId] = useState('')

    const { uid } = useParams()
    // console.log(uid)

    useEffect(() => {
        const getVendorBrands = async (e) => {
            const res = await axios.get('/api/vendorbrands', {
                params: { user: uid },
                headers: { Authorization: token }
            })
            setVendorBrands(res.data)
            // console.log(res.data)
        }
        getVendorBrands();
    },[callback, token, uid])
        
    const createBrand = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(`/api/brand/${id}`, { name: brand }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            } else {
                const res = await axios.post('/api/brand', { name: brand, user: user._id }, {
                    headers: { Authorization: token }
                })
                // console.info(res)
                alert(res.data.msg)
            }
            setOnEdit(false)
            setBrand('')
            setCallback(!callback)
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editBrand = async (id, name) => {
        setId(id)
        setBrand(name)
        setOnEdit(true)
        setCallback(!callback)
    }

    const deleteBrand = async (id) => {
        try {
            const res = await axios.delete(`/api/brand/${id}`, {
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
        <div className="brands">
            <form onSubmit={createBrand}>
                <label htmlFor="brand">Brand</label>
                <input type="text" name="brand" value={brand} required
                    onChange={e => setBrand(e.target.value)} />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>
            <div className="col">
            <h1>vendor brands</h1>
            {
                    vendorBrands.map(vendorBrand => (
                        <div className="row" key={vendorBrand._id}>
                            <p>{vendorBrand.name}</p>
                            <button onClick={() => editBrand(vendorBrand._id, vendorBrand.name)}>Edit</button>

                            <button onClick={() => deleteBrand(vendorBrand._id)}>Delete</button>
                        </div>
                    ))
                }
         </div>
        </div>
    );
}
 
export default VendorBrands;