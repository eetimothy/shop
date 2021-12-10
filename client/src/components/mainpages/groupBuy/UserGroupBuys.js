import { useParams } from 'react-router-dom'
import JoinedGroupBuys from './JoinedGroupBuys';
import UserCreatedGroupBuys from './UserCreatedGroupBuys';
 
const UserGroupBuys = () => {

    const { uid } = useParams()

  

    return ( 
        
        <div>
        
            <UserCreatedGroupBuys uid={uid}/>
            <JoinedGroupBuys uid={uid}/>
        </div>
   
     );
}
 
export default UserGroupBuys;