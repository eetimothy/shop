import axios from 'axios'
import { useState } from 'react'
import { isEmail } from '../utils/form_validation/RegisterValidation'
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
    email: '',
    err: '',
    success: ''
}

const theme = createTheme();

const ForgotPassword = () => {
    const [data, setData] = useState(initialState)

    const { email, err, success } = data

    const handleChangeInput = (e) => {
        const { name, value} = e.target
        setData({ ...data, [name]:value, err: '', success: '' })
    }

    const forgotPassword = async (e) => {
        if (!isEmail(email))
            return setData({ ...data, err: 'Invalid email', success: '' })

            try {
                const res = await axios.post('/user/account/forgot_password', {email})
                return setData({ ...data, err: '', success: res.data.msg })

            } catch (err) {
                err.response.data.msg && setData({ ...data, err: err.response.data.msg, success: '' })
            }
    }

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
                        Forgot Password? 
                    </Typography>
                    <Typography component="h6" variant="h6" style={{ color: 'crimson' }}>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                    </Typography>
                    <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            type="email"
                            value={email}
                            onChange={handleChangeInput}
                        />

                            <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: '#F05E23', borderRadius: 15 }}
                            onClick={forgotPassword}
                        >
                            Verify Email
                        </Button>
                   
                    </Box>
                    </Container>
                    </ThemeProvider>
    )
}
 
export default ForgotPassword;