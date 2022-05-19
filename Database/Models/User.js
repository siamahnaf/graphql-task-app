const {Schema, model} = require('mongoose');

module.exports.User = model('User', Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tasks: {
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }
}, {timestamps: true}));