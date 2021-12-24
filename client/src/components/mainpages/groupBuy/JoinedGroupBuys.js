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
        <div style={{ paddingLeft: '50px', color: 'darkgrey', paddingTop: '10px' }}>{result !== 0 && <h2>Joined Group Buys</h2>}</div>
        <div style={{ display: 'flex' }}>
       
            <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between', flexWrap: 'wrap', padding: '40px', alignContent: 'center', gap: '15px' }}>
                {
                    userJoinedGroupBuys.map(groupBuy => {
                        if (groupBuy.startedBy !== uid)
                            return <GroupBuyItem key={groupBuy._id} groupBuy={groupBuy} />
                        else return ''
                    })

                }
            </div>
        </div>
        </>
    )
}

export default JoinedGroupBuys