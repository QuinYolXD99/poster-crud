/* eslint-disable  */
let models = require("./model/models");
module.exports = () => {
    models.User.find({ "account.role": "admin" },
        (err, admin) => {
            if (!err) {
                if (!admin.length) {
                    console.log("create admin");
                    let new_admin = new models.User(
                        {
                            account: {
                                "avatar": "http://localhost:4001/files/uploads_1576138872_78582170_2538153039797219_812523145712893952_o.jpg",
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