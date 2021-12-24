import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../headers/images/glogo_nobg.png'
import { showErrMsg, showSuccessMsg } from '../../mainpages/utils/notification/Notification.js'


const theme = createTheme();

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
                setUser({ ...user, err: err.response.data.msg, success: '' })
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
                        Log in
                    </Typography>
                    <Typography component="h6" variant="h6" style={{ color: 'crimson' }}>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                    </Typography>
                    <Box component="form" onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
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
                            value={user.email}
                            onChange={onChangeInput}
                            style={{}}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={user.password}
                            onChange={onChangeInput}

                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: '#F05E23', borderRadius: 15 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link to='/account/forgot_password' variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/account/register" variant="body2">
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
              

            </Container>
        </ThemeProvider>
    );
}

export default Login;