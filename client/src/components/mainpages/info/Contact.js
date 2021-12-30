import * as React from 'react';
import { useState } from 'react';
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { showErrMsg, showSuccessMsg } from '../../mainpages/utils/notification/Notification.js'
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { isEmail, isEmpty } from '../utils/form_validation/RegisterValidation';

const theme = createTheme();

const initialState = {
    enquiryType: '',
    name: '',
    mobile: '',
    email: '',
    message: '',
    err: '',
    success: ''
}

const Contact = () => {
 
    const [user, setUser] = useState(initialState)
    const { enquiryType, name, mobile, email, message, err, success } = user

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value, err: '', success: '' })
    }

    const submit = async (e) => {
        e.preventDefault();

        if(isEmpty(name) || isEmpty(mobile) || isEmpty(enquiryType) || isEmpty(mobile) || isEmpty(message))
        return setUser({ ...user, err: "Please fill in all fields.", success: '' })

        if (!isEmail(email))
        return setUser({ ...user, err: "Invalid email", success: '' })


        try {
            const res = await axios.post('/api/contact', { email, enquiryType, name, mobile, message })
            setUser({ ...user, err: '', success: res.data.msg })
            
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


                    <Typography component="h1" variant="h5">
                        Contact
                    </Typography>

                    <Typography component="h6" variant="h6" style={{ color: 'crimson' }}>
                        {err && showErrMsg(err)}
                        {success && showSuccessMsg(success)}
                    </Typography>
                    <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>

                        <InputLabel id="enquiryType">Enquiry Type</InputLabel>
                        <Select
                            fullWidth
                            required
                            id="enquiryType"
                            name="enquiryType"
                            type="text"
                            value={user.enquiryType}
                            label="Enquiry Type"
                            onChange={onChangeInput}

                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="Troubleshoot">Troubleshoot</MenuItem>
                            <MenuItem value="Media Queries">Media Queries</MenuItem>
                            <MenuItem value="Sell on Group Up">Sell On Group Up</MenuItem>
                            <MenuItem value="Enterprise Solutions">Enterprise Solutions</MenuItem>
                            <MenuItem value="Others">Others</MenuItem>
                        </Select>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            type="text"
                            value={user.name}
                            onChange={onChangeInput}
                        />

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
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="mobile"
                            label="Mobile"
                            name="mobile"
                            autoComplete="mobile"
                            autoFocus
                            type="mobile"
                            value={user.mobile}
                            onChange={onChangeInput}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="message"
                            label="Message"
                            name="message"
                            rows={4}
                            multiline
                            autoFocus
                            type="text"
                            value={user.message}
                            onChange={onChangeInput}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            style={{ backgroundColor: '#F05E23', borderRadius: 15 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Contact;

