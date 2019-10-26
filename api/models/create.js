let DB = require("../DB");
var crypto = require("crypto")

const GridFsStorage = require("multer-gridfs-storage");
exports.storage = new GridFsStorage({
    url: DB.DB,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
              console.log("error!");
              
            return reject(err)
          }else{
              console.log("saved!");
              
          }
          const filename = file.originalname
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
          }
          resolve(fileInfo)
        })
      })
    },
  })


// module.exports = (reqBody, res) => {
//     console.log(reqBody);

//     res.end()
//     // let todo_item = new models.Todos(reqBody);
//     // todo_item.save()
//     //     .then(res => {
//     //         res.status(200).send({ error: false, success: true })
//     //     })
//     //     .catch(err => {
//     //         res.status(200).send({ error: { body: err, status: true }, success: false })

//     //     });
// }
