const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true
    },
    created_at : {
        type: Date,
        default: Date.now
    }    
});

mongoose.model("Post", postSchema);
// const post = mongoose.model('Post', postSchema);