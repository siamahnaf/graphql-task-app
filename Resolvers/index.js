const {GraphQLDateTime} = require('graphql-iso-date');
const userResolver = require('./User');
const taskResolver = require('./Task');

const customDateScalerResolver = {
    Date: GraphQLDateTime
}
module.exports = [
    userResolver,
    taskResolver,
    customDateScalerResolver
]