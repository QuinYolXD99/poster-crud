module.exports = {
    create_post: require("./userControllers/create"),
    retrieve_posts: require("./userControllers/retrieve"),
    update_post: require("./userControllers/update"),
    remove_post: require("./userControllers/delete_Post"),
    login: require("./userControllers/login"),
    register: require("./userControllers/register")
}