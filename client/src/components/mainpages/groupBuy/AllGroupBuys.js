import { useState, useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import GroupBuyItem from './GroupBuyItem'
import Loading from '../utils/loading/Loading'
import FiltersGroupBuy from './FiltersGroupBuy'
// import LoadMoreGroupBuys from './LoadMoreGroupBuys'
import './Cards.css'

const AllGroupBuys = () => {
    const state = useContext(GlobalState)
    const [allGroupBuys] = state.groupBuysAPI.allGroupBuys
    const [loading] = useState(false)




    if (loading) return <div><Loading /></div>
    return (
        <>
            <FiltersGroupBuy />
            {/* <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexGrow: '1', justifyContent: 'center', flexWrap: 'wrap', padding: '20px', alignContent: 'center', gap: '15px' }}>
            {
                allGroupBuys.map(groupBuy => {
                    if(groupBuy.isActive === true)
                    return<GroupBuyItem key={groupBuy._id} product={groupBuy.product} groupBuy={groupBuy}/>
                    else return ''
                })
            }
            </div>
        </div> */}
            
                    <div className='cards'>
                        <div className='cards__container'>
                            <div className='cards__wrapper'>
                                <ul className='cards__items'>
                                    {
                                        allGroupBuys.map(groupBuy => {
                                            if (groupBuy.isActive === true)
                                                return <GroupBuyItem key={groupBuy._id} product={groupBuy.product} groupBuy={groupBuy} />
                                            else return ''
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
               

            {/* <LoadMoreGroupBuys /> */}
            {allGroupBuys.length === 0 && <Loading />}
        </>
    );
}

export default AllGroupBuys;