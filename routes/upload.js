const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const fs = require('fs')

//upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

//Upload company logo for vendors only
router.post('/upload_logo', (req, res) => {
    try {
        if(!req.files || Object.keys(req.files).length ===0)
        return res.status(400).json({ msg: "No files were uploaded" })

        const file = req.files.file;
        console.log(file)

        if(file.size > 1024 * 1024) {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: "Size too large" })
        } //1MB

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: "File format is incorrect." })
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
            if (err)
                throw err;
            removeTemp(file.tempFilePath)

            res.json({ public_id: result.public_id, url: result.secure_url })

        })
    }
    catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

//Upload Image (only admin)
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        // console.log(req.files)
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({ msg: 'no files were uploaded.. ' })

        const file = req.files.file;
        if (file.size > 1600 * 1600) {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: "Size too large" })
        }

        if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTemp(file.tempFilePath)
            return res.status(400).json({ msg: "File format is incorrect." })
        }


        cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
            if (err)
                throw err;
            removeTemp(file.tempFilePath)

            res.json({ public_id: result.public_id, url: result.secure_url })

        })

    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

//Delete Image (only admin)
router.post('/destroy', (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) res.status(400).json({ msg: 'No images were selected' })

        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) {
                throw err;
            }
            res.json({ msg: 'Image deleted.. ' })
        })
    }
    catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if (err) {
            throw err;
        }
    })
}

module.exports = router