import { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'

const LoadMoreGroupBuys = () => {
 const state = useContext(GlobalState)
 const [page, setPage] = state.groupBuysAPI.page
 const [results] = state.groupBuysAPI.result

    return ( 
        <div className="load_more">
            {
                results < page * 9 ? "" 
                : <button onClick={() => setPage(page+1)}>Load more</button>
            }
        </div>
     );
}
 
export default LoadMoreGroupBuys;