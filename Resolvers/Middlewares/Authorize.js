const {skip} = require('graphql-resolvers');
const {Task} = require('../../Database/Models/Task');
module.exports.isAuthenticated = (_, __, {email}) => {
    if (!email) {
        throw new Error("Access Denied! Please login to access the token!")
    }
    return skip;
}
module.exports.isTaskOwner = async (_, {id}, {loggedInUserId}) => {
    try {
        const task = await Task.findById(id);
        if (!task) {
            throw new Error('Task not found');
        } else if (task.user !== loggedInUserId) {
            throw new Error("Not authorized as task owner")
        }
        return skip
    } catch (err) {
        throw err;
    }
}