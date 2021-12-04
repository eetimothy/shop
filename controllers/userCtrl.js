const Users = require('../models/userModel')
const Payments = require('../models/paymentModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const sendEmail = require('./sendMail')

const { CLIENT_URL } = process.env

const userCtrl = {
    register: async (req, res) => {
        try {
            const { company, address, mobile, account_type, username, email, password } = req.body;
            
            if(!username || !email || !password || !company || !address || !mobile || !account_type)
                return res.status(400).json({ msg: "Please fill in all fields." })

            if(!validateEmail(email))
            return res.status(400).json({ msg: "Invalid Email." })

            const user = await Users.findOne({ email })
            if(user) return res.status(400).json({ msg: "This email already exists.." })

            if(password.length < 8)
                return res.status(400).json({ msg: "Password length must be at least 8 characters." })

            const passwordHash = await bcrypt.hash(password, 12)
            
            const newUser = {
                company, address, mobile, account_type, username, email, password: passwordHash
            }
            
            const activation_token = createActivationToken(newUser)

            const url = `${CLIENT_URL}/user/account/activate/${activation_token}`
            sendMail(email, url, "Verify your email address")

            // console.log({activation_token})

            res.json({ msg: "Registration success! An activation email has been sent to your email." })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
        // try {
        //     const { company, address, mobile, account_type, username, email, password } = req.body
        //     const user = await Users.findOne({ email })
        //     if (user) return res.status(400).json({ msg: 'email already exists.' })

        //     if (password.length < 8)
        //         return res.status(400).json({ msg: "password length at least 8 characters" })

        //     //password encryption
        //     const passwordHash = await bcrypt.hash(password, 10)
        //     const newUser = new Users({
        //         company, address, mobile, account_type, username, email, password: passwordHash
        //     })

        //     await newUser.save()

        //     //create json web token to authenticate
        //     const accesstoken = createAccessToken({ id: newUser._id })
        //     const refreshtoken = createRefreshToken({ id: newUser._id })


        //     res.cookie('refreshtoken', refreshtoken, {
        //         httpOnly: true,
        //         path: '/user/refresh_token',
        //         maxAge: 7 * 24 * 60 * 1000 //7days
        //     })
        //     res.json({ accesstoken })

        // } catch (err) {
        //     return res.status(500).json({ msg: err.message })
        // }
    },
    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)

            // console.info(user)
            const { company, address, mobile, account_type, username, email, password } = user
            
            const check = await Users.findOne({ email })
            if(check) return res.status(400).json({ msg: "Email already exixsts.." })

            const newUser = new Users({
                company, address, mobile, account_type, username, email, password
            })
            await newUser.save()

            res.json({ msg: "Account has been activated and email has been verified!" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({ email })
            if(!user) return res.status(400).json({ msg: "User does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect Password. Please retry."})

            //if login success, cresate access token and refresh token
             //create json web token to authenticate
             const accesstoken = createAccessToken({ id: user._id })
             const refreshtoken = createRefreshToken({ id: user._id })
 
             res.cookie('refreshtoken', refreshtoken, {
                 httpOnly: true,
                 path: '/user/refresh_token',
                 maxAge: 7 * 24 * 60 * 1000 //7days
             })
             res.json({ accesstoken })

        }
        catch (err) {
           return res.status(500).json({ msg: err.message })
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/user/refresh_token' })
            return res.json({ msg: "Logged out" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: "Please Login or Register" })

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: "Please Login or Register" })

                const accesstoken = createAccessToken({ id: user.id })
                res.json({ accesstoken })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }


    },
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body
            const user = await Users.findOne({ email })
            if (!user) return res.status(500).json({ msg: "This email does not exist... " })

            const access_token = createAccessToken({ id: user._id })
            const url = `${CLIENT_URL}/user/account/reset_password/${access_token}`

            sendEmail(email, url, "Reset Password")
            res.json({ msg: "Password reset link sent to your registered email... " })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    resetPassword: async (req, res) => {
        try {
            const { password } = req.body
            // console.log(password)
            // console.log(req.header)
            const passwordHash = await bcrypt.hash(password, 10)

            // console.log(req.user)
            await Users.findOneAndUpdate({  _id: req.user.id }, {
                password: passwordHash
            })

            res.json({ msg: "Password changed successfully.. " })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getUser: async (req, res) => {
      try {
          const user = await Users.findById(req.user.id).select('-password')
          if(!user) return res.status(400).json({ msg: "User does not exist." })
            // console.log(user)
          res.json(user) //id of user
      }  
      catch (err) {
          return res.status(500).json({ msg: err.message })
      }
    },
    getAllUsersInfo: async (req, res) => {
        try {
            const users = await Users.find().select('-password')

            res.json(users)

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { username } = req.body;
            await Users.findOneAndUpdate({ _id: req.user.id }, {
                username
            })

            res.json({ msg: "Update Success.. " })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateUserPermission: async (req, res) => {
        try {
            const {role} = req.body
            await Users.findOneAndUpdate({_id: req.params.id}, {
                role
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)

            res.json({msg: "Delete Success!"})
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(500).json({ msg: "User does not exist.." })

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                cart: req.body.cart
            })

            return res.json({ msg: "Added to Cart" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    addToGroupBuyCart: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(500).json({ msg: "User does not exist.." })

            await Users.findOneAndUpdate({ _id: req.user.id }, {
                groupBuyCart: req.body.groupBuyCart
            })

            return res.json({ msg: "Added to Group Buy Cart..." })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    history: async (req, res) => {
        try {
            const history = await Payments.find({ user_id: req.user.id })

            res.json(history)
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}  

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl