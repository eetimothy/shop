import * as React from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { showErrMsg, showSuccessMsg } from '../../mainpages/utils/notification/Notification'
import { isEmpty, isEmail, isLength, isMatch } from '../utils/form_validation/RegisterValidation'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../headers/images/glogo_nobg.png'


const initialState = {
    company: '',
    address: '',
    account_type: 'vendor',
    role: 1,
    mobile: '+65',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
    err: '',
    success: ''
}

const theme = createTheme();

const RegisterVendor = () => {
    const [user, setUser] = useState(initialState)

    const { username, email, password, confirm_password, mobile, address, role, account_type, company, err, success } = user

    // const accountTypes = [
    //     { value: 'distributor', label: 'Distributor' },
    //     { value: 'reseller', label: 'Reseller' }
    // ]

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const registerSubmit = async (e) => {
        e.preventDefault();

        if (isEmpty(username) || isEmpty(password) || isEmpty(company))
            return setUser({ ...user, err: "Please fill in all fields.", success: '' })

        if (!isEmail(email))
            return setUser({ ...user, err: "Invalid email.", success: '' })

        if (isLength(password))
            return setUser({ ...user, err: "Password must be at least 8 characters.", success: '' })

        if (!isMatch(password, confirm_password))
            return setUser({ ...user, err: "Passwords do not match.", success: '' })

        try {
            const res = await axios.post('/user/account/register', {
                username, email, password, mobile, address, role, account_type, company
            })

            setUser({ ...user, err: '', success: res.data.msg })

            // localStorage.setItem('firstLogin', true)
            // window.location.href = "/";
        }
        catch (err) {
            err.response.data.msg &&
                setUser({ ...user, err: err.response.data.msg, success: '' })
        }
    }

    return (
        <>
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
                            Sign up
                        </Typography>
                        <Typography component="h6" variant="h6" style={{ color: 'crimson' }}>
                            {err && showErrMsg(err)}
                            {success && showSuccessMsg(success)}
                        </Typography>
                        <Box component="form" noValidate onSubmit={registerSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="username"
                                        label="Choose Username"
                                        name="username"
                                        autoComplete="username"
                                        value={user.username}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={user.email}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="mobile"
                                        label="Mobile"
                                        name="mobile"
                                        autoComplete="mobile"
                                        value={user.mobile}
                                        onChange={onChangeInput}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="company"
                                        label="Company"
                                        name="company"
                                        autoComplete="company"
                                        value={user.company}
                                        onChange={onChangeInput}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"
                                        value={user.address}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={user.password}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirm_password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm_password"
                                        value={user.confirm_password}
                                        onChange={onChangeInput}
                                    />
                                </Grid>
                                {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: '#F05E23', borderRadius: 15 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to='/account/login' variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                  
                </Container>
            </ThemeProvider>
            {/* <h2>Register</h2>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)} */}


            {/* <form onSubmit={registerSubmit}> */}

            {/* <input type="text" name="company" required placeholder="Company name"
                value={user.company} onChange={onChangeInput} /> */}

            {/* <input type="text" name="address" required placeholder="Address"
                value={user.address} onChange={onChangeInput} /> */}

            {/* <select name="account_type" id="account_type" value={user.account_type} onChange={onChangeInput} required>
                <option value="">Please choose user type</option>
                {
                    accountTypes.map(userType => (
                        <option value={accountTypes.value} key={userType.value}>
                            {userType.label}
                        </option>
                    ))
                }
            </select> */}


            {/* <input type="number" name="mobile" required placeholder="mobile: 9742 xxxx"
                value={user.mobile} onChange={onChangeInput} min="8" />

            <input type="text" name="username" required placeholder="Username"
                value={user.username} onChange={onChangeInput} />



            <input type="email" name="email" required placeholder="Email"
                value={user.email} onChange={onChangeInput} />



            <input type="password" name="password" required autoComplete="on" placeholder="Password"
                value={user.password} onChange={onChangeInput} />



            <input type="password" placeholder="Confirm password" name="confirm_password" required
                value={user.confirm_password} onChange={onChangeInput} /> */}



            {/* <button type="submit">Register</button> */}


            {/* </form> */}
            {/* Already have an account? <Link to="/account/login">Login</Link> */}
        </>
    );
}

export default RegisterVendor;