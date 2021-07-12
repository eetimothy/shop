import { GlobalState } from '../../../../GlobalState'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
// import { isLength, isMatch } from '../../utils/form_validation/RegisterValidation'
// import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
// import axios from 'axios'

// const initialState = {
//     username: '',
//     password: '',
//     confirm_password: '',
//     err: '',
//     success: ''
// }


const ManageUsers = () => {
    const state = useContext(GlobalState)
    // const token = state.token
    // const [user] = state.userAPI.user
    // const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin
    const [allUsers] = state.userAPI.allUsers
    // const [loading, setIsloading] = useState(false)
    // const [callback, setCallback] = useState(false)

    // const [data, setData] = useState(initialState)
    // const { username, password, confirm_password, err, success } = data


    return (
        <div className="col-right">
                    <h2>{isSuperAdmin ? "Users" : "My Orders"}</h2>

                    <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Account Type</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Company</th>
                                <th>Address</th>
                                <th>Admin</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.account_type}</td>
                                        <td>{user.email}</td>
                                        <td>{user.mobile}</td>
                                        <td>{user.company}</td>
                                        <td>{user.address}</td>
                                       
                                        <td>
                                            {
                                                user.role === 3
                                                ? <i className="fas fa-check" title="Super Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_users/${user._id}`}>
                                                <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                             ></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
    )
}

export default ManageUsers