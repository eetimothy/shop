import { useState, useEffect } from 'react'
import axios from 'axios'

const UserAPI = (token) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isSuperAdmin, setIsSuperAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [groupBuyCart, setGroupBuyCart] = useState([])
    const [history, setHistory] = useState([])
    const [user, setUser] = useState([])
    const [vendorBrand, setVendorBrand] = useState([])
    const [allUsers, setAllUsers] = useState([])
    const [vendorOrders, setVendorOrders] = useState([])
    const [allgroupBuys, setAllGroupBuys] = useState([])
    const [vendors, setVendors] = useState([])
    const [callback, setCallback] = useState(false)

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
                    setGroupBuyCart(res.data.groupBuyCart)
                    // console.log(res.data.cart)
                    // console.log(res.data.groupBuyCart)
                    setUser(res.data)
                   
                }
                catch (err) {
                    alert(err.response.data.msg)
                }
            }
            getUser() 
        }  
    },[token, callback])

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
    },[isSuperAdmin, token])
    
    useEffect(() => {
        if(token) {
            const getAllGroupBuys = async () => {
                const res = await axios.get('/api/groupbuys', {
                    headers: { Authorization: token }
                })
                // console.log(res.data)
                setAllGroupBuys(res.data)
            }
            getAllGroupBuys()
        }
    }, [token])

    useEffect(() => {
        const getShops = async () => {
            const res = await axios.get('/api/shops')
            setVendors(res.data.shops)
        }
        getShops()
    }, [])

    const addCart = async (product) => {
        if(!isLoggedIn) return alert("Please login or sign up to continue.")

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

    const addGroupBuyCart = async (product, groupBuy) => {
        if(!isLoggedIn) return alert("Please login or sign up to continue.")

        const check = groupBuyCart.every(item => {
            return console.info(item._id !== groupBuy._id)
            
        })

        if(check){
            setGroupBuyCart([...groupBuyCart, {...product, groupBuy, quantity: 1}])

            await axios.patch('/user/addcart_groupbuy_join', { groupBuyCart: [...groupBuyCart, {...product, groupBuy, quantity: 1}] }, {
                headers: { Authorization: token }
            })
            
        } else {
            alert('Item Added to Group Buy Cart, Checkout to join Group Buy..')
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
        allUsers: [allUsers, setAllUsers],
        vendorOrders: [vendorOrders, setVendorOrders],
        allGroupBuys: [allgroupBuys, setAllGroupBuys],
        addGroupBuyCart: addGroupBuyCart,
        groupBuyCart: [groupBuyCart, setGroupBuyCart],
        vendors: [vendors, setVendors],
        callback: [callback, setCallback]
    }
}
 
export default UserAPI;