// import { useContext } from 'react'
// import { GlobalState } from '../../../GlobalState'
// import GroupBuyItem from './GroupBuyItem'
// import './Cards.css'

// function GroupBuyCard() {
//     const state = useContext(GlobalState)
//     const [allGroupBuys] = state.groupBuysAPI.allGroupBuys


//     return (
//         <div className="cards">
//             <div className="cards__container">
//                 <div className="cards__wrapper">
//                     <div className="cards__items">
//                     {
//                 allGroupBuys.map(groupBuy => {
//                     if(groupBuy.isActive === true)
//                     return<GroupBuyItem key={groupBuy._id} product={groupBuy.product} groupBuy={groupBuy}/>
//                     else return ''
//                 })
//             }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default GroupBuyCard