import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../mainpages/utils/notification/Notification.js'

const initialState = {
    email: '',
    password: '',
    err: '',
    success: ''
}

const Login = () => {
    const [user, setUser] = useState(initialState)
    const { email, password, err, success } = user

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/user/account/login', { email, password })
            setUser({ ...user, err: '', success: res.data.msg })

            localStorage.setItem('firstLogin', true)

            window.location.href = "/";
        }
        catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="login_page">
            <h2>Login</h2>
            { err && showErrMsg(err) }
            { success && showSuccessMsg(success) }

            <form onSubmit={loginSubmit}>
                <div>
                    <input type="email" name="email" required placeholder="Email"
                        value={user.email} onChange={onChangeInput} />
                </div>

                <div>
                    <input type="password" name="password" required autoComplete="on" placeholder="Password"
                        value={user.password} onChange={onChangeInput} />
                </div>

                <div className="row">
                    <button type="submit">Login</button>
                    <Link to="/account/forgot_password">Forgot password</Link>
                </div>
            </form>
            <div></div>
            <div className="hr">Or Login With</div>
            <div>
                <p>New to Grid? <Link to="/account/register">Register here!</Link></p>
            </div>
        </div>
    );
}

export default Login;