const uuid = require('uuid');
const {Task} = require('../Database/Models/Task');
const {User} = require('../Database/Models/User');
const {isAuthenticated, isTaskOwner} = require('./Middlewares/Authorize');
const {combineResolvers} = require('graphql-resolvers');

module.exports = {
    Query: {
        tasks: combineResolvers(isAuthenticated, async (_, __, {loggedInUserId}) => {
            try {
                const task = await Task.find({user: loggedInUserId});
                return task;
            } catch (err) {
                throw err;
            }

        }),
        task: combineResolvers(isAuthenticated, isTaskOwner, async (_, {id}) => {
            try {
                const task = await Task.findById(id);
                return task
            } catch (err) {
                throw err;
            }
        })
    },
    Mutation: {
        createTask: combineResolvers(isAuthenticated, async (_, {input}, {email}) => {
            try {
                const user = await User.findOne({email})
                const task = new Task({...input, user: user.id});
                const result = await task.save();
                user.tasks.push(result.id);
                return result;
            } catch (err) {
                throw err
            }
        })
    },
    Task: {
        user: async (parent) => {
            try {
                const user = await User.findById(parent.user);
                console.log(parent)
                return user;
            } catch (err) {
                throw err;
            }
        }
    },
}