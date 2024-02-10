const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: String,
    location: String,
    tags: [
        {
            type: String
        }
    ],
    image: {
        type: String,
        required: true
    },
    Likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"

        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            comment: {
                type: String,
                required: true
            },
            timestamp: Date
        }
    ]
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema);