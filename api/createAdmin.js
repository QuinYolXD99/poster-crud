/* eslint-disable  */
let models = require("./model/models");
module.exports = () => {
    models.User.find({ "account.role": "admin" },
        (err, admin) => {
            if (!err) {
                if (!admin.length) {
                    console.log("create admin");
                    let new_admin = new models.User({
                        account: {
                            "avatar": "https://mpng.pngfly.com/20180624/yxv/kisspng-business-organization-computer-software-tom-clancy-unknown-person-5b2f72c6b16400.1895704715298362307266.jpg",
                            "username": "@admin",
                            "password": "$2a$10$YAYRKRb2CQX3LRrUqzAtwOEvRUaXOoK8zN/mcaRIU2pAcPt0StPWW",
                            "firstname": "leonilo",
                            "lastname": "torres",
                            "contact": "+639",
                            "joined": "2019/12/12",
                            "role": "admin"
                        }
                    });
                    new_admin.save()
                } else {
                    console.log("admin already registered");

                }
            }
        }
    ).catch(err => {
        if (err) {
            console.log(err);
        }
    })
}