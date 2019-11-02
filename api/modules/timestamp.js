module.exports = (reqBody) => {

    var timestamp = new Date().toJSON().slice(0, 10).replace(/-/g, '/')
    reqBody.createdAt = timestamp
    reqBody.updatedAt = timestamp
    return reqBody
}