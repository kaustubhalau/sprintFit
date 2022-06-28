const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    habit: {
        type: String,
        required: true
    },
    date : {
        type : String,
        required : true
    },
    status: {
        type: String,
    }
   
});


const User = mongoose.model('User', userSchema);

module.exports = User;