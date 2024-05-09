const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    usertype:{
        type: String,
        required: true
    }
}, {collection: 'user-cred'});

module.exports = mongoose.model('UserCred', userDataSchema);