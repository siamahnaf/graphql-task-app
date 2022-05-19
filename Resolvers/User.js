const { User } = require('../Database/Models/User');
const { Task } = require('../Database/Models/Task');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { combineResolvers } = require('graphql-resolvers');
const { isAuthenticated } = require('./Middlewares/Authorize');
const { ApolloError } = require('apollo-server-express');

module.exports = {
    Query: {
        users: () => users,
        user: combineResolvers(isAuthenticated, async (_, __, { email }) => {
            try {
                const user = await User.findOne({
                    email: email
                });
                if (!user) throw new Error('User not found');
                return (user);
            } catch (err) {
                throw err;
            }

        })
    },
    Mutation: {
        signup: async (_, { input }) => {
            const user = await User.findOne({
                email: input.email
            });
            if (user) throw new ApolloError("Email already in use");
            const hashedPassword = await bcrypt.hash(input.password, 12);
            const newUser = new Muser({ ...input, password: hashedPassword });
            const result = await newUser.save();
            return result;
        },
        login: async (_, { input }) => {
            const user = await User.findOne({
                email: input.email
            });
            if (!user) throw new Error("User Not Found");
            const isPasswordValid = await bcrypt.compare(input.password, user.password);
            if (!isPasswordValid) throw new Error("Invalid Password");
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
            return { token };
        },
    },
    User: {
        tasks: async ({ id }) => {
            try {
                const tasks = await Task.find({ user: id });
                return tasks;
            } catch (err) {
                throw err;
            }

        }
    }
}