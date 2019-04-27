const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type : String , required : true},
    created_at:{ type: Date, default: Date.now }
});

mongoose.model('User', userSchema);
// const user = mongoose.model('User', userSchema);
// module.exports = user;
