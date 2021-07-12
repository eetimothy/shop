const Users = require('../models/userModel')

const authSuperAdmin = async (req, res, next) => {
    try {
        const user = await Users.findOne({
            _id: req.user.id
        })
        // if(user.role === 2 || user.role ===1 || user.role ===0)
        if(user.role !== 3)
        return res.status(400).json({ msg: "Admin access denied."})

        next();
    }   
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

module.exports = authSuperAdmin