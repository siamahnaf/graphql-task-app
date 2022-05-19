const {gql} = require('apollo-server-express');
const userTypeDefs = require('./User');
const taskTypeDefs = require('./Task');

const typeDefs = gql`
    scalar Date
    type Query {
        _: String
    }
    type Mutation {
        _: String
    }
`;
module.exports = [
    typeDefs,
    userTypeDefs,
    taskTypeDefs
]