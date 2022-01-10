import { useState, useEffect  } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../mainpages/utils/notification/Notification'
import Login from './Login'

function ActivationEmail () {
    const { activation_token } = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

   
    // console.log(useParams())

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/account/activate', {activation_token})
                    setSuccess(res.data.msg)
                    
                    localStorage.setItem('firstLogin', true)
                    // window.location.href = "/account/login";

                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    },[activation_token])

    return (
        <>
        <div className="activate_page" style={{ display: "flex", justifyContent: "center", paddingTop: "30px" }}>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            </div>
            <Login/>
            </>
        
    )
}

export default ActivationEmail