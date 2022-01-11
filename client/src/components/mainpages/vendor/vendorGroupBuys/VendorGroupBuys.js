import { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../../../../GlobalState'
import Loading from '../../utils/loading/Loading'
import axios from 'axios'
import GroupBuyItem from '../../groupBuy/GroupBuyItem'
import { useParams } from 'react-router-dom'


const VendorGroupBuys = () => {
    const state = useContext(GlobalState)
    const [token] = state.token
    const [vendorGroupBuys, setVendorGroupBuys] = useState([])
    // const [result, setResult] = useState([])
    const [loading] = useState(false)

    const { username } = useParams()

    useEffect(() => {
        const getVendorGroupBuys = async () => {
            const res = await axios.get(`/api/groupbuys?vendorUsername=${username}`, {
                headers: { Authorization: token }
            })
            setVendorGroupBuys(res.data.groupBuys)
            // setResult(res.data.result)
        }
        getVendorGroupBuys()
    }, [username, token])

    if (loading) return <div><Loading /></div>
    return (
        <>
        <div style={{ paddingLeft: '50px', color: 'darkgrey', paddingTop: '30px'  }}>
            <h2>Current Group Buys</h2>
            </div>
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between', flexWrap: 'wrap', padding: '40px', alignContent: 'center', gap: '15px' }}>
                {
                    vendorGroupBuys.map(groupBuy => {
                        if (groupBuy.startedBy !== username)
                            return <GroupBuyItem key={groupBuy._id} groupBuy={groupBuy} />
                        else return ''

                    })

                }
              </div>
            </div>

        </>
    )
}

export default VendorGroupBuys