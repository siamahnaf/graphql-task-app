const {Schema, model} = require('mongoose');

module.exports.Task = model('Task', Schema({
    name: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true}));