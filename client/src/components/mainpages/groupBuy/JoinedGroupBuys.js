import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/loading/Loading'
import GroupBuyItem from './GroupBuyItem'
import axios from 'axios'



const JoinedGroupBuys = ({ uid }) => {
    const state = useContext(GlobalState)
    const [token] = state.token
    // const [allgroupBuys, setAllGroupBuys] = useState([])
    const [loading] = useState(false)
    const [userJoinedGroupBuys, setUserJoinedGroupBuys] = useState([])
    const [result, setResult] = useState([])

  
    useEffect(() => {
        const getUserJoinedGroupBuys = async () => {
            const res = await axios.get(`/api/groupbuys_user_joined?id=${uid}`, {
                headers: { Authorization: token }
            })
            setUserJoinedGroupBuys(res.data.userJoinedGroupBuys)
            setResult(res.data.result)
            // console.log(res.data)
        }
        getUserJoinedGroupBuys()
    }, [uid, token])
    

    if (loading) return <div><Loading /></div>
       
    return (
        <>
       { result !== 0 && <h2>Joined Group Buys</h2> }
        <div className="products">
            
            {
                    userJoinedGroupBuys.map(groupBuy => {
                        if(groupBuy.startedBy !== uid)
                        return <GroupBuyItem key={groupBuy._id} groupBuy={groupBuy} />
                        else return ''
                    })
                    
                }
        </div>
        </>
    )
}

export default JoinedGroupBuys