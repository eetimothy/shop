import { useContext } from 'react';
import { GlobalState } from '../../GlobalState'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import './AccSettings.css'

const AccSettings = () => {
    const state = useContext(GlobalState)
    // const [isLoggedIn] = state.userAPI.isLoggedIn
    const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin
    const [user] = state.userAPI.user



    const logoutUser = async () => {
        try {
            await axios.get('user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/"
        } catch (err) {
            window.location.href = "/"
        }
    }

    return (
        <div className="moret">
           
            <div className="moret_in">
            <Link to={`/user_profile/${user._id}`}>
            <ManageAccountsIcon />
            <p>Account Settings</p>
            </Link>
            </div>

        
            {
                !isAdmin && !isSuperAdmin ? <div className="moret_in">
                <Link to={`/groupbuys_user/${user._id}`}>
                    <GroupsIcon/>
                    <p>My Group Buys</p>
                    </Link>
                </div>
                :
                isAdmin ? <div className="moret_in">
                <Link to={`/vendor_groupbuys/${user.username}`}>
                    <GroupsIcon/>
                    <p>My Group Buys</p>
                    </Link>
                </div>
                :
                ''
            }
            
            
            
            {
                !isAdmin && !isSuperAdmin ? <div className="moret_in">
                <Link to={`/history`}>
                    <ReceiptIcon />
                    <p>My Orders</p>
                    </Link>
                </div>
                :
                isAdmin ? <div className="moret_in">
                <Link to={`/vendor_orders`}>
                    <ReceiptIcon />
                    <p>My Orders</p>
                    </Link>
                </div>
                :
                ''
            }
            
            {
                isSuperAdmin ? <div className="moret_in">
                <Link to={`/manage_users`}>
                    <GroupAddIcon/>
                    <p>Manage Users</p>
                    </Link>
                </div> : null
            }
            
          
            
            <div className="moret_in">
            <Link to="/" onClick={logoutUser}>
                <LogoutIcon/>
                <p>Log out</p>
                </Link>
            </div>
        </div>
    )
}

export default AccSettings