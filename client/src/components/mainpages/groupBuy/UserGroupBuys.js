import { useParams } from 'react-router-dom'
import JoinedGroupBuys from './JoinedGroupBuys';
import UserCreatedGroupBuys from './UserCreatedGroupBuys';
 
const UserGroupBuys = () => {

    const { uid } = useParams()

  

    return ( 
        
        <>
            <UserCreatedGroupBuys uid={uid}/>
            <JoinedGroupBuys uid={uid}/>
           
       
            </>
     );
}
 
export default UserGroupBuys;