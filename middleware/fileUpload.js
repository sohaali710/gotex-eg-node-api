const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'public/uploads')
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.replace(' ', '-')
//         cb(null, file.fieldname + '-' + Date.now() + fileName)
//     }
// })

const storage = (path) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path)
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.replace(' ', '-')
            cb(null, file.fieldname + '-' + Date.now() + fileName)
        }
    })
}

exports.upload = multer({ storage: storage('public/cr/') })
exports.uploadClintReceipts = multer({ storage: storage('public/receipts/') })
exports.uploadBill = multer({ storage: storage('public/bills/') })