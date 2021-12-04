import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import GroupBuyItem from './GroupBuyItem'

import { useParams } from 'react-router-dom'

const UserGroupBuys = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    // const [allgroupBuys, setAllGroupBuys] = useState([])
    const [loading] = useState(false)
    const [userGroupBuys, setUserGroupBuys] = useState([])
    const [callback] = state.groupBuysAPI.callback
   
    const { uid } = useParams()

    useEffect(() => {
        const getAllGroupBuysOfUser = async () => {
            const res = await axios.get(`/api/groupbuys?startedBy=${uid}`, {
                headers: { Authorization: token }
            })
            // console.log(res.data)
            setUserGroupBuys(res.data.groupBuys)
        }
        getAllGroupBuysOfUser()
    }, [token, uid, callback])


    if (loading) return <div><Loading/></div>

    return (
        <div className="products">
            {
            userGroupBuys.map(groupBuy => {
               return <GroupBuyItem key={groupBuy._id} groupBuy={groupBuy} />
            })
            }
        </div>
    )
}

export default UserGroupBuys
