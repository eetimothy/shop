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
            // console.log(res.data.groupBuys)
            setUserGroupBuys(res.data.groupBuys)
            setResult(res.data.result)
           
        }
        getAllGroupBuysOfUser()
    }, [token, uid])
   
  
    if (loading) return <div><Loading /></div>

    return (
        <>
        <div style={{ paddingLeft: '50px', color: 'darkgrey', paddingTop: '30px'  }}>
            { result !== 0 && <h2>Group Buys Started</h2>}
            </div>
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between', flexWrap: 'wrap', padding: '40px', alignContent: 'center', gap: '15px' }}>
                {
                    userGroupBuys.map(groupBuy => {
                        return <GroupBuyItem key={groupBuy._id} groupBuy={groupBuy} />
                        
                    })
                    
                }
                </div>
            </div>

        </>
    )
}

export default UserCreatedGroupBuys
