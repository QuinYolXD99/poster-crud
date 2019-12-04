module.exports = {
    register: require('./adminControllers/register'),
    login: require('./adminControllers/login'),
    create: require('./adminControllers/create'),
    retrieve_by_location: require('./adminControllers/retrieve_by_location'),
    retrieve_by_category: require('./adminControllers/retrieve_by_category'),
    retrieveAllPosts: require('./adminControllers/retrieve'),
    retrieveOwnPosts: require('./adminControllers/retrieve'),
    update: require('./adminControllers/update'),
    delete: require('./adminControllers/delete'),
    analyze: require('./adminControllers/analyze')
}