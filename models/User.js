const {Schema, model} = require('mongoose');
const { schema } = require('./Thought');

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        match: [/.+@.+\..+/]
    },
    thoughts: [{type: schema.Types.ObjectId, ref: 'Thought'}],
    friends: [{type: schema.Types.ObjectId, ref: 'User'}]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

userSchema.virtual('friendCount').get(function() {
    return this.friends.lenth;
});

const User = model('User', userSchema);

module.exports = User;