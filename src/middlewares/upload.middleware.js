const multer = require('multer')
const path = require('path')

// Simpan data sementara di memory
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
        return cb(new Error("Hanya bisa mengupload gambar (.jpg, .jpeg, .jpeg)"))
    }
    cb(null, true)
}

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    },
    fileFilter
})

module.exports = upload