const encrypt = require("./encrypt.js");
module.exports = {
<<<<<<< HEAD
    DB: "mongodb://localhost:27017/PostApp"
    // DB: "mongodb+srv://Yol-24:" +
    //     encrypt.secret_key() +
    //     "@cluster0-cb1ns.gcp.mongodb.net/PostApp?retryWrites=true&w=majority"
=======
    DB: "mongodb://localhost:27017/PostApp",
    Atlas: `mongodb+srv://Yol-24:${encrypt.secret_key()}@cluster0-cb1ns.gcp.mongodb.net/PostApp?retryWrites=true&w=majority`
>>>>>>> master
};


