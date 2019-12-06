let models = require("../../model/models");
module.exports = (_id, res) => {
    console.log(_id );
    
    models.User.findByIdAndDelete(_id, (err) => {
        if (err) {
            console.log(err);
            res.status(200).send({ error: { body: err, status: true }, success: false })
        } else {
            res.status(200).send({ error: false, success: true })
        }
    })

}