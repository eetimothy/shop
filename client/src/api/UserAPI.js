import { useState, useEffect } from 'react'
import axios from 'axios'

const UserAPI = (token) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [user, setUser] = useState([])
    // const [userId, setUserId] = useState('')
    const [vendorBrand, setVendorBrand] = useState([])
    // const [isSuperAdmin, setIsSuperAdmin] = useState('')
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        if(token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/info', {
                        headers: { Authorization: token }
                    })
                    setIsLoggedIn(true)
                    res.data.role === 1 ? setIsAdmin(true)
                    : res.data.role === 3 ? setIsSuperAdmin(true) 
                    : setIsSuperAdmin(false)
                    //  console.log(res.data)
                    // console.log(res.data._id)
                    setCart(res.data.cart)
                    setUser(res.data)
                }
                catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser() 
        }  
    },[token])

    useEffect(() => {
        if(isSuperAdmin) {
            const getAllUser = async () => {
                    const res = await axios.get('/user/all_users_info', {
                        headers: { Authorization: token }
                    })
                    //  console.log(res.data)
                     setAllUsers(res.data) 
                 }
                 getAllUser()
        }
    },[isSuperAdmin])
    

    const addCart = async (product) => {
        if(!isLoggedIn) return alert("Please login to continue.")

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', { cart: [...cart, {...product, quantity: 1}] }, {
                headers: { Authorization: token }
            })

        } else {
            alert('Item Added to Cart.')
        }
    }

    return {
        isLoggedIn: [isLoggedIn, setIsLoggedIn], 
        isAdmin: [isAdmin, setIsAdmin],
        isSuperAdmin: [isSuperAdmin, setIsSuperAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
        user: [user, setUser],
        vendorBrand: [vendorBrand, setVendorBrand],
        allUsers: [allUsers, setAllUsers]
    }
}
 
export default UserAPI;