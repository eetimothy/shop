import axios from 'axios'
import { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'


const Brands = () => {
    const state = useContext(GlobalState)
    const [brands] = state.brandsAPI.brands
    const [brand, setBrand] = useState('')
    const [token] = state.token
    const [callback, setCallback] = state.brandsAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setId] = useState('')

    // const [user] = state.userAPI.user
    const [vendorId, setVendorId] = useState('')
    // console.log(state)
    // console.log(brands[2].user)

    const createBrand = async (e) => {
        e.preventDefault();
        try {
            if (onEdit) {
                const res = await axios.put(`/api/brand/${id}`, { name: brand }, {
                    headers: { Authorization: token }
                })
                alert(res.data.msg)
            } else {
                const res = await axios.post('/api/brand', { name: brand, user: vendorId }, {
                    headers: { Authorization: token }
                })
                // console.info(res)
                alert(res.data.msg)
            }
            setOnEdit(false)
            setBrand('')
            setCallback(!callback)
            setVendorId('')
        }
        catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editBrand = async (id, name) => {
        setId(id)
        setBrand(name)
        setOnEdit(true)
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
                <label htmlFor="brand">Brand Management</label>
                <input type="text" name="brand" value={brand} placeholder="Brand name" required
                    onChange={e => setBrand(e.target.value)} />

                    <input type="text" name="vendorId" value={vendorId} placeholder="User Id" required
                    onChange={e => setVendorId(e.target.value)} />

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
            </form>

            <div className="col">
                
                {
                    brands.map(brand => (
                        <div className="row" key={brand._id}>
                            <h5>{brand.name}</h5>
                            <br/>
                            {/* <p> ({brand.user})</p> */}
                            <button onClick={() => editBrand(brand._id, brand.name)}>Edit</button>

                            <button onClick={() => deleteBrand(brand._id)}>Delete</button>
                        </div>
                    ))
                }
            
            

            </div>
        </div>
    );
}

export default Brands
