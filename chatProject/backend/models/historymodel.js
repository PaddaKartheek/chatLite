const mongoose = require('mongoose')
const historySchema = new mongoose.Schema({
    email:{
        type: String
    },
    question:{
        type: String
    },
    answer: {
        type: String
    }
}, { 
    timestamps: true, 
    collection: "history" 
});

module.exports = mongoose.model('History', historySchema)