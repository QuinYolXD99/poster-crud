const multer = require('multer');
<<<<<<< HEAD
const mkdirp = require('mkdirp')
mkdirp.sync('public/uploads')
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req, file, cb) {
=======
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
>>>>>>> 6c69458a519f5a1bcdebd226ec8daba3f4797ff6
        var filename = `uploads_${Math.round(+new Date() / 1000)}_${file.originalname}`
        cb(null, filename)
    }
})

module.exports = multer({
<<<<<<< HEAD
    storage: storage,
    limits: { fileSize: 1000000000 }
=======
    storage: storage, limits: { fileSize: 1000000000 }
>>>>>>> 6c69458a519f5a1bcdebd226ec8daba3f4797ff6
})