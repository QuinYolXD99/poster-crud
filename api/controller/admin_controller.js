module.exports = {
    register: require('./adminControllers/register'),
    login: require('./adminControllers/login'),
    update: require('./adminControllers/update'),
    delete: require('./adminControllers/delete_account'),
    analyzeByLocation: require('./adminControllers/analyzeByLocation'),
    analyzeByCategory: require('./adminControllers/analyzeByCategory'),
    analyzeByMonth: require('./adminControllers/analyzeByMonth'),
}