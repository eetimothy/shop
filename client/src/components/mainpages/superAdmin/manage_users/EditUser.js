import { useState, useEffect, useContext } from 'react'
import { GlobalState } from '../../../../GlobalState'
import { useHistory } from 'react-router-dom'
import { showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import axios from 'axios'

const EditUser = () => {
    const state = useContext(GlobalState)
    const token = state.token
    // const [user] = state.userAPI.user
    // const [isAdmin] = state.userAPI.isAdmin
    // const [isSuperAdmin] = state.userAPI.isSuperAdmin
    const [allUsers] = state.userAPI.allUsers
    const { id } = useHistory()
    const history = useHistory()
    const [editUser, setEditUser] = useState([])

    const [checkSuperAdmin, setCheckSuperAdmin] = useState(false)
    const [err, setErr] = useState(false)
    const [success, setSuccess] = useState(false)
    const [num, setNum] = useState(0)
 
  

    useEffect(() => {
        if(allUsers.length !== 0){
            allUsers.forEach(user => {
                if(user._id === id){
                    setEditUser(user)
                    setCheckSuperAdmin(user.role === 3 ? true : false)
                }
            })
        } else{
            history.push('/manage_users')
        }
    }, [allUsers, id, history])

    const handleUpdate = async () => {
        try {
            if(num % 2 !== 0){
                const res = await axios.patch(`/user/account/update_user_permission/${editUser._id}`, {
                    role: checkSuperAdmin ? 3 : 0
                }, {
                    headers: {Authorization: token}
                })
                setSuccess(res.data.msg)
                setNum(0)
            }
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }

    const handleCheck = () => {
        setSuccess('')
        setErr('')
        setCheckSuperAdmin(!checkSuperAdmin)
        setNum(num + 3)
    }

    return (
        <div className="profile_page edit_user">
            <div className="row">
                <button onClick={() => history.goBack()} className="go_back">
                    <i className="fas fa-long-arrow-alt-left"></i> Go Back
                </button>
            </div>
            <div className="col-left">
                <h2>Edit User Permissions</h2>

                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" defaultValue={editUser.username}
                    placeholder="Your Username" disabled />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" defaultValue={editUser.email}
                    placeholder="Your email address" disabled />
                </div>

                <div className="form-group">
                    <input type="checkbox" id="isSuperAdmin" checked={checkSuperAdmin}
                    onChange={handleCheck} />
                    <label htmlFor="isSuperAdmin">isSuperAdmin</label>
                </div>
         
                <button onClick={handleUpdate}>Update</button>

                {err && showErrMsg(err)}
                {success && showSuccessMsg(success)}
            </div>
            
        </div>
    )
}

export default EditUser