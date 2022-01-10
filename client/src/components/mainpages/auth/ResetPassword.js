import axios from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { isLength, isMatch } from '../utils/form_validation/RegisterValidation'
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../headers/images/glogo_nobg.png'

const initialState = {
    password: '',
    confirm_password: '',
    err: '',
    success: ''
}

const theme = createTheme();

const ResetPassword = () => {
    const [data, setData] = useState(initialState)
    const { token } = useParams()

    const { password, confirm_password, err, success } = data

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const handleResetPassword = async () => {
        if (isLength(password))
            return setData({ ...data, err: "Password must contain at least 8 characters.", success: '' })

        if (!isMatch(password, confirm_password))
            return setData({ ...data, err: "Passwords do not match.", success: '' })

        try {
            const res = await axios.post('/user/account/reset_password', { password }, {
                headers: { Authorization: token }
            })
            return setData({ ...data, err: '', success: res.data.msg })
            

        } catch (err) {
            err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    // return ( 
    //     <div className="forgot_password">
    //         <h2>Reset Password</h2>

    //         <div className="row">
    //             { err && showErrMsg(err) }
    //             { success && showSuccessMsg(success) }

    //             <label htmlFor="password">Enter your new password</label>
    //             <input type="password" name="password" id="password" value={password} onChange={handleChangeInput} />

    //             <label htmlFor="confirm_password">Confirm password</label>
    //             <input type="password" name="confirm_password" id="confirm_password" value={confirm_password} onChange={handleChangeInput} />

    //             <button onClick={handleResetPassword}>Reset password</button>
    //         </div>
    //     </div>
    //  );
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box
                        sx={{ marginBottom: 2 }}

                    >
                        <img src={Logo} alt=" " width={60} />
                    </Box>
                    <Typography component="h1" variant="h5">
                        Reset Password
                    </Typography>
                    <Typography component="h6" variant="h6" style={{ color: 'crimson' }}>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                    </Typography>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Enter new password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleChangeInput}
                    />

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirm_password"
                        label="Confirm new password"
                        type="password"
                        id="confirm_password"
                        value={confirm_password}
                        onChange={handleChangeInput}
                    />

                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: '#F05E23', borderRadius: 15 }}
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </Button>

                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default ResetPassword;