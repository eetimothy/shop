import { GlobalState } from '../../../GlobalState'
import { useContext, useState } from 'react'
// import { Link } from 'react-router-dom'
import { isLength, isMatch } from '../utils/form_validation/RegisterValidation'
import { showErrMsg, showSuccessMsg } from '../utils/notification/Notification'
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useParams } from 'react-router-dom'

const initialState = {
    username: '',
    password: '',
    mobile: '',
    address: '',
    email: '',
    confirm_password: '',
    err: '',
    success: '',
    company: ''
}

const UserProfiles = () => {
    const state = useContext(GlobalState)
    const token = state.token
    const [user] = state.userAPI.user
    const [isAdmin] = state.userAPI.isAdmin
    // const [isSuperAdmin] = state.userAPI.isSuperAdmin
    // const [allUsers] = state.userAPI.allUsers
    const [loading] = useState(false)
    // const [callback, setCallback] = useState(false)

    const [data, setData] = useState(initialState)
    const { username, email, mobile, address, company, password, confirm_password, err, success } = data

    // console.log(allUsers)
    // console.log(token[0])
    // const { id } = useParams()
    // console.log(user)

    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value, err: '', success: '' })
    }

    const updateInfo = () => {
        try {
            axios.patch('/user/account/update_user_details', {
                username: username ? username : user.username,
                mobile: mobile ? mobile : user.mobile,
                email: email ? email : user.email,
                address: address ? address : user.address,
                company: company ? company : user.company,
            }, {
                headers: { Authorization: token[0] }
            })
            setData({ ...data, err: '', success: "User details updated successfully.." })
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const updatePassword = () => {
        if (isLength(password))
            return setData({ ...data, err: "Password must be at least 8 characters.", success: '' })

        if (!isMatch(password, confirm_password))
            return setData({ ...data, err: "Password did not match.", success: '' })

        try {
            axios.post('/user/account/reset_password', { password }, {
                headers: { Authorization: token[0] }
            })

            setData({ ...data, err: '', success: "Password Update Success!" })
        } catch (err) {
            setData({ ...data, err: err.response.data.msg, success: '' })
        }
    }

    const handleUpdate = () => {
        if (username) updateInfo()
        if (email) updateInfo()
        if (mobile) updateInfo()
        if (address) updateInfo()
        if (company) updateInfo()
        if (password) updatePassword()
    }

    const theme = createTheme();

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
                    <Typography component="h1" variant="h5">
                        User Profile
                    </Typography>

                    <Typography component="h6" variant="h6" style={{ color: 'crimson' }}>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                        {loading && <h3>Loading.....</h3>}
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="username"
                                    label={user.username}
                                    name="username"
                                    autoComplete="username"
                                    defaultValue={user.username}
                                    onChange={handleChangeInput}
                                />
                            </Grid>

                            {
                                isAdmin ? <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="company"
                                        label={user.company}
                                        name="company"
                                        autoComplete="company"
                                        defaultValue={user.company}
                                        onChange={handleChangeInput}
                                    />
                                </Grid>
                                    : ''
                            }



                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    label={user.email}
                                    name="email"
                                    autoComplete="email"
                                    defaultValue={user.email}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="mobile"
                                    label={user.mobile}
                                    name="mobile"
                                    autoComplete="mobile"
                                    defaultValue={user.mobile}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="address"
                                    label={user.address}
                                    name="address"
                                    autoComplete="address"
                                    defaultValue={user.address}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="password"
                                    label="Change Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={user.password}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    name="confirm_password"
                                    label="Confirm new password"
                                    type="password"
                                    id="confirm_password"
                                    value={confirm_password}
                                    onChange={handleChangeInput}
                                />
                            </Grid>
                            <Button
                                onClick={handleUpdate}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ backgroundColor: '#F05E23', borderRadius: 15 }}
                                disabled={loading}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>



        // <>
        // <div>
        //     {err && showErrMsg(err)}
        //     {success && showSuccessMsg(success)}
        //     {loading && <h3>Loading.....</h3>}
        // </div>
        // <div className="profile_page">
        //     <div className="col-left">
        //         <h2>
        //             {
        //                 isAdmin ? "Distributor Profile"
        //                     : isSuperAdmin ? "Super Admin Profile"
        //                         : "User Profile"
        //             }
        //         </h2>
        //         <div className="avatar">

        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="username">Username</label>
        //             <input type="text" name="username" id="username" defaultValue={user.username}
        //             placeholder="Your Username" onChange={handleChangeInput} />
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="email">Email</label>
        //             <input type="email" name="email" id="email" defaultValue={user.email}
        //             placeholder="Your email address" onChange={handleChangeInput} />
        //         </div>

        //             {
        //                 isAdmin ? <div className="form-group">
        //                 <label htmlFor="company">Company</label>
        //                 <input type="company" name="company" id="company" defaultValue={user.company}
        //                 placeholder="Your company" onChange={handleChangeInput}/>
        //                  </div>
        //                  : 
        //                  ''
        //             }

        //         <div className="form-group">
        //             <label htmlFor="mobile">Mobile</label>
        //             <input type="mobile" name="mobile" id="mobile" defaultValue={user.mobile}
        //             placeholder="Your mobile" onChange={handleChangeInput} />
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="address">Address</label>
        //             <input type="address" name="address" id="address" defaultValue={user.address}
        //             placeholder="Your address" onChange={handleChangeInput} />
        //         </div>

        //         <div className="form-group">
        //         <label htmlFor="password">New password</label>
        //         <input type="password" name="password" id="password" value={password} placeholder="Your new password" onChange={handleChangeInput} />
        //         </div>

        //         <div className="form-group">
        //             <label htmlFor="confirm_password">Confirm new password</label>
        //         <input type="password" name="confirm_password" id="confirm_password" value={confirm_password} placeholder="Confirm your new password" onChange={handleChangeInput} />
        //         </div>
        //         <button disabled={loading} onClick={handleUpdate}>Update</button>
        //     </div>


        // </div>
        // </>
    );
}

export default UserProfiles;