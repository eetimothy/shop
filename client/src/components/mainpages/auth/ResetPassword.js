import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { isLength, isMatch } from '../utils/form_validation/RegisterValidation'
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification'

const initialState = {
    password: '',
    confirm_password: '',
    err: '',
    success: ''
}

const ResetPassword = () => {
    const [data, setData] = useState(initialState)
    const {token} = useParams()

    const { password, confirm_password, err, success } = data

    const handleChangeInput = (e) => {
        const { name, value} = e.target
        setData({ ...data, [name]:value, err: '', success: '' })
    }

    const handleResetPassword = async () => {
        if(isLength(password))
            return setData({ ...data, err: "Password must contain at least 8 characters.", success: '' })

        if(!isMatch(password, confirm_password))
            return setData({ ...data, err: "Passwords do not match.", success: '' })

        try {
            const res = await axios.post('/user/account/reset_password', {password}, {
                headers: { Authorization: token }
            })
            return setData({ ...data, err: '', success: res.data.msg })

        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    return ( 
        <div className="forgot_password">
            <h2>Reset Password</h2>

            <div className="row">
                { err && showErrMsg(err) }
                { success && showSuccessMsg(success) }

                <label htmlFor="password">Enter your new password</label>
                <input type="password" name="password" id="password" value={password} onChange={handleChangeInput} />

                <label htmlFor="confirm_password">Confirm password</label>
                <input type="password" name="confirm_password" id="confirm_password" value={confirm_password} onChange={handleChangeInput} />

                <button onClick={handleResetPassword}>Reset password</button>
            </div>
        </div>
     );
}
 
export default ResetPassword;