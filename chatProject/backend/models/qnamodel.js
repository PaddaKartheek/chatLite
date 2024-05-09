const mongoose = require('mongoose');

const qnaDataSchema = new mongoose.Schema({
    question:{
        type: String,
        required: true
    },
    answer:{
        type:String,
        required: true
    }
}, { collection: 'question-and-answers' })

module.exports = mongoose.model('Qna', qnaDataSchema);