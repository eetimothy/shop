import { GlobalState } from '../../../GlobalState'
import { useContext, useState } from 'react'
// import { Link } from 'react-router-dom'
import { isLength, isMatch } from '../utils/form_validation/RegisterValidation'
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification'
import axios from 'axios'

// import { useParams } from 'react-router-dom'

const initialState = {
    username: '',
    password: '',
    confirm_password: '',
    err: '',
    success: ''
}

const UserProfiles = () => {
    const state = useContext(GlobalState)
    const token = state.token
    const [user] = state.userAPI.user
    const [isAdmin] = state.userAPI.isAdmin
    const [isSuperAdmin] = state.userAPI.isSuperAdmin
    // const [allUsers] = state.userAPI.allUsers
    const [loading] = useState(false)
    // const [callback, setCallback] = useState(false)

    const [data, setData] = useState(initialState)
    const { username, password, confirm_password, err, success } = data

    // console.log(allUsers)
    // console.log(token[0])
    // const { id } = useParams()
    // console.log(user)

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]:value, err: '', success: '' })
    }

    const updateInfo = () => {
        try {
            axios.patch('/user/account/update_user_details', { 
                username: username ? username: user.username,
            }, {
                headers: {Authorization: token[0]}
            })
            setData({ ...data, err: '', success: "Username updated successfully.." })
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const updatePassword = () => {
        if(isLength(password))
            return setData({...data, err: "Password must be at least 8 characters.", success: ''})

        if(!isMatch(password, confirm_password))
            return setData({...data, err: "Password did not match.", success: ''})

        try {
            axios.post('/user/account/reset_password', { password }, {
                headers: {Authorization: token[0]}
            })

            setData({...data, err: '' , success: "Password Update Success!"})
        } catch (err) {
            setData({...data, err: err.response.data.msg , success: ''})
        }
    }

    const handleUpdate = () => {
        if (username) updateInfo()
        if (password) updatePassword()
    }


    return (
        <>
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
        </div>
        <div className="profile_page">
            <div className="col-left">
                <h2>
                    {
                        isAdmin ? "Distributor Profile"
                            : isSuperAdmin ? "Super Admin Profile"
                                : "User Profile"
                    }
                </h2>
                <div className="avatar">

                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" defaultValue={user.username}
                    placeholder="Your Username" onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input type="company" name="company" id="company" defaultValue={user.company}
                    placeholder="Your company" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="mobile" name="mobile" id="mobile" defaultValue={user.mobile}
                    placeholder="Your mobile" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="address" name="address" id="address" defaultValue={user.address}
                    placeholder="Your address" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="account_type">Account Type</label>
                    <input type="account_type" name="account_type" id="account_type" defaultValue={user.account_type}
                    placeholder="Your account type" disabled/>
                </div>

                <div className="form-group">
                <label htmlFor="password">New password</label>
                <input type="password" name="password" id="password" value={password} placeholder="Your new password" onChange={handleChangeInput} />
                </div>

                <div className="form-group">
                    <label htmlFor="confirm_password">Confirm new password</label>
                <input type="password" name="confirm_password" id="confirm_password" value={confirm_password} placeholder="Confirm your new password" onChange={handleChangeInput} />
                </div>
                <button disabled={loading} onClick={handleUpdate}>Update</button>
            </div>



            {/* <div className="col-right">
                    <h2>{isSuperAdmin ? "Users" : "My Orders"}</h2>

                    <div style={{overflowX: "auto"}}>
                    <table className="customers">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
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
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                        </td>
                                        <td>
                                            <Link to={`/edit_user/${user._id}`}>
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
            </div> */}
        </div>
        </>
    );
}

export default UserProfiles;