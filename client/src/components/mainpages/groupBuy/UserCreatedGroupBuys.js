import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import axios from 'axios'
import Loading from '../utils/loading/Loading'
import GroupBuyItem from './GroupBuyItem'

// import { useParams } from 'react-router-dom'

const UserCreatedGroupBuys = ({ uid }) => {
    const state = useContext(GlobalState)
    const [token] = state.token
    // const [allgroupBuys, setAllGroupBuys] = useState([])
    const [loading] = useState(false)
    const [userGroupBuys, setUserGroupBuys] = useState([])
    const [result, setResult] = useState([])
   
    // const [userJoinedGBs, setUserJoinedGBs] = useState([])

    // const { uid } = useParams()

    useEffect(() => {
        const getAllGroupBuysOfUser = async () => {
            const res = await axios.get(`/api/groupbuys?startedBy=${uid}`, {
                headers: { Authorization: token }
            })
            
            setUserGroupBuys(res.data.groupBuys)
            setResult(res.data.result)
           
        }
        getAllGroupBuysOfUser()
    }, [token, uid])
   
  
    if (loading) return <div><Loading /></div>

    return (
        <>
            { result !== 0 && <h2>Created Group Buys</h2>}
            <div className="products">
                {
                    userGroupBuys.map(groupBuy => {
                        return <GroupBuyItem key={groupBuy._id} groupBuy={groupBuy} />
                        
                    })
                    
                }
            </div>

        </>
    )
}

export default UserCreatedGroupBuys
