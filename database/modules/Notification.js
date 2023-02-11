const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    creater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: String,
    post: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"

    }


}, { timestamps: true })

module.exports = mongoose.model('Notification', notificationSchema);