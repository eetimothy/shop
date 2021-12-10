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

    const { uid } = useParams()

    useEffect(() => {
        const getVendorGroupBuys = async () => {
            const res = await axios.get(`/api/groupbuys?vendorId=${uid}`, {
                headers: { Authorization: token }
            })
            setVendorGroupBuys(res.data.groupBuys)
            // setResult(res.data.result)
        }
        getVendorGroupBuys()
    }, [uid, token])

    if (loading) return <div><Loading /></div>
    return (
        <>
            <h2>My Group Buys</h2>
            <div className="products">

                {
                    vendorGroupBuys.map(groupBuy => {
                        if (groupBuy.startedBy !== uid)
                            return <GroupBuyItem key={groupBuy._id} groupBuy={groupBuy} />
                        else return ''

                    })

                }
            </div>
        </>
    )
}

export default VendorGroupBuys