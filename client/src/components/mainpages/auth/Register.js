import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../mainpages/utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from '../utils/form_validation/RegisterValidation'

const initialState = {
    company: '',
    address: '',
    account_type: '',
    mobile: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    err: '',
    success: ''
}

const Register = () => {
    const [user, setUser] = useState(initialState)

    const { username, email, password, confirm_password, mobile, company, address, account_type, err, success } = user

    const accountTypes = [
        { value: 'distributor', label: 'Distributor' },
        { value: 'reseller', label: 'Reseller' }
    ]

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const registerSubmit = async (e) => {
        e.preventDefault();

        if (isEmpty(username) || isEmpty(password))
            return setUser({ ...user, err: "Please fill in all fields.", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid email.", success: '' })

        if (isLength(password))
            return setUser({ ...user, err: "Password must be at least 8 characters.", success: '' })

        if (!isMatch(password, confirm_password))
            return setUser({ ...user, err: "Passwords do not match.", success: '' })

        try {
            const res = await axios.post('/user/account/register', {
                username, email, password, mobile, company, address, account_type
            })

            setUser({ ...user, err: '', success: res.data.msg })

            // localStorage.setItem('firstLogin', true)
            // window.location.href = "/";
        }
        catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_page">

            <h2>Register</h2>
            { err && showErrMsg(err) }
            { success && showSuccessMsg(success) }


            <form onSubmit={registerSubmit}>
                <div>
                    <input type="text" name="company" required placeholder="Company name"
                        value={user.company} onChange={onChangeInput} />
                </div>

                <div>
                    <input type="text" name="address" required placeholder="Address"
                        value={user.address} onChange={onChangeInput} />
                </div>

                <div>
                    <select name="account_type" id="account_type" value={user.account_type} onChange={onChangeInput} required>
                        <option value="">Please choose user type</option>
                        {
                            accountTypes.map(userType => (
                                <option value={accountTypes.value} key={userType.value}>
                                    {userType.label}
                                </option>
                            ))
                        }
                    </select>

                </div>

                <div>
                    <input type="number" name="mobile" required placeholder="mobile: 9742 xxxx"
                        value={user.mobile} onChange={onChangeInput} min="8" />
                </div>

                <div>
                    <input type="text" name="username" required placeholder="Username"
                        value={user.username} onChange={onChangeInput} />
                </div>

                <div>
                    <input type="email" name="email" required placeholder="Email"
                        value={user.email} onChange={onChangeInput} />
                </div>

                <div>
                    <input type="password" name="password" required autoComplete="on" placeholder="Password"
                        value={user.password} onChange={onChangeInput} />
                </div>

                <div>
                <input type="password" placeholder="Confirm password" name="confirm_password" required
                    value={user.confirm_password} onChange={onChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Register</button>
                    
                </div>
            </form>
            <p>Already have an account? <Link to="/account/login">Login</Link></p>
            
        </div>
    );
}

export default Register;