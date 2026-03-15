const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    caption: { 
        type: String,
        default: ""

    },
    imgUrl: { 
        type: String,
        required: [true, "Please provide a image url"]
    }, 
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Please provide a user"]
    }
})

const postModel = mongoose.model('posts', postSchema);

module.exports = postModel;